import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import AddressCurrentPermanent from "@/components/dashboard/AddressCurrentPermanent";
import { FileJsonIcon, UserPlus } from "lucide-react";
import { useJoiningTeacherMutation } from "@/redux/features/api/teacherApi";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function JoiningTeacher() {
  const [teacherData, setTeacherData] = useState({
    fullName: "",
    email: "",
    joiningDate: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    designation: "",
    dob: "",
    qualification: "",
    profileImage: null,
    document: null,
    identification: "",
    experience: "",
    previousInstitutionName: "",
    extracurricularActivities: "",
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

  const [preview, setPreview] = useState({
    profileImage: null,
    document: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setTeacherData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({
        ...prev,
        [name]: name === "profileImage" ? URL.createObjectURL(file) : file.name,
      }));
    }
  };

  const removeFile = (name) => {
    setTeacherData((prev) => ({ ...prev, [name]: null }));
    setPreview((prev) => ({ ...prev, [name]: null }));
  };

  const [joiningTeacher, { data, error, isLoading, isSuccess }] =
    useJoiningTeacherMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await joiningTeacher({
      fullName: teacherData?.fullName,
      email: teacherData?.email,
      joiningDate: teacherData?.joiningDate,
      password: teacherData?.password,
      phoneNumber: teacherData?.phoneNumber,
      gender: teacherData?.gender,
      designation: teacherData?.designation,
      dob: teacherData?.dob,
      qualification: teacherData?.qualification,
      profileImage: teacherData?.profileImage,
      document: teacherData?.document,
      identification: teacherData?.identification,
      experience: teacherData?.experience,
      previousInstitutionName: teacherData?.previousInstitutionName,
      extracurricularActivities: teacherData?.extracurricularActivities,
      permanentAddress,
      currentAddress: currAddress,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Successfully Joined Teacher!");
    } else if (error) {
      alert(error?.data?.message || "Failed to submit");
    }
  }, [error, isSuccess]);

  return (
    <div className="w-full mx-auto md:p-6 p-2 pt-5 bg-white shadow rounded-md dark:bg-gray-900 dark:text-white">
      <div>
        <h1 className="md:text-2xl font-bold mb-6 flex justify-center items-center gap-3">
          <UserPlus className="md:h-8 md:w-8 text-blue-500" /> Welcome New
          Educator!
        </h1>
      </div>

      <Card className="md:p-4 p-2">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 grid-cols-1 gap-4"
        >
          {/* First Name */}
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Ex. Ram Kumar"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              name="phoneNumber"
              placeholder="Ex. +91 9876543210"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Identification */}
          <div>
            <Label htmlFor="identification">Identification</Label>
            <Input
              id="identification"
              type="text"
              name="identification"
              placeholder="Ex. Aadhaar card, passport"
              onChange={handleInputChange}
            />
          </div>

          {/* Joining Date */}
          <div>
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input
              id="joiningDate"
              type="date"
              name="joiningDate"
              placeholder="Ex. 2021-12-31"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Ex. example@gmail.com"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              className="border rounded p-2 w-full dark:bg-gray-900 dark:text-white"
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              type="text"
              name="designation"
              placeholder="Ex. Mathematics Teacher"
              onChange={handleInputChange}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              name="dob"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Qualification */}
          <div>
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              type="text"
              name="qualification"
              placeholder="Ex. M.Sc, PhD in Mathematics"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Teaching Experience */}
          <div>
            <Label htmlFor="teachingExperience">
              Total Years of Teaching Experience
            </Label>
            <Input
              id="teachingExperience"
              type="text"
              name="experience"
              placeholder="Ex. 2 years"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Previous Institution Name */}
          <div>
            <Label htmlFor="previousInstitutionName">
              Previous Institution Name
            </Label>
            <Input
              id="previousInstitutionName"
              type="text"
              name="previousInstitutionName"
              placeholder="Ex. xyz School"
              onChange={handleInputChange}
            />
          </div>

          {/* Extracurricular Activities */}
          <div>
            <Label htmlFor="extracurricularActivities">
              Extracurricular Activities
            </Label>
            <Input
              id="extracurricularActivities"
              type="text"
              name="extracurricularActivities"
              placeholder="Ex. 'Faculty Advisor,' 'Sports Coach'"
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a secure password"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Profile Image Upload */}
          <div>
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              id="profileImage"
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview.profileImage && (
              <div className="relative w-24 h-24 mt-2 border rounded overflow-hidden">
                <img
                  src={preview.profileImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeFile("profileImage")}
                >
                  ✖
                </button>
              </div>
            )}
          </div>

          {/* Document Upload */}
          <div>
            <Label htmlFor="document">Document (PDF)</Label>
            <Input
              id="document"
              type="file"
              name="document"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
            {preview.document && (
              <div className="flex items-center gap-2 mt-2 border p-2 rounded bg-gray-100">
                <span className="truncate">{preview.document}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => removeFile("document")}
                >
                  ✖
                </button>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <AddressCurrentPermanent
              sameAddressChecked={sameAddressChecked}
              setSameAddressChecked={setSameAddressChecked}
              permanentAddress={permanentAddress}
              setPermanentAddress={setPermanentAddress}
              currAddress={currAddress}
              setCurrAddress={setCurrAddress}
              isPending={isLoading}
            />
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/teachers/list">
            <Button className="md:w-1/4 w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 cursor-pointer duration-300 ease-in-out">
              Teacher List
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
