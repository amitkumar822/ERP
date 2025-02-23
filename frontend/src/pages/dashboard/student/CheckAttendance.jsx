import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import ClassSectionAcademicYear from "@/components/dashboard/ClassSectionAcademicYear";

const CheckAttendance = () => {
  let currentDates = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(currentDates);

  const [fetchFormData, setFormFetchData] = useState({
    className: "",
    section: "",
    academicYear: "",
  });

  const handleChange = (e) => {
    setFormFetchData({ ...fetchFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Calender */}
      <Card className="p-4 mb-4">
        {/* Class, Academic Year & Section Selection */}
        <ClassSectionAcademicYear
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          fetchFormData={fetchFormData}
          setFormFetchData={setFormFetchData}
        />
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Student Attendance</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Father's Contact</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* {attendanceData.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <a
                        href={`tel:${student.fatherNumber}`}
                        className="text-blue-600 hover:underline"
                      >
                        {student.fatherNumber}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={student.status}
                        onValueChange={(value) =>
                          handleStatusChange(student.studentId, value)
                        }
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="present">
                            <div className="flex items-center gap-2">
                              <FaCheckCircle className="text-green-500" />{" "}
                              Present
                            </div>
                          </SelectItem>
                          <SelectItem value="late">
                            <div className="flex items-center gap-2">
                              <FaClock className="text-yellow-500" /> Late
                            </div>
                          </SelectItem>
                          <SelectItem value="absent">
                            <div className="flex items-center gap-2">
                              <FaTimesCircle className="text-red-500" /> Absent
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckAttendance;
