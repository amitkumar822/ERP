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
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";
import { bloodGroups } from "@/helpers/bloodGroup";

const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    admissionDate: "",
    rollNumber: "",
    fullName: "",
    studentClass: "",
    studentSection: "",
    religion: "",
    category: "",
    primaryContact: "",
    caste: "",
    motherTongue: "",
    studentEmail: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    fatherName: "",
    fatherMobile: "",
    fatherOccupation: "",
    motherName: "",
    motherMobile: "",
    motherOccupation: "",
    permanentAddress: "",
    currentAddress: "",
    profileImage: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Click");
    console.log("studentData: ", studentData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center mb-6">
        {" "}
        {/* Center the icon and text */}
        <UserPlusIcon className="h-8 w-8 mr-2 text-blue-500" />{" "}
        {/* Add icon, adjust size and color */}
        <h1 className="text-2xl font-bold">Admission Form</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 🟢 Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Ex. Ram Kumar"
                value={studentData.fullName}
                onChange={(e) =>
                  setStudentData({ ...studentData, fullName: e.target.value })
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
                  {classNames.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="Six">Class Six</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="selectClass">Student Section</Label>
              <Select
                id="selectClass"
                onValueChange={(val) =>
                  setStudentData({ ...studentData, studentSection: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Student Section" />
                </SelectTrigger>
                <SelectContent>
                  {sections?.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="Six">Class Six</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                placeholder="Ex. 2025-2026"
                value={studentData.academicYear}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    academicYear: e.target.value,
                  })
                }
              />
              {/* <Select
              id="academicYear"
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
            </Select> */}
            </div>

            <div>
              <Label htmlFor="caste">Caste</Label>
              <Input
                id="caste"
                placeholder="Ex. Rajput"
                value={studentData.caste}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    caste: e.target.value,
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
                placeholder="Ex. 01"
                value={studentData.rollNumber}
                onChange={(e) =>
                  setStudentData({ ...studentData, rollNumber: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                placeholder="Ex. Hindu"
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
                placeholder="Ex. OBC"
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
                placeholder="Ex. 1234569870"
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
                  <SelectItem value="Other">Other</SelectItem>
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
                  {bloodGroups.map((blood) => (
                    <SelectItem value={blood} key={blood}>
                      {blood}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="B+">B+</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="motherTong">Mother Tongue</Label>
              <Input
                id="motherTong"
                placeholder="Ex. Hindi"
                value={studentData.motherTongue}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    motherTongue: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="studentEmail">Email</Label>
              <Input
                id="studentEmail"
                placeholder="Ex. abcd@gmail.com"
                value={studentData.studentEmail}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    studentEmail: e.target.value,
                  })
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
              <Label htmlFor="fatherOccupation">Father's Occupation</Label>
              <Input
                id="fatherOccupation"
                placeholder="Enter Occupation"
                value={studentData.fatherOccupation}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    fatherOccupation: e.target.value,
                  })
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
                  setStudentData({
                    ...studentData,
                    fatherMobile: e.target.value,
                  })
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
              <Label htmlFor="motherOccupation">Mother's Occupation</Label>
              <Input
                id="motherOccupation"
                placeholder="Enter Occupation"
                value={studentData.motherOccupation}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    motherOccupation: e.target.value,
                  })
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
                  setStudentData({
                    ...studentData,
                    motherMobile: e.target.value,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Address</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Permanent Address */}
            <div className="col-span-3">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Input
                id="permanentAddress"
                placeholder="Enter Permanent Address"
                value={studentData.permanentAddress}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    permanentAddress: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="permanentCity">City</Label>
              <Input
                id="permanentCity"
                placeholder="Enter City"
                value={studentData.permanentCity}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    permanentCity: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="permanentState">State</Label>
              <Input
                id="permanentState"
                placeholder="Enter State"
                value={studentData.permanentState}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    permanentState: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="permanentPincode">Pincode</Label>
              <Input
                id="permanentPincode"
                placeholder="Enter Pincode"
                value={studentData.permanentPincode}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    permanentPincode: e.target.value,
                  })
                }
              />
            </div>

            {/* Current Address */}
            <div className="col-span-3">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Input
                id="currentAddress"
                placeholder="Enter Current Address"
                value={studentData.currentAddress}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    currentAddress: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="currentCity">City</Label>
              <Input
                id="currentCity"
                placeholder="Enter City"
                value={studentData.currentCity}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    currentCity: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="currentState">State</Label>
              <Input
                id="currentState"
                placeholder="Enter State"
                value={studentData.currentState}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    currentState: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="currentPincode">Pincode</Label>
              <Input
                id="currentPincode"
                placeholder="Enter Pincode"
                value={studentData.currentPincode}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    currentPincode: e.target.value,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* 📌 Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="bg-blue-500 w-full md:w-1/4 cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
