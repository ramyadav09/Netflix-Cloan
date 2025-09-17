import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";
import reviewReducer from "./movieReviewSlice";

const appStore = configureStore({
  reducer: {
    user: userSlice,
    movie: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
    review: reviewReducer,
  },
});
export default appStore;
