import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    searchResults: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { toggleGptSearch, addSearchResults } = gptSlice.actions;
export default gptSlice.reducer;
