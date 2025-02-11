import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Trash2, Download, Edit } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
const sections = ["A", "B", "C", "D"];
const subjects = ["Math", "Science", "English", "History"];

export default function Syllabus() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [form, setForm] = useState({ course: "", className: "", section: "", subject: "", teacher: "", description: "", file: null });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({ ...form, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedList = [...syllabusList];
      updatedList[editIndex] = form;
      setSyllabusList(updatedList);
      setEditIndex(null);
    } else {
      setSyllabusList([...syllabusList, form]);
    }
    setForm({ course: "", className: "", section: "", subject: "", teacher: "", description: "", file: null });
  };

  const handleEdit = (index) => {
    setForm(syllabusList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSyllabusList(syllabusList.filter((_, i) => i !== index));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Syllabus Records", 14, 10);
    doc.autoTable({
      startY: 20,
      head: [["Course", "Class", "Section", "Subject", "Teacher"]],
      body: syllabusList.map(({ course, className, section, subject, teacher }) => [course, className, section, subject, teacher]),
    });
    doc.save("Syllabus.pdf");
  };

  return (
    <div className="w-full p-4 space-y-4 mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Manage Syllabus</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input name="course" placeholder="Course Name" value={form.course} onChange={handleChange} required />
            <select name="className" value={form.className} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Class</option>
              {classes.map((cls, idx) => <option key={idx} value={cls}>{cls}</option>)}
            </select>
            <select name="section" value={form.section} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Section</option>
              {sections.map((sec, idx) => <option key={idx} value={sec}>{sec}</option>)}
            </select>
            <select name="subject" value={form.subject} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Subject</option>
              {subjects.map((sub, idx) => <option key={idx} value={sub}>{sub}</option>)}
            </select>
            <Input name="teacher" placeholder="Teacher Name" value={form.teacher} onChange={handleChange} required />
            <Textarea name="description" placeholder="Syllabus Description" value={form.description} onChange={handleChange} required />
            <Input type="file" name="file" onChange={handleChange} />
            <Button type="submit" className="w-full flex gap-2">
              <PlusCircle size={18} /> {editIndex !== null ? "Update Syllabus" : "Add Syllabus"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button onClick={downloadPDF} className="w-full flex gap-2 bg-green-500 text-white">
        <Download size={18} /> Download Syllabus PDF
      </Button>

      {syllabusList.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">Syllabus Records</h3>
            <Table className="mt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {syllabusList.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{entry.course}</TableCell>
                    <TableCell>{entry.className}</TableCell>
                    <TableCell>{entry.section}</TableCell>
                    <TableCell>{entry.subject}</TableCell>
                    <TableCell>{entry.teacher}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" onClick={() => handleEdit(idx)}>
                        <Edit size={14} />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
