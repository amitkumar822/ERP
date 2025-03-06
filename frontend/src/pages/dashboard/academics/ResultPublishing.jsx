import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, FileDown } from "lucide-react";

const initialResults = [
  { id: 1, name: "Amit Kumar", roll: "101", subject: "Math", marks: 85 },
  { id: 2, name: "Rahul Sharma", roll: "102", subject: "Science", marks: 78 },
  { id: 3, name: "Priya Verma", roll: "103", subject: "English", marks: 90 },
];

export default function ResultPublishing() {
  const [results, setResults] = useState(initialResults);

  const editResult = (id) => {
    alert(`Edit result for student ID: ${id}`);
  };

  const deleteResult = (id) => {
    setResults(results.filter((result) => result.id !== id));
  };

  const downloadPDF = () => {
    alert("Downloading PDF...");
  };

  return (
    <div className="p-6">
      <Card className="p-6 shadow-lg rounded-xl border border-gray-300">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-semibold">Result Publishing</h2>
        </div>
        <div className="overflow-y-auto max-h-[300px] border border-gray-300 rounded-lg">
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-gray-200 z-20 shadow-md">
              <TableRow className="border-b border-gray-400">
                <TableHead className="p-2 font-semibold text-gray-700">
                  Roll No
                </TableHead>
                <TableHead className="p-2 font-semibold text-gray-700">
                  Name
                </TableHead>
                <TableHead className="p-2 font-semibold text-gray-700">
                  Subject
                </TableHead>
                <TableHead className="p-2 font-semibold text-gray-700">
                  Marks
                </TableHead>
                <TableHead className="p-2 font-semibold text-gray-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="border-b border-gray-300">
                  <TableCell className="p-2">{result.roll}</TableCell>
                  <TableCell className="p-2">{result.name}</TableCell>
                  <TableCell className="p-2">{result.subject}</TableCell>
                  <TableCell className="p-2">{result.marks}</TableCell>
                  <TableCell className="p-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editResult(result.id)}
                    >
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteResult(result.id)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 border border-gray-300 hover:border-green-500 transition-all"
          onClick={downloadPDF}
        >
          <FileDown className="w-5 h-5 mr-2" /> Download PDF
        </Button>
      </Card>
    </div>
  );
}
