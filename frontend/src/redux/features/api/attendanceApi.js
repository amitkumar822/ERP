import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/attendance";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseURL,  
        credentials: "include" 
    }),
    endpoints: (builder) => ({
    getAttendance: builder.query({
        query: () => "/attendance",
        }),
    }),
});

export const { useGetAttendanceQuery } = attendanceApi;