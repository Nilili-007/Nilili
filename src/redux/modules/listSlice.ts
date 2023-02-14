import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { dbService } from "../../utils/firebase";

export const listApi = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Lists"],
  endpoints: (builder) => ({
    getCityList: builder.query<CourseType[], void>({
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
      providesTags: ["Lists"],
    }),
  }),
});

// export const { useGetCityListQuery } = listApi;
