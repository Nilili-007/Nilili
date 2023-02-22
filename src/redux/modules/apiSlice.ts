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
  tagTypes: ["Courses", "Comments"],
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
    updateCourse: builder.mutation({
      async queryFn({
        courseId,
        location,
        hashtags,
        title,
        // image,
        isDone,
        // places,
      }) {
        try {
          await updateDoc(doc(dbService, "courses", courseId), {
            location,
            hashtags,
            title,
            // image,
            isDone,
            // places,
          });
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
      async queryFn(courseId) {
        try {
          await deleteDoc(doc(dbService, "courses", courseId));
          return { data: null };
        } catch (error: any) {
          console.error(error.message);
          return { error: error.message };
        }
      },
      invalidatesTags: ["Courses"],
    }),

    getCourseLike: builder.query<CourseType[], void>({
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
      invalidatesTags: ["Comments"],
    }),
    getComment: builder.query<CommentType[], void>({
      async queryFn() {
        try {
          const commentQuery = query(
            collection(dbService, "comments"),
            orderBy("createdAt", "desc")
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
      providesTags: ["Comments"],
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
      invalidatesTags: ["Comments"],
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
      invalidatesTags: ["Comments"],
    }),

    updateLikes: builder.mutation({
      async queryFn({ likes, likesID, courseId }) {
        try {
          await updateDoc(doc(dbService, "courses", courseId), {
            likes,
            likesID,
          });
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
  useGetCourseLikeQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAddCommentMutation,
  useGetCommentQuery,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpdateLikesMutation,
} = courseApi;
