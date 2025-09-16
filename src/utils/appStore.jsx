import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import moviesReducer from "./movieSlice";
const appStore = configureStore({
  reducer: {
    user: userSlice,
    movie: moviesReducer,
  },
});
export default appStore;
