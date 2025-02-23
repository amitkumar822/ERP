import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const ExportAttendance = ({ attendanceData, selectedDate }) => {
  // Function to download attendance as PDF with status background colors
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Attendance Report - ${selectedDate}`, 14, 10);

    const tableColumn = [
      "Roll No.",
      "Student Name",
      "Father Mobile",
      "Status",
      "Remarks",
    ];
    const tableRows = attendanceData?.map((student) => [
      student?.studentId?.rollNumber,
      student?.studentId?.fullName,
      student?.studentId?.fatherNumber,
      student?.status,
      student?.remarks || "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3, halign: "center" },
      headStyles: {
        fillColor: [41, 98, 255],
        textColor: 255,
        fontStyle: "bold",
      }, // Blue header with white text
      bodyStyles: { textColor: [0, 0, 0] }, // Black text for body
      didParseCell: function (data) {
        if (data.column.index === 3) {
          const status = data.cell.raw;
          switch (status) {
            case "Present":
              data.cell.styles.fillColor = [0, 200, 0]; // Green
              data.cell.styles.textColor = 255; // White text
              break;
            case "Absent":
              data.cell.styles.fillColor = [255, 0, 0]; // Red
              data.cell.styles.textColor = 255;
              break;
            case "Late":
              data.cell.styles.fillColor = [255, 165, 0]; // Orange
              data.cell.styles.textColor = 0; // Black text
              break;
            case "Excused":
              data.cell.styles.fillColor = [0, 112, 192]; // Blue
              data.cell.styles.textColor = 255;
              break;
            default:
              data.cell.styles.fillColor = [41, 98, 255]; // Blue for unknown status
              data.cell.styles.textColor = 255;
              break;
            // default:
            //   data.cell.styles.fillColor = [200, 200, 200]; // Gray for unknown status
            //   data.cell.styles.textColor = 0;
            //   break;
          }
        }
      },
    });

    doc.save(`Attendance_Report_${selectedDate}.pdf`);
  };

  // Function to download attendance as Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      attendanceData.map((student) => ({
        "Roll No.": student?.studentId?.rollNumber,
        "Student Name": student?.studentId?.fullName,
        "Father Mobile": student?.studentId?.fatherNumber,
        Status: student?.status,
        Remarks: student?.remarks || "N/A",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");
    XLSX.writeFile(workbook, `Attendance_Report_${selectedDate}.xlsx`);
  };

  return (
    <div className="flex gap-4 my-4">
      <Button
        onClick={downloadPDF}
        className="bg-red-600 hover:bg-red-700 cursor-pointer"
      >
        <FaFilePdf className="mr-2" /> Download PDF
      </Button>
      <Button
        onClick={downloadExcel}
        className="bg-green-600 hover:bg-green-700 cursor-pointer"
      >
        <FaFileExcel className="mr-2" /> Download Excel
      </Button>
    </div>
  );
};

export default ExportAttendance;
