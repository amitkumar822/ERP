import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Eye, CalendarDays } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const teachersData = [
  {
    id: 1,
    img: "https://via.placeholder.com/50",
    name: "John Doe",
    department: "Mathematics",
    gender: "Male",
    education: "M.Sc",
    mobile: "9876543210",
    email: "john@example.com",
    joiningDate: new Date(2020, 4, 12),
  },
  {
    id: 2,
    img: "https://via.placeholder.com/50",
    name: "Sarah Smith",
    department: "Science",
    gender: "Female",
    education: "Ph.D",
    mobile: "9876543220",
    email: "sarah@example.com",
    joiningDate: new Date(2019, 2, 10),
  },
];

const TeachersList = () => {
  const [teachers, setTeachers] = useState(teachersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
  const [filterDate, setFilterDate] = useState(null);

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      (teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.mobile.includes(searchQuery)) &&
      (filterDepartment === "All" || teacher.department === filterDepartment) &&
      (filterGender === "All" || teacher.gender === filterGender) &&
      (!filterDate ||
        format(teacher.joiningDate, "yyyy-MM-dd") ===
          format(filterDate, "yyyy-MM-dd"))
    );
  });

  const handleDelete = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Teachers List</h1>

      {/* 🔍 Optimized Search & Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 border-b pb-4">
            <Input
              placeholder="Search by Name, Email, Mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[180px]"
            />
            <Select
              value={filterDepartment}
              onValueChange={setFilterDepartment}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Genders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>

            {/* 📅 Calendar Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] flex justify-between"
                >
                  {filterDate
                    ? format(filterDate, "dd/MM/yyyy")
                    : "Select Joining Date"}
                  <CalendarDays className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                />
              </PopoverContent>
            </Popover>

            <Button className="bg-blue-500">+ Add New Teacher</Button>
          </div>
        </CardContent>
      </Card>

      {/* 📌 Optimized Teachers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teachers List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Img</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Education</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joining Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>
                        <img
                          src={teacher.img}
                          alt="Teacher"
                          className="w-10 h-10 rounded-full"
                        />
                      </TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.gender}</TableCell>
                      <TableCell>{teacher.education}</TableCell>
                      <TableCell>{teacher.mobile}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>
                        {format(teacher.joiningDate, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Eye className="w-5 h-5" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Pencil className="w-5 h-5 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(teacher.id)}
                          >
                            <Trash2 className="w-5 h-5 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="9" className="text-center py-4">
                      No Teachers Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachersList;
