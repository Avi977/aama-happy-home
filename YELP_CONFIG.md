# Yelp API Configuration Guide

## 🔑 Required Environment Variables

Create a `.env` file in your project root with these variables:

```env
# Your Yelp Fusion API key (get from https://www.yelp.com/developers)
YELP_API_KEY=your_actual_yelp_api_key_here

# Yelp Business ID for Aama Daycare San Ramon
YELP_BUSINESS_ID=aama-day-care-san-ramon-2

# API endpoint (for custom backend setup)
YELP_API_ENDPOINT=/api/yelp-reviews
```

## 🚀 Getting Your Yelp API Key

1. **Visit** [Yelp Developers](https://www.yelp.com/developers)
2. **Sign in** with your Yelp account
3. **Create a new app** for Aama Daycare
4. **Copy your API key** from the app dashboard
5. **Replace** `your_actual_yelp_api_key_here` with your real key

## ⚠️ Important Security Notes

- **Never commit** your `.env` file to git
- **Keep your API key** private and secure
- **Use environment variables** in production
- **Rotate keys** if they get exposed

## 🔧 Backend Setup

### For Vercel/Netlify:
1. **Set environment variables** in your hosting dashboard
2. **Deploy** the `api/yelp-reviews.js` file
3. **Test** the endpoint

### For Custom Backend:
1. **Install dependencies**: `npm install express cors dotenv`
2. **Set environment variables** in `.env`
3. **Run server**: `node server.js`
