import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../modules/courseSlice";
import temporarySlice from "../modules/temporarySlice";

const store = configureStore({
  reducer: { courseSlice, temporarySlice },
});

export default store;
