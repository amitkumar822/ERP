import { useState } from "react";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function StaffSalary() {
  const [formData, setFormData] = useState({
    staffName: "",
    staffID: "",
    designation: "",
    department: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    netSalary: "",
    paymentMode: "",
    paymentDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateNetSalary = () => {
    const total =
      Number(formData.basicSalary || 0) +
      Number(formData.allowances || 0) -
      Number(formData.deductions || 0);
    setFormData((prev) => ({ ...prev, netSalary: total }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Staff Salary Slip", 20, 20);
    doc.text(`Staff Name: ${formData.staffName}`, 20, 30);
    doc.text(`Staff ID: ${formData.staffID}`, 20, 40);
    doc.text(`Designation: ${formData.designation}`, 20, 50);
    doc.text(`Department: ${formData.department}`, 20, 60);
    doc.text(`Basic Salary: ${formData.basicSalary}`, 20, 70);
    doc.text(`Allowances: ${formData.allowances}`, 20, 80);
    doc.text(`Deductions: ${formData.deductions}`, 20, 90);
    doc.text(`Net Salary: ${formData.netSalary}`, 20, 100);
    doc.text(`Payment Mode: ${formData.paymentMode}`, 20, 110);
    doc.text(`Payment Date: ${formData.paymentDate}`, 20, 120);
    doc.save("Staff_Salary_Slip.pdf");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <Card className="w-full  bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Staff Salary Management
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>Staff Name*</label>
          <Input placeholder="Enter staff name" name="staffName" value={formData.staffName} onChange={handleChange} required />
          
          <label>Staff ID*</label>
          <Input placeholder="Enter staff ID" name="staffID" value={formData.staffID} onChange={handleChange} required />
          
          <label>Designation*</label>
          <Input placeholder="Enter designation" name="designation" value={formData.designation} onChange={handleChange} required />
          
          <label>Department*</label>
          <Input placeholder="Enter department" name="department" value={formData.department} onChange={handleChange} required />
          
          <label>Basic Salary*</label>
          <Input type="number" placeholder="Enter basic salary" name="basicSalary" value={formData.basicSalary} onChange={handleChange} required />
          
          <label>Allowances</label>
          <Input type="number" placeholder="Enter allowances" name="allowances" value={formData.allowances} onChange={handleChange} />
          
          <label>Deductions</label>
          <Input type="number" placeholder="Enter deductions" name="deductions" value={formData.deductions} onChange={handleChange} />
          
          <label>Net Salary</label>
          <Input type="number" name="netSalary" value={formData.netSalary} readOnly />
          
          <label>Payment Mode*</label>
          <Select name="paymentMode" value={formData.paymentMode} onChange={handleChange} required>
            <option value="">Select Payment Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </Select>
          
          <label>Payment Date</label>
          <Input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} />
        </form>
        
        <div className="flex justify-between items-center mt-6">
          <Button onClick={calculateNetSalary} className="btn btn-primary">Calculate Salary</Button>
          <Button onClick={handleDownloadPDF} className="btn btn-outline flex items-center gap-2">
            <Download className="w-5 h-5" /> Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
}
