# TMDB vs OMDb API Comparison

## Quick Reference Guide

### API Basics

| Feature | TMDB | OMDb |
|---------|------|------|
| **Cost** | Free (with limits) | Free (1,000/day) |
| **Authentication** | Bearer Token | API Key |
| **Base URL** | api.themoviedb.org/3 | www.omdbapi.com |
| **Data Source** | TMDB Database | IMDb Database |
| **Response Format** | JSON | JSON/XML |

### Endpoint Comparison

| Feature | TMDB Endpoint | OMDb Equivalent | Status |
|---------|---------------|-----------------|--------|
| **Now Playing** | `GET /movie/now_playing` | ❌ Not available | ⚠️ Use predefined list |
| **Popular Movies** | `GET /movie/popular` | ❌ Not available | ⚠️ Use predefined list |
| **Top Rated** | `GET /movie/top_rated` | ❌ Not available | ⚠️ Use predefined list |
| **Upcoming** | `GET /movie/upcoming` | ❌ Not available | ⚠️ Use predefined list |
| **Search by Title** | `GET /search/movie?query=` | `GET /?s=query&type=movie` | ✅ Available |
| **Movie by ID** | `GET /movie/{id}` | `GET /?i={imdbID}` | ✅ Available |
| **Movie by Title** | `GET /search/movie?query=` | `GET /?t=title` | ✅ Available |
| **Movie Videos** | `GET /movie/{id}/videos` | ❌ Not available | ❌ Use YouTube |
| **Movie Reviews** | `GET /movie/{id}/reviews` | ❌ Not available | ❌ Use plot |
| **External IDs** | `GET /movie/{id}/external_ids` | ❌ Not available | ℹ️ Direct IMDb ID |
| **Movie Images** | `GET /movie/{id}/images` | ❌ Not available | ⚠️ Single poster only |

### Data Fields Comparison

#### Movie Object

| Field | TMDB | OMDb | Notes |
|-------|------|------|-------|
| **ID** | `id` (number) | `imdbID` (string) | Format: tt1234567 |
| **Title** | `title` | `Title` | ✅ Same |
| **Plot** | `overview` | `Plot` | ✅ Same |
| **Poster** | `poster_path` (path) | `Poster` (full URL) | Different format |
| **Release Date** | `release_date` (ISO) | `Released` (text) | Different format |
| **Rating** | `vote_average` | `imdbRating` | ✅ Similar |
| **Votes** | `vote_count` | `imdbVotes` | ✅ Similar |
| **Runtime** | `runtime` (minutes) | `Runtime` (text) | Different format |
| **Genres** | `genres` (array) | `Genre` (string) | Different format |
| **Director** | ❌ Not in main | `Director` | ✅ OMDb advantage |
| **Cast** | ❌ Not in main | `Actors` | ✅ OMDb advantage |
| **Awards** | ❌ Not available | `Awards` | ✅ OMDb advantage |
| **Metascore** | ❌ Not in main | `Metascore` | ✅ OMDb advantage |
| **Box Office** | `revenue` | `BoxOffice` | ✅ Similar |
| **Budget** | `budget` | ❌ Not available | ❌ TMDB advantage |
| **Backdrop** | `backdrop_path` | ❌ Not available | ❌ TMDB advantage |
| **Videos** | ✅ Available | ❌ Not available | ❌ TMDB advantage |

### Request Examples

#### TMDB
```javascript
// Now Playing
GET https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1
Headers: Authorization: Bearer YOUR_TOKEN

// Movie Details
GET https://api.themoviedb.org/3/movie/550
Headers: Authorization: Bearer YOUR_TOKEN

// Search
GET https://api.themoviedb.org/3/search/movie?query=Inception
Headers: Authorization: Bearer YOUR_TOKEN
```

#### OMDb
```javascript
// Search
GET https://www.omdbapi.com/?s=Inception&type=movie&apikey=YOUR_KEY

// Movie by IMDb ID
GET https://www.omdbapi.com/?i=tt1375666&plot=full&apikey=YOUR_KEY

// Movie by Title
GET https://www.omdbapi.com/?t=Inception&plot=full&apikey=YOUR_KEY
```

### Response Examples

#### TMDB Movie Object
```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "A ticking-time-bomb insomniac...",
  "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
  "release_date": "1999-10-15",
  "vote_average": 8.4,
  "vote_count": 26280,
  "runtime": 139,
  "genres": [
    {"id": 18, "name": "Drama"}
  ]
}
```

#### OMDb Movie Object
```json
{
  "Title": "Fight Club",
  "Year": "1999",
  "Rated": "R",
  "Released": "15 Oct 1999",
  "Runtime": "139 min",
  "Genre": "Drama",
  "Director": "David Fincher",
  "Writer": "Chuck Palahniuk, Jim Uhls",
  "Actors": "Brad Pitt, Edward Norton, Meat Loaf",
  "Plot": "A ticking-time-bomb insomniac...",
  "Language": "English",
  "Country": "United States, Germany",
  "Awards": "Nominated for 1 Oscar. 11 wins & 38 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/...",
  "Ratings": [
    {"Source": "Internet Movie Database", "Value": "8.8/10"},
    {"Source": "Rotten Tomatoes", "Value": "79%"},
    {"Source": "Metacritic", "Value": "66/100"}
  ],
  "Metascore": "66",
  "imdbRating": "8.8",
  "imdbVotes": "2,145,935",
  "imdbID": "tt0137523",
  "Type": "movie",
  "DVD": "06 Jun 2000",
  "BoxOffice": "$37,030,102",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}
```

### Rate Limits

#### TMDB
- **Free Tier**: 40 requests per 10 seconds
- **Daily Limit**: No hard limit
- **Commercial Use**: Allowed with attribution

#### OMDb
- **Free Tier**: 1,000 requests per day
- **Paid Tiers**:
  - $1/month: 1,000/day
  - $5/month: 10,000/day
  - $10/month: 100,000/day
- **Commercial Use**: Allowed

### Advantages & Disadvantages

#### TMDB Advantages ✅
1. Dynamic movie lists (now playing, popular, etc.)
2. Video/trailer data with YouTube keys
3. User reviews and ratings
4. Multiple image sizes
5. Backdrop images
6. No daily request limit
7. More detailed metadata
8. TV show episodes data

#### TMDB Disadvantages ❌
1. Requires account creation
2. More complex authentication
3. Larger response payloads
4. Steeper learning curve

#### OMDb Advantages ✅
1. Simple API key authentication
2. Direct IMDb data
3. Awards information
4. Director/cast in main response
5. Multiple rating sources (IMDb, RT, Metacritic)
6. Smaller response payloads
7. Easy to use
8. No account required

#### OMDb Disadvantages ❌
1. Daily request limit (1,000 free)
2. No category endpoints
3. No video/trailer data
4. No user reviews
5. Single poster image only
6. No backdrop images
7. Limited search filters

### Use Cases

#### When to Use TMDB
- Need dynamic movie lists
- Want embedded trailers
- Need user reviews
- Require multiple image sizes
- Building a movie discovery app
- Need TV show data
- High request volume

#### When to Use OMDb
- Need IMDb data specifically
- Want simple authentication
- Low to medium request volume
- Need awards information
- Want multiple rating sources
- Building a simple movie info app
- Budget constraints

### Migration Considerations

#### From TMDB to OMDb
- ✅ Easy: Movie details, search, ratings
- ⚠️ Medium: Poster handling, date formats
- ❌ Hard: Movie lists, trailers, reviews

#### From OMDb to TMDB
- ✅ Easy: Movie details, search
- ⚠️ Medium: ID format changes
- ❌ Hard: Awards data, multiple ratings

### Performance Comparison

| Metric | TMDB | OMDb |
|--------|------|------|
| **Response Time** | ~200-400ms | ~100-300ms |
| **Payload Size** | Larger | Smaller |
| **Rate Limit** | 40/10s | 1000/day |
| **Uptime** | 99.9% | 99.5% |
| **CDN** | Yes | No |

### Data Freshness

| Data Type | TMDB | OMDb |
|-----------|------|------|
| **New Releases** | Real-time | Daily |
| **Ratings** | Real-time | Daily |
| **Cast/Crew** | Real-time | Weekly |
| **Images** | Real-time | Static |

## Conclusion

**TMDB** is better for:
- Feature-rich applications
- Real-time data needs
- High request volumes
- Video content

**OMDb** is better for:
- Simple applications
- IMDb data specifically
- Budget constraints
- Quick prototypes

Both APIs are excellent choices depending on your specific needs and constraints.
