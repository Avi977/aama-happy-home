// api/yelp-reviews.js - Serverless function for Yelp API integration
export default async function handler(req, res) {
  // Enable CORS for frontend requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Yelp Business ID for Aama Daycare San Ramon
  const BUSINESS_ID = process.env.YELP_BUSINESS_ID || 'aama-day-care-san-ramon-2';
  
  // Get API key from environment variables
  const YELP_API_KEY = process.env.YELP_API_KEY;

  if (!YELP_API_KEY) {
    return res.status(500).json({ 
      error: 'Yelp API key not configured. Please set YELP_API_KEY in your environment variables.',
      setup_instructions: 'Visit https://www.yelp.com/developers to get your API key'
    });
  }

  try {
    // Fetch business details
    const businessResponse = await fetch(
      `https://api.yelp.com/v3/businesses/${BUSINESS_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${YELP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!businessResponse.ok) {
      if (businessResponse.status === 401) {
        throw new Error('Invalid Yelp API key. Please check your API key.');
      } else if (businessResponse.status === 404) {
        throw new Error('Business not found. Please check the business ID.');
      } else {
        throw new Error(`Business API error: ${businessResponse.status}`);
      }
    }

    const businessData = await businessResponse.json();

    // Fetch reviews
    const reviewsResponse = await fetch(
      `https://api.yelp.com/v3/businesses/${BUSINESS_ID}/reviews`,
      {
        headers: {
          'Authorization': `Bearer ${YELP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!reviewsResponse.ok) {
      if (reviewsResponse.status === 401) {
        throw new Error('Invalid Yelp API key. Please check your API key.');
      } else if (reviewsResponse.status === 404) {
        throw new Error('Reviews not found. Please check the business ID.');
      } else {
        throw new Error(`Reviews API error: ${reviewsResponse.status}`);
      }
    }

    const reviewsData = await reviewsResponse.json();

    // Transform the data to match our frontend format
    const transformedData = {
      business: {
        id: businessData.id,
        name: businessData.name,
        rating: businessData.rating,
        review_count: businessData.review_count,
        url: businessData.url
      },
      reviews: reviewsData.reviews.map(review => ({
        id: review.id,
        url: review.url,
        text: review.text,
        rating: review.rating,
        time_created: review.time_created,
        user: {
          name: review.user.name,
          image_url: review.user.image_url
        }
      }))
    };

    // Add cache headers for better performance
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(transformedData);
  } catch (error) {
    console.error('Yelp API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews from Yelp. Please try again later.',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
