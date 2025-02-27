import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import StudentFee from "../models/studentFee.model.js";


/**
 * @desc Pay student fees
 * @route POST /api/fees/pay
 * @access Private
 */
export const payStudentFees = async (req, res) => {
  try {
    const {
      studentName,
      rollNumber,
      fatherName,
      class: studentClass,
      section,
      academicYear,
      paymentDate,
      tuitionFee,
      examFee,
      transportFee,
      hostelFee,
      totalFee,
      paymentMode,
      utrNo,
      miscellaneousFee,
      discountFees,
      paymentAmount,
      otherFees,
    } = req.body;

    // Validate required fields
    if (
      !studentName ||
      !rollNumber ||
      !academicYear ||
      !totalFee ||
      !paymentAmount ||
      !paymentMode
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Find the student's fee record
    let studentFee = await StudentFee.findOne({ rollNumber, academicYear });

    if (!studentFee) {
      // If no record exists, create a new one
      studentFee = new StudentFee({
        studentName,
        rollNumber,
        fatherName,
        class: studentClass,
        section,
        academicYear,
        feeDetails: [],
      });
    }

    // Calculate the pending amount
    const pendingAmount = totalFee - (paymentAmount + discountFees);

    // Construct new fee payment entry
    const newFeeEntry = {
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      tuitionFee: tuitionFee || 0,
      examFee: examFee || 0,
      transportFee: transportFee || 0,
      hostelFee: hostelFee || 0,
      miscellaneousFee: miscellaneousFee || 0,
      otherFees: otherFees || 0,
      discountFees: discountFees || 0,
      totalFee,
      paymentMode,
      transactionId: paymentMode === "Online" ? utrNo || null : null,
      paymentAmount,
      pendingAmount: pendingAmount < 0 ? 0 : pendingAmount, // Avoid negative pending amount
      status:
        pendingAmount <= 0 ? "Paid" : paymentAmount > 0 ? "Partial" : "Pending",
    };

    // Push new fee payment entry to the feeDetails array
    studentFee.feeDetails.push(newFeeEntry);

    // Update last payment date
    studentFee.lastPaymentDate = newFeeEntry.paymentDate;

    // Save the updated fee record
    await studentFee.save();

    return res.status(200).json({
      message: "Payment recorded successfully",
      data: studentFee,
    });
  } catch (error) {
    console.error("Error in payStudentFees:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
