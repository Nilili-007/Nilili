import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  placelist: [],
};

const temporarySlice = createSlice({
  name: "temporarySlice",
  initialState,
  reducers: {
    addCourse: (state: any, action) => {
      state.placelist = [...state.placelist, action.payload];
    },
    dragCourse: (state: any, action) => {
      state.placelist = [];
      state.placelist = action.payload;
    },
  },
});

export const { addCourse, dragCourse } = temporarySlice.actions;
export default temporarySlice.reducer;
