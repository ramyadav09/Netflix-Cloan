import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { buildOMDbURL, POPULAR_MOVIE_TITLES } from "../utils/constants";
import { addPopularMovies, addMovieDetails } from "../utils/movieSlice";
import { transformOMDbToTMDB } from "../utils/omdbHelpers";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movie.popularMovies);

  const getPopularMovies = async () => {
    try {
      // Fetch popular movies and series
      const moviePromises = POPULAR_MOVIE_TITLES.slice(0, 30).map(async (title) => {
        const url = buildOMDbURL({ t: title, plot: "short" });
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
          const transformedMovie = transformOMDbToTMDB(data);
          dispatch(addMovieDetails(data));
          return transformedMovie;
        }
        return null;
      });

      const movies = await Promise.all(moviePromises);
      const validMovies = movies.filter((movie) => movie !== null);
      console.log(`Popular: Loaded ${validMovies.length} items`);
      dispatch(addPopularMovies(validMovies));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, []);
};

export default usePopularMovies;
