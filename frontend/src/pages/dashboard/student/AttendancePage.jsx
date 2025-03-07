import { useState, useMemo, useEffect } from "react";
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
import { format } from "date-fns";
import { useGetClassBySectionAcademicYearClassNameQuery } from "@/redux/features/api/classesApi";
import { useMarkAttendanceMutation } from "@/redux/features/api/attendanceApi";
import ClassSectionAcademicYear from "@/components/dashboard/ClassSectionAcademicYear";
import NoRecordFound from "@/components/dashboard/NoRecordFound";

export default function AttendancePage() {
  //~ attendance records
  const [attendanceRecord, setAttendanceRecord] = useState([
    {
      studentId: "",
      status: "",
      remarks: "",
    },
  ]);

  //^ ***************** 👇 Start Fetch Student Details 👇**************************
  const [fetchFormData, setFormFetchData] = useState({
    className: "",
    section: "",
    academicYear: "",
  });

  const [getAllStudentClass, setGetAllStudentClass] = useState([]);

  const { data: allClasses, error } =
    useGetClassBySectionAcademicYearClassNameQuery(
      {
        academicYear: fetchFormData.academicYear,
        className: fetchFormData.className,
        section: fetchFormData.section,
      },
      {
        skip: !(
          fetchFormData.className &&
          fetchFormData.section &&
          fetchFormData.academicYear
        ),
      }
    );

  useEffect(() => {
    if (error) {
      setGetAllStudentClass([]);
    } else if (allClasses?.data) {
      const classData = allClasses.data[0] || { studentsId: [] };
      setGetAllStudentClass(classData);

      // Initialize attendanceData with all students marked "Present"
      const initialAttendance = classData.studentsId.map((student) => ({
        studentId: student._id,
        status: "Present",
        remarks: "",
      }));
      setAttendanceRecord(initialAttendance);
    }
  }, [allClasses, error]);
  //^ ***************** 👆 End Fetch Student Details 👆**************************

  //& ************** �� Start Make Attendance �� ***************
  const [markAttendance, { isLoading, isError }] = useMarkAttendanceMutation();
  let currentDates = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(currentDates);
  

  const handleChangeAttendanceRecord = (studentId, key, value) => {
    setAttendanceRecord((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, [key]: value } : record
      )
    );
  };

  // Save attendance function (to send to API)
  const handleSaveAttendance = async () => {
    const { data } = await markAttendance({
      date: selectedDate,
      classId: getAllStudentClass?._id,
      // teacherId: "", // Replace with actual teacher ID
      records: attendanceRecord,
    });
    if (data) {
      alert("Attendance saved successfully!");
    } else if (isError) {
      alert("Error saving attendance!");
    }
    console.log("Final Attendance Data:", data);
    // API call to save attendance here
  };
  //& ************** �� End Make Attendance �� ***************

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Search & Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b pb-4">
        <h1 className="text-2xl font-bold">Daily Attendance</h1>
        <Input
          type="text"
          placeholder="Search students..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          required
          className="w-full md:w-64"
        />
      </div>

      {/* Class, Academic Year & Section Selection */}
      <ClassSectionAcademicYear
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        fetchFormData={fetchFormData}
        setFormFetchData={setFormFetchData}
      />

      <div className="mb-4 p-3 bg-yellow-100 rounded-md text-sm dark:text-white dark:bg-gray-900">
        <strong>Current Selection: </strong>
        <span className={error?.data?.message === undefined ? "" : "hidden"}>
          {getAllStudentClass?.className} - {getAllStudentClass?.sections} |{" "}
          {getAllStudentClass?.academicYear}
        </span>
        <span
          className={
            error?.data?.message === undefined
              ? "hidden"
              : "text-red-700 uppercase bg-red-200 p-3"
          }
        >
          {error?.data?.message} With this ({fetchFormData?.className} -{" "}
          {fetchFormData?.section} | {fetchFormData?.academicYear})
        </span>
        <span
          className={
            fetchFormData.className &&
            fetchFormData.section &&
            fetchFormData.academicYear
              ? "hidden"
              : "bg-blue-200 p-3 text-black rounded-md"
          }
        >
          Please Slelect upper👆 Class, Section, and Academic Year get all
          STUDENT
        </span>
      </div>

      {/* Attendance Table */}
      <div className="rounded-md border overflow-x-auto">
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
            {getAllStudentClass?.studentsId?.map((student, index) => (
              <TableRow key={index + student?.fullName}>
                <TableCell className="font-medium">
                  {student.rollNumber}
                </TableCell>
                <TableCell className="font-medium">
                  {student.fullName}
                </TableCell>
                <TableCell className="font-medium">
                  <a
                    className="text-blue-600 hover:text-blue-800 hover:underline duration-300"
                    href={`tel: ${student.fatherNumber}`}
                  >
                    {student.fatherNumber}
                  </a>
                </TableCell>
                <TableCell>
                  <select
                    className="border rounded p-1 dark:bg-gray-900 dark:text-white"
                    value={
                      attendanceRecord.find(
                        (record) => record.studentId === student._id
                      )?.status || "Present"
                    }
                    onChange={(e) =>
                      handleChangeAttendanceRecord(
                        student._id,
                        "status",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Late">Late</option>
                    <option value="Excused">Excused</option>
                  </select>
                </TableCell>
                <TableCell className="md:table-cell">
                  <Input
                    placeholder="Enter remark"
                    maxLength={50}
                    type="text"
                    value={
                      attendanceRecord.find(
                        (record) => record.studentId === student._id
                      )?.remarks || ""
                    }
                    onChange={(e) =>
                      handleChangeAttendanceRecord(
                        student._id,
                        "remarks",
                        e.target.value
                      )
                    }
                    required
                    className="w-48"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          className="w-full md:w-auto cursor-pointer"
          onClick={handleSaveAttendance}
        >
          Submit Attendance
        </Button>
      </div>

      {error && (
        <div className="-mt-15">
          <NoRecordFound
          message={"Class"}
          date={selectedDate}
          className={fetchFormData?.className}
          section={fetchFormData?.section}
          academicYear={fetchFormData?.academicYear}
        />
        </div>
      )}
    </div>
  );
}
