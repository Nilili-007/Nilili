import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../../utils/firebase";

export const courseApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Courses"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      async queryFn(newCourse) {
        try {
          await addDoc(collection(dbService, "courses"), newCourse);
          return { data: "ok" };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),
  }),
});
export const { useAddCourseMutation } = courseApi;
