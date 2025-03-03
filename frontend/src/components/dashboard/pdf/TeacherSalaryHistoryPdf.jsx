import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
export const TeacherSalaryHistoryPdf = (school, salaryData) => {
  const doc = new jsPDF();

  // School Information
  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text(school.name, 105, 15, { align: "center" });
  doc.setFontSize(12);
  doc.text(school.address, 105, 22, { align: "center" });
  doc.text(school.contact, 105, 29, { align: "center" });

  // Section Title
  doc.setFontSize(14);
  doc.text("Teacher Salary Details", 14, 40);

  // Teacher Details
  doc.setFontSize(12);
  doc.text(`Name: ${salaryData.teacherId.fullName}`, 14, 48);
  doc.text(`Email: ${salaryData.teacherId.email}`, 14, 54);
  doc.text(`Phone: ${salaryData.teacherId.phoneNumber}`, 14, 60);
  doc.text(`Designation: ${salaryData.teacherId.designation}`, 14, 66);
  doc.text(
    `Month & Year: ${new Date(salaryData.monthYear).toLocaleDateString()}`,
    14,
    72
  );

  // **Dynamic Salary Breakdown**
  doc.setFontSize(14);
  doc.text("Salary Breakdown", 14, 80);

  const salaryFields = [
    { label: "Basic Salary", key: "basicSalary" },
    { label: "Bonus", key: "bonus" },
    { label: "Deductions", key: "deductions" },
    { label: "Gross Salary", key: "grossSalary" },
    { label: "Net Salary", key: "netSalary" },
  ];

  const filteredSalaries = salaryFields
    .filter((field) => salaryData[field.key] !== undefined)
    .map((field) => [field.label, `Rs. ${salaryData[field.key] || 0}`]);

  filteredSalaries.push([
    { content: "Total Amount", styles: { fontStyle: "bold" } },
    `Rs. ${salaryData.netSalary || 0}`,
  ]);

  doc.autoTable({
    startY: 86,
    head: [["Description", "Amount (Rs.)"]],
    body: filteredSalaries,
  });

  // **Payment Details**
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text("Payment Details", 14, finalY);

  let paymentDetails = [
    ["Paid Amount", `Rs. ${salaryData.paymentAmount}`],
    ["Pending Amount", `Rs. ${salaryData.pendingAmount || 0}`],
    ["Payment Status", salaryData.status],
    ["Payment Mode", salaryData.paymentMode],
  ];

  if (salaryData.transactionId && salaryData.paymentMode !== "Cash") {
    paymentDetails.push(["Transaction ID", salaryData.transactionId]);
  }

  doc.autoTable({
    startY: finalY + 6,
    body: paymentDetails,
  });

  // Save PDF
  doc.save(`${salaryData.teacherId.fullName} Teacher_Salary_${Date.now()}.pdf`);
};
