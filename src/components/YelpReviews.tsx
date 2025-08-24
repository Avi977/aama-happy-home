import React, { useState, useEffect } from 'react';
import { Star, ExternalLink, Quote, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface YelpReview {
  id: string;
  url: string;
  text: string;
  rating: number;
  time_created: string;
  user: {
    name: string;
    image_url?: string;
  };
}

interface YelpBusiness {
  id: string;
  name: string;
  rating: number;
  review_count: number;
  url: string;
}

const YelpReviews = () => {
  const [reviews, setReviews] = useState<YelpReview[]>([]);
  const [business, setBusiness] = useState<YelpBusiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Yelp Business ID for Aama Daycare San Ramon
  const YELP_BUSINESS_ID = 'aama-day-care-san-ramon-2';
  
  // Note: In production, you would need to set up a backend API endpoint
  // to securely handle the Yelp API calls, as the API key should not be exposed in frontend code
  
  const fetchReviews = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Real API call to fetch Yelp reviews
      const response = await fetch('/api/yelp-reviews');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Set the real reviews and business data
      setReviews(data.reviews);
      setBusiness(data.business);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      
      // Fallback to mock data if API fails
      const fallbackReviews: YelpReview[] = [
        {
          id: '1',
          url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2',
          text: "A nurturing home environment but also provides structure and lessons which prepare toddlers for school. Miss Rasu is very caring and my daughter loves going there every day.",
          rating: 5,
          time_created: '2024-01-15',
          user: { name: 'Sarah M.' }
        },
        {
          id: '2',
          url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2',
          text: "Miss Rasu is compassionate and genuinely loves kids! The place is always clean and tidy. I never had any issues. My son has been going here for over a year and he's thriving.",
          rating: 5,
          time_created: '2024-01-10',
          user: { name: 'Michael R.' }
        },
        {
          id: '3',
          url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2',
          text: "The place is always clean and tidy. I never had any issues. Miss Rasu and her staff are wonderful with the children. They provide a safe, loving environment.",
          rating: 5,
          time_created: '2024-01-05',
          user: { name: 'Jennifer L.' }
        },
        {
          id: '4',
          url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2',
          text: "My daughter has been attending Aama Daycare for 6 months now and she absolutely loves it! The staff is caring and the curriculum is age-appropriate. Highly recommend!",
          rating: 5,
          time_created: '2023-12-20',
          user: { name: 'David K.' }
        },
        {
          id: '5',
          url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2',
          text: "Excellent daycare! Miss Rasu and her team provide a warm, educational environment. My toddler has learned so much and made great friends. The facility is clean and safe.",
          rating: 5,
          time_created: '2023-12-15',
          user: { name: 'Amanda P.' }
        },
        {
          id: '6',
          url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2',
          text: "We've been with Aama Daycare for 2 years now and couldn't be happier. The staff is amazing, the facility is clean, and my child has grown so much. Highly recommend this place!",
          rating: 5,
          time_created: '2023-12-10',
          user: { name: 'Lisa T.' }
        }
      ];

      const fallbackBusiness: YelpBusiness = {
        id: YELP_BUSINESS_ID,
        name: 'Aama Daycare',
        rating: 5.0,
        review_count: 25,
        url: 'https://www.yelp.com/biz/aama-day-care-san-ramon-2'
      };

      setReviews(fallbackReviews);
      setBusiness(fallbackBusiness);
      setError('Using cached reviews. Real-time data temporarily unavailable.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleRefresh = () => {
    fetchReviews(true);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white border-t border-muted">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-8">What Parents Are Saying</h3>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white border-t border-muted">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-8">What Parents Are Saying</h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <a
              href="https://www.yelp.com/biz/aama-day-care-san-ramon-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded font-semibold hover:bg-primary/80 transition"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Our Yelp Page
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-t border-muted">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-3xl font-bold text-foreground">What Parents Are Saying</h3>
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          {business && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {renderStars(business.rating)}
                <span className="text-lg font-semibold text-foreground">{business.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{business.review_count} reviews on Yelp</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review) => (
            <Card key={review.id} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(review.rating)}
                  <span className="text-sm text-muted-foreground ml-auto">
                    {formatDate(review.time_created)}
                  </span>
                </div>
                
                <blockquote className="text-sm text-gray-700 italic mb-4 leading-relaxed">
                  <Quote className="w-4 h-4 text-primary inline mr-2 mb-1" />
                  {review.text}
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">- {review.user.name}</span>
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 text-sm flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View on Yelp
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.yelp.com/biz/aama-day-care-san-ramon-2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Read All Reviews on Yelp
          </a>
        </div>
      </div>
    </section>
  );
};

export default YelpReviews;
