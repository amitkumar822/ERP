import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Eye, Edit, Trash } from "lucide-react";
import { SelectContent } from "@radix-ui/react-select";
import { Outlet } from "react-router";

const studentsData = [
  {
    id: 1,
    img: "",
    admissionNo: 191,
    name: "Rebecca Burns",
    rollNo: 40,
    gender: "Female",
    class: "Six",
    fatherPhone: "871",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    img: "",
    admissionNo: 12,
    name: "Gautam Raj",
    rollNo: 5,
    gender: "Male",
    class: "Six",
    fatherPhone: "09508309369",
    paymentStatus: "Pending",
  },
  {
    id: 3,
    img: "",
    admissionNo: 13,
    name: "Madan Singh",
    rollNo: 6,
    gender: "Male",
    class: "Six",
    fatherPhone: "8228843872",
    paymentStatus: "Paid",
  },
];

export default function StudentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");

  const filteredStudents = studentsData.filter(
    (student) =>
      (filterClass === "All" || student.class === filterClass) &&
      (filterPayment === "All" || student.paymentStatus === filterPayment) &&
      (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.fatherPhone.includes(searchQuery))
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>

      {/* <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Search by Name, Father's Name, Phone, Roll No..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select value={filterClass} onValueChange={setFilterClass} className="w-full md:w-1/4">
          <SelectItem value="All">All Classes</SelectItem>
          <SelectItem value="Six">Class Six</SelectItem>
        </Select>
        <Select value={filterPayment} onValueChange={setFilterPayment} className="w-full md:w-1/4">
          <SelectItem value="All">All Payments</SelectItem>
          <SelectItem value="Paid">Paid</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
        </Select>
        <Button className="bg-blue-500">+ Add New</Button>
      </div> */}

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          placeholder="Search by Name, Father's Name, Phone, Roll No..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 md:w-1/3"
        />

        <Select
          value={filterClass}
          onValueChange={setFilterClass}
          className="w-full sm:w-1/3 md:w-1/4"
        >
          <SelectContent>
            <SelectItem value="All">All Classes</SelectItem>
            <SelectItem value="Six">Class Six</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filterPayment}
          onValueChange={setFilterPayment}
          className="w-full sm:w-1/3 md:w-1/4"
        >
          <SelectContent>
            <SelectItem value="All">All Payments</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Button className="bg-blue-500 w-full sm:w-auto">+ Add New</Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Img</TableHead>
              <TableHead>Admission Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Father Phone</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <img
                    src={student.img || "https://via.placeholder.com/40"}
                    className="w-10 h-10 rounded-full"
                  />
                </TableCell>
                <TableCell>{student.admissionNo}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.fatherPhone}</TableCell>
                <TableCell
                  className={
                    student.paymentStatus === "Pending"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {student.paymentStatus}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Pagination total={5} />

      <div>
        <h1>Outlet</h1>
        <Outlet />
      </div>
    </div>
  );
}
