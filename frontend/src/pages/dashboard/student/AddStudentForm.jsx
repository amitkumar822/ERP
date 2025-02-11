import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    admissionNumber: "",
    admissionDate: "",
    rollNumber: "",
    firstName: "",
    lastName: "",
    studentClass: "",
    religion: "",
    category: "",
    primaryContact: "",
    caste: "",
    motherTongue: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    fatherName: "",
    fatherEmail: "",
    fatherMobile: "",
    fatherOccupation: "",
    motherName: "",
    motherEmail: "",
    motherMobile: "",
    motherOccupation: "",
    permanentAddress: "",
    currentAddress: "",
    profileImage: null,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add Student</h1>

      {/* 🟢 Personal Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Academic Year</Label>
            <Select
              onValueChange={(val) =>
                setStudentData({ ...studentData, academicYear: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Academic Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Admission Number</Label>
            <Input
              placeholder="Enter Admission Number"
              value={studentData.admissionNumber}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  admissionNumber: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Admission Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between"
                >
                  {studentData.admissionDate
                    ? format(new Date(studentData.admissionDate), "dd-MM-yyyy")
                    : "Select Date"}
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={studentData.admissionDate}
                  onSelect={(date) =>
                    setStudentData({ ...studentData, admissionDate: date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Roll Number</Label>
            <Input
              placeholder="Enter Roll Number"
              value={studentData.rollNumber}
              onChange={(e) =>
                setStudentData({ ...studentData, rollNumber: e.target.value })
              }
            />
          </div>

          <div>
            <Label>First Name</Label>
            <Input
              placeholder="Enter First Name"
              value={studentData.firstName}
              onChange={(e) =>
                setStudentData({ ...studentData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              placeholder="Enter Last Name"
              value={studentData.lastName}
              onChange={(e) =>
                setStudentData({ ...studentData, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Select Class</Label>
            <Select
              onValueChange={(val) =>
                setStudentData({ ...studentData, studentClass: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Six">Class Six</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Religion</Label>
            <Input
              placeholder="Enter Religion"
              value={studentData.religion}
              onChange={(e) =>
                setStudentData({ ...studentData, religion: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Category</Label>
            <Input
              placeholder="Enter Category"
              value={studentData.category}
              onChange={(e) =>
                setStudentData({ ...studentData, category: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Primary Contact Number</Label>
            <Input
              placeholder="Enter Contact Number"
              value={studentData.primaryContact}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  primaryContact: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between"
                >
                  {studentData.dob
                    ? format(new Date(studentData.dob), "dd-MM-yyyy")
                    : "Select Date"}
                  <CalendarIcon className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={studentData.dob}
                  onSelect={(date) =>
                    setStudentData({ ...studentData, dob: date })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              onValueChange={(val) =>
                setStudentData({ ...studentData, gender: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Upload Profile Image</Label>
            <Input
              placeholder="Slecte Profile Image"
              type="file"
              value={studentData.profileImage}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  profileImage: e.target.files[0],
                })
              }
            />
          </div>

          <div>
            <Label>Blood Group</Label>
            <Select
              onValueChange={(val) =>
                setStudentData({ ...studentData, bloodGroup: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Blood Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Mother Tongue</Label>
            <Input
              placeholder="Enter Mother Tongue"
              value={studentData.motherTongue}
              onChange={(e) =>
                setStudentData({ ...studentData, motherTongue: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Parents & Guardian Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Parents & Guardian Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label>Father's Name</Label>
            <Input
              placeholder="Enter Father's Name"
              value={studentData.fatherName}
              onChange={(e) =>
                setStudentData({ ...studentData, fatherName: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Father's Email</Label>
            <Input
              placeholder="Enter Email"
              value={studentData.fatherEmail}
              onChange={(e) =>
                setStudentData({ ...studentData, fatherEmail: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Father's Mobile Number</Label>
            <Input
              placeholder="Enter Mobile Number"
              value={studentData.fatherMobile}
              onChange={(e) =>
                setStudentData({ ...studentData, fatherMobile: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Mother's Name</Label>
            <Input
              placeholder="Enter Mother's Name"
              value={studentData.motherName}
              onChange={(e) =>
                setStudentData({ ...studentData, motherName: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Mother's Email</Label>
            <Input
              placeholder="Enter Email"
              value={studentData.motherEmail}
              onChange={(e) =>
                setStudentData({ ...studentData, motherEmail: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Mother's Mobile Number</Label>
            <Input
              placeholder="Enter Mobile Number"
              value={studentData.motherMobile}
              onChange={(e) =>
                setStudentData({ ...studentData, motherMobile: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* 📌 Submit Button */}
      <div className="text-center">
        <Button className="bg-blue-500 w-full md:w-1/4">Submit</Button>
      </div>
    </div>
  );
};

export default AddStudentForm;
