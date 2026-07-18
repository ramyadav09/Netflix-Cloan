import { createSlice } from "@reduxjs/toolkit";

const imdbSlice = createSlice({
  name: "imdb",
  initialState: {
    movieDetails: null,
  },
  reducers: {
    addImdbMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    clearImdbMovieDetails: (state) => {
      state.movieDetails = null;
    },
  },
});

export const { addImdbMovieDetails, clearImdbMovieDetails } = imdbSlice.actions;

export default imdbSlice.reducer;
