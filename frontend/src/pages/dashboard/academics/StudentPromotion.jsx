import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Loader2, School2, Search } from "lucide-react";
import { useGetClassDetailsOnlyQuery } from "@/redux/features/api/classesApi";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const studentsData = [
  { id: 1, name: "Amit Kumar", roll: "101", promoted: true },
  { id: 2, name: "Rahul Sharma", roll: "102", promoted: true },
  { id: 3, name: "Priya Verma", roll: "103", promoted: true },
  { id: 4, name: "Neha Singh", roll: "104", promoted: false },
  { id: 5, name: "Rohan Das", roll: "105", promoted: false },
];

export default function StudentPromotion() {
  const { data: classDetails, isLoading } = useGetClassDetailsOnlyQuery();
  const [fromClassId, setFromClassId] = useState("")
  const [toClassId, setToClassId] = useState("")

  const [students, setStudents] = useState(studentsData);

  const togglePromotion = (id) => {
    // setStudents((prev) =>
    //   prev.map((student) =>
    //     student.id === id
    //       ? { ...student, promoted: !student.promoted }
    //       : student
    //   )
    // );
  };

  const promoteSelected = () => {
    // const promotedStudents = students.filter((student) => student.promoted);
    // console.log("Promoted Students:", promotedStudents);
    // alert("Selected students have been promoted successfully!");
  };

  console.log(fromClassId, toClassId);

  return (
    <div className="p-5">
      <Card>
        <CardHeader className="py-3">
          <CardTitle
            htmlFor="class-select"
            className="font-medium flex items-center gap-2"
          >
            <ArrowUpRight className="w-6 h-6 text-blue-500" /> Student Promotion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4 items-center justify-center">
            <div>
              <Label htmlFor="class-select">Select Class (From)</Label>
              <Select
                id="class-select"
                onValueChange={(value) => setFromClassId(value)}
                required
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classDetails?.data?.length > 0 ? (
                    classDetails?.data?.map((classItem) => (
                      <SelectItem key={classItem?._id} value={classItem?._id}>
                        {classItem?.className} - {classItem?.sections} (
                        {classItem?.academicYear})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No Classes Found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="to-class-select">Select Class (To)</Label>
              <Select
                id="to-class-select"
                onValueChange={(value) => setToClassId(value)}
                required
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classDetails?.data?.length > 0 ? (
                    classDetails?.data?.map((classItem) => (
                      <SelectItem key={classItem?._id} value={classItem?._id}>
                        {classItem?.className} - {classItem?.sections} (
                        {classItem?.academicYear})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No Classes Found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="md:mt-7">
              <Button
                className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
                onClick={promoteSelected}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Please Wait...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    <Search size={18} />
                    Search Students
                  </span>
                )}
              </Button>
            </div>
          </Card>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="p-6 shadow-lg rounded-xl border border-gray-300 mt-3">
        <div className="overflow-auto max-h-[30rem]">
          <Table className="border border-gray-300 w-full">
            <TableHeader className="sticky top-0 bg-gray-100 z-10">
              <TableRow className="border-b border-gray-300">
                <TableHead className="p-2">Roll No</TableHead>
                <TableHead className="p-2">Name</TableHead>
                <TableHead className="p-2">Promote</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="border-b border-gray-300">
                  <TableCell className="p-2">{student.roll}</TableCell>
                  <TableCell className="p-2">{student.name}</TableCell>
                  <TableCell className="p-2">
                    <Switch
                      checked={student.promoted}
                      onCheckedChange={() => togglePromotion(student.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 border border-gray-300 hover:border-blue-500 transition-all"
          onClick={promoteSelected}
        >
          Promote Selected
        </Button>
      </Card>
    </div>
  );
}
