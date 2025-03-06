import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const studentsData = [
  { id: 1, name: "Amit Kumar", roll: "101", promoted: true },
  { id: 2, name: "Rahul Sharma", roll: "102", promoted: true },
  { id: 3, name: "Priya Verma", roll: "103", promoted: true },
  { id: 4, name: "Neha Singh", roll: "104", promoted: false },
  { id: 5, name: "Rohan Das", roll: "105", promoted: false },
];

export default function StudentPromotion() {
  const [students, setStudents] = useState(studentsData);

  const togglePromotion = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, promoted: !student.promoted } : student
      )
    );
  };

  const promoteSelected = () => {
    const promotedStudents = students.filter(student => student.promoted);
    console.log("Promoted Students:", promotedStudents);
    alert("Selected students have been promoted successfully!");
  };

  return (
    <div className="p-6">
      <Card className="p-6 shadow-lg rounded-xl border border-gray-300">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUpRight className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold">Student Promotion</h2>
        </div>
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
                    <Switch checked={student.promoted} onCheckedChange={() => togglePromotion(student.id)} />
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
