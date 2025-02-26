import { useState } from "react";
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
import { PlusCircle, Plus, MapIcon } from "lucide-react";
import "jspdf-autotable";
import { days } from "@/helpers/days";
import { classNames } from "@/helpers/classNames";
import { sections } from "@/helpers/sections";
import { periodsList } from "@/helpers/periodsList";
import { academicYear } from "@/helpers/academicYear";
import { useCreateClassTimeTableMutation } from "@/redux/features/api/classesApi";

export default function TimeTable() {
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

  const [createClassTimeTable, { data, isLoading, isError, isSuccess }] =
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

  console.log(data, isLoading, isError, isSuccess);

  const handleEdit = (index) => {};

  const handleDelete = (index) => {};

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

      {/* {Object.keys(groupedTimetable).map((key, index) => {
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
                        <Button
                          size="sm"
                          onClick={() => handleEdit(periods.indexOf(entry))}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(periods.indexOf(entry))}
                        >
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
      })} */}
    </div>
  );
}
