import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddTeacherPage() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setTeacherData((prev) => ({ ...prev, [name]: files[0] }));
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add Teacher</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input type="text" name="firstName" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input type="text" name="lastName" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Joining Date</Label>
          <Input type="date" name="joiningDate" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" name="confirmPassword" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Mobile Number</Label>
          <Input type="tel" name="mobileNumber" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Gender</Label>
          <select name="gender" className="border rounded p-2 w-full" onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <Label>Designation</Label>
          <Input type="text" name="designation" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Class Assigned</Label>
          <Input type="text" name="classAssigned" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input type="date" name="dob" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Qualification</Label>
          <Input type="text" name="qualification" onChange={handleInputChange} required />
        </div>
        <div>
          <Label>Profile Image</Label>
          <Input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} required />
        </div>
        <div>
          <Label>Document</Label>
          <Input type="file" name="document" accept="application/pdf" onChange={handleFileChange} required />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
    