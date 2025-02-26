import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PlusCircle, MapIcon, Edit, Trash2 } from "lucide-react";
import { days } from "@/helpers/days";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";
import { periodsList } from "@/helpers/periodsList";
import { academicYear } from "@/helpers/academicYear";
import {
  useCreateClassTimeTableMutation,
  useDeleteTimeTablePeriodMutation,
  useGetTimeTablesQuery,
} from "@/redux/features/api/classesApi";
import { toast } from "react-toastify";
import { UpdateTimeTablePeriod } from "./updateTimeTablePeriod";

export default function TimeTable() {
  //**************👇 Start Add Time Table 👇************** */
  const [form, setForm] = useState({
    className: "",
    section: "",
    academicYear: "",
    day: "",
    period: "",
    periodTime: "",
    subject: "",
    emailPhone: "",
    teacher: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [createClassTimeTable, { data, isLoading, error, isSuccess }] =
    useCreateClassTimeTableMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClassTimeTable({
      className: form.className,
      section: form.section,
      academicYear: form.academicYear,
      day: form.day,
      period: form.period,
      periodTime: form.periodTime,
      subject: form.subject,
      emailPhone: form.emailPhone,
      teacher: form.teacher,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Period added successfully");
      setForm({
        className: "",
        section: "",
        academicYear: "",
        day: "",
        period: "",
        periodTime: "",
        subject: "",
        emailPhone: "",
        teacher: "",
      });
    } else if (error) {
      toast.error(error?.data?.message || "Failed to add period");
    }
  }, [isSuccess, error]);
  //**************👆 End Add Time Table 👆************** */

  //^ **************�� Start Time Table List ��************** */
  const {
    data: timeTableData,
    isError,
    isSuccess: timeTableIsSuccess,
  } = useGetTimeTablesQuery();

  //^ **************�� End Time Table List ��************** */

  //********👇 Start Edit Time Table Period👇******** */
  const [open, setOpen] = useState(false);
  const [periodId, setPeriodId] = useState("");

  //*********👇 End Edit Time Table Period👇********* */

  //& **********👇 Start Delete Time Table Period 👇************* */
  const [
    deleteTimeTablePeriod,
    { error: deleteIsError, isSuccess: deleteIsSuccess },
  ] = useDeleteTimeTablePeriodMutation();

  const handleDeletePeriod = async (periodId) => {
    await deleteTimeTablePeriod({ periodId });
  };

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.success(data?.message || "Period deleted successfully");
    } else if (deleteIsError) {
      toast.error(deleteIsError?.data?.message || "Failed to delete period");
    }
  }, [deleteIsError, deleteIsSuccess]);

  //& **********�� End Delete Time Table Period ��************* */

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold flex justify-center items-center gap-2 -mt-2">
            <MapIcon size={20} /> Manage Timetable Period
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
          >
            {/* Class Name */}
            <div>
              <Label htmlFor="className">Class Name</Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "className", value } })
                }
                value={form.className}
              >
                <SelectTrigger id="className" className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classNames.map((cls, idx) => (
                    <SelectItem key={idx} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Section */}
            <div>
              <Label htmlFor="section">Section</Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "section", value } })
                }
                value={form.section}
              >
                <SelectTrigger id="section" className="w-full">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((sec, idx) => (
                    <SelectItem key={idx} value={sec}>
                      {sec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Academic Year */}
            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "academicYear", value } })
                }
                value={form.academicYear}
              >
                <SelectTrigger id="academicYear" className="w-full">
                  <SelectValue placeholder="Select Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  {academicYear.map((year, idx) => (
                    <SelectItem key={idx} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Day */}
            <div>
              <Label htmlFor="day">Day</Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "day", value } })
                }
                value={form.day}
              >
                <SelectTrigger id="day" className="w-full">
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day, idx) => (
                    <SelectItem key={idx} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Period */}
            <div>
              <Label htmlFor="period">Period</Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "period", value } })
                }
                value={form.period}
              >
                <SelectTrigger id="period" className="w-full">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  {periodsList.map((p, idx) => (
                    <SelectItem key={idx} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Period Time */}
            <div>
              <Label htmlFor="periodTime">Period Time</Label>
              <Input
                id="periodTime"
                name="periodTime"
                placeholder="e.g., 9:00 AM - 10:00 AM"
                value={form.periodTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="Enter Subject"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teacher */}
            <div>
              <Label htmlFor="teacher">Teacher Name</Label>
              <Input
                id="teacher"
                name="teacher"
                placeholder="Enter Teacher's Name"
                value={form.teacher}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teacher */}
            <div>
              <Label htmlFor="teacherEmailPhone">Teacher Email/Phone</Label>
              <Input
                id="teacherEmailPhone"
                name="emailPhone"
                placeholder="Ex. abcd@example.com/8236547893"
                value={form.emailPhone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-3">
              <Button
                type="submit"
                className="w-full flex gap-2 cursor-pointer"
              >
                <PlusCircle size={18} /> Add Period
                {/* {editIndex !== null ? "Update Period" : "Add Period"} */}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {timeTableData?.data?.map((daySchedule, index) => (
        <Card className="p-4" key={index}>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">{daySchedule.day}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Teacher Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {daySchedule.periods.map((period, index) => (
                  <TableRow key={period._id + index}>
                    <TableCell>{period.period}</TableCell>
                    <TableCell>{period.subject}</TableCell>
                    <TableCell>{period.periodsTime}</TableCell>
                    <TableCell>
                      {period.className?.className || "N/A"}
                    </TableCell>
                    <TableCell>
                      {period.teacher?.fullName || "Unknown"}
                    </TableCell>
                    <TableCell className="hover:text-blue-700 text-blue-500 hover:underline ">
                      <a href={`tel:${period.teacher?.phoneNumber}`}>
                        {period.teacher?.phoneNumber}
                      </a>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => {
                          setPeriodId(period._id);
                          setOpen(true);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleDeletePeriod(period._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      ))}

      {/* Edit Model */}
      <UpdateTimeTablePeriod
        open={open}
        onClose={setOpen}
        periodId={periodId}
      />
    </div>
  );
}
