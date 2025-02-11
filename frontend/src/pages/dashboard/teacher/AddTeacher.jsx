import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectItem } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function AddTeacher() {
  const [profileImage, setProfileImage] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    joiningDate: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    gender: "",
    designation: "",
    class: "",
    dob: "",
    qualification: "",
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "profile") setProfileImage(URL.createObjectURL(file));
      if (type === "document") setDocumentFile(file);
    }
  };

  const handleChange = (e) => {
    setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="First Name" name="firstName" value={teacherData.firstName} onChange={handleChange} required />
        <Input placeholder="Last Name" name="lastName" value={teacherData.lastName} onChange={handleChange} required />
        <Input placeholder="Email" type="email" name="email" value={teacherData.email} onChange={handleChange} required />
        <Input placeholder="Mobile Number" type="tel" name="mobile" value={teacherData.mobile} onChange={handleChange} required />
        <Calendar name="joiningDate" selected={teacherData.joiningDate} onChange={(date) => setTeacherData({ ...teacherData, joiningDate: date })} />
        <Calendar name="dob" selected={teacherData.dob} onChange={(date) => setTeacherData({ ...teacherData, dob: date })} />
        <Select name="gender" value={teacherData.gender} onValueChange={(value) => setTeacherData({ ...teacherData, gender: value })}>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </Select>
        <Input placeholder="Designation" name="designation" value={teacherData.designation} onChange={handleChange} required />
        <Input placeholder="Class" name="class" value={teacherData.class} onChange={handleChange} required />
        <Input placeholder="Qualification" name="qualification" value={teacherData.qualification} onChange={handleChange} required />
        <Input placeholder="Password" type="password" name="password" value={teacherData.password} onChange={handleChange} required />
        <Input placeholder="Confirm Password" type="password" name="confirmPassword" value={teacherData.confirmPassword} onChange={handleChange} required />
      </div>
      
      {/* File Upload Sections */}
      <div className="mt-4">
        <label className="block font-medium mb-2">Profile Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "profile")} className="hidden" id="profileUpload" />
        <label htmlFor="profileUpload" className="cursor-pointer flex items-center gap-2 border p-2 rounded-md w-fit bg-gray-100">
          <Upload className="w-4 h-4" /> Upload Image
        </label>
        {profileImage && <img src={profileImage} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-md border" />}
      </div>

      <div className="mt-4">
        <label className="block font-medium mb-2">Document (PDF or Image)</label>
        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, "document")} className="hidden" id="documentUpload" />
        <label htmlFor="documentUpload" className="cursor-pointer flex items-center gap-2 border p-2 rounded-md w-fit bg-gray-100">
          <Upload className="w-4 h-4" /> Upload Document
        </label>
        {documentFile && (
          <div className="mt-2 border p-2 rounded-md bg-gray-50 w-fit">
            {documentFile.type === "application/pdf" ? (
              <span className="text-sm">PDF Uploaded</span>
            ) : (
              <img src={URL.createObjectURL(documentFile)} alt="Document Preview" className="w-24 h-24 rounded-md" />
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="bg-blue-500">Submit</Button>
      </div>
    </div>
  );
}
