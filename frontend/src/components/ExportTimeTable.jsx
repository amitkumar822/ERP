import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const ExportTimeTable = ({ timeTableData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    timeTableData?.data.forEach((dayData, index) => {
      if (index !== 0) doc.addPage();
      doc.text(`Time Table - ${dayData.day}`, 14, 10);
      
      const tableData = dayData.periods.map((period) => [
        period.period,
        period.periodsTime,
        period.className.className,
        period.section,
        period.subject,
        period.teacher.fullName,
        period.teacher.email,
        period.teacher.phoneNumber,
      ]);
      
      autoTable(doc, {
        startY: 20,
        head: [["Period", "Time", "Class", "Section", "Subject", "Teacher", "Email", "Phone"]],
        body: tableData,
      });
    });
    
    doc.save("TimeTable.pdf");
  };

  const generateExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    timeTableData.forEach((dayData) => {
      const worksheetData = [
        ["Period", "Time", "Class", "Section", "Subject", "Teacher", "Email", "Phone"],
        ...dayData.periods.map((period) => [
          period.period,
          period.periodsTime,
          period.className.className,
          period.section,
          period.subject,
          period.teacher.fullName,
          period.teacher.email,
          period.teacher.phoneNumber,
        ]),
      ];
      
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, dayData.day);
    });
    
    XLSX.writeFile(workbook, "TimeTable.xlsx");
  };

  return (
    <div className="flex gap-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generatePDF}>
        Download PDF
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={generateExcel}>
        Download Excel
      </button>
    </div>
  );
};

export default ExportTimeTable;
