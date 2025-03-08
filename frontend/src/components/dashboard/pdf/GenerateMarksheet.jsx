import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components/ui/button";

const schoolDetails = {
  name: "Green Garden Public School",
  address: "Pitwas Rd, Masaurhi, Bhadaura, Bihar 804454",
  contact: "Phone: +91-9934070501 | Email: info@xyzschool.com",
};

const generateMarksheet = (data) => {
  const studentData = Array.isArray(data) ? data : [data]; // Ensure it's an array
  const doc = new jsPDF();

  studentData.forEach((student, index) => {
    if (index > 0) doc.addPage(); // New page for each student

    // Add Border
    doc.rect(5, 5, 200, 287, "S");

    // School Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text(schoolDetails.name, 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(schoolDetails.address, 105, 30, null, null, "center");
    doc.text(schoolDetails.contact, 105, 38, null, null, "center");
    doc.line(10, 42, 200, 42);

    // Student Details Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Student Marksheet", 105, 50, null, null, "center");
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    let startY = 60;
    doc.text(`Name: ${student.studentId.fullName}`, 15, startY);
    doc.text(`Roll Number: ${student.studentId.rollNumber}`, 120, startY);

    startY += 10;
    const formattedDOB = student.studentId.dob
      ? new Date(student.studentId.dob).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "N/A";
    doc.text(`Date of Birth: ${formattedDOB}`, 15, startY);
    doc.text(`Father's Name: ${student.studentId.fatherName}`, 120, startY);

    startY += 10;
    doc.text(`Mother's Name: ${student.studentId.motherName}`, 15, startY);
    doc.text(
      `Class: ${student.classId.className} - Section ${student.classId.sections}`,
      120,
      startY
    );

    startY += 10;
    doc.text(`Academic Year: ${student.classId.academicYear}`, 15, startY);

    doc.line(10, startY + 5, 200, startY + 5);

    // Table Data Preparation
    const tableColumn = ["Subject", "Marks Obtained"];
    let totalMarks = 0;
    const tableRows = student.subjects.map((sub) => {
      totalMarks += sub.marks;
      return [sub.subjectName, sub.marks];
    });

    // Calculate Percentage and Grade
    const percentage = (totalMarks / (student.subjects.length * 100)) * 100;
    const resultDivision =
      percentage >= 60
        ? "1st Division"
        : percentage >= 45
        ? "2nd Division"
        : "3rd Division";
    const grade =
      percentage >= 90
        ? "A+"
        : percentage >= 80
        ? "A"
        : percentage >= 70
        ? "B+"
        : percentage >= 60
        ? "B"
        : percentage >= 50
        ? "C"
        : "D";

    doc.autoTable({
      startY: startY + 10,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      styles: { halign: "center" },
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
    });

    // Display Total Marks, Percentage, and Grade
    let finalY = doc.autoTable.previous.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text(`Total Marks: ${totalMarks}`, 15, finalY);
    doc.text(`Percentage: ${percentage.toFixed(2)}%`, 120, finalY);

    finalY += 10;
    doc.text(`Result: ${resultDivision}`, 15, finalY);
    doc.text(`Grade: ${grade}`, 120, finalY);

    doc.line(10, finalY + 5, 200, finalY + 5);

    // Footer Section (Signatures & Date)
    let footerY = finalY + 20;
    doc.text("Class Teacher", 40, footerY);
    doc.text("Principal", 140, footerY);
    doc.text("(Signature)", 40, footerY + 5);
    doc.text("(Signature)", 140, footerY + 5);

    footerY += 20;
    doc.text(
      `Date of Publication: ${new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}`,
      15,
      footerY
    );
  });

  doc.save("Marksheet.pdf");
};

const MarksheetGenerator = ({ students }) => {
  return (
    <Button onClick={() => generateMarksheet(students)}>
      Download Marksheet
    </Button>
  );
};

export default MarksheetGenerator;
