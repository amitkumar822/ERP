import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ className: "", section: "", teacher: "", strength: "", timing: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClasses([...classes, form]);
    setForm({ className: "", section: "", teacher: "", strength: "", timing: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Add Class</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input name="className" placeholder="Class Name" value={form.className} onChange={handleChange} required />
            <Input name="section" placeholder="Section" value={form.section} onChange={handleChange} required />
            <Input name="teacher" placeholder="Teacher" value={form.teacher} onChange={handleChange} required />
            <Input name="strength" type="number" placeholder="Strength" value={form.strength} onChange={handleChange} required />
            <Input name="timing" placeholder="Timing" value={form.timing} onChange={handleChange} required />
            <Button type="submit" className="w-full flex gap-2"><PlusCircle size={18} /> Add Class</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Manage Classes</h2>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Timing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow key={index}>
                  <TableCell>{cls.className}</TableCell>
                  <TableCell>{cls.section}</TableCell>
                  <TableCell>{cls.teacher}</TableCell>
                  <TableCell>{cls.strength}</TableCell>
                  <TableCell>{cls.timing}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
