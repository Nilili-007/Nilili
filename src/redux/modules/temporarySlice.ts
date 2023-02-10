import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  filteredCourse: "",
};

const temporarySlice = createSlice({
  name: "temporarySlice",
  initialState,
  reducers: {
    addCourse: (state: any, action) => {
      state.courseList = [...state.courseList, action.payload];
    },
    updateCourse: (state: any, action) => {
      state.courseList = action.payload;
    },
    filterCourse: (state: any, action) => {
      state.filteredCourse = action.payload;
    },
    deleteCourse: (state: any, action) => {
      state.courseList = state.courseList.filter((item: any) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { addCourse, updateCourse, deleteCourse, filterCourse } =
  temporarySlice.actions;
export default temporarySlice.reducer;
