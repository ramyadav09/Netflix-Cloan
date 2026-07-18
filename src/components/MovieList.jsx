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
    <div className="pl-4 xs:pl-5 sm:pl-6 z-10">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl py-2 xs:py-3 bg-transparent text-white drop-shadow-lg">
        {title}
      </h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide"
        onWheel={handleWheel}
      >
        <div className="flex space-x-3 xs:space-x-4">
          {movie?.map((movie) => (
            <Link to={"/browse/" + movie.id} key={movie.id}>
              <MovieCard
                key={movie.id}
                movieId={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                type={movie.type}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
