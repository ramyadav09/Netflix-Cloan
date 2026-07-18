import { createSlice } from "@reduxjs/toolkit";

// Movie review slice - now using OMDb API for movie details
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
