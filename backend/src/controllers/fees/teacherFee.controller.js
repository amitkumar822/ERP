import mongoose from "mongoose";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import TeacherFee from "../../models/fees/teacherFee.model.js";

/**
 * @desc Pay Teacher fees
 * @rootRoute /api/v1/pay-fees
 * @route POST /pay-teacher-fees
 * @access Private
 */
export const payTeacherFees = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const {
    month,
    basicSalary,
    bonus,
    deductions,
    grossSalary,
    netSalary,
    paymentMode,
    paymentAmount,
    transactionId,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid teacher ID");
  }

  if (netSalary < paymentAmount) {
    throw new ApiError(
      400,
      "Payment amount should be less than or equal to net salary"
    );
  }

  // check if teacher fees already exist for the given month
  const existingTeacherFee = await TeacherFee.findOne({
    teacher: teacherId,
    month: month,
  });
  if (existingTeacherFee) {
    throw new ApiError(
      400,
      `Teacher fees for ${month} already exist for teacher ${existingTeacherFee?.fullName}`
    );
  }

  // create teacher fee document
  const newTeacherFee = new TeacherFee({
    teacherId,
    monthYear: month,
    basicSalary,
    bonus,
    deductions,
    grossSalary,
    netSalary,
    paymentMode,
    paymentAmount,
    transactionId,
  });
  await newTeacherFee.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, newTeacherFee, "Teacher Salary Successfully Payment")
    );
});

/**
 * @desc Get All Payment
 * @route GET /get-teacher-fees
 * @access Private
 */
export const getTeacherFee = asyncHandler(async (_, res) => {
  const allTeacherFees = await TeacherFee.find()
    .populate("teacherId", "fullName phoneNumber email designation")
    .sort({ createdAt: -1 })
    .lean();

  if (!allTeacherFees || allTeacherFees.length === 0) {
    throw new ApiError(404, "No teacher fees found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, allTeacherFees, "All Teacher Fees"));
});
