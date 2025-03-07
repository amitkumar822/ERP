import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Loader2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetClassDetailsOnlyQuery } from "@/redux/features/api/classesApi";
import {
  useGetStudentSameClassWiseMutation,
  usePromoteStudentsMutation,
} from "@/redux/features/api/studentApi";
import { toast } from "react-toastify";
import { LoadingPage } from "@/components/LoadingPage";

export default function StudentPromotion() {
  // ****************👇Start Class & Students Functionality👇******************
  // fetch class details from database
  const { data: classDetails } = useGetClassDetailsOnlyQuery();
  // fetch student details from database
  const [getStudentSameClassWise, { data: studentList, isLoading }] =
    useGetStudentSameClassWiseMutation();

  //store class id to search student
  const [fromClassId, setFromClassId] = useState("");
  const [toClassId, setToClassId] = useState("");

  // search student
  const handleSearchedStudent = async () => {
    if (fromClassId) {
      await getStudentSameClassWise({ classId: fromClassId });
    }
  };
  // ****************��End Class & Students Functionality��******************

  //~ ***********👇 Start Student Promotion Functionality 👇************
  const [studentIdList, setStudentIdList] = useState([]);

  const togglePromotion = (id) => {
    setStudentIdList(
      (prev) =>
        Array.isArray(prev) // Ensure prev is always an array
          ? prev.includes(id)
            ? prev.filter((studentId) => studentId !== id) // Remove if exists
            : [...prev, id] // Add if not exists
          : [id] // If prev somehow turns into an object, reset it to an array
    );
  };

  // API cal
  const [promoteStudents, { isSuccess, isLoading: isPromoteLoading, error }] =
    usePromoteStudentsMutation();

  const handlePromotionSubmit = async () => {
    if (!toClassId) {
      alert("To Class is required");
      return;
    }
    if (fromClassId === toClassId) {
      alert("From Class and To Class can't be same");
      return;
    }
    if (studentIdList.length === 0) {
      alert("No students selected");
      return;
    }

    await promoteStudents({
      newClassId: toClassId,
      studentsID: studentIdList,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Successfully Promoted Student!");
      setStudentIdList([]);
      setToClassId("");
      setFromClassId("");
      handleSearchedStudent();
    } else if (error) {
      alert(error?.data?.message || "Failed to Promote Student!");
    }
  }, [error, isSuccess]);

  //~ ***********👆 End Student Promotion Functionality 👆************

  return (
    <div className="p-5">
      <Card>
        <CardHeader className="py-3">
          <CardTitle
            htmlFor="class-select"
            className="font-medium flex items-center gap-2"
          >
            <ArrowUpRight className="w-6 h-6 text-blue-500" /> Student Promotion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4 items-center justify-center">
            <div>
              <Label htmlFor="class-select">Select Class (From)</Label>
              <Select
                id="class-select"
                onValueChange={(value) => setFromClassId(value)}
                required
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classDetails?.data?.length > 0 ? (
                    classDetails?.data?.map((classItem) => (
                      <SelectItem key={classItem?._id} value={classItem?._id}>
                        {classItem?.className} - {classItem?.sections} (
                        {classItem?.academicYear})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No Classes Found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="to-class-select">Select Class (To)</Label>
              <Select
                id="to-class-select"
                onValueChange={(value) => setToClassId(value)}
                required
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classDetails?.data?.length > 0 ? (
                    classDetails?.data?.map((classItem) => (
                      <SelectItem key={classItem?._id} value={classItem?._id}>
                        {classItem?.className} - {classItem?.sections} (
                        {classItem?.academicYear})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No Classes Found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="md:mt-7">
              <Button
                className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
                onClick={handleSearchedStudent}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Please Wait...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <Search size={18} />
                    Search Students
                  </span>
                )}
              </Button>
            </div>
          </Card>
        </CardContent>
      </Card>

      {/* Students List */}
      {studentList?.data ? (
        <Card className="p-6 shadow-lg rounded-xl border border-gray-300 mt-3">
          <div className="overflow-auto max-h-[30rem]">
            <Table className="border border-gray-300 w-full">
              <TableHeader className="sticky top-0 bg-gray-100 z-10">
                <TableRow className="border-b border-gray-300">
                  <TableHead className="p-2">Roll No</TableHead>
                  <TableHead className="p-2">Name</TableHead>
                  <TableHead className="p-2">Father Name</TableHead>
                  <TableHead className="p-2">Contact Number</TableHead>
                  <TableHead className="p-2">Promote</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentList?.data?.map((student) => (
                  <TableRow
                    key={student._id}
                    className="border-b border-gray-300"
                  >
                    <TableCell className="p-2">{student.rollNumber}</TableCell>
                    <TableCell className="p-2">{student.fullName}</TableCell>
                    <TableCell className="p-2">{student.fatherName}</TableCell>
                    <TableCell  className="p-2 hover:text-blue-700 text-blue-500 hover:underline ">
                      <a href={`tel:${student.fatherNumber}`}>
                        {student.fatherNumber}
                      </a>
                    </TableCell>
                    <TableCell className="p-2">
                      <Switch
                        checked={studentIdList.includes(student._id)}
                        onCheckedChange={() => togglePromotion(student._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            className="mt-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 border border-gray-300 hover:border-blue-500 transition-all"
            onClick={handlePromotionSubmit}
            disabled={studentIdList.length === 0 || isPromoteLoading}
          >
            {isPromoteLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Please Wait...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                Promote Selected
              </span>
            )}
          </Button>
        </Card>
      ) : (
        <Card className="p-4 mt-4">
          {!isLoading ? (
            <LoadingNotSelectFromClass />
          ) : (
            <LoadingPage title="Student Promotion" />
          )}
        </Card>
      )}
    </div>
  );
}

const LoadingNotSelectFromClass = () => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        <span role="img" aria-label="info">
          ℹ️
        </span>{" "}
        To promote students, please follow these steps:
      </p>
      <ol className="list-decimal list-inside text-sm text-gray-600 mt-2">
        <li>
          <span role="img" aria-label="search">
            🔍
          </span>{" "}
          Search for students.
        </li>
        <li>
          <span role="img" aria-label="select">
            👆
          </span>{" "}
          Select a class from the search results.
        </li>
      </ol>
      <p className="mt-4 text-red-500">
        <span role="img" aria-label="warning">
          ⚠️
        </span>{" "}
        No class selected. Please search and select a class.
      </p>
    </div>
  );
};
