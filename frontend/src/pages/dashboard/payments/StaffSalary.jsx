import { Teacher_Staf_SalaryPaymentForm } from "@/components/dashboard/staff_Teaccher/Teacher_Staf_SalaryPaymentForm";
import {
  useGetAllStaffFeesQuery,
  usePayStaffFeesMutation,
} from "@/redux/features/api/feeApi";
import { useGetAllStaffQuery } from "@/redux/features/api/staffApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StaffSalaries = () => {
  const { data } = useGetAllStaffQuery();
  const [singleStaffDetails, setSingleStaffDetails] = useState("");

  //********👇Start Pay Staff Salary👇********** */
  const [formData, setFormData] = useState({
    userId: "",
    month: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
    grossSalary: "",
    netSalary: "",
    paymentMode: "Cash",
    paymentAmount: "",
    transactionId: "",
  });

  useEffect(() => {
    if (data && data.data) {
      let staffDetails = data.data.filter(
        (details) => details._id === formData.userId
      );
      setSingleStaffDetails(staffDetails[0]);
    }
  }, [formData.userId]);

  const [payStaffFees, { isLoading, isSuccess, error }] =
  usePayStaffFeesMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await payStaffFees({
      staffId: formData.userId,
      month: formData.month,
      basicSalary: formData.basicSalary,
      bonus: formData.bonus,
      deductions: formData?.deductions,
      grossSalary: formData.grossSalary,
      netSalary: formData.netSalary,
      paymentMode: formData.paymentMode,
      paymentAmount: formData.paymentAmount,
      transactionId: formData.transactionId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Successfully Pay Staff Salary!");
      setFormData({
        teacherId: "",
        month: "",
        basicSalary: "",
        bonus: "",
        deductions: "",
        grossSalary: "",
        netSalary: "",
        paymentMode: "Cash",
        paymentAmount: "",
        transactionId: "",
      });
      setSingleStaffDetails("");
    } else if (error) {
      alert(error?.data?.message || "Failed to Pay Teacher Salary!");
    }
  }, [error, isSuccess]);
  //********��End Pay Staff Salary��********** */

  //& ************ 👇 Start Staff Salary Get API 👇 ****************
  const { data: staffSalaryDetails } = useGetAllStaffFeesQuery();

  return (
    <div>
      <Teacher_Staf_SalaryPaymentForm
        handleSubmit={handleSubmit}
        useNameList={data} // search name list
        formData={formData}
        setFormData={setFormData}
        userDetailsList={staffSalaryDetails}
        isLoading={isLoading}
        singleUserDetails={singleStaffDetails}
        title={"Staff Salary Payment"}
      />
    </div>
  );
};

export default StaffSalaries;


