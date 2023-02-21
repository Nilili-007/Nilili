import { configureStore } from "@reduxjs/toolkit";
import temporarySlice from "../modules/temporarySlice";
import searchSlice from "../modules/searchSlice";
import { courseApi } from "../modules/apiSlice";
const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    temporarySlice,
    searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware),
});

export default store;
