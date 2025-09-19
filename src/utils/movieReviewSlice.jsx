import { createSlice } from "@reduxjs/toolkit";

// https://api.themoviedb.org/3/movie/157336/reviews?language=en-US&page=1
const movieReviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewId: { results: [] },
  },
  reducers: {
    addMovieReview: (state, action) => {
      state.reviewId = action.payload;
    },
  },
});

export const { addMovieReview } = movieReviewSlice.actions;

export default movieReviewSlice.reducer;
