import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/class";

export const classesApi = createApi({
  reducerPath: "classesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getClassBySectionAcademicYearClassName: builder.query({
      query: ({ className, section, academicYear }) => ({
        url: `/get-class-academic-section/${className}/${section}/${academicYear}`,
        method: "GET",
      }),
      keepUnusedDataFor: 3600, // Keeps data in memory for 1 hour
    }),
  }),
});

export const { useGetClassBySectionAcademicYearClassNameQuery } = classesApi;
