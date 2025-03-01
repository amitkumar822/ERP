import { useState } from "react";
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
} from "lucide-react";

const TeacherSalaries = () => {
  const [formData, setFormData] = useState({
    teacher: "",
    month: "",
    basicSalary: "",
    bonus: "",
    deductions: "",
    paymentMode: "",
    transactionId: "",
    status: "Pending",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Banknote className="w-6 h-6 text-green-600" /> Teacher Salary
            Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label htmlFor="teacher" className="font-medium">
              Teacher Name
            </label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, teacher: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
              </SelectContent>
            </Select>

            <label htmlFor="month" className="font-medium">
              Month & Year
            </label>
            <Input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
            />

            <label htmlFor="basicSalary" className="font-medium">
              Basic Salary
            </label>
            <Input
              type="number"
              id="basicSalary"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              icon={<DollarSign />}
            />

            <label htmlFor="bonus" className="font-medium">
              Bonuses / Allowances
            </label>
            <Input
              type="number"
              id="bonus"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              icon={<DollarSign />}
            />

            <label htmlFor="deductions" className="font-medium">
              Deductions
            </label>
            <Input
              type="number"
              id="deductions"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              icon={<DollarSign />}
            />

            <label htmlFor="paymentMode" className="font-medium">
              Payment Mode
            </label>
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

            <label htmlFor="transactionId" className="font-medium">
              Transaction ID
            </label>
            <Input
              type="text"
              id="transactionId"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Submit Payment
            </Button>
          </div>
        </CardContent>
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
