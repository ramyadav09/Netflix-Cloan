import { useDispatch } from "react-redux";
import { addMovieReview } from "../utils/movieReviewSlice";
import { useEffect } from "react";
import { API_OPTION } from "../utils/constants";

const useMovieReview = (resId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!resId) return;
    const fetchReview = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${resId}/reviews?language=en-US&page=1`,
          API_OPTION
        );
        const json = await data.json();
        dispatch(addMovieReview(json));
      } catch (error) {
        console.error("Failed to fetch movie reviews:", error);
      }
    };

    fetchReview();
  }, [resId, dispatch]);
};

export default useMovieReview;
