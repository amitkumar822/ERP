import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainAPI } from "../mainApi";

// const baseURL = "http://localhost:4000/api/v1/class";
const baseURL = `${mainAPI}/class`;

export const classesApi = createApi({
  reducerPath: "classesApi",
  tagTypes: ["Refetch_Time_Table_Period", "Refetch_Class"],
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

    getClassDetailsOnly: builder.query({
      query: () => ({
        url: `/get-class-details-only`,
        method: "GET",
      }),
      // providesTags: ["Refetch_Time_Table_Period"],
    }),

    // new class
    createClass: builder.mutation({
      query: (form) => ({
        url: "/create",
        method: "POST",
        body: (form),
      }),
      invalidatesTags: ["Refetch_Class"],
    }),
    updateClass: builder.mutation({
      query: ({form, editClassId}) => ({
        url: `/update/${editClassId}`,
        method: "PUT",
        body: (form),
      }),
      invalidatesTags: ["Refetch_Class"],
    }),
    getAllClasses: builder.query({
      query: () => ({
        url: "/get-all-class",
        method: "GET",
      }),
      providesTags: ["Refetch_Class"],
    }),


    //^ *********👇 Class Time Table Create 👇*********
    createClassTimeTable: builder.mutation({
      query: ({ className, section, academicYear, day, period, periodTime, subject, emailPhone}) => ({
        url: `/create-class-timetable`,
        method: "POST",
        body: { className, section, academicYear, day, period, periodTime, subject, emailPhone},
      }),
    }),

    getTimeTables: builder.query({
      query: () => ({
        url: `/get-class-timetable`,
        method: "GET",
      }),
      providesTags: ["Refetch_Time_Table_Period"],
    }),

    editTimeTablePeriod: builder.mutation({
      query: ({ periodId, period, subject, periodTime }) => ({
        url: `/edit-timetable-period/${periodId}`,
        method: "PUT",
        body: { period, subject, periodTime },
      }),
      invalidatesTags: ["Refetch_Time_Table_Period"],
    }),

    deleteTimeTablePeriod: builder.mutation({
      query: ({ periodId }) => ({
        url: `/delete-timetable-period/${periodId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Time_Table_Period"],
    })
    //^ *********�� Class Time Table Get ��*********
  }),
});

export const { 
  useGetClassBySectionAcademicYearClassNameQuery,
  useGetClassDetailsOnlyQuery,

  // new 
  useCreateClassMutation,
  useUpdateClassMutation,
  useGetAllClassesQuery,

  // class time table
  useCreateClassTimeTableMutation,
  useGetTimeTablesQuery,
  useEditTimeTablePeriodMutation,
  useDeleteTimeTablePeriodMutation,
} = classesApi;
