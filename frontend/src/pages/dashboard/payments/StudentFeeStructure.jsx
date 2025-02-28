import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";
import { academicYear } from "@/helpers/academicYear";
import { useStudentPayFeeMutation } from "@/redux/features/api/feeApi";
import { toast } from "react-toastify";
import { StudentFeePDF } from "@/components/dashboard/student/StudentFeePDF";

export default function StudentFeeStructure() {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    className: "",
    section: "",
    academicYear: "",
    paymentDate: new Date().toISOString().split("T")[0],
    tuitionFee: "",
    examFee: "",
    transportFee: "",
    hostelFee: "",
    totalFee: "",
    paymentMode: "Cash",
    utrNo: "",
    miscellaneousFee: "",
    discountFees: "",
    paymentAmount: "",
    otherFees: "",
  });

  const totalAmount = calculateTotalFee(
    formData.tuitionFee,
    formData.examFee,
    formData.transportFee,
    formData.hostelFee,
    formData.miscellaneousFee,
    formData.discountFees,
    formData.otherFees
  );

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalFee: totalAmount,
    }));
  }, [totalAmount]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Ensure numbers are not negative
    if (type === "number" && value < 0) {
      return; // Prevent negative values
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [studentPayFee, { data, error, isLoading, isSuccess }] =
    useStudentPayFeeMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (totalAmount < 0) {
      return alert(
        "Total amount can not be negative. Please check your discount fee"
      );
    }

    if (totalAmount < formData.paymentAmount) {
      return alert("Payment amount not be greater than the total amount.");
    }

    await studentPayFee({
      studentName: formData.studentName,
      rollNumber: formData.rollNumber,
      className: formData.className,
      section: formData.section,
      academicYear: formData.academicYear,
      paymentDate: formData.paymentDate,
      tuitionFee: formData.tuitionFee,
      examFee: formData.examFee,
      transportFee: formData.transportFee,
      hostelFee: formData.hostelFee,
      totalFee: formData.totalFee,
      paymentMode: formData.paymentMode,
      utrNo: formData.utrNo,
      miscellaneousFee: formData.miscellaneousFee,
      discountFees: formData.discountFees,
      paymentAmount: formData.paymentAmount,
      otherFees: formData.otherFees,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        error?.data?.message || "Successfully Student Fees Payment!"
      );

      StudentFeePDF(
        {
          name: "Oakwood Academy",
          address: "123 Maple Street, Anytown, CA 91234",
          contact: "+1 (555) 123-4567",
        },
        formData
      );
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else if (error) {
      alert(error?.data?.message || "Failed to submit");
    }
  }, [error, isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6 -mt-4">
          Student Fee Structure
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="studentName">Student Name*</Label>
            <Input
              id="studentName"
              placeholder="Enter student name"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rollNumber">Roll Number*</Label>
            <Input
              id="rollNumber"
              placeholder="Enter roll number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="selectClass">Select Class*</Label>
            <Select
              id="selectClass"
              name="className"
              value={formData.className}
              onValueChange={(val) =>
                setFormData({ ...formData, className: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classNames.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="selectClass">Section*</Label>
            <Select
              id="selectClass"
              onValueChange={(val) =>
                setFormData({ ...formData, section: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections?.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="selectClass">Academic Year*</Label>
            <Select
              id="selectClass"
              onValueChange={(val) =>
                setFormData({ ...formData, academicYear: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Student Section" />
              </SelectTrigger>
              <SelectContent>
                {academicYear?.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="paymentDate">Payment Date*</Label>
            <Input
              type="date"
              id="paymentDate"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tuitionFee">Tuition Fee*</Label>
            <Input
              type="number"
              id="tuitionFee"
              placeholder="Enter tuition fee"
              name="tuitionFee"
              value={formData.tuitionFee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="examFee">Exam Fee</Label>
            <Input
              type="number"
              id="examFee"
              placeholder="Enter exam fee"
              name="examFee"
              value={formData.examFee}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="transportFee">Transport Fee</Label>
            <Input
              type="number"
              id="transportFee"
              placeholder="Enter transport fee"
              name="transportFee"
              value={formData.transportFee}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hostelFee">Hostel Fee</Label>
            <Input
              type="number"
              id="hostelFee"
              placeholder="Enter hostel fee"
              name="hostelFee"
              value={formData.hostelFee}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="miscellaneousFee">Annual/Miscellaneous Fees</Label>
            <Input
              type="number"
              id="miscellaneousFee"
              placeholder="Enter Annual/Miscellaneous Fees"
              name="miscellaneousFee"
              value={formData.miscellaneousFee}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="otherFees">Other Fees</Label>
            <Input
              type="number"
              id="otherFees"
              placeholder="Enter other fees"
              name="otherFees"
              value={formData.otherFees}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="discountFees" className="text-green-600">
              Discount Fees
            </Label>
            <Input
              type="number"
              id="discountFees"
              placeholder="Enter discount Amount"
              name="discountFees"
              min={0}
              value={formData.discountFees}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="paymentMode">Payment Mode*</Label>
            <Select
              value={formData.paymentMode}
              onValueChange={(value) =>
                handleChange({ target: { name: "paymentMode", value } })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="utrNo">UTR/Bank Tran. No.(Online)</Label>
            <Input
              type="text"
              id="utrNo"
              name="utrNo"
              placeholder="Enter UTR/Bank Tran. No.(Online)"
              value={formData.utrNo}
              onChange={handleChange}
              disabled={
                formData.paymentMode === "Cash" || formData.paymentMode === ""
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="paymentAmount">Payment Amount</Label>
            <Input
              type="number"
              id="paymentAmount"
              name="paymentAmount"
              placeholder="Enter payment amount"
              value={formData.paymentAmount}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="totalFee">Total Fee</Label>
            <Input
              type="number"
              id="totalFee"
              name="totalFee"
              placeholder="Total Fee"
              readOnly
              value={formData.totalFee}
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center items-center mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-5 h-5" /> Pay Now
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

const calculateTotalFee = (
  tuitionFee,
  examFee,
  transportFee,
  hostelFee,
  miscellaneousFee,
  discountFees,
  otherFees
) => {
  return (
    Number(tuitionFee) +
    Number(examFee) +
    Number(transportFee) +
    Number(hostelFee) +
    Number(miscellaneousFee) +
    Number(otherFees) -
    Number(discountFees)
  );
};
