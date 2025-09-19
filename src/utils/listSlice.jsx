import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",

  initialState: {
    list: [],
  },
  reducers: {
    addToList: (state, action) => {
      state.list.push(action.payload);
    },
    removeFromList: (state, action) => {
      // state.list.pop(action.payload);
      state.list = state.list.filter((m) => m.id !== action.payload);
    },
    clearList: (state) => {
      state.list.length = 0;
    },
  },
});

export const { addToList, removeFromList, clearList } = listSlice.actions;

export default listSlice.reducer;
