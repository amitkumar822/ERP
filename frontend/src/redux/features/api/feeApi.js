import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:4000/api/v1/pay-fees";

export const feeApi = createApi({
    reducerPath: "feeApi",
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
            })
        })
    })
})

export const { 
    useStudentPayFeeMutation,
    useGetAllStudentFeesQuery,
 } = feeApi;