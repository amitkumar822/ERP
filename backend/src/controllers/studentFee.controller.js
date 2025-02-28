import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import StudentFee from "../models/studentFee.model.js";
import Student from "../models/student.model.js";

/**
 * @desc Pay student fees
 * @rootRoute /api/v1/pay-fees
 * @route POST /pay-student-fee
 * @access Private
 */
export const payStudentFees = asyncHandler(async (req, res) => {
  const {
    rollNumber,
    className,
    section,
    academicYear,
    studentName,
    paymentDate,
    tuitionFee,
    examFee,
    transportFee,
    hostelFee,
    miscellaneousFee,
    discountFees,
    paymentAmount,
    totalFee,
    paymentMode,
    utrNo,
    otherFees,
  } = req.body;

  console.log(rollNumber, className, section, academicYear);

  const student = await Student.findOne({
    rollNumber,
    className,
    section,
    academicYear,
  });

  if (!student) {
    throw new ApiError(
      404,
      `No student found with Roll Number: ${rollNumber}, Class: ${className}, Section: ${section}, Academic Year: ${academicYear}. Please verify the details and try again.`
    );
  }

  if (
    student?.fullName.toLowerCase() !==
    studentName.toString().trim().toLowerCase()
  ) {
    throw new ApiError(
      400,
      `Student data mismatch detected. Please verify the details:  
    - Entered Name: ${studentName}  
    - Entered Roll Number: ${rollNumber}  
    - Entered Class: ${className}  
      
    These details do not match our records. The correct details are:  
    - Registered Name: ${student?.fullName}  
    - Registered Roll Number: ${student?.rollNumber}  
    - Registered Class: ${student?.className}.`
    );
  }

  // **Find or create StudentFee record for this student & academic year & month**
  const currentMonth = new Date(paymentDate).toLocaleString("default", {
    month: "long",
  });

  let studentFee = await StudentFee.findOne({
    studentId: student._id,
    academicYear,
    month: currentMonth,
  });

  if (!studentFee) {
    studentFee = new StudentFee({
      studentId: student._id,
      academicYear,
      month: currentMonth,
      feeDetails: [],
    });
  }

  studentFee.feeDetails.push({
    paymentDate,
    tuitionFee,
    examFee,
    transportFee,
    hostelFee,
    miscellaneousFee,
    discountFees,
    paymentAmount,
    totalFee,
    paymentMode,
    otherFees,
    transactionId: utrNo || null, // Set UTR No. if available
    status:
      paymentAmount >= totalFee
        ? "Paid"
        : paymentAmount > 0
        ? "Partial"
        : "Pending",
  });

  await studentFee.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, studentFee, "Fee payment recorded successfully")
    );
});

/**
 * @desc Get All Payment
 * @route POST /get-student-fees
 * @access Private
 */
export const getStudentFee = asyncHandler(async (_, res) => {
  const allStudentFees = await StudentFee.find()
    .populate("studentId", "fullName rollNumber fatherName fatherNumber")
    .lean();

  if (!allStudentFees) {
    throw new ApiError(404, "No student fees found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, allStudentFees, "Successfully get all students fees")
    );
});

/**
 * @desc Pay Pending Fee Payment
 * @route POST /gpay-pending-student-fee/:feeId
 * @access Private
 */
export const payPendingFees = asyncHandler(async (req, res) => {
  const { feeId } = req.params;
  const { pendingAmount: paymentAmount, paymentMode, transactionId } = req.body;

  // Find the specific student fee record by feeId
  const studentFee = await StudentFee.findOne({ "feeDetails._id": feeId });

  if (!studentFee) {
    throw new ApiError(404, "Fee record not found");
  }

  // Find the specific feeDetail entry within feeDetails array
  const feeDetail = studentFee.feeDetails.find(
    (fee) => fee._id.toString() === feeId
  );

  if (!feeDetail) {
    throw new ApiError(404, "Fee detail entry not found");
  }

  if (feeDetail.status === "Paid") {
    throw new ApiError(400, "This fee has already been fully paid");
  }

  if (paymentAmount <= 0) {
    throw new ApiError(400, "Payment amount must be greater than zero");
  }

  if (paymentAmount > feeDetail.pendingAmount) {
    throw new ApiError(400, "Payment amount exceeds pending amount");
  }

  // Update pending amount and payment status
  feeDetail.paymentAmount += paymentAmount;
  feeDetail.pendingAmount -= paymentAmount;
  feeDetail.paymentMode = paymentMode;
  feeDetail.transactionId = transactionId || null;

  // Update status based on remaining pendingAmount
  feeDetail.status = feeDetail.pendingAmount === 0 ? "Paid" : "Partial";

  await studentFee.save();

  res
    .status(200)
    .json(new ApiResponse(200, studentFee, "Pending fee payment successful"));
});

/**
 * @desc Get Pending Fee Details
 * @route GET /get-pending-fees
 * @access Private
 */
export const getPendingFeeDetail = asyncHandler(async (_, res) => {
  const allPendingFeeDetail = await StudentFee.find({
    "feeDetails.status": "Partial",
  })
    .populate("studentId", "fullName rollNumber fatherName fatherNumber")
    .lean();

  if (!allPendingFeeDetail) {
    throw new ApiError(404, "No pending fee found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allPendingFeeDetail,
        "Successfully get all pending fees"
      )
    );
});

/**
 * @desc Get Student Fee Details by Roll Number
 * @route GET /get-student-fee-by-roll/:rollNumber
 * @access Private
 */

export const getStudentFeeByRoll = asyncHandler(async (req, res) => {});
