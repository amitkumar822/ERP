import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const DriverSalaryPayment = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Driver Salary Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Driver Name</Label>
              <Input placeholder="Enter Driver Name" />
            </div>
            <div>
              <Label>Driver ID</Label>
              <Input placeholder="Enter Driver ID" />
            </div>
            <div>
              <Label>Salary Month</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Payment Status</Label>
              <Select>
                <SelectTrigger>Select Status</SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment Mode</Label>
              <Select>
                <SelectTrigger>Select Mode</SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter Amount" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="bg-blue-600 text-white">Submit Payment</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Jan 2025</TableCell>
                  <TableCell>$500</TableCell>
                  <TableCell className="text-green-600">Paid</TableCell>
                  <TableCell>Bank Transfer</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverSalaryPayment;
