import { configureStore } from "@reduxjs/toolkit";
import { courseApi } from "../modules/apiSlice";
const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

export default store;
