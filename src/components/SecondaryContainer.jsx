import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movie = useSelector((store) => store.movie);
  console.log(movie);
  return (
    movie && (
      <div>
        <div className="relative -mt-28">
          {movie.nowPlayingMovies && <MovieList title={"Now Playing"} movie={movie.nowPlayingMovies} />}
          {movie.popularMovies && <MovieList title={"Popular"} movie={movie.popularMovies} />}
          {movie.topRatedMovies && <MovieList title={"Top Rated"} movie={movie.topRatedMovies} />}
          {movie.upcomingMovies && <MovieList title={"Upcoming"} movie={movie.upcomingMovies} />}
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
