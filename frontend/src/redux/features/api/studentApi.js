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
        }),
        getStudentSameClassWise: builder.mutation ({
            query: ({classId}) => ({
                url: `/get-sameclass-students/${classId}`,
                method: "POST",
            })
        }),
        promoteStudents: builder.mutation({
            query: ({newClassId, studentsID}) => ({
                url: `/promote-students/${newClassId}`,
                method: "POST",
                body: {studentsID},
            })
        }),

        //Student Result Publish
        publishStudentResult: builder.mutation({
            query: ({studentId, classId, subjects}) => ({
                url: `/create-student-results/${classId}`,
                method: "POST",
                body: {studentId, classId, subjects},
            })
        }),
    }),
})

export const { 
    useGetStudentListQuery,
    useGetStudentSameClassWiseMutation,
    usePromoteStudentsMutation,

    //Student Result Publish
    usePublishStudentResultMutation,
} = studentApi;