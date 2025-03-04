import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Staff from "../models/staff.model.js";

/**
 * @desc Add a new staff to the database
 * @rootRoute /api/v1/staff
 * @route POST /joining-staff
 * @access Private
 */
export const joiningStaff = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    gender,
    dateOfBirth,
    position,
    joiningDate,
    salary,
    address,
  } = req.body;

  if (
    !fullName ||
    !phone ||
    !gender ||
    !position ||
    !joiningDate ||
    !salary ||
    !address
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const [existingPhone, existingEmail] = await Promise.all([
    Staff.findOne({ phone }),
    Staff.findOne({ email }),
  ]);

  if (existingPhone || existingEmail) {
    throw new ApiError(
      409,
      `Staff ${fullName} already exists with ${
        existingPhone ? "phone number" : "email"
      }: ${existingPhone ? phone : email}`
    );
  }

  const newStaff = new Staff({
    fullName,
    email,
    phone,
    gender,
    dateOfBirth,
    position,
    joiningDate,
    salary,
    address,
  });
  await newStaff.save();

  res
    .status(201)
    .json(
      new ApiResponse(201, newStaff, `Staff ${fullName} joined successfully`)
    );
});

/**
 * @desc Get All Staff
 * @route GET /get-all-staff
 * @access Private
 */
export const getAllStaff = asyncHandler(async (_, res) => {
  const staff = await Staff.find().sort({ createdAt: -1 }).lean();

  if (!staff || staff.length === 0) {
    throw new ApiError(404, "No staff found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, staff, "All staff fetched successfully"));
});

/**
 * @desc Remove Staff
 * @route GET /remove-staff/:staffId
 * @access Private
 */
export const deleteStaff = asyncHandler(async (req, res) => {
  const { staffId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(staffId)) {
    throw new ApiError(400, "Invalid Staff ID!");
  }

  const staff = await Staff.findByIdAndDelete(staffId);
  if (!staff) {
    throw new ApiError(404, "Staff not found");
  }

  res.status(200).json(new ApiResponse(200, [], "Staff deleted successfully"));
});
