import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Pencil, Trash } from "lucide-react";
import clsx from "clsx";
import { useGetAllStudentResultsQuery } from "@/redux/features/api/studentApi";
import { ViewDetails } from "@/components/dashboard/ViewDetails";

const sectionColors = {
  A: "bg-blue-100 text-blue-800",
  B: "bg-green-100 text-green-800",
  C: "bg-yellow-100 text-yellow-800",
  D: "bg-red-100 text-red-800",
};

export default function StudentResultsTable() {
  const { data: studentsAllResults, isLoading } =
    useGetAllStudentResultsQuery();

  const students = studentsAllResults?.data || [];

  // Ensure stable dependencies for useMemo to avoid re-renders
  const allSubjects = useMemo(() => {
    const subjectSet = new Set();
    students.forEach((student) => {
      student.subjects?.forEach((subject) =>
        subjectSet.add(subject.subjectName)
      );
    });
    return Array.from(subjectSet);
  }, [students.map((student) => student.subjects.length).join(",")]);

//   if (isLoading)
//     return <p className="text-center text-lg">Loading results...</p>;

  const [singleResult, setSingleResult] = useState({});
  const [showSingleResult, setShowSingleResult] = useState(false);

  return (
    <div className="overflow-x-auto p-4">
      <Table className="w-full border border-gray-300 rounded-lg text-sm">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="px-4 py-2">Roll No</TableHead>
            <TableHead className="px-4 py-2">Student Name</TableHead>
            <TableHead className="px-4 py-2">Class</TableHead>
            {allSubjects.map((subject) => (
              <TableHead key={subject} className="px-4 py-2">
                {subject}
              </TableHead>
            ))}
            <TableHead className="px-4 py-2 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-nowrap">
          {students.map((student) => (
            <TableRow key={student._id} className="border-b">
              <TableCell className="px-4 py-2">
                {student.studentId.rollNumber}
              </TableCell>
              <TableCell className="px-4 py-2">
                {student.studentId.fullName}
              </TableCell>
              <TableCell className="px-4 py-2">
                <span
                  className={clsx(
                    "px-2 py-1 rounded-lg",
                    sectionColors[student.classId.sections] ||
                      "bg-gray-100 text-gray-800"
                  )}
                >
                  {student.classId.className} -{" "}
                  {student.classId.sections || "N/A"}
                </span>
              </TableCell>
              {allSubjects.map((subject) => {
                const foundSubject = student.subjects.find(
                  (s) => s.subjectName === subject
                );
                return (
                  <TableCell key={subject} className="px-4 py-2 text-center">
                    {foundSubject ? foundSubject.marks : "--"}
                  </TableCell>
                );
              })}
              <TableCell className="px-4 py-2 text-center flex justify-center gap-2">
                <Button variant="ghost" size="icon" className="p-2"
                onClick={() => {
                    setSingleResult(student);
                    setShowSingleResult(true);
  
                }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="p-2">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="p-2">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 text-red-500"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Studetn Result Details Show Dilog */}
      <div>
        <ViewDetails
          data={singleResult}
          title="Student Result Details"
          open={showSingleResult}
          onClose={setShowSingleResult}
        />
      </div>
    </div>
  );
}
