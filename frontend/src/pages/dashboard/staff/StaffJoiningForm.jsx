import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Phone,
  Mail,
  User,
  Briefcase,
  Home,
  DollarSign,
  UserPenIcon,
} from "lucide-react";
import AddressCurrentPermanent from "@/components/dashboard/AddressCurrentPermanent";
import { useJoiningStaffMutation } from "@/redux/features/api/staffApi";
import { StaffList } from "@/components/dashboard/staff/StaffList";
import { toast } from "react-toastify";

export default function StaffJoiningForm() {
  //^ ************👇 Start Joining Staff Functionality 👇************* */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    position: "",
    joiningDate: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  // API calls using rtk query
  const [joiningStaff, { error, isSuccess, isLoading }] =
    useJoiningStaffMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await joiningStaff({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      position: formData.position,
      joiningDate: formData.joiningDate,
      salary: formData.salary,
      address: {
        permanentAddress,
        currentAddress: currAddress,
      },
    });
  };
  
  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Staff Joined Successfully!");
      setSameAddressChecked(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        position: "",
        joiningDate: "",
        salary: "",
      });

      setPermanentAddress({
        permanentAddress: "",
        city: "",
        state: "",
        zipCode: "",
      });
      setCurrAddress({
        currentAddress: "",
        city: "",
        state: "",
        zipCode: "",
      });
    } else if (error) {
      alert(error?.data?.message || "Faild to joine Staff");
    }
  }, [error, isSuccess]);
  //^ ************👆 End Joining Staff Functionality 👆************* */


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-7xl p-4 bg-white shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Staff Joining Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div>
                <Label htmlFor="fullName">Full Name*</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <User size={20} />
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <Mail size={20} />
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone*</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <Phone size={20} />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gender">Gender*</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <UserPenIcon size={20} />
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <Calendar size={20} />
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="position">Position*</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <Briefcase size={20} />
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Enter position"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="joiningDate">Joining Date*</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <Calendar size={20} />
                  <Input
                    id="joiningDate"
                    name="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="salary">Salary*</Label>
                <div className="flex items-center gap-2 border rounded-md p-2">
                  <DollarSign size={20} />
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    required
                  />
                </div>
              </div>
            </Card>

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
        </CardContent>

        {/* Staff List */}
        <StaffList />
      </Card>
    </div>
  );
}
