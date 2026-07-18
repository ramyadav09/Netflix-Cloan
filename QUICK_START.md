# Quick Start Guide - OMDb API Setup

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Free OMDb API Key

1. Visit **https://www.omdbapi.com/apikey.aspx**
2. Select **FREE! (1,000 daily limit)**
3. Enter your email address
4. Click **Submit**
5. Check your email and click the activation link
6. Copy your API key from the email

### Step 2: Configure Your Environment

1. Open the `.env` file in the project root
2. Replace `your_omdb_api_key_here` with your actual API key:

```env
VITE_OMDB_API_KEY=your_actual_api_key_here
```

Example:
```env
VITE_OMDB_API_KEY=a1b2c3d4
```

### Step 3: Run the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

## ✅ Verify It's Working

1. **Home Page**: You should see movie posters loading
2. **Search**: Try searching for "Batman" or "Inception"
3. **Movie Details**: Click any movie to see full details
4. **Ratings**: Check that IMDb ratings are displayed

## 🎬 Features Available

- ✅ Browse movies (Now Playing, Popular, Top Rated, Upcoming)
- ✅ Search movies by title
- ✅ View detailed movie information
- ✅ See IMDb ratings, cast, directors, genres
- ✅ Watch trailers (opens YouTube)
- ✅ Stream movies (external service)
- ✅ Add movies to your list
- ✅ Multi-language support

## 🔧 Troubleshooting

### "Invalid API key" Error
- Double-check your API key in `.env`
- Make sure you activated it via email
- Restart the dev server after changing `.env`

### Movies Not Loading
- Check browser console for errors
- Verify your internet connection
- Ensure you haven't exceeded 1,000 daily requests

### Posters Not Showing
- Some movies may not have posters in OMDb
- A placeholder image will show instead
- This is normal behavior

## 📊 API Limits

**Free Tier:**
- 1,000 requests per day
- Resets at midnight UTC
- No credit card required

**If You Need More:**
- $1/month: 1,000 requests/day
- $5/month: 10,000 requests/day  
- $10/month: 100,000 requests/day

## 🆘 Need Help?

Check these files for more information:
- `OMDB_MIGRATION_GUIDE.md` - Complete migration details
- `MIGRATION_SUMMARY.md` - Summary of all changes
- `README.md` - Original project documentation

## 🎉 You're All Set!

Enjoy browsing movies with your new OMDb-powered application!
