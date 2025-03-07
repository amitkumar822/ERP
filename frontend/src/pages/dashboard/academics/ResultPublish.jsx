import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import {
  BookOpen,
  User,
  Hash,
  Layers,
  Atom,
  FlaskConical,
  BrainCircuit,
  HeartPulse,
  Globe,
  Leaf,
  Scroll,
  Award,
  BookText,
  Search,
  UserCircle,
  UserRoundCheck,
  UserCheckIcon,
  UserCheck,
} from "lucide-react";
import { useGetClassDetailsOnlyQuery } from "@/redux/features/api/classesApi";
import { useState } from "react";
import { useGetStudentSameClassWiseMutation } from "@/redux/features/api/studentApi";

const ResultPublish = () => {
  // fetch class details from database
  const { data: classDetails } = useGetClassDetailsOnlyQuery();
  // store class id for search students list in the database
  const [classId, setClassId] = useState("");
  // fetch student details from database
  const [getStudentSameClassWise, { data: studentList, isLoading }] =
    useGetStudentSameClassWiseMutation();

  const handleSearchStudentList = async () => {
    if (classId) {
      await getStudentSameClassWise({ classId });
    } else {
      toast.error("Please select a class!");
    }
  };

  const [singleStudentDetails, setSingleStudentDetails] = useState("");

  const { handleSubmit, control, register, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Result Data:", data);
    toast.success("Result Published Successfully!");
    // reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 md:p-4">
      <Card className="w-full max-w-7xl shadow-lg rounded-lg ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" /> Publish Student
            Result
          </CardTitle>

          <Card className="md:p-4 p-1 grid lg:grid-cols-2 grid-cols-1 gap-4 justify-center items-center bg-green-200">
            <Card className="p-2">
              <div>
                <Label htmlFor="class-select">
                  Select the class for result publication
                </Label>
                <div className="grid md:grid-cols-[70%_auto] grid-cols-[60%_auto] gap-4 justify-center items-center">
                  <div className="flex items-center gap-2 border rounded-md p-2">
                    <Layers size={20} />
                    <Select
                      id="class-select"
                      onValueChange={(value) => setClassId(value)}
                    >
                      <SelectTrigger className="mt-2 w-full">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classDetails?.data?.length > 0 ? (
                          classDetails?.data?.map((classItem) => (
                            <SelectItem
                              key={classItem?._id}
                              value={classItem?._id}
                            >
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
                  <div className="mt-4">
                    <Button
                      onClick={handleSearchStudentList}
                      className="bg-blue-700 hover:bg-blue-800 duration-300 ease-in-out cursor-pointer"
                    >
                      <Search /> Search
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="grid grid-cols-1 gap-4 justify-center items-center p-2">
              <div>
                <Label htmlFor="class-select">
                  Select a student to publish results.
                </Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <UserCircle size={25} />
                  <Select
                    id="class-select"
                    onValueChange={(value) => setSingleStudentDetails(value)}
                  >
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {studentList?.data?.length > 0 ? (
                        studentList?.data?.map((student) => (
                          <SelectItem key={student?._id} value={student}>
                            {student?.rollNumber} - {student?.fullName} (
                            {student?.fatherName})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled>No Classes Found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </Card>
        </CardHeader>

        <CardContent className="-mt-3">
          <Card className="md:p-4 p-2 bg-pink-50">
            <CardTitle className="border-b pb-1">
              <UserCheck size={20} className="inline-block mr-2" />
              Auto-Fill Student Details
            </CardTitle>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
              <div>
                <Label htmlFor="studentName">Student Name</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <User size={20} />
                  <Input
                    id="studentName"
                    value={singleStudentDetails?.fullName || ""}
                    placeholder="Student Name Automatically Updated"
                    className="border p-2 rounded-md"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rollNumber">Roll Number</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <Hash size={20} />
                  <Input
                    id="rollNumber"
                    value={singleStudentDetails?.rollNumber || ""}
                    placeholder="Roll Number Automatically Updated"
                    className="border p-2 rounded-md"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rollNumber">Father Name</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <UserRoundCheck size={20} />
                  <Input
                    id="rollNumber"
                    value={singleStudentDetails?.fatherName || ""}
                    placeholder="Father Name Automatically Updated"
                    className="border p-2 rounded-md"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rollNumber">Mother Name</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <UserCheckIcon size={20} />
                  <Input
                    id="rollNumber"
                    value={singleStudentDetails?.motherName || ""}
                    placeholder="Mother Name Automatically Updated"
                    className="border p-2 rounded-md"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Form Section */}
          <Card className="mt-2 md:p-4 p-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 md:grid-cols-2 grid-cols-1"
            >
              {subjects.map(({ name, label, icon: Icon }) => (
                <div key={name}>
                  <Label htmlFor={name}>{label}</Label>
                  <div className="flex items-center gap-2 border rounded-md p-2">
                    <Icon size={20} />
                    <Input
                      id={name}
                      {...register(`[${name}]`)}
                      type="number"
                      placeholder="Enter Marks (0 - 100)"
                      className="border p-2 rounded-md"
                      max="100"
                    />
                  </div>
                </div>
              ))}
              <div className="md:col-span-2 flex justify-center items-center">
              <Button
                type="submit"
                className="md:w-1/3 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 cursor-pointer"
              >
                Publish Result
              </Button>
              </div>
            </form>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPublish;

const subjects = [
  { name: "english",label: "English", icon: BookOpen },
  { name: "mathematics",label: "Mathematics", icon: Atom },
  { name: "science",label: "Science", icon: FlaskConical },
  { name: "socialScience",label: "Social Science", icon: Globe },
  { name: "hindi",label: "Hindi", icon: BookText },
  { name: "computerScience",label: "Computer Science", icon: BrainCircuit },
  { name: "physicalEducation",label: "Physical Education", icon: HeartPulse },
  { name: "sanskrit",label: "Sanskrit", icon: Scroll },
  { name: "EVS",label: "EVS", icon: Leaf },
  { name: "generalKnowledge",label: "General Knowledge", icon: Award },
];
