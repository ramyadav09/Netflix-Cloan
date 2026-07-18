import { useDispatch, useSelector } from "react-redux";
import { buildOMDbURL, TOP_RATED_TITLES } from "../utils/constants";
import { addTopRatedMovies, addMovieDetails } from "../utils/movieSlice";
import { useEffect } from "react";
import { transformOMDbToTMDB } from "../utils/omdbHelpers";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);

  const getTopRatedMovies = async () => {
    try {
      // Fetch classic top-rated movies and series
      const moviePromises = TOP_RATED_TITLES.slice(0, 24).map(async (title) => {
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
      console.log(`Top Rated: Loaded ${validMovies.length} items`);
      dispatch(addTopRatedMovies(validMovies));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };

  useEffect(() => {
    if (!topRatedMovies) {
      getTopRatedMovies();
    }
  }, []);
};

export default useTopRatedMovies;