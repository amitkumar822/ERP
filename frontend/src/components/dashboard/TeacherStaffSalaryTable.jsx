import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BadgeCheck,
  AlertCircle,
  Clock,
  ClipboardList,
  Eye,
  CreditCard,
  LucideBadgeIndianRupee,
  BadgeIndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { FaFilePdf } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ViewDetails } from "./ViewDetails";
import { SalaryTeacherStaffPDF } from "./pdf/SalaryTeacherStaffPDF";
import {
  usePayPendingStaffFeesMutation,
  usePayPendingTeacherFeesMutation,
} from "@/redux/features/api/feeApi";
import { toast } from "react-toastify";
import { PayPendingFees } from "./student/PayPendingFees";

export const TeacherStaffSalaryTable = ({ title, salaryDetails }) => {
  const [salaryData, setSalaryData] = useState(null);
  const [showSalaryData, setShowSalaryData] = useState(false);

  //! ******** PDF Download ***********
  const handleReceiptPdfGenerate = (salaryData) => {
    SalaryTeacherStaffPDF(
      {
        name: "Oakwood Academy",
        address: "123 Maple Street, Anytown, CA 91234",
        contact: "+1 (555) 123-4567",
      },
      salaryData
    );
  };

  //   **********👇 Start Pending Fee Pay👇*********
  const [verifyUserType, setVerifyUserType] = useState("");
  const [openDilogBoxPayPendingFees, setOpenDilogBoxPayPendingFees] =
    useState(false);
  const [pendingAmount, setPendingAmount] = useState("");
  const [pendingFeeId, setPendingFeeId] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [transactionId, setTransactionId] = useState("");

  // Teacher Pending Fee API
  const [payPendingTeacherFees, { data, error, isSuccess, isLoading }] =
    usePayPendingTeacherFeesMutation();
  // Staff Pending Fee API
  const [
    payPendingStaffFees,
    {
      data: dataStaff,
      error: errorStaff,
      isSuccess: isSuccessStaff,
      isLoading: isLoadingStaff,
    },
  ] = usePayPendingStaffFeesMutation();

  const handlePendingFee = async (e) => {
    e.preventDefault();

    let payPendingFees =
      verifyUserType === "Teacher"
        ? payPendingTeacherFees
        : payPendingStaffFees;

    await payPendingFees({
      pendingAmount,
      paymentMode,
      transactionId,
      feeId: pendingFeeId,
    }).unwrap();
  };

  useEffect(() => {
    if (isSuccess || isSuccessStaff) {
      toast.success(
        data?.message || dataStaff?.message || "Successfully Pay Pending Fee!"
      );
      setOpenDilogBoxPayPendingFees(false);
      setPendingAmount("");
      setPaymentMode("Cash");
      setTransactionId("");
      setPendingFeeId("");
      setVerifyUserType("");
    } else if (error || errorStaff) {
      alert(
        error?.data?.message ||
          errorStaff?.data?.message ||
          "Failed Pay Pending Fee!"
      );
    }
  }, [error, isSuccess, isSuccessStaff]);
  //   *************👆 End Pending Fee Pay👆 **************

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-blue-600" /> {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr. No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Month & Year</TableHead>
              <TableHead>Basic Salary</TableHead>
              <TableHead>Net Salary</TableHead>
              <TableHead>Payment Salary</TableHead>
              <TableHead>Pending Salary</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaryDetails?.data?.map((feesDetails, index) => {
              const {
                teacherId,
                staffId,
                monthYear,
                basicSalary,
                netSalary,
                paymentAmount,
                pendingAmount,
                paymentMode,
              } = feesDetails;

              // Format Month & Year
              const formattedMonth = moment(monthYear).format("MMMM YYYY");

              // Determine Payment Status
              let statusIcon, statusText, statusColor;
              if (pendingAmount === 0) {
                statusIcon = <BadgeCheck className="w-5 h-5 text-green-600" />;
                statusText = "Paid";
                statusColor = "text-green-600";
              } else if (pendingAmount > 0 && paymentAmount > 0) {
                statusIcon = <Clock className="w-5 h-5 text-yellow-600" />;
                statusText = "Partially Paid";
                statusColor = "text-yellow-600";
              } else {
                statusIcon = <AlertCircle className="w-5 h-5 text-red-600" />;
                statusText = "Pending";
                statusColor = "text-red-600";
              }

              return (
                <TableRow key={feesDetails._id} className="hover:bg-gray-200">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {teacherId?.fullName || staffId?.fullName}
                  </TableCell>
                  <TableCell className="hover:text-blue-700 text-blue-500 hover:underline ">
                    <a
                      href={`tel:${
                        teacherId?.phoneNumber || staffId?.phoneNumber
                      }`}
                    >
                      {teacherId?.phoneNumber || staffId?.phoneNumber}
                    </a>
                  </TableCell>
                  <TableCell>{formattedMonth}</TableCell>
                  <TableCell>₹{basicSalary.toLocaleString()}</TableCell>
                  <TableCell>₹{netSalary.toLocaleString()}</TableCell>
                  <TableCell>₹{paymentAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-red-600">
                    ₹{pendingAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{paymentMode}</TableCell>
                  <TableCell
                    className={`flex items-center gap-2 ${statusColor}`}
                  >
                    {statusIcon} {statusText}
                  </TableCell>
                  <TableCell>
                    {/* Pay Pending Fees */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={statusText === "Paid" ? true : false}
                          className="text-blue-600 cursor-pointer mr-2"
                          onClick={() => {
                            setVerifyUserType(
                              feesDetails.teacherId
                                ? "Teacher"
                                : feesDetails.staffId
                                ? "Staff"
                                : ""
                            );
                            setPendingFeeId(feesDetails._id);
                            setPendingAmount(feesDetails.pendingAmount);
                            setOpenDilogBoxPayPendingFees(true);
                          }}
                        >
                          <BadgeIndianRupee className=" scale-[140%]" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Pay Pending Salary</TooltipContent>
                    </Tooltip>

                    {/* View Receipt Button with PDF Icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleReceiptPdfGenerate(feesDetails)}
                          variant="outline"
                          size="sm"
                          className="cursor-pointer p-2 text-red-600 bg-rose-100 hover:text-red-700 hover:bg-rose-200 duration-300 mr-2"
                        >
                          <FaFilePdf size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Download PDF</TooltipContent>
                    </Tooltip>

                    {/* View Teacher Fee Details Button with Document Icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => {
                            setSalaryData(feesDetails);
                            setShowSalaryData(true);
                          }}
                          variant="outline"
                          size="sm"
                          className="cursor-pointer p-2"
                        >
                          <Eye size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View Fee Details</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>

      {/* View Salary Details */}
      <div>
        <ViewDetails
          data={salaryData}
          title="Teacher Salary Details"
          open={showSalaryData}
          onClose={setShowSalaryData}
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
        isLoading={isLoading || isLoadingStaff}
        handleSubmit={handlePendingFee}
      />
    </Card>
  );
};
