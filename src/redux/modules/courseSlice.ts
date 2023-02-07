import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [],
  isLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default courseSlice.reducer;
