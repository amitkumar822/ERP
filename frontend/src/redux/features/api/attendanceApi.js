import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/attendance";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseURL,  
        credentials: "include" 
    }),
    endpoints: (builder) => ({
        markAttendance: builder.mutation({
            query: ({ date, classId, records }) => ({
                url: "/attendance",
                method: "POST",
                body: { date, classId, records },
            }),
        }),
        // getAttendanceDayMonthWise: builder.mutation({
        //     query: ({ date }) => ({
        //         url: `/get-attendance-month-date`,
        //         method: "POST",

        //     }),
        // })
    }),
});

export const { useMarkAttendanceMutation } = attendanceApi;