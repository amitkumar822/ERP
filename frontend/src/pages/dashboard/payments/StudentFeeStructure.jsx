import { useState } from "react";
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

export default function StudentFeeStructure() {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    fatherName: "",
    class: "",
    section: "",
    academicYear: "",
    paymentDate: "",
    tuitionFee: "",
    examFee: "",
    transportFee: "",
    hostelFee: "",
    totalFee: "",
    paymentMode: "",
    utrNo: "",
    miscellaneousFee: "",
    discountFees: "",
    paymentAmount: "",
    otherFees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

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
          <div className="grid gap-2">
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
            <Label htmlFor="fatherName">Father Name</Label>
            <Input
              id="fatherName"
              placeholder="Enter father name"
              name="fatherName"
              value={formData.fatherName}
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
              name="class"
              value={formData.class}
              onValueChange={(val) => setFormData({ ...formData, class: val })}
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
            <Label htmlFor="discountFees" className="text-green-600">Discount Fees</Label>
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
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
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
                disabled={formData.paymentMode === "Offline" || formData.paymentMode === ""}
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
          <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
            <Button type="submit" className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Pay Now
            </Button>
            {/* <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2">
          <Download className="w-5 h-5" /> Download PDF
        </Button> */}
          </div>
        </form>
      </Card>
    </div>
  );
}
