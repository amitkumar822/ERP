import mongoose from "mongoose";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import StaffFee from "../../models/fees/staffFee.model.js";

/**
 * @desc Pay Staff fees
 * @rootRoute /api/v1/pay-fees
 * @route POST /pay-staff-fees
 * @access Private
 */
export const payStaffFees = asyncHandler(async (req, res) => {
  const { staffId } = req.params;
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

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid Staff ID");
  }

  if (netSalary < paymentAmount) {
    throw new ApiError(
      400,
      "Payment amount should be less than or equal to net salary"
    );
  }

  // check if staff fees already exist for the given month
  const existingStaffFee = await StaffFee.findOne({
    staffId: staffId,
    month: month,
  });
  if (existingStaffFee) {
    throw new ApiError(
      400,
      `Staff fees for ${month} already exist for staff ${existingStaffFee?.fullName}`
    );
  }

  // create staff fee document
  const newStaffFee = new StaffFee({
    staffId,
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
  await newStaffFee.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, newStaffFee, "Staff Salary Successfully Payment")
    );
});

/**
 * @desc Get All Payment
 * @route GET /get-staff-fees
 * @access Private
 */
export const getStaffFee = asyncHandler(async (_, res) => {
  const allStaffFees = await StaffFee.find()
    .populate("staffId", "fullName phoneNumber email positon")
    .sort({ createdAt: -1 })
    .lean();

  if (!allStaffFees || allStaffFees.length === 0) {
    throw new ApiError(404, "No Staff fees found");
  }

  res.status(200).json(new ApiResponse(200, allStaffFees, "All Staff Fees"));
});

/**
 * @desc Pay Pending Staff Fees
 * @route PUT /pay-pending-staff-fee/:feeId
 * @access Private
 */
export const payPendingStaffFees = asyncHandler(async (req, res) => {
  const { feeId } = req.params;
  const { paymentMode, paymentAmount, transactionId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(feeId)) {
    throw new ApiError(400, "Invalid Payment ID");
  }

  const feeDetails = await StaffFee.findById(feeId);

  if (!feeDetails || feeDetails.length === 0) {
    throw new ApiError(400, "No Record Found");
  }

  if (feeDetails.pendingAmount === 0) {
    throw new ApiError(400, "This fee has already been fully paid");
  }

  if (feeDetails.pendingAmount < paymentAmount) {
    throw new ApiError(400, "Payment amount exceeds pending amount");
  }

  // update pending amount
  feeDetails.paymentAmount += paymentAmount;
  feeDetails.paymentMode = paymentMode;
  feeDetails.transactionId = transactionId;

  await feeDetails.save();

  res
    .status(200)
    .json(new ApiResponse(200, feeDetails, "Pending fee payment successful"));
});
