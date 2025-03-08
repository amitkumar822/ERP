import { useEffect, useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit, Trash } from "lucide-react";
import { Link } from "react-router";
import API from "@/api/axiosInstance";
import DeleteClassModal from "@/components/deleteModel/DeleteClassModal";
import { toast } from "react-toastify";
import { useGetStudentListQuery } from "@/redux/features/api/studentApi";
import { ViewDetails } from "@/components/dashboard/ViewDetails";

export default function StudentList() {
  // **************👇 Start Fetch All Student Details 👇*********************
  const { data } = useGetStudentListQuery();

  const [allStudentsList, setAllStudentsList] = useState(data?.data || []);
  const [filteredList, setFilteredList] = useState(data?.data || []);

  useEffect(() => {
    if (data?.data) {
      setAllStudentsList(data.data);
      setFilteredList(data.data);
    }
  }, [data]);

  // **************👆 End Fetch All Student Details 👆***********************

  //~ ****************👇 Start Search Functionality 👇***********************
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredList(allStudentsList);
      return;
    }

    const filtered = allStudentsList
      .map((group) => {
        const filteredStudents = group.students.filter((student) => {
          const query = searchQuery.toLowerCase().trim();
          return (
            student.fullName.toLowerCase().includes(query) ||
            student.fatherName.toLowerCase().includes(query) ||
            student.fatherNumber.includes(query) ||
            String(student.rollNumber).includes(query)
          );
        });

        // Keep the group only if it has matching students
        if (filteredStudents.length > 0) {
          return { ...group, students: filteredStudents };
        }
        return null; // Remove groups with no matching students
      })
      .filter(Boolean); // Remove null values (empty class groups)

    setFilteredList(filtered);
  }, [searchQuery, allStudentsList]);
  //~ ****************👆 End Search Functionality 👆***********************

  // ****************👇Start Open Dilog Box View Student Details 👇***********************
  const [viewStudentDetailsDialog, setViewStudentDetailsDialog] =
    useState(false);
  const [studentDetails, setStudentDetails] = useState({});

  const toggleViewStudentDetailsDialog = (studentDetails) => {
    setViewStudentDetailsDialog((prev) => !prev);
    setStudentDetails(studentDetails);
  };
  // ****************👆 End Open Dilog Box View Student Details 👆*************************

  //& ****************👇Start Delete Student 👇***********************
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState("");
  const [isPendingDeleteStudent, setIsPendingDeleteStudent] = useTransition();

  const handleDelete = () => {
    setIsPendingDeleteStudent(async () => {
      try {
        const { data } = await API.delete(
          `/students/delete/${deleteStudentId}`
        );
        toast.success(data?.message || "Successfully Student Deleted!");
        setDeleteModalOpen(false);
      } catch (error) {
        toast.error(error?.response?.data.message || "faild to delete Student");
        console.error("Error Student Deleted Time: \n", error);
      }
    });
  };
  //& ****************👆 End Delete Student 👆***********************

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          placeholder="Search by Name, Father's Name, Phone, Roll No..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3"
        />

        <Link to="/students/admission-form">
          <Button className="bg-blue-500 w-full sm:w-auto cursor-pointer">
            + Add New
          </Button>
        </Link>
      </div>

      <Card className="p-4">
        {filteredList?.map((classGroup, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg shadow-lg">
            {/* Class Header */}
            <h2 className="text-lg font-bold">
              {classGroup._id.className} - {classGroup._id.section} (
              {classGroup._id.academicYear})
            </h2>
            <h1 className="text-lg text-green-600 font-semibold">
              Total Students: ({classGroup?.students?.length})
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No</TableHead>
                  <TableHead>Img</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Father & Mother</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Father Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classGroup.students?.map((student, index) => (
                  <TableRow key={student._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={
                          student?.img ||
                          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        }
                        className="w-10 h-10 rounded-full"
                        alt="Student"
                      />
                    </TableCell>
                    {/* <TableCell>{student.fullName}</TableCell> */}
                    <TableCell
                      className={`${
                        searchQuery &&
                        student.fullName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                          ? "bg-yellow-200"
                          : ""
                      } rounded-lg`}
                    >
                      {student.fullName}
                    </TableCell>

                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>
                      {student.fatherName} <br /> {student.motherName}
                    </TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell className="hover:text-blue-700 text-blue-500 hover:underline ">
                      <a href={`tel:${student.fatherNumber}`}>
                        {student.fatherNumber}
                      </a>
                    </TableCell>
                    <TableCell
                      className={
                        student.paymentStatus === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {student.status || "N/A"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => toggleViewStudentDetailsDialog(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setDeleteModalOpen(true),
                            setDeleteStudentId(student?._id);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </Card>

      {/* Studetn Details Show Dilog */}
      <div>
        <ViewDetails
          data={studentDetails}
          title="Student Details"
          open={viewStudentDetailsDialog}
          onClose={setViewStudentDetailsDialog}
        />
      </div>

      {/* Class Delete Model */}
      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={"Student"}
        isPending={isPendingDeleteStudent}
      />
    </div>
  );
}
