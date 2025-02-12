import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const FeeStructure = () => {
  const [fees, setFees] = useState([
    { id: 1, category: "Student", name: "John Doe", amount: 500, status: "Paid" },
    { id: 2, category: "Teacher", name: "Jane Smith", amount: 1000, status: "Pending" },
  ]);

  const [newFee, setNewFee] = useState({ category: "", name: "", amount: "", status: "Pending" });

  const handleAddFee = () => {
    setFees([...fees, { ...newFee, id: fees.length + 1 }]);
    setNewFee({ category: "", name: "", amount: "", status: "Pending" });
  };

  const handleDeleteFee = (id) => {
    setFees(fees.filter(fee => fee.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Manage Fee Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <Select onValueChange={(value) => setNewFee({ ...newFee, category: value })}>
                <SelectTrigger>Select Category</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Name</Label>
              <Input placeholder="Enter Name" value={newFee.name} onChange={(e) => setNewFee({ ...newFee, name: e.target.value })} />
            </div>
            <div>
              <Label>Amount</Label>
              <Input type="number" placeholder="Enter Amount" value={newFee.amount} onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })} />
            </div>
            <div>
              <Label>Status</Label>
              <Select onValueChange={(value) => setNewFee({ ...newFee, status: value })}>
                <SelectTrigger>Select Status</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button className="bg-blue-600 text-white" onClick={handleAddFee}>Add Fee</Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fee Structure List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fees.map(fee => (
                  <TableRow key={fee.id}>
                    <TableCell>{fee.id}</TableCell>
                    <TableCell>{fee.category}</TableCell>
                    <TableCell>{fee.name}</TableCell>
                    <TableCell>${fee.amount}</TableCell>
                    <TableCell className={fee.status === "Paid" ? "text-green-600" : "text-red-600"}>{fee.status}</TableCell>
                    <TableCell>
                      <Button className="bg-red-600 text-white" onClick={() => handleDeleteFee(fee.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeeStructure;
