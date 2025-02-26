import React, { useEffect, useState } from "react";
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
import { MapIcon, Upload } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { periodsList } from "@/helpers/periodsList";
import { toast } from "react-toastify";
import { useEditTimeTablePeriodMutation } from "@/redux/features/api/classesApi";

export const UpdateTimeTablePeriod = ({ open, onClose, periodId }) => {
  const [formEdit, setFormEdit] = useState({
    period: "",
    periodTime: "",
    subject: "",
  });
  const handleChange = (e) => {
    setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
  };

  const [editTimeTablePeriod, { data, error, isSuccess }] =
    useEditTimeTablePeriodMutation();

  const handleEditPeriod = async (e) => {
    e.preventDefault();
    await editTimeTablePeriod({
      periodId,
      period: formEdit.period,
      periodTime: formEdit.periodTime,
      subject: formEdit.subject,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Timetable period updated successfully!");
      onClose();
      setFormEdit({
        period: "",
        periodTime: "",
        subject: "",
      });
    } else if (error) {
      toast.error(error?.data?.message || "Failed to delete period");
    }
  }, [isSuccess, error]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <Card className="p-2 mt-3">
          <CardContent>
            <h2 className="font-bold flex justify-center items-center gap-2">
              <MapIcon size={20} /> Update Timetable Period
            </h2>
            <form onSubmit={handleEditPeriod} className="flex flex-col gap-2">
              {/* Period */}
              <div>
                <Label htmlFor="period">Period</Label>
                <Select
                  onValueChange={(value) =>
                    handleChange({ target: { name: "period", value } })
                  }
                  value={formEdit.period}
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
                  value={formEdit.periodTime}
                  onChange={handleChange}
                />
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter Subject"
                  value={formEdit.subject}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-3">
                <Button
                  type="submit"
                  className="w-full flex gap-2 cursor-pointer"
                >
                  <Upload size={18} /> Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
