import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { CommentType } from "../../components/course/CommentInput";
import { dbService } from "../../utils/firebase";

export const courseApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Courses"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      async queryFn(newCourse) {
        try {
          await addDoc(collection(dbService, "courses"), newCourse);
          return { data: newCourse };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),

    //Comment Reducer
    addComment: builder.mutation({
      async queryFn(newComment) {
        try {
          await addDoc(collection(dbService, "comments"), newComment);
          return { data: newComment };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),
    getComment: builder.query<CommentType[], void>({
      async queryFn() {
        try {
          const commentQuery = query(
            collection(dbService, "comments"),
            orderBy("createdAt", "asc")
          );
          const querySnaphot = await getDocs(commentQuery);
          let comments: any = [];
          querySnaphot?.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() } as CommentType);
          });
          return { data: comments };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Courses"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useAddCommentMutation,
  useGetCommentQuery,
} = courseApi;
