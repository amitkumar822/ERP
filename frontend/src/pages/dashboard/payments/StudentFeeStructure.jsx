// import { useState } from "react";
// import jsPDF from "jspdf";
// import { Download, CreditCard } from "lucide-react";
// import { Select } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";

// export default function StudentFeeStructure() {
//   const [formData, setFormData] = useState({
//     studentName: "",
//     fatherName: "",
//     motherName: "",
//     rollNumber: "",
//     class: "",
//     section: "",
//     paymentDate: "",
//     tuitionFee: "",
//     examFee: "",
//     transportFee: "",
//     hostelFee: "",
//     otherFees: "",
//     totalFee: "",
//     paymentMode: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.studentName ||
//       !formData.rollNumber ||
//       !formData.class ||
//       !formData.tuitionFee ||
//       !formData.paymentMode
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     const total =
//       Number(formData.tuitionFee) +
//       Number(formData.examFee || 0) +
//       Number(formData.transportFee || 0) +
//       Number(formData.hostelFee || 0) +
//       Number(formData.otherFees || 0);
//     setFormData((prev) => ({ ...prev, totalFee: total }));
//     alert("Fee Structure Submitted Successfully!");
//   };

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Student Fee Structure", 20, 20);
//     Object.keys(formData).forEach((key, index) => {
//       doc.text(`${key}: ${formData[key]}`, 20, 30 + index * 10);
//     });
//     doc.save("Fee_Structure.pdf");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
//       <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
//           Student Fee Structure
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4"
//         >
//           <Input
//             label="Student Name*"
//             placeholder="Enter student name"
//             name="studentName"
//             value={formData.studentName}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             label="Father's Name"
//             placeholder="Enter father's name"
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={handleChange}
//           />
//           <Input
//             label="Mother's Name"
//             placeholder="Enter mother's name"
//             name="motherName"
//             value={formData.motherName}
//             onChange={handleChange}
//           />
//           <Input
//             label="Roll Number*"
//             placeholder="Enter roll number"
//             name="rollNumber"
//             value={formData.rollNumber}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             label="Class*"
//             placeholder="Enter class"
//             name="class"
//             value={formData.class}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             label="Section"
//             placeholder="Enter section"
//             name="section"
//             value={formData.section}
//             onChange={handleChange}
//           />
//           <Input
//             type="date"
//             label="Payment Date"
//             name="paymentDate"
//             value={formData.paymentDate}
//             onChange={handleChange}
//           />
//           <Input
//             type="number"
//             label="Tuition Fee*"
//             placeholder="Enter tuition fee"
//             name="tuitionFee"
//             value={formData.tuitionFee}
//             onChange={handleChange}
//             required
//           />
//           <Input
//             type="number"
//             label="Exam Fee"
//             placeholder="Enter exam fee"
//             name="examFee"
//             value={formData.examFee}
//             onChange={handleChange}
//           />
//           <Input
//             type="number"
//             label="Transport Fee"
//             placeholder="Enter transport fee"
//             name="transportFee"
//             value={formData.transportFee}
//             onChange={handleChange}
//           />
//           <Input
//             type="number"
//             label="Hostel Fee"
//             placeholder="Enter hostel fee"
//             name="hostelFee"
//             value={formData.hostelFee}
//             onChange={handleChange}
//           />
//           <Input
//             type="number"
//             label="Other Fees"
//             placeholder="Enter other fees"
//             name="otherFees"
//             value={formData.otherFees}
//             onChange={handleChange}
//           />
//           <Select
//             label="Payment Mode*"
//             name="paymentMode"
//             value={formData.paymentMode}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Payment Mode</option>
//             <option value="Online">Online</option>
//             <option value="Offline">Offline</option>
//           </Select>
//           <Input
//             type="number"
//             label="Total Fee"
//             name="totalFee"
//             value={formData.totalFee}
//             readOnly
//           />
//           <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
//             <Button
//               type="submit"
//               className="btn btn-primary flex items-center gap-2"
//             >
//               <CreditCard className="w-5 h-5" /> Pay Now
//             </Button>
//             <Button
//               onClick={handleDownloadPDF}
//               className="btn btn-outline flex items-center gap-2"
//             >
//               <Download className="w-5 h-5" /> Download PDF
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }


import { useState } from "react";
import jsPDF from "jspdf";
import { Download, CreditCard } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function StudentFeeStructure() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    rollNumber: "",
    class: "",
    section: "",
    paymentDate: "",
    tuitionFee: "",
    examFee: "",
    transportFee: "",
    hostelFee: "",
    otherFees: "",
    totalFee: "",
    paymentMode: "",
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
    if (!formData.studentName || !formData.rollNumber || !formData.class || !formData.tuitionFee || !formData.paymentMode) {
      alert("Please fill in all required fields.");
      return;
    }
    const total =
      Number(formData.tuitionFee) +
      Number(formData.examFee || 0) +
      Number(formData.transportFee || 0) +
      Number(formData.hostelFee || 0) +
      Number(formData.otherFees || 0);
    setFormData((prev) => ({ ...prev, totalFee: total }));
    alert("Fee Structure Submitted Successfully!");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Fee Structure", 20, 20);
    Object.keys(formData).forEach((key, index) => {
      doc.text(`${key}: ${formData[key]}`, 20, 30 + index * 10);
    });
    doc.save("Fee_Structure.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Student Fee Structure
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Student Name*" placeholder="Enter student name" name="studentName" value={formData.studentName} onChange={handleChange} required />
          <Input label="Father's Name" placeholder="Enter father's name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
          <Input label="Mother's Name" placeholder="Enter mother's name" name="motherName" value={formData.motherName} onChange={handleChange} />
          <Input label="Roll Number*" placeholder="Enter roll number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
          <Input label="Class*" placeholder="Enter class" name="class" value={formData.class} onChange={handleChange} required />
          <Input label="Section" placeholder="Enter section" name="section" value={formData.section} onChange={handleChange} />
          <Input type="date" label="Payment Date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} />
          <Input type="number" label="Tuition Fee*" placeholder="Enter tuition fee" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} required />
          <Input type="number" label="Exam Fee" placeholder="Enter exam fee" name="examFee" value={formData.examFee} onChange={handleChange} />
          <Input type="number" label="Transport Fee" placeholder="Enter transport fee" name="transportFee" value={formData.transportFee} onChange={handleChange} />
          <Input type="number" label="Hostel Fee" placeholder="Enter hostel fee" name="hostelFee" value={formData.hostelFee} onChange={handleChange} />
          <Input type="number" label="Other Fees" placeholder="Enter other fees" name="otherFees" value={formData.otherFees} onChange={handleChange} />
          <Select label="Payment Mode*" name="paymentMode" value={formData.paymentMode} onChange={handleChange} required>
            <option value="">Select Payment Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </Select>
          <Input type="number" label="Total Fee" name="totalFee" value={formData.totalFee} readOnly />
          <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
            <Button type="submit" className="btn btn-primary flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Pay Now
            </Button>
            <Button onClick={handleDownloadPDF} className="btn btn-outline flex items-center gap-2">
              <Download className="w-5 h-5" /> Download PDF
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
