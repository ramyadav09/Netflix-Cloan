import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ title, movie }) => {
  const scrollRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="pl-6">
      <h1 className="text-3xl py-3 text-white drop-shadow-lg">{title}</h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide"
        onWheel={handleWheel}
      >
        <div className="flex space-x-3">
          {movie?.map((movie) => (
            <Link to={"/browse/" + movie.id} key={movie.id}>
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
