import { DateFormatConverter } from "@/helpers/dateFormatConverter";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const StaffPDFDownload = ({ member, school }) => {
  const doc = new jsPDF();

  // School Information (Styled Header)
  doc.setFillColor(41, 128, 185); // Blue Background
  doc.rect(0, 0, 210, 40, "F"); // Full-width color box

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255); // White text
  doc.setFontSize(18);
  doc.text(school?.name, 105, 15, { align: "center" });

  doc.setFontSize(12);
  doc.text(school?.address, 105, 22, { align: "center" });
  doc.text(school?.mobile, 105, 29, { align: "center" });

  // Section Title
  doc.setTextColor(0, 0, 0); // Reset text color
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Staff Salary Details", 14, 50);

  // Staff Details (Basic Info)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Name: ${member?.fullName || "N/A"}`, 14, 58);
  doc.text(`Email: ${member?.email || "N/A"}`, 14, 64);
  doc.text(`Phone: ${member?.phone || "N/A"}`, 14, 70);
  doc.text(`Position: ${member?.position || "N/A"}`, 14, 76);
  doc.text(`Date of Birth: ${DateFormatConverter(member?.dateOfBirth) || "N/A"}`, 14, 82);
  doc.text(`Joining Date: ${DateFormatConverter(member?.joiningDate) || "N/A"}`, 14, 88);
  doc.text(`Status: ${member?.status || "N/A"}`, 14, 94);

  // Address Details Table (Permanent & Current Address)
  const permAddress = member?.address?.permanentAddress || {};
  const currAddress = member?.address?.currentAddress || {};

  doc.autoTable({
    startY: 105,
    head: [["Address Type", "Address", "City", "State", "Zip Code"]],
    body: [
      ["Permanent", permAddress.permanentAddress || "N/A", permAddress.city || "N/A", permAddress.state || "N/A", permAddress.zipCode || "N/A"],
      ["Current", currAddress.currentAddress || "N/A", currAddress.city || "N/A", currAddress.state || "N/A", currAddress.zipCode || "N/A"]
    ],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [41, 128, 185], // Blue Header Background
      textColor: [255, 255, 255], // White Text
      fontStyle: "bold",
    },
    bodyStyles: { halign: "center" },
  });

  // Salary Details Table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Salary (INR)"]],
    body: [[`${member?.salary || "N/A"}`]],
    theme: "grid",
    styles: { fontSize: 12, halign: "center" },
    headStyles: {
      fillColor: [41, 128, 185], // Blue Header
      textColor: [255, 255, 255], // White text
      fontStyle: "bold",
    },
  });

  doc.save(`${member?.fullName}_Salary.pdf`);
};
