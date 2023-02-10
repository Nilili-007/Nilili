import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [],
  isLoading: false,
  error: null,
  courseTitle: "",
  category: "",
  hashtags: [],
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    addPost: (state: any, action: any) => {
      state.courseTitle = action.payload.courseTitle;
      state.category = action.payload.category;
      state.hashtags = action.payload.selectedValues;
    },
  },
  extraReducers: {},
});

export const { addPost } = courseSlice.actions;

export default courseSlice.reducer;
