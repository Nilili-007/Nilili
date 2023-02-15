import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { CommentType } from "../../components/course/CommentInput";
import { dbService } from "../../utils/firebase";

export const courseApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Courses"],
  endpoints: (builder) => ({
    //Course reducer
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
    getCourse: builder.query<CourseType[], void>({
      async queryFn() {
        try {
          const courseQuery = query(
            collection(dbService, "courses"),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(courseQuery);
          let courses: any = [];
          querySnapshot?.forEach((doc) => {
            courses.push({ id: doc.id, ...doc.data() } as CourseType);
          });
          return { data: courses };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Courses"],
    }),

    //list reducer
    getRecentList: builder.query<CourseType[], void>({
      async queryFn() {
        try {
          const courseQuery = query(
            collection(dbService, "courses"),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(courseQuery);
          let courses: any = [];
          querySnapshot?.forEach((doc) => {
            courses.push({
              id: doc.id,
              ...doc.data(),
            } as CourseType);
          });
          return { data: courses };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Courses"],
    }),
    getLikeList: builder.query<CourseType[], void>({
      async queryFn() {
        try {
          const courseQuery = query(
            collection(dbService, "courses"),
            orderBy("likes", "desc")
          );
          const querySnapshot = await getDocs(courseQuery);
          let courses: any = [];
          querySnapshot?.forEach((doc) => {
            courses.push({
              id: doc.id,
              ...doc.data(),
            } as CourseType);
          });
          return { data: courses };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      providesTags: ["Courses"],
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
          const querySnapshot = await getDocs(commentQuery);
          let comments: any = [];
          querySnapshot?.forEach((doc) => {
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
    updateComment: builder.mutation({
      async queryFn({ commentId, newComment }) {
        try {
          await updateDoc(doc(dbService, "comments", commentId), {
            comment: newComment,
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),
    deleteComment: builder.mutation({
      async queryFn(commentId) {
        try {
          await deleteDoc(doc(dbService, "comments", commentId));
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCourseQuery,
  useGetRecentListQuery,
  useGetLikeListQuery,
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = courseApi;
