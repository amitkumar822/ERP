import { useEffect, useState, useTransition } from "react";
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
import { toast } from "react-toastify";
import DeleteClassModal from "@/components/deleteModel/DeleteClassModal";
import API from "@/api/axiosInstance";
import { Link } from "react-router";

export default function ClassManagement() {
  // ****************👇Start Class Create and Edit or Update Section👇***********************
  const [form, setForm] = useState({
    className: "",
    section: "",
    capacity: "",
    academicYear: "",
  });
  const [isPendingAddClass, startTransitionAddClass] = useTransition();
  const [editClassId, setEditClassId] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let apiEndpoint = "";
    let apiMethod = "";

    if (editClassId) {
      apiEndpoint = `/class/update/${editClassId}`;
      apiMethod = "put";
    } else {
      apiEndpoint = "/class/create";
      apiMethod = "post";
    }

    startTransitionAddClass(async () => {
      try {
        const { data } = await API[apiMethod](apiEndpoint, form);
        console.log("Class Created Time: \n", data);
        toast.success(data?.message || "Successfully Class Created!");
        fetchAllClasses();
        setForm({
          className: "",
          section: "",
          capacity: "",
          academicYear: "",
        });
        setEditClassId("");
      } catch (error) {
        toast.error(error?.response?.data.message || "faild to created class");
        console.error("Error Class Created Time: \n", error);
      }
    });
  };

  // Fetch All Classes👇
  const [updatedClasses, setUpdatedClasses] = useState([]);

  const fetchAllClasses = async () => {
    try {
      const { data } = await API.get("/class/get-all-class", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("All Classes Fetch: \n", data);
      setUpdatedClasses(data?.data);
    } catch (error) {
      console.error("Error Fetch All Classes Time: \n", error);
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, []);

  // ******************👆End Class Create and Edit or Update Section👆********************

  // ********************👇Start Class Edit and Delete Section👇**********************
  const handleEdit = (classId) => {
    const filterClass = updatedClasses.filter((cls) => cls._id === classId);
    setEditClassId(classId);
    setForm({
      className: filterClass[0]?.className,
      section: filterClass[0]?.sections,
      capacity: filterClass[0]?.capacity,
      academicYear: filterClass[0]?.academicYear,
    });
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState("");
  const [isPendingDeleteClass, setIsPendingDeleteClass] = useTransition();

  const handleDelete = () => {
    alert(deleteClassId);
    setIsPendingDeleteClass(async () => {
      try {
        const { data } = await axios.delete(
          `/api/class/delete/${deleteClassId}`
        );
        console.log("Class Deleted Time: \n", data);
        toast.success(data?.message || "Successfully Class Deleted!");
        fetchAllClasses();

        setEditClassId("");

        setDeleteModalOpen(false);
      } catch (error) {
        toast.error(error?.response?.data.message || "faild to delete class");
        console.error("Error Class Deleted Time: \n", error);
      }
    });
  };
  // ******************👆End Class Edit and Delete Section👆********************

  //^ Below all remaining work.
  const [classes, setClasses] = useState([]);
  const [popup, setPopup] = useState({
    type: "",
    index: null,
    teacher: "",
    subject: "",
  });

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
                  {editClassId ? "Update" : "Add"} Class
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
                <TableHead>Academic Year</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Teachers & Subjects</TableHead>
                <TableHead>Roll & Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updatedClasses?.map((cls, index) => (
                <TableRow key={index}>
                  <TableCell>{cls.className}</TableCell>
                  <TableCell>{cls.sections}</TableCell>
                  <TableCell>{cls.academicYear}</TableCell>
                  <TableCell>{cls.capacity}</TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {cls?.teacherSubjects?.map((ts, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{ts.teacher}</TableCell>
                            <TableCell>{ts.subject}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                  <TableCell>
                    <div className="max-h-40 overflow-auto border rounded-md">
                      <Table>
                        <TableBody>
                          {cls?.studentsId?.map((stn, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{stn?.rollNumber}</TableCell>
                              <TableCell>{stn?.fullName}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleEdit(cls?._id)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      variant="destructive"
                      onClick={() => {
                        setDeleteModalOpen(true), setDeleteClassId(cls?._id);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handlePopupOpen("teacherSubjects", index)}
                    >
                      <Users size={14} /> Manage Teachers & Subjects
                    </Button>
                    <Button
                      size="sm"
                      className="cursor-pointer"
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

      {/* Class Delete Model */}
      <DeleteClassModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={"class"}
        isPending={isPendingDeleteClass}
      />
    </div>
  );
}
