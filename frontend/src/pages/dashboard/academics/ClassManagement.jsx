import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Trash2, Edit, Users, UserPlus } from "lucide-react";

const classNames = ["Class 1", "Class 2", "Class 3", "Class 4"];
const sections = ["A", "B", "C", "D"];

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ className: "", section: "", capacity: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [popup, setPopup] = useState({ type: "", index: null, teacher: "", subject: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedClasses = [...classes];
      updatedClasses[editingIndex] = form;
      setClasses(updatedClasses);
      setEditingIndex(null);
    } else {
      setClasses([...classes, { ...form, teacherSubjects: [], students: [] }]);
    }
    setForm({ className: "", section: "", capacity: "" });
  };

  const handleEdit = (index) => {
    setForm(classes[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setClasses(classes.filter((_, i) => i !== index));
  };

  const handlePopupOpen = (type, index) => {
    setPopup({ type, index, teacher: "", subject: "" });
  };

  const handlePopupClose = () => {
    setPopup({ type: "", index: null, teacher: "", subject: "" });
  };

  const handlePopupSubmit = () => {
    if (popup.index !== null && popup.teacher.trim() !== "" && popup.subject.trim() !== "") {
      const updatedClasses = [...classes];
      updatedClasses[popup.index].teacherSubjects.push({ teacher: popup.teacher, subject: popup.subject });
      setClasses(updatedClasses);
    }
    handlePopupClose();
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Add / Edit Class</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <select name="className" value={form.className} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Class</option>
              {classNames.map((cls, idx) => <option key={idx} value={cls}>{cls}</option>)}
            </select>
            <select name="section" value={form.section} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Section</option>
              {sections.map((sec, idx) => <option key={idx} value={sec}>{sec}</option>)}
            </select>
            <Input name="capacity" type="number" placeholder="Capacity" value={form.capacity} onChange={handleChange} required />
            <Button type="submit" className="w-full flex gap-2">
              <PlusCircle size={18} /> {editingIndex !== null ? "Update" : "Add"} Class
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Manage Classes</h2>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Teachers & Subjects</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls, index) => (
                <TableRow key={index}>
                  <TableCell>{cls.className}</TableCell>
                  <TableCell>{cls.section}</TableCell>
                  <TableCell>{cls.capacity}</TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {cls.teacherSubjects.map((ts, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{ts.teacher}</TableCell>
                            <TableCell>{ts.subject}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell>{cls.students.join(", ")}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(index)}><Edit size={14} /></Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(index)}><Trash2 size={14} /></Button>
                    <Button size="sm" variant="outline" onClick={() => handlePopupOpen("teacherSubjects", index)}><Users size={14} /> Manage Teachers & Subjects</Button>
                    <Button size="sm" variant="outline" onClick={() => handlePopupOpen("students", index)}><UserPlus size={14} /> Manage Students</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {popup.type === "teacherSubjects" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold">Add Teacher & Subject</h2>
            <Input value={popup.teacher} onChange={(e) => setPopup({ ...popup, teacher: e.target.value })} placeholder="Enter Teacher Name" className="mt-2" />
            <Input value={popup.subject} onChange={(e) => setPopup({ ...popup, subject: e.target.value })} placeholder="Enter Subject" className="mt-2" />
            <div className="flex gap-2 mt-4">
              <Button onClick={handlePopupSubmit}>Add</Button>
              <Button variant="outline" onClick={handlePopupClose}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
