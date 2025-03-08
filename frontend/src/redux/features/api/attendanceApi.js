import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const baseURL = "http://localhost:4000/api/v1/attendance";
const baseURL = "https://erp-api-gamma.vercel.app/api/v1/attendance";

//* Define the API Student attendance endpoints
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
        getAttendanceDayMonthWise: builder.mutation({
            query: ({ date, academicYear, className, section }) => ({
                url: `/get-attendance-month-date`,
                method: "POST",
                body: { date, academicYear, className, section },
            }),
            keepUnusedDataFor: 3600, // Keeps data in memory for 1 hour
        })
    }),
});

export const { 
    useMarkAttendanceMutation, 
    useGetAttendanceDayMonthWiseMutation 
} = attendanceApi;