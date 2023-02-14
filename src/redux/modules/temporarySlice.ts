import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  filteredKey: "",
  filteredCourse: {},
  descList: [],
};

const temporarySlice = createSlice({
  name: "temporarySlice",
  initialState,
  reducers: {
    addCourse: (state: any, action) => {
      state.courseList = [...state.courseList, action.payload];
      console.log("코스", state.courseList);
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
    filterKey: (state: any, action) => {
      state.filteredKey = action.payload;
    },
    addDesc: (state: any, action) => {
      state.descList = [...state.descList, action.payload];
      console.log("액션 페이로드", action.payload);
      console.log("리듀서 리스트", state.descList);
    },
  },
});

export const {
  addCourse,
  updateCourse,
  deleteCourse,
  filterCourse,
  filterKey,
  addDesc,
} = temporarySlice.actions;
export default temporarySlice.reducer;
