import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Eye, CalendarDays } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useGetAllTeacherQuery } from "@/redux/features/api/teacherApi";
import { ViewDetails } from "@/components/dashboard/ViewDetails";

const teachersData = [
  {
    id: 1,
    img: "https://via.placeholder.com/50",
    name: "John Doe",
    department: "Mathematics",
    gender: "Male",
    education: "M.Sc",
    mobile: "9876543210",
    email: "john@example.com",
    joiningDate: new Date(2020, 4, 12),
  },
  {
    id: 2,
    img: "https://via.placeholder.com/50",
    name: "Sarah Smith",
    department: "Science",
    gender: "Female",
    education: "Ph.D",
    mobile: "9876543220",
    email: "sarah@example.com",
    joiningDate: new Date(2019, 2, 10),
  },
];

const TeachersList = () => {
  const { data, isError, isLoading } = useGetAllTeacherQuery();

  const [viewTeacherDetailsDialog, setViewTeacherDetailsDialog] =
    useState(false);
  const [teacherDetails, setTeacherDetails] = useState({});

  const toggleViewTeacherDetailsDialog = (teacherDetails) => {
    setViewTeacherDetailsDialog((prev) => !prev);
    setTeacherDetails(teacherDetails);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Teachers List</h1>

      {/* 📌 Optimized Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teachers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto whitespace-nowrap">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr No</TableHead>
                  <TableHead>Img</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Qualification</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.length > 0 ? (
                  data?.data?.map((teacher, index) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          src={
                            teacher?.img ||
                            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                          }
                          alt="Teacher"
                          className="w-10 h-10 rounded-full"
                        />
                      </TableCell>
                      <TableCell>{teacher.fullName}</TableCell>
                      <TableCell>{teacher?.designation}</TableCell>
                      <TableCell>{teacher.gender}</TableCell>
                      <TableCell>{teacher.qualification}</TableCell>
                      <TableCell className="hover:text-blue-700 text-blue-500 hover:underline ">
                        <a href={`tel:${teacher.phoneNumber}`}>
                          {teacher.phoneNumber}
                        </a>
                      </TableCell>
                      <TableCell className="hover:text-pink-700 text-pink-500 hover:underline ">
                        <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                      </TableCell>
                      <TableCell>
                        {format(teacher.joiningDate, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              toggleViewTeacherDetailsDialog(teacher)
                            }
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Pencil className="w-5 h-5 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(teacher.id)}
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="9" className="text-center py-4">
                      No Teachers Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Details Show Dilog */}
      <div>
        <ViewDetails
          data={teacherDetails}
          title="Teacher Details"
          open={viewTeacherDetailsDialog}
          onClose={setViewTeacherDetailsDialog}
        />
      </div>
    </div>
  );
};

export default TeachersList;
