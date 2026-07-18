import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMoviesVideo = async () => {
    try {
      // Since OMDb doesn't provide video data, we'll use YouTube search
      // or you can integrate with YouTube Data API
      // For now, we'll create a placeholder that opens YouTube search
      const trailer = {
        key: movieId, // Use movieId as placeholder
        type: "Trailer",
        site: "YouTube",
        // This will be used to construct YouTube search URL in the component
      };
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMoviesVideo();
    }
  }, [movieId]);
};

export default useMovieTrailer;
