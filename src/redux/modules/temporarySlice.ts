import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  filteredKey: "",
  filteredCourse: {},
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

    editMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload.id
      );
      state.courseList[i].memo = action.payload.memo;
    },
    deleteMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      const i = state.courseList.findIndex(
        (item: any) => item.id === action.payload
      );
      state.courseList[i].memo = "";
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
