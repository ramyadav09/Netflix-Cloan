import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movie }) => {
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="pl-6">
      <h1 className="text-3xl py-3 text-white ">{title}</h1>
      <div 
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide"
        onWheel={handleWheel}
      >
        <div className="flex space-x-3">
          {movie?.map((movie) => (
            <MovieCard
              key={movie.id}
              title={title}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;