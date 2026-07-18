// Helper functions to transform OMDb data to match TMDB-like structure

/**
 * Transform OMDb movie data to TMDB-like format
 * @param {Object} omdbMovie - Movie data from OMDb API
 * @returns {Object} - Transformed movie data
 */
export const transformOMDbToTMDB = (omdbMovie) => {
  if (!omdbMovie || omdbMovie.Response === "False") {
    return null;
  }

  return {
    id: omdbMovie.imdbID,
    imdbID: omdbMovie.imdbID,
    title: omdbMovie.Title,
    poster_path: omdbMovie.Poster !== "N/A" ? omdbMovie.Poster : null,
    backdrop_path: omdbMovie.Poster !== "N/A" ? omdbMovie.Poster : null,
    overview: omdbMovie.Plot !== "N/A" ? omdbMovie.Plot : "No overview available.",
    release_date: omdbMovie.Released !== "N/A" ? omdbMovie.Released : omdbMovie.Year,
    vote_average: omdbMovie.imdbRating !== "N/A" ? parseFloat(omdbMovie.imdbRating) : 0,
    vote_count: omdbMovie.imdbVotes !== "N/A" ? parseInt(omdbMovie.imdbVotes.replace(/,/g, "")) : 0,
    original_title: omdbMovie.Title,
    original_language: omdbMovie.Language !== "N/A" ? omdbMovie.Language.split(",")[0].trim().toLowerCase() : "en",
    genre_ids: omdbMovie.Genre !== "N/A" ? omdbMovie.Genre.split(", ") : [],
    adult: omdbMovie.Rated === "R" || omdbMovie.Rated === "NC-17",
    popularity: omdbMovie.imdbVotes !== "N/A" ? parseInt(omdbMovie.imdbVotes.replace(/,/g, "")) / 1000 : 0,
    // Additional OMDb specific fields
    rated: omdbMovie.Rated,
    runtime: omdbMovie.Runtime,
    genre: omdbMovie.Genre,
    director: omdbMovie.Director,
    writer: omdbMovie.Writer,
    actors: omdbMovie.Actors,
    awards: omdbMovie.Awards,
    metascore: omdbMovie.Metascore,
    imdbRating: omdbMovie.imdbRating,
    imdbVotes: omdbMovie.imdbVotes,
    type: omdbMovie.Type,
    dvd: omdbMovie.DVD,
    boxOffice: omdbMovie.BoxOffice,
    production: omdbMovie.Production,
    website: omdbMovie.Website,
  };
};

/**
 * Transform OMDb search result to TMDB-like format
 * @param {Object} searchResult - Search result from OMDb API
 * @returns {Object} - Transformed search result
 */
export const transformOMDbSearchResult = (searchResult) => {
  if (!searchResult) return null;

  return {
    id: searchResult.imdbID,
    imdbID: searchResult.imdbID,
    title: searchResult.Title,
    poster_path: searchResult.Poster !== "N/A" ? searchResult.Poster : null,
    backdrop_path: searchResult.Poster !== "N/A" ? searchResult.Poster : null,
    release_date: searchResult.Year,
    original_title: searchResult.Title,
    type: searchResult.Type,
    overview: "", // Search results don't include plot
    vote_average: 0, // Search results don't include rating
  };
};

/**
 * Get YouTube search query for movie trailer
 * @param {string} title - Movie title
 * @param {string} year - Release year
 * @returns {string} - YouTube search URL
 */
export const getYouTubeTrailerURL = (title, year) => {
  const query = encodeURIComponent(`${title} ${year} official trailer`);
  return `https://www.youtube.com/results?search_query=${query}`;
};

/**
 * Extract year from various date formats
 * @param {string} dateString - Date string (could be year, full date, etc.)
 * @returns {string} - Year
 */
export const extractYear = (dateString) => {
  if (!dateString) return "";
  const yearMatch = dateString.match(/\d{4}/);
  return yearMatch ? yearMatch[0] : "";
};
