import mongoose from "mongoose";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import TeacherFee from "../../models/fees/teacherFee.model.js";

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
  console.log(teacherId);
  

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
    month: month,
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
