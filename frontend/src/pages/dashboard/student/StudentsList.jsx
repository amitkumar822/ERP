import { useEffect, useState, use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, Edit, Trash } from "lucide-react";
import { Link, Outlet } from "react-router";
import API from "@/api/axiosInstance";
import StudentDialog from "@/components/dashboard/student/StudentDialog";
import DeleteClassModal from "@/components/deleteModel/DeleteClassModal";

export default function StudentList() {
  const [allStudentsList, setAllStudentsList] = useState([]);

  const fetchAllStudentList = async () => {
    try {
      const { data } = await API.get("/students/get-all-students", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("All Students Fetch: \n", data?.data);
      setAllStudentsList(data?.data);
    } catch (error) {
      console.error("Error fetching all students: ", error);
    }
  };

  useEffect(() => {
    fetchAllStudentList();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = {};

  // ****************👇Start Open Dilog Box View Student Details 👇***********************
  const [viewStudentDetailsDialog, setViewStudentDetailsDialog] =
    useState(false);
  const [studentDetails, setStudentDetails] = useState({});

  const toggleViewStudentDetailsDialog = (studentDetails) => {
    setViewStudentDetailsDialog((prev) => !prev);
    setStudentDetails(studentDetails);
    console.log("Data changed: ", studentDetails);
  };
  // ****************👇End Open Dilog Box View Student Details 👇*************************

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

        <Link to="/students/add">
          <Button className="bg-blue-500 w-full sm:w-auto">+ Add New</Button>
        </Link>
      </div>

      <Card className="p-4">
        {allStudentsList?.map((classGroup, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg shadow-lg">
            {/* Class Header */}
            <h2 className="text-lg font-bold">
              {classGroup._id.className} - {classGroup._id.section} (
              {classGroup._id.academicYear})
            </h2>
            <h1 className="text-lg text-green-600 font-semibold">
              Total Students: ({classGroup?.students.length})
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
                  <TableHead>Payment Status</TableHead>
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
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>
                      {student.fatherName} <br /> {student.motherName}
                    </TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell className="hover:text-blue-700 hover:underline ">
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
                      {student.paymentStatus || "N/A"}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleViewStudentDetailsDialog(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
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
        <StudentDialog
          student={studentDetails}
          open={viewStudentDetailsDialog}
          onClose={setViewStudentDetailsDialog}
        />
      </div>

       {/* Class Delete Model */}
       {/* <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={"Student"}
        isPending={isPendingDeleteClass}
      /> */}
    </div>
  );
}
