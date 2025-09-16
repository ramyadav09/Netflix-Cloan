import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTION } from "../utils/constants";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMoviesVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTION
    );
    const json = await data.json();
    const filteredDATA = json.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredDATA.length ? filteredDATA[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
    // console.log(trailer.key);
    // setTrailerKey(trailer.key);--->redux is used
  };

  useEffect(() => {
    getMoviesVideo();
  }, []);
};

export default useMovieTrailer;
