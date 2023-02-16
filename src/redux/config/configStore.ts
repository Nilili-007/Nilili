import { configureStore } from "@reduxjs/toolkit";
import temporarySlice from "../modules/temporarySlice";
import { courseApi } from "../modules/apiSlice";
const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    temporarySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

export default store;
