import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://erp-api-gamma.vercel.app/api/v1/teacher";
// const baseURL = "http://localhost:4000/api/v1/teacher";

export const teacherApi = createApi({
    reducerPath: "teacherApi",
    tagTypes: ["Refreshing_teacher"],
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseURL,  
        credentials: "include" 
    }),
    endpoints: (builder) => ({
        joiningTeacher: builder.mutation({
            query: ({fullName, email, joiningDate, password, phoneNumber, gender, designation, dob, qualification, profileImage, document,identification, experience, previousInstitutionName, extracurricularActivities, permanentAddress, currentAddress}) => ({
                url: "/joining-and-update",
                method: "POST",
                body: { fullName, email, joiningDate, password, phoneNumber, gender, designation, dob, qualification, profileImage, document,identification, experience, previousInstitutionName, extracurricularActivities, permanentAddress, currentAddress },
            })
        }),
        getAllTeacher: builder.query({
            query: () => ({
                url: "/get-all-teachers",
                method: "GET"
            }),
            providesTags: ["Refreshing_teacher"]
        }),
        removeTeacher: builder.mutation({
            query: (teacherId) => ({
                url: `/remove-teacher/${teacherId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Refreshing_teacher"],
        })
    })
})

export const { 
    useJoiningTeacherMutation,
    useGetAllTeacherQuery,
    useRemoveTeacherMutation
} = teacherApi;