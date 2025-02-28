import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, CreditCard } from "lucide-react";
import axios from "axios";
import { useGetAllStudentFeesQuery } from "@/redux/features/api/feeApi";

const statusColors = {
  Paid: "bg-green-100 text-green-700",
  Partial: "bg-yellow-100 text-yellow-700",
  Pending: "bg-red-100 text-red-700",
};

export default function StudentFeesList() {
  const { data } = useGetAllStudentFeesQuery();
  return (
    <div className="p-6 max-w-8xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Student Fees List</h2>
          {data?.data?.map((student) => (
            <div key={student._id} className="mb-6 border-b pb-4">
              <h3 className="text-lg font-medium">
                {student.studentId.fullName} (Roll No:{" "}
                {student.studentId.rollNumber})
              </h3>
              <p className="text-sm text-gray-600">
                Father's Name: {student.studentId.fatherName}
              </p>
              <p className="text-sm text-gray-600">
                Father's Mobile: {student.studentId.fatherNumber}
              </p>
              <p className="text-sm text-gray-600">
                Academic Year: {student.academicYear}
              </p>
              <p className="text-sm text-gray-600">Month: {student.month}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead className="text-red-500">
                      Pending Amount
                    </TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.feeDetails.map((fee) => (
                    <TableRow key={fee._id}>
                      <TableCell>
                        {new Date(fee.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{fee.totalFee}</TableCell>
                      <TableCell>₹{fee.paymentAmount}</TableCell>
                      <TableCell className="text-red-600 font-bold">
                        ₹{fee.pendingAmount}
                      </TableCell>
                      <TableCell>{fee.paymentMode}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            statusColors[fee.status]
                          } px-2 py-1 rounded-md`}
                        >
                          {fee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        {fee.pendingAmount > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600"
                          >
                            <CreditCard size={16} /> Pay Now
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-yellow-600"
                        >
                          <Pencil size={16} /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600"
                        >
                          <Eye size={16} /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
