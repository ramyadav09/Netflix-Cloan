import { useDispatch } from "react-redux";
import { addMovieReview } from "../utils/movieReviewSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constants";
const useMovieReview = (resId) => {
  const dispatch = useDispatch();
  const fetchReview = async (resId) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        resId +
        "/reviews?language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addMovieReview(json));
  };
  useEffect(() => {
    fetchReview(resId);
  }, []);
  // console.log(json?.results[0]);
};

export default useMovieReview;
