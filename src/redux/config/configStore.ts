import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../modules/courseSlice";

const store = configureStore({
  reducer: { courseSlice },
});

export default store;
