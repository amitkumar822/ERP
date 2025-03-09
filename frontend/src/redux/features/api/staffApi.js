import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mainAPI } from "../mainApi";

// const baseURL = "http://localhost:4000/api/v1/staff"
const baseURL = `${mainAPI}/staff`;

export const staffApi = createApi({
    reducerPath: "staffApi",
    tagTypes: ["Refreshing_staff"],
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        joiningStaff: builder.mutation({
            query: ({fullName, email, phoneNumber, gender, dateOfBirth, position, joiningDate, salary, address}) => ({
                url: '/joining-staff',
                method: 'POST',
                body: ({fullName, email, phoneNumber, gender, dateOfBirth, position, joiningDate, salary, address})
            }),
            invalidatesTags: ["Refreshing_staff"]
        }),
        getAllStaff: builder.query({
            query: () => ({
                url: '/get-all-staff',
                method: 'GET',
            }),
            providesTags: ["Refreshing_staff"]
        }),
        removeStaff: builder.mutation({
            query: (staffId) => ({
                url: `/remove-staff/${staffId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Refreshing_staff"]
        })
    })
});

export const { 
    useJoiningStaffMutation,
    useGetAllStaffQuery,
    useRemoveStaffMutation,
} = staffApi;