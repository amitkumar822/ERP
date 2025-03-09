import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { mainAPI } from "../mainApi";

// const baseURL = "http://localhost:4000/api/v1/students";
const baseURL = `${mainAPI}/students`;

export const studentApi = createApi({
    reducerPath: "studentApi",
    tagTypes: ["Refatch_Student"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: "include"
    }),
    endpoints: (builder) => ({
       studentAdmission: builder.mutation({
        query: ({admissionDate, rollNumber, fullName, className, section, academicYear, religion, category, studentNumber, caste, motherTongue, studentEmail, dob, gender, bloodGroup, fatherName, fatherNumber, fatherOccupation, motherName, motherNumber, permanentAddress, currentAddress, tuitionFees, admissionFees, otherFees, examFees, transportFees, hostelFees}) => ({
            url: "/add",
            method: "POST",
            body: {admissionDate, rollNumber, fullName, className, section, academicYear, religion, category, studentNumber, caste, motherTongue, studentEmail, dob, gender, bloodGroup, fatherName, fatherNumber, fatherOccupation, motherName, motherNumber, permanentAddress, currentAddress, tuitionFees, admissionFees, otherFees, examFees, transportFees, hostelFees},
        }),
        invalidatesTags: ["Refetch_Student"]
       }),
        getStudentList: builder.query({
            query: () => ({
                url: `/get-all-students`,
                method: "GET",
                providesTags: ["Refetch_Student"],
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
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
            }),
        }),

        //Student Result Publish
        publishStudentResult: builder.mutation({
            query: ({studentId, classId, subjects}) => ({
                url: `/create-student-results/${classId}`,
                method: "POST",
                body: {studentId, classId, subjects},
            }),
            invalidatesTags: ["Refetch_Student"]
        }),
        getAllStudentResults: builder.query({
            query: () => ({
                url: `/get-all-students-results`,
                method: "GET",
            }),
            providesTags: ["Refetch_Student"]
        })
    }),
})

export const {
    useStudentAdmissionMutation,
    useGetStudentListQuery,
    useGetStudentSameClassWiseMutation,
    usePromoteStudentsMutation,

    //Student Result Publish
    usePublishStudentResultMutation,
    useGetAllStudentResultsQuery,
} = studentApi;