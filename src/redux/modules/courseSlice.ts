import { createSlice, current } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  courseList: [],
  filteredIdx: "",
};

const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    addCourse: (state: any, action) => {
      state.courseList = [...state.courseList, action.payload];
    },
    filterCourse: (state: any, action) => {
      state.courseList = [...state.courseList];
      state.filteredIdx = action.payload;
    },
    deleteCourse: (state: any, action) => {
      state.courseList = [...current(state).courseList];
      state.courseList.splice(action.payload, 1);
      if (state.filteredIdx > state.courseList.length - 2) {
        state.filteredIdx = state.courseList.length - 1;
      }
    },
    upCourse: (state: any, action) => {
      state.courseList = [...current(state).courseList];
      const i = action.payload;
      if (i > 0) {
        let temp = state.courseList[i];
        state.courseList[i] = state.courseList[i - 1];
        state.courseList[i - 1] = temp;
      } else {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">첫 번째 코스입니다.</p>`,
        });
      }
    },
    downCourse: (state: any, action) => {
      state.courseList = [...current(state).courseList];
      const i = action.payload;
      if (i + 1 < state.courseList.length) {
        let temp = state.courseList[i];
        state.courseList[i] = state.courseList[i + 1];
        state.courseList[i + 1] = temp;
      } else {
        Swal.fire({
          icon: "error",
          title: `<p style="font-size: 20px;">마지막 코스입니다.</p>`,
        });
      }
    },
    editMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      state.courseList[action.payload.idx].memo = action.payload.memo;
    },
    replaceAllData: (state: any, action) => {
      state.courseList = action.payload;
      state.filteredIdx = "";
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  filterCourse,
  upCourse,
  downCourse,
  editMemo,
  replaceAllData,
} = courseSlice.actions;
export default courseSlice.reducer;
