import React from "react";

const MovieCard = ({ title, poster_path, type }) => {
  // Always show the card, even without a poster
  const posterUrl = poster_path?.startsWith('http') 
    ? poster_path 
    : poster_path 
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : `https://placehold.co/500x750/1a1a1a/white?text=${encodeURIComponent(title || 'No Poster')}`;
  
  return (
    <div className="w-52 xs:w-36 sm:w-40 md:w-44 lg:w-48 flex-shrink-0 relative">
      {/* Type Badge */}
      {type && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`px-2 py-1 text-xs font-bold rounded ${
            type === 'series' 
              ? 'bg-blue-600 text-white' 
              : type === 'movie'
              ? 'bg-red-600 text-white'
              : 'bg-gray-600 text-white'
          }`}>
            {type === 'series' ? 'TV' : type === 'movie' ? 'MOVIE' : type.toUpperCase()}
          </span>
        </div>
      )}
      
      <img
        src={posterUrl}
        alt={title || 'Movie poster'}
        className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.target.src = `https://placehold.co/500x750/1a1a1a/white?text=${encodeURIComponent(title || 'No Poster')}`;
        }}
      />
      {title && (
        <div className="mt-2 text-white text-sm text-center truncate px-2">
          {title}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
