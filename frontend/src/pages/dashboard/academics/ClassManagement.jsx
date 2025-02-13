import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  PlusCircle,
  Trash2,
  Edit,
  Users,
  UserPlus,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    className: "",
    section: "",
    capacity: "",
    academicYear: "",
  });
  const [isPendingAddClass, startTransitionAddClass] = useTransition();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransitionAddClass(async () => {
      try {
        const { data } = await axios.post("/api/class/create", form);
        console.log("Class Created Time: \n", data);
        console.log("Message: ", data?.message);
        toast.success(data?.message || "Successfully Class Created!");

        setForm({
          className: "",
          section: "",
          capacity: "",
          academicYear: "",
        });
      } catch (error) {
        toast.error(error?.response?.data.message || "faild to created class");
        console.error("Error Class Created Time: \n", error);
      }
    });

    // if (editingIndex !== null) {
    //   const updatedClasses = [...classes];
    //   updatedClasses[editingIndex] = form;
    //   setClasses(updatedClasses);
    //   setEditingIndex(null);
    // } else {
    //   setClasses([...classes, { ...form, teacherSubjects: [], students: [] }]);
    // }
    // setForm({ className: "", section: "", capacity: "" });
  };

  //^ Below all remaining work.
  const [editingIndex, setEditingIndex] = useState(null);
  const [popup, setPopup] = useState({
    type: "",
    index: null,
    teacher: "",
    subject: "",
  });

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
    if (
      popup.index !== null &&
      popup.teacher.trim() !== "" &&
      popup.subject.trim() !== ""
    ) {
      const updatedClasses = [...classes];
      updatedClasses[popup.index].teacherSubjects.push({
        teacher: popup.teacher,
        subject: popup.subject,
      });
      setClasses(updatedClasses);
    }
    handlePopupClose();
  };

  return (
    <div className="p-4 space-y-4 dark:text-black dark:bg-gray-900">
      {/* Add / Edit Class */}
      <Card className=" dark:text-white dark:bg-gray-800">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold">Add / Edit Class</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4"
          >
            <div>
              <Label htmlFor="className">Class</Label>
              <select
                id="className"
                name="className"
                value={form.className}
                onChange={handleChange}
                className="border p-2 rounded w-full dark:text-white dark:bg-gray-800"
                required
              >
                <option value="">Select Class</option>
                {classNames.map((cls, idx) => (
                  <option key={idx} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="section">Section</Label>
              <select
                id="section"
                name="section"
                value={form.section}
                onChange={handleChange}
                className="border p-2 rounded w-full dark:text-white dark:bg-gray-800"
                required
              >
                <option value="">Select Section</option>
                {sections.map((sec, idx) => (
                  <option key={idx} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="capacity">Total Capacity</Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                placeholder="Ex: 30"
                value={form.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                name="academicYear"
                type="text"
                placeholder="Ex: 2022-2023"
                value={form.academicYear}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              disabled={isPendingAddClass}
              type="submit"
              className="w-full flex gap-2 cursor-pointer"
            >
              {isPendingAddClass ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Please Wait...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1">
                  <PlusCircle size={18} />
                  {editingIndex !== null ? "Update" : "Add"} Class
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Manage Classes */}
      <Card className=" dark:text-white dark:bg-gray-800">  
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
                    <Button size="sm" onClick={() => handleEdit(index)}>
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePopupOpen("teacherSubjects", index)}
                    >
                      <Users size={14} /> Manage Teachers & Subjects
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePopupOpen("students", index)}
                    >
                      <UserPlus size={14} /> Manage Students
                    </Button>
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
            <Input
              value={popup.teacher}
              onChange={(e) => setPopup({ ...popup, teacher: e.target.value })}
              placeholder="Enter Teacher Name"
              className="mt-2"
            />
            <Input
              value={popup.subject}
              onChange={(e) => setPopup({ ...popup, subject: e.target.value })}
              placeholder="Enter Subject"
              className="mt-2"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={handlePopupSubmit}>Add</Button>
              <Button variant="outline" onClick={handlePopupClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
