import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function StudentDialog({ student, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Student Details
          </DialogTitle>
          <DialogDescription>Complete student information</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg overflow-hidden border border-gray-300">
          <table className="w-full border-collapse">
            <tbody>
              {[
                ["Full Name", student?.fullName],
                ["Class", `${student?.className} (${student?.section})`],
                ["Academic Year", student?.academicYear],
                ["Roll Number", student?.rollNumber],
                ["Gender", student?.gender],
                ["Date of Birth", student?.dob],
                ["Blood Group", student?.bloodGroup],
                ["Mother Tongue", student?.motherTongue],
                ["Religion", student?.religion],
                ["Category", student?.category],
                ["Caste", student?.caste],
                ["Admission Date", student?.admissionDate],
                ["Father's Name", student?.fatherName],
                ["Father's Occupation", student?.fatherOccupation],
                ["Father's Number", student?.fatherNumber],
                ["Mother's Name", student?.motherName],
                ["Mother's Number", student?.motherNumber],
                ["Student Email", student?.studentEmail],
                ["Student Number", student?.studentNumber],
                [
                  "Permanent Address",
                  `${student?.address?.permanentAddress?.permanentAddress}, ${student?.address?.permanentAddress?.city}, ${student?.address?.permanentAddress?.state}, ${student?.address?.permanentAddress?.zipCode}`,
                ],
                [
                  "Current Address",
                  `${student?.address?.currentAddress?.currentAddress}, ${student?.address?.currentAddress?.city}, ${student?.address?.currentAddress?.state}, ${student?.address?.currentAddress?.zipCode}`,
                ],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-gray-200">
                  <td className="font-semibold p-3 bg-gray-100">{label}:</td>
                  <td className="p-3">{value || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StudentDialog;
