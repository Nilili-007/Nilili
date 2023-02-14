import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../modules/courseSlice";
import temporarySlice from "../modules/temporarySlice";
import { courseApi } from "../modules/apiSlice";
const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    courseSlice, 
    temporarySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

export default store;