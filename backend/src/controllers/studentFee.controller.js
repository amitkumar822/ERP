import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import StudentFee from "../models/studentFee.model.js";
import Student from "../models/student.model.js";

/**
 * @desc Pay student fees
 * @rootRoute /api/v1/student-fees
 * @route POST /pay-student-fee
 * @access Private
 */
export const payStudentFees = asyncHandler(async (req, res) => {
  const {
    rollNumber,
    class: className,
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

  const student = await Student.findOne({
    rollNumber,
    className,
    section,
    academicYear,
  });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  if (
    student?.fullName.toLowerCase() !==
    studentName.toString().trim().toLowerCase()
  ) {
    throw new ApiError(
      400,
      `Data mismatch. Please verify: Student Name, Roll Number, and Class Name. Provided details do not match the stored record. Databse Student Name is ${student?.fullName}.`
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
