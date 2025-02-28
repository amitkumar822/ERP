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
