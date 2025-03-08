import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, FileDown, Download, Eye } from "lucide-react";
import { useGetAllStudentResultsQuery } from "@/redux/features/api/studentApi";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const initialResults = [
  { id: 1, name: "Amit Kumar", roll: "101", subject: "Math", marks: 85 },
  { id: 2, name: "Rahul Sharma", roll: "102", subject: "Science", marks: 78 },
  { id: 3, name: "Priya Verma", roll: "103", subject: "English", marks: 90 },
];

export default function ResultPublishingTable() {
  const { data: studentsAllResults } = useGetAllStudentResultsQuery();

  const [results, setResults] = useState(initialResults);

  const editResult = (id) => {
    alert(`Edit result for student ID: ${id}`);
  };

  const deleteResult = (id) => {
    setResults(results.filter((result) => result.id !== id));
  };

  const downloadPDF = () => {
    alert("Downloading PDF...");
  };

  return (
    <div className="md:p-6 p-2">
      <Card className="p-6 shadow-lg rounded-xl border border-gray-300">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-semibold">Result Publishing</h2>
        </div>
        <div className="overflow-x-auto">
          <Table className="w-full bg-white shadow-lg rounded-lg whitespace-nowrap">
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead>Student Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Class</TableHead>
                {studentsAllResults?.data?.length > 0 &&
                  studentsAllResults?.data[0]?.subjects.map((subject) => (
                    <TableHead key={subject._id}>
                      {subject.subjectName}
                    </TableHead>
                  ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsAllResults?.data?.map((result) => (
                <TableRow key={result._id} className="border-b">
                  <TableCell>{result.studentId.fullName}</TableCell>
                  <TableCell>{result.studentId.rollNumber}</TableCell>
                  <TableCell>{result.classId.className}</TableCell>
                  {result.subjects.map((subject) => (
                    <TableCell key={subject._id}>{subject.marks}</TableCell>
                  ))}
                  <TableCell className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          // onClick={() => handleEdit(result._id)}
                        >
                          <Pencil className="w-5 h-5 text-blue-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          // onClick={() => handleView(result._id)}
                        >
                          <Eye className="w-5 h-5 text-green-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          // onClick={() => handleDownload(result._id)}
                        >
                          <Download className="w-5 h-5 text-indigo-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Download PDF</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          // onClick={() => handleDelete(result._id)}
                        >
                          <Trash className="w-5 h-5 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 border border-gray-300 hover:border-green-500 transition-all"
          onClick={downloadPDF}
        >
          <FileDown className="w-5 h-5 mr-2" /> Download PDF
        </Button>
      </Card>
    </div>
  );
}
