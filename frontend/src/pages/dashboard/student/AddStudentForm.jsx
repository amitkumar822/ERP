import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  PlusCircle,
  SquareDashedBottomIcon,
  UserPlusIcon,
} from "lucide-react";
import API from "../../../api/axiosInstance";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";
import { bloodGroups } from "@/helpers/bloodGroup";
import { toast } from "react-toastify";

const AddStudentForm = () => {
  const [studentData, setStudentData] = useState({
    admissionDate: "",
    rollNumber: "",
    fullName: "",
    studentClass: "",
    studentSection: "",
    academicYear: "",
    religion: "",
    category: "",
    studentNumber: "",
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
    profileImage: "",
  });
  const [sameAddressChecked, setSameAddressChecked] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState({
    permanentAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [currAddress, setCurrAddress] = useState({
    currentAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleSameAddressChecked = () => {
    setSameAddressChecked((prevChecked) => !prevChecked);
  };

  // When sameAddressChecked is true, sync the Current Address with Permanent Address
  useEffect(() => {
    if (sameAddressChecked) {
      setCurrAddress({
        currentAddress: permanentAddress.permanentAddress,
        city: permanentAddress.city,
        state: permanentAddress.state,
        zipCode: permanentAddress.zipCode,
      });
    } else {
      setCurrAddress({
        currentAddress: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  }, [permanentAddress, sameAddressChecked]);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      admissionDate: studentData.admissionDate,
      rollNumber: studentData.rollNumber,
      fullName: studentData.fullName,
      className: studentData.studentClass,
      section: studentData.studentSection,
      academicYear: studentData.academicYear,
      religion: studentData.religion,
      category: studentData.category,
      studentNumber: studentData.studentNumber,
      caste: studentData.caste,
      motherTongue: studentData.motherTongue,
      studentEmail: studentData.studentEmail,
      dob: studentData.dob,
      gender: studentData.gender,
      bloodGroup: studentData.bloodGroup,
      fatherName: studentData.fatherName,
      fatherNumber: studentData.fatherMobile,
      fatherOccupation: studentData.fatherOccupation,
      motherName: studentData.motherName,
      motherNumber: studentData.motherMobile,

      permanentAddress: permanentAddress,
      currentAddress: currAddress,
    };

    startTransition(async () => {
      try {
        await API.post("/students/add", formData);

        toast.success("Student added successfully!");
      } catch (error) {
        console.error("Error while student form fill time: \n", error);
        toast.error(
          error?.response?.data.message ||
            "Failed to add student. Please try again."
        );
      }
    });
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
                value={studentData.studentNumber}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    studentNumber: e.target.value,
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
                value={permanentAddress.permanentAddress}
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    permanentAddress: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="permanentCity">City</Label>
                <Input
                  id="permanentCity"
                  placeholder="Enter City"
                  value={permanentAddress.city}
                  onChange={(e) =>
                    setPermanentAddress({
                      ...permanentAddress,
                      city: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="permanentState">State</Label>
                <Input
                  id="permanentState"
                  placeholder="Enter State"
                  value={permanentAddress.state}
                  onChange={(e) =>
                    setPermanentAddress({
                      ...permanentAddress,
                      state: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="permanentPincode">Pincode</Label>
                <Input
                  id="permanentPincode"
                  placeholder="Enter Pincode"
                  value={permanentAddress.zipCode}
                  onChange={(e) =>
                    setPermanentAddress({
                      ...permanentAddress,
                      zipCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Toggle Same Address */}
            <div className="col-span-3 flex items-center gap-2">
              <input
                type="checkbox"
                id="sameAddress"
                checked={sameAddressChecked}
                onChange={handleSameAddressChecked}
              />
              <label htmlFor="sameAddress" className="cursor-pointer">
                Same as Permanent Address
              </label>
            </div>

            {/* Current Address */}
            <div className="col-span-3">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Input
                id="currentAddress"
                placeholder="Enter Current Address"
                value={currAddress.currentAddress}
                onChange={(e) =>
                  setCurrAddress({
                    ...currAddress,
                    currentAddress: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentCity">City</Label>
                <Input
                  id="currentCity"
                  placeholder="Enter City"
                  value={currAddress.city}
                  onChange={(e) =>
                    setCurrAddress({
                      ...currAddress,
                      city: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="currentState">State</Label>
                <Input
                  id="currentState"
                  placeholder="Enter State"
                  value={currAddress.state}
                  onChange={(e) =>
                    setCurrAddress({
                      ...currAddress,
                      state: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="currentPincode">Pincode</Label>
                <Input
                  id="currentPincode"
                  placeholder="Enter Pincode"
                  value={currAddress.zipCode}
                  onChange={(e) =>
                    setCurrAddress({
                      ...currAddress,
                      zipCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 📌 Submit Button */}
        <div className="text-center">
          <Button
            disabled={isPending}
            type="submit"
            className="bg-blue-500 w-full md:w-1/4 cursor-pointer"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Please Wait...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                Submit
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
