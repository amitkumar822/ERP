import { useEffect, useState, useEffectEvent, useCallback } from "react";
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
import { UserPlusIcon } from "lucide-react";
import API from "../../../api/axiosInstance";

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

  const [fetchClassDetail, setFetchClassDetail] = useState([]);
  const [className, setClassName] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);

   // Use `useCallback` to memoize the fetch function
   const fetchAllClasses = useCallback(async () => {
    try {
      const { data } = await API.get("/class/get-all-class");
      setFetchClassDetail(data?.data || []);
      setClassName(data?.data?.map((item) => item.className) || []);
      setAcademicYear(data?.data?.map((item) => item.academicYear) || []);
    } catch (error) {
      console.error("Error Fetching All Classes: \n", error);
    }
  }, []);

  useEffect(() => {
    fetchAllClasses();
  }, [fetchAllClasses]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center mb-6">
        {" "}
        {/* Center the icon and text */}
        <UserPlusIcon className="h-8 w-8 mr-2 text-blue-500" />{" "}
        {/* Add icon, adjust size and color */}
        <h1 className="text-2xl font-bold">Admission Form</h1>
      </div>

      {/* 🟢 Personal Information */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="academicYear">Academic Year</Label>
            <Select
              id="academicYear"
              onValueChange={(val) =>
                setStudentData({ ...studentData, academicYear: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Academic Year" />
              </SelectTrigger>
              <SelectContent>
                {
                  academicYear?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))
                }
                {/* <SelectItem value="2024">2024</SelectItem> */}
                {/* <SelectItem value="2025">2025</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="admissionNumber">Admission Number</Label>
            <Input
              id="admissionNumber"
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
            <Label htmlFor="admissionDate">Admission Date</Label>
            <Input
              id="admissionDate"
              placeholder="Enter Admission Date"
              type="date"
              value={
                studentData.admissionDate
                  ? new Date(studentData.admissionDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onFocus={(e) => e.target.showPicker()}
              onChange={(e) =>
                setStudentData({
                  ...studentData,
                  admissionDate: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              placeholder="Enter Roll Number"
              value={studentData.rollNumber}
              onChange={(e) =>
                setStudentData({ ...studentData, rollNumber: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter First Name"
              value={studentData.firstName}
              onChange={(e) =>
                setStudentData({ ...studentData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter Last Name"
              value={studentData.lastName}
              onChange={(e) =>
                setStudentData({ ...studentData, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="selectClass">Select Class</Label>
            <Select
              id="selectClass"
              onValueChange={(val) =>
                setStudentData({ ...studentData, studentClass: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {className.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
                {/* <SelectItem value="Six">Class Six</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="religion">Religion</Label>
            <Input
              id="religion"
              placeholder="Enter Religion"
              value={studentData.religion}
              onChange={(e) =>
                setStudentData({ ...studentData, religion: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter Category"
              value={studentData.category}
              onChange={(e) =>
                setStudentData({ ...studentData, category: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="contactNumber">Primary Contact Number</Label>
            <Input
              id="contactNumber"
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
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              placeholder="Enter DOB"
              type="date"
              value={
                studentData.dob
                  ? new Date(studentData.dob).toISOString().split("T")[0]
                  : ""
              }
              onFocus={(e) => e.target.showPicker()}
              onChange={(e) =>
                setStudentData({ ...studentData, dob: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select
              id="gender"
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
            <Label htmlFor="profileImage">Upload Profile Image</Label>
            <Input
              id="profileImage"
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
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Select
              id="bloodGroup"
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
            <Label htmlFor="motherTong">Mother Tongue</Label>
            <Input
              id="motherTong"
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
            <Label htmlFor="father">Father's Name</Label>
            <Input
              id="father"
              placeholder="Enter Father's Name"
              value={studentData.fatherName}
              onChange={(e) =>
                setStudentData({ ...studentData, fatherName: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="fatherEmail">Father's Email</Label>
            <Input
              id="fatherEmail"
              placeholder="Enter Email"
              value={studentData.fatherEmail}
              onChange={(e) =>
                setStudentData({ ...studentData, fatherEmail: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="fatherMobileNumber">Father's Mobile Number</Label>
            <Input
              id="fatherMobileNumber"
              placeholder="Enter Mobile Number"
              value={studentData.fatherMobile}
              onChange={(e) =>
                setStudentData({ ...studentData, fatherMobile: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="mother">Mother's Name</Label>
            <Input
              id="mother"
              placeholder="Enter Mother's Name"
              value={studentData.motherName}
              onChange={(e) =>
                setStudentData({ ...studentData, motherName: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="motherEmail">Mother's Email</Label>
            <Input
              id="motherEmail"
              placeholder="Enter Email"
              value={studentData.motherEmail}
              onChange={(e) =>
                setStudentData({ ...studentData, motherEmail: e.target.value })
              }
            />
          </div>

          <div>
            <Label htmlFor="motherMobile">Mother's Mobile Number</Label>
            <Input
              id="motherMobile"
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
