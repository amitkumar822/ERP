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
import {
  Pencil,
  Eye,
  CreditCard,
  Book,
  Calendar,
  Phone,
  User,
  UserCircle,
  BadgeCheck,
  Clock,
} from "lucide-react";
import axios from "axios";
import {
  useGetAllStudentFeesQuery,
  usePayStudentPendingAmountMutation,
} from "@/redux/features/api/feeApi";
import { ViewDetails } from "@/components/dashboard/ViewDetails";
import { PayPendingFees } from "@/components/dashboard/student/PayPendingFees";
import { toast } from "react-toastify";

const statusColors = {
  Paid: "bg-green-100 text-green-700",
  Partial: "bg-yellow-100 text-yellow-700",
  Pending: "bg-red-100 text-red-700",
};

export default function StudentFeesList() {
  //& *********👇 Start Geting Student Fees 👇**********
  const [openDilogBoxViewFeesDetails, setOpenDilogBoxViewFeesDetails] =
    useState(false);
  const [singleStudentFees, setSingleStudentFees] = useState([]);
  const { data } = useGetAllStudentFeesQuery();
  console.log(data);

  //& ********👆 End Start Geting Student Fees👆************

  //   **********👇 Start Pending Fee Pay👇*********
  const [openDilogBoxPayPendingFees, setOpenDilogBoxPayPendingFees] =
    useState(false);
  const [pendingAmount, setPendingAmount] = useState("");
  const [pendingFeeId, setPendingFeeId] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [transactionId, setTransactionId] = useState("");

  const [payStudentPendingAmount, { error, isSuccess, isLoading }] =
    usePayStudentPendingAmountMutation();

  const handlePendingFee = async (e) => {
    e.preventDefault();

    await payStudentPendingAmount({
      pendingAmount,
      paymentMode,
      transactionId,
      pendingFeeId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(error?.data?.message || "Successfully Pay Pending Fee!");
      setOpenDilogBoxPayPendingFees(false);
      setPendingAmount("");
      setPaymentMode("Cash");
      setTransactionId("");
      setPendingFeeId("");
    } else if (error) {
      alert(error?.data?.message || "Failed Pay Pending Fee!");
    }
  }, [error, isSuccess]);
  //   *************👆 End Pending Fee Pay👆 **************

  return (
    <div className="md:p-6 max-w-8xl mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Student Fees List</h2>
          {data?.data?.map((student) => (
            <div
              key={student._id}
              className="mb-6 border-b pb-4 bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <div className="">
                {/* Student Name & Roll Number */}
                <h3 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                  <UserCircle className="text-blue-500" size={20} />
                  {student.studentId.fullName}
                  <span className="text-gray-600 text-sm">
                    (Roll No: {student.studentId.rollNumber})
                  </span>
                </h3>

                {/* Father's Name */}
                <p className="text-md text-gray-800 font-medium flex items-center gap-2 mt-2">
                  <User className="text-green-500" size={18} />
                  <span className="text-green-700">Father's Name:</span>{" "}
                  {student.studentId.fatherName}
                </p>

                {/* Father's Mobile */}
                <p className="text-md text-gray-800 font-medium flex items-center gap-2 mt-1">
                  <Phone className="text-purple-500" size={18} />
                  <span className="text-purple-700">Father's Mobile:</span>{" "}
                  <a
                    href={`tel:${student.studentId.fatherNumber}`}
                    className="hover:text-blue-700 text-blue-500 hover:underline "
                  >
                    {student.studentId.fatherNumber}
                  </a>
                </p>

                {/* Academic Year */}
                <p className="text-md text-gray-800 font-medium flex items-center gap-2 mt-1">
                  <Calendar className="text-indigo-500" size={18} />
                  <span className="text-indigo-700">Academic Year:</span>{" "}
                  {student.academicYear}
                </p>

                {/* Month */}
                <p className="text-md text-gray-800 font-medium flex items-center gap-2 mt-1">
                  <Book className="text-red-500" size={18} />
                  <span className="text-red-700">Month:</span> {student.month}
                </p>
              </div>
              <Table className="text-nowrap">
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr. No.</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead className="text-green-500">
                      Discount Amount
                    </TableHead>
                    <TableHead className="text-red-500">
                      Pending Amount
                    </TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.feeDetails.map((fee, index) => (
                    <TableRow key={fee._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {new Date(fee.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{fee.totalFee}</TableCell>
                      <TableCell>₹{fee.paymentAmount}</TableCell>
                      <TableCell className="text-green-500">
                        -₹{fee.discountFees === null ? 0 : fee.discountFees}
                      </TableCell>
                      <TableCell className="text-red-600 font-bold">
                        ₹{fee.pendingAmount}
                      </TableCell>
                      <TableCell>{fee.paymentMode}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusColors[fee.status]} rounded-md`}
                        >
                          {fee.status === "Paid" ? (
                            <BadgeCheck className=" text-green-600" />
                          ) : (
                            <Clock className=" text-yellow-600" />
                          )}
                          {fee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        {fee.pendingAmount > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 cursor-pointer"
                            onClick={() => {
                              setPendingFeeId(fee._id);
                              setPendingAmount(fee.pendingAmount);
                              setOpenDilogBoxPayPendingFees(true);
                            }}
                          >
                            <CreditCard size={16} /> Pay Now
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-yellow-600 cursor-pointer"
                        >
                          <Pencil size={16} /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600 cursor-pointer"
                          onClick={() => {
                            setOpenDilogBoxViewFeesDetails(true),
                              setSingleStudentFees(fee);
                          }}
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

      {/* Fee Details Show Dilog */}
      <div>
        <ViewDetails
          data={singleStudentFees}
          title="Student Fees Details"
          open={openDilogBoxViewFeesDetails}
          onClose={setOpenDilogBoxViewFeesDetails}
        />
      </div>

      {/* Pending Fees Dilog */}
      <PayPendingFees
        open={openDilogBoxPayPendingFees}
        onClose={setOpenDilogBoxPayPendingFees}
        pendingAmount={pendingAmount}
        setPendingAmount={setPendingAmount}
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        isLoading={isLoading}
        handleSubmit={handlePendingFee}
      />
    </div>
  );
}
