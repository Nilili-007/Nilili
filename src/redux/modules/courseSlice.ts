import { createSlice, current } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  courseList: [],
  filteredId: "",
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
      state.filteredId = action.payload.id;
      state.filteredIdx = action.payload.idx;
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
          title: "첫 번째 코스입니다.",
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
          title: "마지막 코스입니다.",
        });
      }
    },
    editMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      state.courseList[action.payload.idx].memo = action.payload.memo;
    },
    deleteMemo: (state: any, action) => {
      state.courseList = [...state.courseList];
      // const i = state.courseList.findIndex(
      //   (item: any) => item.id === action.payload
      // );
      // console.log(state.courseList[i].memo);
      // state.courseList[i].memo = "";
    },
    replaceAllData: (state: any, action) => {
      state.courseList = action.payload;
      state.filteredId = "";
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
  deleteMemo,
  replaceAllData,
} = courseSlice.actions;
export default courseSlice.reducer;
