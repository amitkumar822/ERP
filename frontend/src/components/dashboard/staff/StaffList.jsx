import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Download } from "lucide-react";
import {
  useGetAllStaffQuery,
  useRemoveStaffMutation,
} from "@/redux/features/api/staffApi";
import { DateFormatConverter } from "@/helpers/dateFormatConverter";
import { Card } from "@/components/ui/card";
import { ViewDetails } from "../ViewDetails";
import { useEffect, useState } from "react";
import DeleteClassModal from "@/components/deleteModel/DeleteClassModal";
import { toast } from "react-toastify";

const statusColors = {
  Active: "bg-green-500 text-white",
  Resigned: "bg-yellow-500 text-white",
  Retired: "bg-gray-500 text-white",
};

export const StaffList = () => {
  const { data: staff } = useGetAllStaffQuery();

  //*********** 👇 View Staff Details 👇 ***********
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState({});

  //^ ***********👇 Delete Staff Functionality 👇************
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteStaffId, setDeleteStaffId] = useState("");

  const [removeStaff, { error, isError, isLoading, isSuccess }] =
    useRemoveStaffMutation();
  const handleDeleteStaff = async () => {
    await removeStaff(deleteStaffId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Successfully Delete Staff!");
      setDeleteModalOpen(false);
    } else if (error) {
      alert(error?.data?.message || "Faild to Delete Staff");
    }
  }, [error, isSuccess]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card className="p-4">
        <h1 className="text-2xl font-bold mb-4">Staff List</h1>
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100 text-left text-gray-500">
              <TableHead className="p-3">Sr. No.</TableHead>
              <TableHead className="p-3">Name</TableHead>
              <TableHead className="p-3">Phone</TableHead>
              <TableHead className="p-3">Position</TableHead>
              <TableHead className="p-3">Joining Date</TableHead>
              <TableHead className="p-3">Salary</TableHead>
              <TableHead className="p-3">Status</TableHead>
              <TableHead className="p-3 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff?.data.map((member, index) => (
              <TableRow key={member._id} className="border-b">
                <TableCell className="p-3">{index + 1}</TableCell>
                <TableCell className="p-3">{member.fullName}</TableCell>
                <TableCell className="p-3">
                  <a
                    href={`tel:${member.phone}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {member.phone}
                  </a>
                </TableCell>
                <TableCell className="p-3">
                  <Badge variant="secondary" className="bg-blue-500 text-white">
                    {member.position}
                  </Badge>
                </TableCell>
                <TableCell className="p-3">
                  {DateFormatConverter(member.joiningDate)}
                </TableCell>
                <TableCell className="p-3">
                  ₹{member.salary.toLocaleString()}
                </TableCell>
                <TableCell className="p-3">
                  <Badge
                    className={`${
                      statusColors[member.status] || "bg-gray-300"
                    }`}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="p-3 flex justify-center space-x-2">
                  <Tooltip content="View">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gray-200 border border-gray-300 cursor-pointer"
                      onClick={() => {
                        setViewDetailsData(member);
                        setIsViewDetailsModalOpen(true);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gray-200 border border-gray-300 cursor-pointer"
                    >
                      <Edit className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-red-500 border hover:bg-red-600 hover:text-white duration-300 border-red-600 text-white cursor-pointer"
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setDeleteStaffId(member._id);
                      }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Download PDF">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-gray-200 border border-gray-300 cursor-pointer"
                    >
                      <Download className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div>
        <ViewDetails
          data={viewDetailsData}
          title="Staff Details"
          open={isViewDetailsModalOpen}
          onClose={setIsViewDetailsModalOpen}
        />
      </div>

      {/* Class Delete Model */}
      <div>
        <DeleteClassModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteStaff}
          message={"Staff"}
          isPending={isLoading}
        />
      </div>
    </div>
  );
};
