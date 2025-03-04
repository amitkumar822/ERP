import { Teacher_Staf_SalaryPaymentForm } from "@/components/dashboard/staff_Teaccher/Teacher_Staf_SalaryPaymentForm";
import {
  useGetAllTeacherFeesQuery,
  usePayTeacherFeesMutation,
} from "@/redux/features/api/feeApi";
import { useGetAllTeacherQuery } from "@/redux/features/api/teacherApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TeacherSalaries = () => {
  const { data } = useGetAllTeacherQuery();
  const [singleTeacherDetails, setSingleTeacherDetails] = useState("");

  //********👇Start Pay Teacher Salary👇********** */
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
      let teacherDetails = data.data.filter(
        (details) => details._id === formData.teacherId
      );
      setSingleTeacherDetails(teacherDetails[0]);
    }
  }, [formData.teacherId]);

  const [payTeacherFees, { isLoading, isSuccess, error }] =
    usePayTeacherFeesMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await payTeacherFees({
      teacherId: formData.teacherId,
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
      toast.success(error?.data?.message || "Successfully Pay Teacher Salary!");
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
      setSingleTeacherDetails("");
    } else if (error) {
      alert(error?.data?.message || "Failed to Pay Teacher Salary!");
    }
  }, [error, isSuccess]);
  //********��End Pay Teacher Salary��********** */

  //& ************ 👇 Start Teacher Salary Get API 👇 ****************
  const { data: teacherSalaryDetails } = useGetAllTeacherFeesQuery();

  return (
    <div>
      <Teacher_Staf_SalaryPaymentForm
        handleSubmit={handleSubmit}
        useNameList={data} // search name list
        formData={formData}
        setFormData={setFormData}
        userDetailsList={teacherSalaryDetails}
        isLoading={isLoading}
        singleUserDetails={singleTeacherDetails}
        title={"Teacher Salary Payment"}
      />
    </div>
  );
};

export default TeacherSalaries;
