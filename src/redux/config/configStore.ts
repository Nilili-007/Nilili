import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "../modules/courseSlice";
import { courseApi } from "../modules/apiSlice";
const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    courseSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      courseApi.middleware
    ),
});

export default store;
