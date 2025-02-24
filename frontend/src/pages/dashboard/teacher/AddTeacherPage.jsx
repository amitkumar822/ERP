import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddTeacher() {
  const [teacherData, setTeacherData] = useState({
    fullName: "",
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

    console.log("Teacher Data Submitted", teacherData);
    console.log("CurrentAdd: ", currAddress);
    console.log("Permanent Add: ", permanentAddress);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-6">Add Teacher</h1>

      <Card className="p-4">
        <form
          // onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
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

          {/* Identification */}
          <div>
            <Label htmlFor="identification">Identification</Label>
            <Input
              id="identification"
              type="text"
              name="identification"
              placeholder="Ex. Aadhaar card, passport"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Joining Date */}
          <div>
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input
              id="joiningDate"
              type="date"
              name="joiningDate"
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
              name="mobileNumber"
              placeholder="Ex. +91 9876543210"
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
              required
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
            <Label htmlFor="teachingExperience">Total Years of Teaching Experience</Label>
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
            <Label htmlFor="previousInstitutionName">Previous Institution Name</Label>
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
            <Label htmlFor="extracurricularActivities">Extracurricular Activities</Label>
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
                  ✖
                </button>
              </div>
            )}
          </div>
        </form>
      </Card>

      {/* Address */}
      <Card className="my-6">
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

      {/* Submit Button */}
      <div className="md:col-span-2 flex justify-end">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
