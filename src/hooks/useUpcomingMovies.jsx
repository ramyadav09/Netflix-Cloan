import { useDispatch, useSelector } from "react-redux";
import { buildOMDbURL, UPCOMING_TITLES } from "../utils/constants";
import { addUpcomingMovies, addMovieDetails } from "../utils/movieSlice";
import { useEffect } from "react";
import { transformOMDbToTMDB } from "../utils/omdbHelpers";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      // Fetch recent/upcoming movies and series
      const moviePromises = UPCOMING_TITLES.slice(0, 24).map(async (title) => {
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
      console.log(`Upcoming: Loaded ${validMovies.length} items`);
      dispatch(addUpcomingMovies(validMovies));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  useEffect(() => {
    if (!upcomingMovies) {
      getUpcomingMovies();
    }
  }, []);
};

export default useUpcomingMovies;