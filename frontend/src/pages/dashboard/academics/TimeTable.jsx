import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, Trash2, Download, Edit } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const classNames = ["Class 1", "Class 2", "Class 3", "Class 4"];
const sections = ["A", "B", "C", "D"];
const periodsList = ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5"];

export default function TimeTable() {
  const [periods, setPeriods] = useState([]);
  const [form, setForm] = useState({ className: "", section: "", day: "", period: "", periodTime: "", subject: "", teacher: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedPeriods = [...periods];
      updatedPeriods[editIndex] = form;
      setPeriods(updatedPeriods);
      setEditIndex(null);
    } else {
      setPeriods([...periods, form]);
    }
    setForm({ className: "", section: "", day: "", period: "", periodTime: "", subject: "", teacher: "" });
  };

  const handleEdit = (index) => {
    setForm(periods[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setPeriods(periods.filter((_, i) => i !== index));
  };

  const groupedTimetable = periods.reduce((acc, period) => {
    const key = `${period.className}-${period.section}-${period.day}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(period);
    return acc;
  }, {});

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("School Timetable", 14, 10);
    Object.keys(groupedTimetable).forEach((key, index) => {
      const [className, section, day] = key.split("-");
      doc.text(`${className} - ${section} - ${day}`, 14, 20 + index * 30);
      doc.autoTable({
        startY: 25 + index * 30,
        head: [["Period", "Period Time", "Subject", "Teacher"]],
        body: groupedTimetable[key].map(({ period, periodTime, subject, teacher }) => [period, periodTime, subject, teacher]),
      });
    });
    doc.save("Timetable.pdf");
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">{editIndex !== null ? "Edit Timetable Period" : "Add Timetable Period"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <select name="className" value={form.className} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Class</option>
              {classNames.map((cls, idx) => <option key={idx} value={cls}>{cls}</option>)}
            </select>
            <select name="section" value={form.section} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Section</option>
              {sections.map((sec, idx) => <option key={idx} value={sec}>{sec}</option>)}
            </select>
            <select name="day" value={form.day} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Day</option>
              {days.map((day, idx) => <option key={idx} value={day}>{day}</option>)}
            </select>
            <select name="period" value={form.period} onChange={handleChange} className="border p-2 rounded" required>
              <option value="">Select Period</option>
              {periodsList.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
            </select>
            <Input name="periodTime" placeholder="Period Time (e.g., 9:00 AM - 10:00 AM)" value={form.periodTime} onChange={handleChange} required />
            <Input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
            <Input name="teacher" placeholder="Teacher" value={form.teacher} onChange={handleChange} required />
            <Button type="submit" className="w-full flex gap-2">
              <PlusCircle size={18} /> {editIndex !== null ? "Update Period" : "Add Period"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button onClick={downloadPDF} className="w-full flex gap-2 bg-green-500 text-white">
        <Download size={18} /> Download Timetable PDF
      </Button>

      {Object.keys(groupedTimetable).map((key, index) => {
        const [className, section, day] = key.split("-");
        return (
          <Card key={index} className="mt-4">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold">{`${className} - ${section} - ${day}`}</h3>
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Period Time</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedTimetable[key].map((entry, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{entry.period}</TableCell>
                      <TableCell>{entry.periodTime}</TableCell>
                      <TableCell>{entry.subject}</TableCell>
                      <TableCell>{entry.teacher}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => handleEdit(periods.indexOf(entry))}>
                          <Edit size={14} />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(periods.indexOf(entry))}>
                          <Trash2 size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
