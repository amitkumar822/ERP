import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/pay-fees";

export const feeApi = createApi({
    reducerPath: "feeApi",
    tagTypes: ["Refetch_Get_Student_fees", "Refetch_Get_Teacher_fees", "Refetch_Get_Staff_fees"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        // ****** Student fees api ******
        studentPayFee: builder.mutation({
            query: ({ studentName, rollNumber, className, section, academicYear, paymentDate, tuitionFee, examFee, transportFee, hostelFee, totalFee, paymentMode, utrNo, miscellaneousFee, discountFees, paymentAmount, otherFees  }) => ({
                url: "/pay-student-fee",
                method: "POST",
                body: { studentName, rollNumber, className, section, academicYear, paymentDate, tuitionFee, examFee, transportFee, hostelFee, totalFee, paymentMode, utrNo, miscellaneousFee, discountFees, paymentAmount, otherFees },
            }),
        }),

        getAllStudentFees: builder.query({
            query: () => ({
                url: "/get-student-fee",
                method: "GET"
            }),
            providesTags: ["Refetch_Get_Student_fees"]
        }),
        payStudentPendingAmount: builder.mutation({
            query: ({pendingAmount, paymentMode, transactionId, pendingFeeId}) => ({
                url: `/pay-pending-student-fee/${pendingFeeId}`,
                method: "PUT",
                body: ({pendingAmount, paymentMode, transactionId})
            }),
            invalidatesTags: ["Refetch_Get_Student_fees"]
        }),

        // ****** Teacher fees api ******
        payTeacherFees: builder.mutation({
            query: ({ teacherId, month,basicSalary,bonus,deductions,grossSalary,netSalary,paymentMode,paymentAmount,transactionId}) => ({
                url: `/pay-teacher-fees/${teacherId}`,
                method: "POST",
                body: { month,basicSalary,bonus,deductions,grossSalary,netSalary,paymentMode,paymentAmount,transactionId},
            }),
            invalidatesTags: ["Refetch_Get_Teacher_fees"]
        }),

        getAllTeacherFees: builder.query({
            query: () => ({
                url: "/get-teacher-fees",
                method: "GET"
            }),
            providesTags: ["Refetch_Get_Teacher_fees"]
        }),

        // ****** Staff fees api ******
        payStaffFees: builder.mutation({
            query: ({ teacherId, month,basicSalary,bonus,deductions,grossSalary,netSalary,paymentMode,paymentAmount,transactionId}) => ({
                url: `/pay-staff-fees/${teacherId}`,
                method: "POST",
                body: { month,basicSalary,bonus,deductions,grossSalary,netSalary,paymentMode,paymentAmount,transactionId},
            }),
            invalidatesTags: ["Refetch_Get_Staff_fees"]
        }),

        getAllStaffFees: builder.query({
            query: () => ({
                url: "/get-staff-fees",
                method: "GET"
            }),
            providesTags: ["Refetch_Get_Staff_fees"]
        }),
    })
})

export const { 
    useStudentPayFeeMutation,
    useGetAllStudentFeesQuery,
    usePayStudentPendingAmountMutation,

    // Teacher Fees API
    usePayTeacherFeesMutation,
    useGetAllTeacherFeesQuery,

    // Staff Fees API
    usePayStaffFeesMutation,
    useGetAllStaffFeesQuery,
 } = feeApi;