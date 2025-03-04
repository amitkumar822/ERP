import { useEffect } from "react";
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
import {
  DollarSign,
  User,
  Banknote,
  Calendar,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";

export const Teacher_Staf_SalaryPaymentForm = ({
  handleSubmit,
  useNameList,
  formData,
  setFormData,
  isLoading,
  singleUserDetails,
  title,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const grossSalary = Number(formData.basicSalary) + Number(formData.bonus);
    const netSalary = grossSalary - Number(formData.deductions);
    setFormData((prev) => ({ ...prev, grossSalary, netSalary }));
  }, [formData.basicSalary, formData.bonus, formData.deductions]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Banknote className="w-6 h-6 text-green-600" />
            {title}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Label htmlFor="teacher" className="font-medium">
                <User className="mr-2 inline-block h-4 w-4" />
                Full Name*
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, userId: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {useNameList &&
                    useNameList?.data.map((user, index) => (
                      <SelectItem key={index} value={user._id}>
                        {user?.fullName}, {user?.designation} 
                        {user?.position}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Label
                htmlFor="month"
                className={`font-medium ${
                  singleUserDetails?.length === 0 ? "hidden" : "block"
                }`}
              >
                <Calendar className="mr-2 inline-block h-4 w-4" /> Contact &
                Email
              </Label>
              <Card
                className={`border p-2 rounded-md shadow-md ${
                  singleUserDetails?.length === 0 ? "hidden" : "block"
                }`}
              >
                <a
                  href={`tel:${singleUserDetails?.phoneNumber}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {singleUserDetails?.phoneNumber}
                </a>{" "}
                {", "}(
                <a
                  href={`mailto:${singleUserDetails?.email}`}
                  className="text-orange-600 hover:text-orange-700 hover:underline"
                >
                  {singleUserDetails?.email}
                </a>
                )
              </Card>

              <Label htmlFor="month" className="font-medium">
                <Calendar className="mr-2 inline-block h-4 w-4" /> Month & Year*
              </Label>
              <Input
                type="month"
                id="month"
                name="month"
                value={formData?.month}
                onChange={handleChange}
                required
              />

              <Label htmlFor="basicSalary" className="font-medium">
                <DollarSign className="mr-2 inline-block h-4 w-4" /> Basic
                Salary*
              </Label>
              <Input
                type="number"
                id="basicSalary"
                name="basicSalary"
                placeholder="Enter Basic Salary"
                value={formData?.basicSalary}
                onChange={handleChange}
                required
              />

              <Label htmlFor="bonus" className="font-medium">
                <DollarSign className="mr-2 inline-block h-4 w-4" /> Bonuses /
                Allowances
              </Label>
              <Input
                type="number"
                id="bonus"
                name="bonus"
                placeholder="Enter Bonuses / Allowances"
                value={formData?.bonus}
                onChange={handleChange}
              />

              <Label htmlFor="deductions" className="font-medium">
                <DollarSign className="mr-2 inline-block h-4 w-4" /> Deductions
              </Label>
              <Input
                type="number"
                id="deductions"
                name="deductions"
                placeholder="Enter Deductions"
                value={formData?.deductions}
                onChange={handleChange}
              />

              <Label htmlFor="grossSalary" className="font-medium">
                <DollarSign className="mr-2 inline-block h-4 w-4" /> Gross
                Salary
              </Label>
              <Input
                type="number"
                id="grossSalary"
                name="grossSalary"
                placeholder="Enter Gross Salary"
                value={formData?.grossSalary}
                onChange={handleChange}
                readOnly
              />

              <Label htmlFor="netSalary" className="font-medium">
                <DollarSign className="mr-2 inline-block h-4 w-4" /> Net Salary
              </Label>
              <Input
                type="number"
                id="netSalary"
                name="netSalary"
                placeholder="Enter Net Salary"
                value={formData?.netSalary}
                onChange={handleChange}
                readOnly
              />

              <Label htmlFor="paymentMode" className="font-medium">
                <CreditCard className="mr-2 inline-block h-4 w-4" /> Payment
                Mode
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMode: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor="transactionId" className="font-medium">
                <CreditCard className="mr-2 inline-block h-4 w-4" /> Transaction
                ID
              </Label>
              <Input
                type="text"
                id="transactionId"
                name="transactionId"
                disabled={formData?.paymentMode !== "Cash" ? false : true}
                placeholder="Enter Transaction ID"
                value={formData?.transactionId}
                onChange={handleChange}
              />

              <Label htmlFor="paymentAmount" className="font-medium">
                <DollarSign className="mr-2 inline-block h-4 w-4" /> Payment
                Amount*
              </Label>
              <Input
                type="number"
                id="paymentAmount"
                name="paymentAmount"
                placeholder="Enter Payment Amount"
                value={formData?.paymentAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Please Wait...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    Pay Salary
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Teacher Salary History List */}
      {/* <TeacherStaffSalaryTable
        title="Salary Payment History"
        salaryDetails={teacherSalaryDetails}
      /> */}
    </div>
  );
};
