import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  User,
  Banknote,
  BadgeCheck,
  ClipboardList,
  Calendar,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useGetAllTeacherQuery } from "@/redux/features/api/teacherApi";
import { usePayTeacherFeesMutation } from "@/redux/features/api/feeApi";
import { toast } from "react-toastify";

const TeacherSalaries = () => {
  const { data } = useGetAllTeacherQuery();
  const [teacherDetails, setTeacherDetails] = useState("");

  //********👇Start Pay Teacher Salary👇********** */
  const [formData, setFormData] = useState({
    teacherId: "",
    month: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
    grossSalary: "",
    netSalary: "",
    paymentMode: "Cash",
    paymentAmount: "",
    transactionId: "",
  });

  useEffect(() => {
    if (data && data.data) {
      let teacherDetails = data.data.filter(
        (details) => details._id === formData.teacherId
      );
      setTeacherDetails(teacherDetails[0]);
    }
  }, [formData.teacherId]);

  useEffect(() => {
    const grossSalary = Number(formData.basicSalary) + Number(formData.bonus);
    const netSalary = grossSalary - Number(formData.deductions);
    setFormData((prev) => ({ ...prev, grossSalary, netSalary }));
  }, [formData.basicSalary, formData.bonus, formData.deductions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [payTeacherFees, { isLoading, isSuccess, error }] =
    usePayTeacherFeesMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await payTeacherFees({
      teacherId: formData.teacherId,
      month: formData.month,
      basicSalary: formData.basicSalary,
      bonus: formData.bonus,
      deductions: formData?.deductions,
      grossSalary: formData.grossSalary,
      netSalary: formData.netSalary,
      paymentMode: formData.paymentMode,
      paymentAmount: formData.paymentAmount,
      transactionId: formData.transactionId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Successfully Pay Teacher Salary!");
      setFormData({
        teacherId: "",
        month: "",
        basicSalary: "",
        bonus: "",
        deductions: "",
        grossSalary: "",
        netSalary: "",
        paymentMode: "Cash",
        paymentAmount: "",
        transactionId: "",
      });
      setTeacherDetails("");
    } else if (error) {
      alert(error?.data?.message || "Failed to Pay Teacher Salary!");
    }
  }, [error, isSuccess]);
  //********��End Pay Teacher Salary��********** */

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Banknote className="w-6 h-6 text-green-600" /> Teacher Salary
            Payment
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Label htmlFor="teacher" className="font-medium">
                <User className="mr-2 inline-block h-4 w-4" /> Teacher Name*
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, teacherId: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {data &&
                    data?.data.map((teacher, index) => (
                      <SelectItem key={index} value={teacher._id}>
                        {teacher.fullName} ({teacher.designation})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Label
                htmlFor="month"
                className={`font-medium ${
                  teacherDetails?.length === 0 ? "hidden" : "block"
                }`}
              >
                <Calendar className="mr-2 inline-block h-4 w-4" /> Contact &
                Email
              </Label>
              <Card
                className={`border p-2 rounded-md shadow-md ${
                  teacherDetails?.length === 0 ? "hidden" : "block"
                }`}
              >
                <a
                  href={`tel:${teacherDetails?.phoneNumber}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {teacherDetails?.phoneNumber}
                </a>{" "}
                {", "}(
                <a
                  href={`mailto:${teacherDetails?.email}`}
                  className="text-orange-600 hover:text-orange-700 hover:underline"
                >
                  {teacherDetails?.email}
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
                value={formData.month}
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
                value={formData.basicSalary}
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
                value={formData.bonus}
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
                value={formData.deductions}
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
                value={formData.grossSalary}
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
                value={formData.netSalary}
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
                disabled={formData.paymentMode !== "Cash" ? false : true}
                placeholder="Enter Transaction ID"
                value={formData.transactionId}
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
                value={formData.paymentAmount}
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

      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-600" /> Salary Payment
            History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher Name</TableHead>
                <TableHead>Month & Year</TableHead>
                <TableHead>Basic Salary</TableHead>
                <TableHead>Total Salary</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>January 2025</TableCell>
                <TableCell>$5000</TableCell>
                <TableCell>$5200</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell>
                  <BadgeCheck className="text-green-600" /> Paid
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherSalaries;
