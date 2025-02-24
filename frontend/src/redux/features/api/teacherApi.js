import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/teacher";

export const teacherApi = createApi({
    reducerPath: "teacherApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseURL,  
        credentials: "include" 
    }),
    endpoints: (builder) => ({
        joiningTeacher: builder.mutation({
            query: ({fullName, email, joiningDate, password, phoneNumber, gender, designation, dob, qualification, profileImage, document,identification, experience, previousInstitutionName, extracurricularActivities, permanentAddress, currentAddress}) => ({
                url: "/joining-class",
                method: "POST",
                body: { fullName, email, joiningDate, password, phoneNumber, gender, designation, dob, qualification, profileImage, document,identification, experience, previousInstitutionName, extracurricularActivities, permanentAddress, currentAddress },
            })
        })
    })
})

export const { useJoiningTeacherMutation } = teacherApi;