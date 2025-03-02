import jsPDF from "jspdf";
import "jspdf-autotable";

export const StudentFeePDF = (school, formData) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text(school.name, 105, 15, { align: "center" });
  doc.setFontSize(12);
  doc.text(school.address, 105, 22, { align: "center" });
  doc.text(school.contact, 105, 29, { align: "center" });

  doc.setFontSize(14);
  doc.text("Student Details", 14, 40);
  doc.setFontSize(12);
  doc.text(`Name: ${formData.studentName}`, 14, 48);
  doc.text(`Roll Number: ${formData.rollNumber}`, 14, 54);
  doc.text(`Class: ${formData.className} - ${formData.section}`, 14, 60);
  doc.text(`Academic Year: ${formData.academicYear}`, 14, 66);

  const totalFee =
    Number(formData.tuitionFee) +
    Number(formData.examFee) +
    Number(formData.transportFee) +
    Number(formData.hostelFee) +
    Number(formData.miscellaneousFee) +
    Number(formData.otherFees);
  const remainingBalance =
    totalFee - Number(formData.paymentAmount) - Number(formData.discountFees);

  doc.setFontSize(14);
  doc.text("Fee Breakdown", 14, 76);

  doc.autoTable({
    startY: 82,
    head: [["Description", "Amount (Rs.)"]],
    body: [
      [
        "Tuition Fee",
        `${formData.tuitionFee === "" ? "Rs. ---" : "Rs."} ${
          formData.tuitionFee
        }`,
      ],
      [
        "Exam Fee",
        `${formData.examFee === "" ? "Rs. ---" : "Rs."} ${formData.examFee}`,
      ],
      [
        "Transport Fee",
        `${formData.transportFee === "" ? "Rs. ---" : "Rs."} ${
          formData.transportFee
        }`,
      ],
      [
        "Hostel Fee",
        `${formData.hostelFee === "" ? "Rs. ---" : "Rs."} ${
          formData.hostelFee
        }`,
      ],
      [
        "Miscellaneous Fee",
        `${formData.miscellaneousFee === "" ? "Rs. ---" : "Rs."} ${
          formData.miscellaneousFee
        }`,
      ],
      [
        "Other Fees",
        `${formData.otherFees === "" ? "Rs. ---" : "Rs."} ${
          formData.otherFees
        }`,
      ],
      [
        { content: "Total Fee", styles: { fontStyle: "bold" } },
        `Rs. ${totalFee}`,
      ],
    ],
  });

  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.text("Payment Details", 14, finalY);

  doc.autoTable({
    startY: finalY + 6,
    body: [
      ["Paid Amount", `Rs. ${formData.paymentAmount}`],
      ["Discount Applied", `Rs. ${formData.discountFees}`],
      [
        {
          content: "Remaining Balance",
          styles: { textColor: [255, 0, 0], fontStyle: "bold" },
        },
        `Rs. ${remainingBalance}`,
      ],
      ["Payment Date", formData.paymentDate],
      ["Payment Mode", formData.paymentMode],
      formData.paymentMode !== "Cash" ? ["UTR Number", formData.utrNo] : [],
    ].filter((row) => row.length > 0),
  });

  doc.save(`Student_Fee_Receipt_${formData.rollNumber}.pdf`);
};
