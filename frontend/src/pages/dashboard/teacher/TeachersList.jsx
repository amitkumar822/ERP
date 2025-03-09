import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Eye, UserSquareIcon } from "lucide-react";
import { format } from "date-fns";
import {
  useGetAllTeacherQuery,
  useRemoveTeacherMutation,
} from "@/redux/features/api/teacherApi";
import { ViewDetails } from "@/components/dashboard/ViewDetails";
import DeleteClassModal from "@/components/deleteModel/DeleteClassModal";
import { toast } from "react-toastify";
import { MiniLoadingPage } from "@/components/MiniLoadingPage";

const TeachersList = () => {
  const { data, isLoading, refetch } = useGetAllTeacherQuery();

  const [viewTeacherDetailsDialog, setViewTeacherDetailsDialog] =
    useState(false);
  const [teacherDetails, setTeacherDetails] = useState({});

  const toggleViewTeacherDetailsDialog = (teacherDetails) => {
    setViewTeacherDetailsDialog((prev) => !prev);
    setTeacherDetails(teacherDetails);
  };

  //& ****************👇Start Delete Student 👇***********************
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [teacherId, setTeacherId] = useState("");

  const [
    removeTeacher,
    {
      data: removeData,
      isError: reomveError,
      isLoading: removeIsLoading,
      isSuccess,
      error,
    },
  ] = useRemoveTeacherMutation();

  const handleRemoveTeacher = async () => {
    await removeTeacher(teacherId);
  };

  useEffect(() => {
    if (reomveError && error) {
      toast.error(error?.data?.message || "Failed to remove");
    } else if (isSuccess) {
      setDeleteModalOpen(false);
      refetch();
      toast.success(removeData?.message || "Successfully removed!");
    }
  }, [reomveError, error, isSuccess]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center mb-6">
        <UserSquareIcon className="h-7 w-7 mr-2 text-blue-600" />
        <h1 className="md:text-2xl text-base font-semibold text-center text-gray-800">
          Meet Our Dedicated Teachers
        </h1>
      </div>

      {/* 📌 Optimized Teachers Table */}
      {isLoading ? <MiniLoadingPage /> : <Card>
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
                            className="cursor-pointer"
                            onClick={() =>
                              toggleViewTeacherDetailsDialog(teacher)
                            }
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer"
                          >
                            <Pencil className="w-5 h-5 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() => {
                              setDeleteModalOpen(true),
                                setTeacherId(teacher?._id);
                            }}
                            // onClick={() => handleRemoveTeacher(teacher._id)}
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
      </Card>}

      {/* Teacher Details Show Dilog */}
      <div>
        <ViewDetails
          data={teacherDetails}
          title="Teacher Details"
          open={viewTeacherDetailsDialog}
          onClose={setViewTeacherDetailsDialog}
        />
      </div>

      {/* Class Delete Model */}
      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleRemoveTeacher}
        message={"Teacher"}
        isPending={removeIsLoading}
      />
    </div>
  );
};

export default TeachersList;
