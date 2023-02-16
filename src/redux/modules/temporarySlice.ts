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
    // addDesc: (state: any, action) => {
    //   state.descList = [...state.descList, action.payload];
    //   console.log(state.descList);
    // },
    editMemo: (state: any, action) => {
      console.log(action.payload);
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      state.courseList[i].memo = action.payload.memo;
    },
    deleteMemo: (state: any, action) => {
      console.log(action.payload);
      state.courseList = state.courseList.filter((item: any) => {
        return item.id !== action.payload;
      });
      console.log(state.courseList);
    },
  },
});

export const {
  addCourse,
  updateCourse,
  deleteCourse,
  filterCourse,
  filterKey,
  editMemo,
  deleteMemo,
} = temporarySlice.actions;
export default temporarySlice.reducer;
