# OMDb API Migration Guide

## Overview
This application has been migrated from TMDB (The Movie Database) API to OMDb (Open Movie Database) API. OMDb provides IMDB data and is a free alternative to TMDB.

## What Changed

### 1. API Configuration

**Before (TMDB):**
```javascript
export const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer YOUR_TMDB_KEY",
  },
};
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
```

**After (OMDb):**
```javascript
export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
export const OMDB_BASE_URL = "https://www.omdbapi.com/";
export const buildOMDbURL = (params) => {
  const urlParams = new URLSearchParams({
    apikey: OMDB_API_KEY,
    ...params,
  });
  return `${OMDB_BASE_URL}?${urlParams.toString()}`;
};
```

### 2. Environment Variables

Add to your `.env` file:
```
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

**Get your free OMDb API key:**
1. Visit https://www.omdbapi.com/apikey.aspx
2. Select the FREE tier (1,000 daily requests)
3. Enter your email
4. Verify your email
5. Copy your API key to `.env`

### 3. Data Structure Changes

#### Movie Object Structure

**TMDB Format:**
```javascript
{
  id: 12345,
  title: "Movie Title",
  poster_path: "/path.jpg",
  overview: "Plot description",
  release_date: "2024-01-01",
  vote_average: 8.5,
  vote_count: 1000
}
```

**OMDb Format (Transformed):**
```javascript
{
  id: "tt1234567",           // IMDb ID
  imdbID: "tt1234567",
  title: "Movie Title",
  poster_path: "https://...", // Full URL
  overview: "Plot description",
  release_date: "01 Jan 2024",
  vote_average: 8.5,
  vote_count: 1000,
  // Additional OMDb fields
  rated: "PG-13",
  runtime: "120 min",
  genre: "Action, Drama",
  director: "Director Name",
  actors: "Actor 1, Actor 2",
  awards: "Won 2 Oscars",
  metascore: "85",
  imdbRating: "8.5",
  imdbVotes: "1,000,000"
}
```

### 4. API Endpoints Comparison

| Feature | TMDB Endpoint | OMDb Equivalent |
|---------|---------------|-----------------|
| Now Playing | `/movie/now_playing` | Fetch predefined popular titles |
| Popular Movies | `/movie/popular` | Fetch predefined popular titles |
| Top Rated | `/movie/top_rated` | Fetch classic movie titles |
| Upcoming | `/movie/upcoming` | Fetch recent movie titles |
| Search | `/search/movie?query=` | `?s=query&type=movie` |
| Movie Details | `/movie/{id}` | `?i={imdbID}&plot=full` |
| Movie Videos | `/movie/{id}/videos` | Not available (use YouTube search) |
| Movie Reviews | `/movie/{id}/reviews` | Not available (use plot as review) |

### 5. Key Differences

#### Limitations of OMDb vs TMDB:

1. **No Category Endpoints**: OMDb doesn't have "now playing", "popular", or "upcoming" endpoints. We use predefined movie title lists instead.

2. **No Video/Trailer Data**: OMDb doesn't provide YouTube trailer keys. The app now opens YouTube search for trailers.

3. **No User Reviews**: OMDb doesn't provide user reviews. The app uses the movie plot as a "review summary".

4. **Search by Title Only**: OMDb search requires exact or partial title matches. It doesn't support advanced filters like TMDB.

5. **Poster URLs**: OMDb returns full poster URLs, not paths that need a CDN prefix.

6. **ID Format**: OMDb uses IMDb IDs (e.g., "tt1234567") instead of numeric IDs.

### 6. Updated Files

#### New Files:
- `src/utils/omdbHelpers.jsx` - Helper functions for data transformation

#### Modified Files:
- `src/utils/constants.jsx` - OMDb configuration
- `src/utils/movieSlice.jsx` - Added movieDetails storage
- `src/hooks/useNowPlayingMovies.jsx` - Fetch from OMDb
- `src/hooks/usePopularMovies.jsx` - Fetch from OMDb
- `src/hooks/useTopRatedMovies.jsx` - Fetch from OMDb
- `src/hooks/useUpcomingMovies.jsx` - Fetch from OMDb
- `src/hooks/useMovieTrailer.jsx` - YouTube search instead of TMDB videos
- `src/hooks/useMovieReview.jsx` - Fetch plot as review
- `src/hooks/useImdbMovieDetails.jsx` - Direct OMDb fetch
- `src/components/GptSearchBar.jsx` - OMDb search
- `src/components/MovieCard.jsx` - Handle full poster URLs
- `src/components/MovieReviewDetails.jsx` - OMDb data display

### 7. Features That Still Work

✅ Browse movies by category (Now Playing, Popular, Top Rated, Upcoming)
✅ Search movies by title
✅ View movie details (title, poster, plot, rating, year)
✅ View extended movie information (director, cast, genres, runtime, awards)
✅ Watch trailers (opens YouTube search)
✅ Watch movies (using IMDb ID)
✅ Add movies to list
✅ Multi-language support

### 8. Usage Examples

#### Fetch Movie by Title:
```javascript
const url = buildOMDbURL({ t: "Inception", plot: "full" });
const response = await fetch(url);
const data = await response.json();
```

#### Search Movies:
```javascript
const url = buildOMDbURL({ s: "Batman", type: "movie" });
const response = await fetch(url);
const data = await response.json();
// data.Search contains array of results
```

#### Fetch Movie by IMDb ID:
```javascript
const url = buildOMDbURL({ i: "tt1375666", plot: "full" });
const response = await fetch(url);
const data = await response.json();
```

### 9. Rate Limits

**Free Tier:**
- 1,000 requests per day
- No commercial use

**Paid Tiers:**
- $1/month: 1,000 requests/day
- $5/month: 10,000 requests/day
- $10/month: 100,000 requests/day

### 10. Testing the Migration

1. **Get OMDb API Key**: Sign up at https://www.omdbapi.com/apikey.aspx
2. **Update .env**: Add `VITE_OMDB_API_KEY=your_key_here`
3. **Install Dependencies**: `npm install`
4. **Run the App**: `npm run dev`
5. **Test Features**:
   - Browse movies on home page
   - Search for a movie
   - Click on a movie to view details
   - Try watching a trailer (opens YouTube)
   - Check movie details section

### 11. Troubleshooting

**Issue: "Invalid API key"**
- Solution: Verify your API key in `.env` file
- Make sure you verified your email after signing up

**Issue: "Movie not found"**
- Solution: OMDb requires exact or close title matches
- Try searching with different keywords

**Issue: "Request limit exceeded"**
- Solution: You've hit the 1,000 daily request limit
- Wait 24 hours or upgrade to a paid plan

**Issue: "Posters not loading"**
- Solution: Some movies don't have posters in OMDb
- The app shows a placeholder image

### 12. Future Improvements

Potential enhancements:
1. Implement caching to reduce API calls
2. Add YouTube Data API for actual trailer videos
3. Integrate additional review sources (Rotten Tomatoes API)
4. Add pagination for search results
5. Implement advanced search filters
6. Add TV series support (OMDb supports it)

### 13. Reverting to TMDB

If you need to revert to TMDB:
1. Restore the original files from git history
2. Update `.env` with TMDB API key
3. The old TMDB key is still in `.env` for reference

## Conclusion

The migration to OMDb provides a free, reliable alternative to TMDB while maintaining most of the application's functionality. The main trade-offs are the lack of category endpoints and video data, which have been addressed with workarounds.
