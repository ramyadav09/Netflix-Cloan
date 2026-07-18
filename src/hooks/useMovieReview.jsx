import { useDispatch } from "react-redux";
import { addMovieReview } from "../utils/movieReviewSlice";
import { useEffect } from "react";
import { buildOMDbURL } from "../utils/constants";

const useMovieReview = (resId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!resId) return;
    
    const fetchReview = async () => {
      try {
        // OMDb doesn't provide user reviews
        // We'll fetch the movie details and use the plot as a "review"
        const url = buildOMDbURL({ i: resId, plot: "full" });
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
          // Transform OMDb data to match review structure
          const reviewData = {
            results: [
              {
                author: "OMDb Summary",
                content: data.Plot !== "N/A" ? data.Plot : "No plot available.",
                created_at: data.Released,
                id: resId,
                author_details: {
                  name: "OMDb",
                  rating: data.imdbRating !== "N/A" ? parseFloat(data.imdbRating) : null,
                },
              },
            ],
          };
          dispatch(addMovieReview(reviewData));
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchReview();
  }, [resId, dispatch]);
};

export default useMovieReview;
