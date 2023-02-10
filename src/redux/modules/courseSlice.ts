import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [],
  isLoading: false,
  error: null,
  category: "",
  hashtags: [],
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    addPost: (state: any, action: any) => {
      state.category = action.payload.category;
      state.hashtags = action.payload.selectedValues;
    },
  },
  extraReducers: {},
});

export const { addPost } = courseSlice.actions;

export default courseSlice.reducer;
