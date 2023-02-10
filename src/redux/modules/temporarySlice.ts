import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
};

const temporarySlice = createSlice({
  name: "temporarySlice",
  initialState,
  reducers: {
    addCourse: (state: any, action) => {
      state.courseList = [...state.courseList, action.payload];
      console.log(state.courseList);
      console.log(action.payload);
    },
    updateCourse: (state: any, action) => {
      state.courseList = action.payload;
    },
    deleteCourse: (state: any, action) => {
      state.courseList = state.courseList.filter((item: any) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } = temporarySlice.actions;
export default temporarySlice.reducer;
