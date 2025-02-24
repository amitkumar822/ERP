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
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import ClassSectionAcademicYear from "@/components/dashboard/ClassSectionAcademicYear";
import { Button } from "@/components/ui/button";
import { useGetAttendanceDayMonthWiseMutation } from "@/redux/features/api/attendanceApi";
import ExportAttendance from "@/components/dashboard/ExportAttendance";
import { toast } from "react-toastify";
import NoRecordFound from "@/components/dashboard/NoRecordFound";

const CheckAttendance = () => {
  let currentDates = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(currentDates);

  const [fetchFormData, setFormFetchData] = useState({
    className: "",
    section: "",
    academicYear: "",
  });

  const [getAttendanceDayMonthWise, { data, isError }] =
    useGetAttendanceDayMonthWiseMutation();

  const handleGetAttendanceMonthDateWise = async () => {
    if (
      fetchFormData.className &&
      fetchFormData.section &&
      fetchFormData.academicYear
    ) {
      await getAttendanceDayMonthWise({
        date: selectedDate,
        academicYear: fetchFormData.academicYear,
        className: fetchFormData.className,
        section: fetchFormData.section,
      });
    } else {
      alert("Please select Class, Academic Year & Section");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("No attendance found for the selected date");
    }
  }, [isError]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Check Daily Attendance</h1>
      {/* Calender */}
      <Card className="p-4 mb-4">
        {/* Class, Academic Year & Section Selection */}
        <ClassSectionAcademicYear
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          fetchFormData={fetchFormData}
          setFormFetchData={setFormFetchData}
        />
        <Button
          onClick={handleGetAttendanceMonthDateWise}
          className="bg-blue-700 hover:bg-blue-800 cursor-pointer md:w-1/4 w-full"
        >
          <Search /> Search
        </Button>
      </Card>

      {/* Attendance Table */}
      <Card>
        <div className="rounded-md border overflow-x-auto whitespace-nowrap">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Roll No.</TableHead>
                <TableHead className="w-[200px]">Student Name</TableHead>
                <TableHead className="w-[200px]">Father Mobile</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="md:table-cell">Remark</TableHead>
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.records?.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {student?.studentId?.rollNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student?.studentId?.fullName}
                  </TableCell>
                  <TableCell className="font-medium">
                    <a
                      className="text-blue-600 hover:text-blue-800 hover:underline duration-300"
                      href={`tel: ${student?.studentId?.fatherNumber}`}
                    >
                      {student?.studentId?.fatherNumber}
                    </a>
                  </TableCell>
                  <TableCell
                    className={`
                                 text-white font-medium text-center rounded-lg
                                ${
                                  student?.status === "Present"
                                    ? "bg-green-500"
                                    : student?.status === "Absent"
                                    ? "bg-red-500"
                                    : student?.status === "Late"
                                    ? "bg-yellow-500"
                                    : student?.status === "Excused"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }
                            `}
                  >
                    {student?.status}
                  </TableCell>

                  <TableCell className="md:table-cell">
                    {student?.remarks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add this inside the return statement, below the search button */}
      {data?.data?.records?.length > 0 && (
        <ExportAttendance
          attendanceData={data.data.records}
          selectedDate={selectedDate}
        />
      )}

      {isError && (
        <NoRecordFound
          message={"attendance"}
          date={selectedDate}
          className={fetchFormData?.className}
          section={fetchFormData?.section}
          academicYear={fetchFormData?.academicYear}
        />
      )}
    </div>
  );
};

export default CheckAttendance;
