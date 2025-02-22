import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [selectedSection, setSelectedSection] = useState("A");

  const [attendance, setAttendance] = useState({
    "Class 1-A": [
      { id: "1", name: "John Doe", status: "present", remark: "" },
      { id: "2", name: "Jane Smith", status: "absent", remark: "Sick" },
    ],
  });

  const [deleteStudentId, setDeleteStudentId] = useState(null);

  const currentClassKey = `${selectedClass}-${selectedSection}`;
  const students = attendance[currentClassKey] || [];

  // Optimized Filtering (Memoized)
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const handleStatusChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [currentClassKey]: prev[currentClassKey].map((student) =>
        student.id === studentId
          ? {
              ...student,
              status,
              remark: status === "absent" ? student.remark : "",
            }
          : student
      ),
    }));
  };

  const handleRemarkChange = (studentId, remark) => {
    setAttendance((prev) => ({
      ...prev,
      [currentClassKey]: prev[currentClassKey].map((student) =>
        student.id === studentId ? { ...student, remark } : student
      ),
    }));
  };

  const handleDeleteStudent = () => {
    setAttendance((prev) => ({
      ...prev,
      [currentClassKey]: prev[currentClassKey].filter(
        (student) => student.id !== deleteStudentId
      ),
    }));
    setDeleteStudentId(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Search & Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b pb-4">
        <h1 className="text-2xl font-bold">Daily Attendance</h1>
        <Input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
          className="w-full md:w-64"
        />
      </div>

      {/* Class & Section Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white"
          >
            {classNames.map((cls, index) => (
              <option value={cls} key={index}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Section:</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="border rounded p-2 w-full dark:bg-gray-800 dark:text-white"
          >
            {
              sections.map((section, index) => (
                <option value={section} key={index}>
                  {section}
                </option>
              ))
            }
            {/* <option value="A">A</option>
            <option value="B">B</option> */}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Select Date:</label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            className="w-full dark:bg-gray-800 dark:text-white cursor-pointer"
          />
        </div>
      </div>

      {/* Selected Info */}
      <div className="mb-4 p-3 bg-gray-100 rounded-md text-sm dark:text-white dark:bg-gray-900">
        <strong>Current Selection:</strong> {selectedClass} - {selectedSection}{" "}
        | {selectedDate}
      </div>

      {/* Attendance Table */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Student Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="md:table-cell">Remark</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <select
                    className="border rounded p-1"
                    value={student.status}
                    onChange={(e) =>
                      handleStatusChange(student.id, e.target.value)
                    }
                    required
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </TableCell>
                <TableCell className="md:table-cell">
                  <Input
                    placeholder="Enter remark"
                    value={student.remark}
                    onChange={(e) =>
                      handleRemarkChange(student.id, e.target.value)
                    }
                    required
                    className="w-48"
                  />
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteStudentId(student.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="w-full md:w-auto">Submit Attendance</Button>
      </div>
    </div>
  );
}
