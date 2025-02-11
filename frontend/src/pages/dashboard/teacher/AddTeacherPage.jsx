import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function AddTeacher() {
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    joiningDate: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    gender: "",
    designation: "",
    classAssigned: "",
    dob: "",
    qualification: "",
    profileImage: null,
    document: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teacherData.password !== teacherData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Teacher Data Submitted", teacherData);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add Teacher</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Joining Date</Label>
          <Input
            type="date"
            name="joiningDate"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Mobile Number</Label>
          <Input
            type="tel"
            name="mobileNumber"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Gender</Label>
          <select
            name="gender"
            className="border rounded p-2 w-full"
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <Label>Designation</Label>
          <Input
            type="text"
            name="designation"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Class Assigned</Label>
          <Input
            type="text"
            name="classAssigned"
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input type="date" name="dob" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Qualification</Label>
          <Input
            type="text"
            name="qualification"
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <Label>Profile Image</Label>
          <Input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            required
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
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Document Upload */}
        <div>
          <Label>Document (PDF)</Label>
          <Input
            type="file"
            name="document"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required
          />
          {preview.document && (
            <div className="flex items-center gap-2 mt-2 border p-2 rounded bg-gray-100">
              <span className="truncate">{preview.document}</span>
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeFile("document")}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
