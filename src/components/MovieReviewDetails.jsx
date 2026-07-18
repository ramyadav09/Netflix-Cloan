import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MovieReviewDetails = ({ resId, handleTrailer }) => {
  useMovieTrailer(resId);

  const [isTrailer, setIsTrailer] = useState(false);

  const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store.movie);
  const searchResults = useSelector((store) => store.gpt.searchResults);
  const reviewResults = useSelector((store) => store.review.reviewId);
  const imdbDetails = useSelector((store) => store.imdb.movieDetails);

  // merge all movie arrays
  const allMovies = [
    ...(nowPlayingMovies || []),
    ...(popularMovies || []),
    ...(topRatedMovies || []),
    ...(upcomingMovies || []),
    ...(searchResults || []),
  ];

  // find movie by id (now using imdbID)
  const selectedMovie = allMovies.find((m) => String(m.id) === String(resId) || String(m.imdbID) === String(resId));

  const handleWatchTrailer = () => {
    // Open YouTube search for trailer
    if (selectedMovie) {
      const searchQuery = encodeURIComponent(`${selectedMovie.title} official trailer`);
      window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
    }
  };

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">No movie found with id: {resId}</p>
      </div>
    );
  }

  const { vote_average, poster_path, release_date, title, overview } =
    selectedMovie;
  
  // Handle poster URL (could be OMDb full URL or TMDB path)
  const posterUrl = poster_path?.startsWith('http') 
    ? poster_path 
    : `https://image.tmdb.org/t/p/w500${poster_path}`;

  const handleWatchMovie = () => {
    // Get IMDB ID
    const imdbId = selectedMovie.imdbID || selectedMovie.id;
    if (imdbId) {
      const streamUrl = `https://streamimdb.ru/embed/movie/${imdbId}`;
      window.open(streamUrl, '_blank');
    } else {
      alert('IMDB ID not available. Please wait for movie details to load.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Back Button */}
      <Link to={"/browse"}>
        <button className="fixed top-4 xs:top-6 right-4 xs:right-6 z-50 bg-black/80 hover:bg-black text-white font-semibold px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base rounded-lg backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300">
          ← Back
        </button>
      </Link>

      {/* Hero Section with Poster */}
      <div className="relative w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Movie Poster */}
            <div className="flex-shrink-0 mx-auto lg:mx-0">
              <img
                className="w-48 xs:w-56 sm:w-64 md:w-80 lg:w-96 h-auto rounded-2xl shadow-2xl border-4 border-white/10"
                src={posterUrl}
                alt={title}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                }}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                {title}
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6 text-gray-300">
                <span className="text-xl">
                  {release_date ? (typeof release_date === 'string' && release_date.includes('-') 
                    ? release_date.slice(0, 4) 
                    : release_date) : 'N/A'}
                </span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                <span className="text-xl">⭐ {vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">Overview</h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {overview || "No overview available."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWatchTrailer}
                  className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={handleWatchMovie}
                  className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  <span>Watch Movie</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IMDB Details Section */}
      {imdbDetails && imdbDetails.imdbID === resId && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Title */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Movie <span className="text-yellow-400">Details</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* IMDB Rating */}
            {imdbDetails.rating && imdbDetails.rating.aggregateRating && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-yellow-400 text-sm font-semibold mb-2">
                  ⭐ IMDB Rating
                </div>
                <div className="text-white text-3xl font-bold mb-1">
                  {imdbDetails.rating.aggregateRating}
                  <span className="text-gray-400 text-lg">/10</span>
                </div>
                <div className="text-gray-400 text-xs">
                  {(imdbDetails.rating.voteCount / 1000).toFixed(1)}K votes
                </div>
              </div>
            )}

            {/* Metacritic */}
            {imdbDetails.metacritic && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-green-400 text-sm font-semibold mb-2">
                  📊 Metacritic
                </div>
                <div className="text-white text-3xl font-bold mb-1">
                  {imdbDetails.metacritic.score}
                  <span className="text-gray-400 text-lg">/100</span>
                </div>
              </div>
            )}

            {/* Runtime */}
            {imdbDetails.runtimeSeconds && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-blue-400 text-sm font-semibold mb-2">
                  ⏱️ Runtime
                </div>
                <div className="text-white text-3xl font-bold mb-1">
                  {Math.floor(imdbDetails.runtimeSeconds / 60)}
                  <span className="text-gray-400 text-lg">min</span>
                </div>
              </div>
            )}

            {/* Rated */}
            {imdbDetails.rated && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-purple-400 text-sm font-semibold mb-2">
                  🎬 Rated
                </div>
                <div className="text-white text-2xl font-bold mb-1">
                  {imdbDetails.rated}
                </div>
              </div>
            )}
          </div>

          {/* Genres */}
          {imdbDetails.genres && imdbDetails.genres.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">🎭 Genres</h3>
              <div className="flex flex-wrap gap-2">
                {imdbDetails.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-lg text-sm font-medium border border-purple-400/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Plot */}
          {imdbDetails.plot && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">
                📖 Plot Summary
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {imdbDetails.plot}
              </p>
            </div>
          )}

          {/* Directors */}
          {imdbDetails.directors && imdbDetails.directors.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-red-400 mb-4">
                🎥 Director{imdbDetails.directors.length > 1 ? "s" : ""}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {imdbDetails.directors.map((director) => (
                  <div
                    key={director.id}
                    className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {director.displayName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cast */}
          {imdbDetails.stars && imdbDetails.stars.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
              <h3 className="text-xl font-bold text-pink-400 mb-4">✨ Cast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {imdbDetails.stars.map((star) => (
                  <div
                    key={star.id}
                    className="flex items-center gap-3 bg-white/5 rounded-lg p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {star.displayName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Languages */}
            {imdbDetails.spokenLanguages &&
              imdbDetails.spokenLanguages.length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">
                    🌍 Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {imdbDetails.spokenLanguages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-orange-500/20 text-orange-200 px-3 py-1 rounded-lg text-xs font-medium"
                      >
                        {lang.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Origin Countries */}
            {imdbDetails.originCountries &&
              imdbDetails.originCountries.length > 0 && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-indigo-400 mb-3">
                    🗺️ Country of Origin
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {imdbDetails.originCountries.map((country, index) => (
                      <span
                        key={index}
                        className="bg-indigo-500/20 text-indigo-200 px-3 py-1 rounded-lg text-xs font-medium"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Awards */}
          {imdbDetails.awards && imdbDetails.awards !== "N/A" && (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mt-4">
              <h3 className="text-lg font-bold text-yellow-400 mb-3">
                🏆 Awards
              </h3>
              <p className="text-gray-300 text-sm">{imdbDetails.awards}</p>
            </div>
          )}
        </div>
      )}

      {/* Review Section */}
      {reviewResults?.results?.[0]?.author && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-2">
              Review by {reviewResults.results[0].author}
            </h3>
            <p className="text-gray-300 text-sm mt-3">
              {reviewResults.results[0].content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieReviewDetails;
