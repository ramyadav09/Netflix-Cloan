import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import reviewReducer from "./movieReviewSlice";
import listReducer from "./listSlice";
import imdbReducer from "./imdbSlice";

const appStore = configureStore({
  reducer: {
    movie: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    review: reviewReducer,
    list: listReducer,
    imdb: imdbReducer,
  },
});
export default appStore;
