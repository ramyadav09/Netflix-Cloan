import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { buildOMDbURL, NOW_PLAYING_TITLES } from "../utils/constants";
import { addNowPlayingMovies, addMovieDetails } from "../utils/movieSlice";
import { transformOMDbToTMDB } from "../utils/omdbHelpers";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    try {
      // Fetch recent popular movies and series (no type restriction to get both)
      const moviePromises = NOW_PLAYING_TITLES.slice(0, 24).map(async (title) => {
        const url = buildOMDbURL({ t: title, plot: "short" });
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
          const transformedMovie = transformOMDbToTMDB(data);
          // Store full details
          dispatch(addMovieDetails(data));
          return transformedMovie;
        }
        return null;
      });

      const movies = await Promise.all(moviePromises);
      const validMovies = movies.filter((movie) => movie !== null);
      console.log(`Now Playing: Loaded ${validMovies.length} items`);
      dispatch(addNowPlayingMovies(validMovies));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []);
};

export default useNowPlayingMovies;
