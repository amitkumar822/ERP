import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/class";

export const classesApi = createApi({
  reducerPath: "classesApi",
  tagTypes: ["Refetch_Time_Table_Period"],
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
  useCreateClassTimeTableMutation,
  useGetTimeTablesQuery,
  useEditTimeTablePeriodMutation,
  useDeleteTimeTablePeriodMutation,
} = classesApi;
