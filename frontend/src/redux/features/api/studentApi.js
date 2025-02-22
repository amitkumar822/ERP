import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/students";

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getStudentList: builder.query({
            query: () => ({
                url: `/get-all-students`,
                method: "GET",
            })
        })
    }),
})

export const { useGetStudentListQuery } = studentApi;