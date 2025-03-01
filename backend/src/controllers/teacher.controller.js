import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Teacher from "../models/teacher.model.js";

/**
 * @desc  Create And Update a Teacher
 * @route "POST" /joining-and-update
 * @access Private (Admin)
 */
export const joiningTeacher = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    joiningDate,
    password,
    phoneNumber,
    gender,
    designation,
    dob,
    qualification,
    profileImage,
    document,
    identification,
    experience,
    previousInstitutionName,
    extracurricularActivities,
    permanentAddress,
    currentAddress,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !joiningDate ||
    !password ||
    !phoneNumber ||
    !gender ||
    !qualification ||
    !experience ||
    !permanentAddress
  ) {
    throw new ApiError(
      400,
      "This field is required fullName, email, joiningDate, password, phone Number, gender, qualification, experience, permanentAddress"
    );
  }

  const existingTeacher = await Teacher.findOne({ phoneNumber }).lean();

  if (existingTeacher) {
    throw new ApiError(
      400,
      `Teacher with phone number ${phoneNumber} already exists`
    );
  }

  const newTeacher = await Teacher.create({
    fullName,
    email,
    joiningDate,
    password,
    phoneNumber,
    gender,
    designation,
    dob,
    qualification,
    profileImage,
    document,
    identification,
    experience,
    previousInstitutionName,
    extracurricularActivities,
    address: {
      permanentAddress,
      currentAddress,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, newTeacher, "Teacher added successfully"));
});

/**
 * @desc Get All Teachers
 * @route "GET" /get-all-teachers
 * @access Private (Admin)
 */
export const getAllTeachers = asyncHandler(async (_, res) => {
  const teachers = await Teacher.find().lean();

  if (!teachers || teachers.length === 0) {
    throw new ApiError(404, "No teachers found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
});

/**
 * @desc Delete Teachers
 * @route "GET" /remove-teacher
 * @access Private (Admin)
 */
export const deleteTeacher = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid Teacher ID!");
  }

  const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
  if (!deletedTeacher) {
    throw new ApiError(404, "Teacher not found");
  }

  res.status(200).json(new ApiResponse(200, [], "Teacher deleted"));
});

//^ below not used controller
export const getTeacherById = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    throw new ApiError(400, "Invalid Teacher ID!");
  }

  const teacher = await Teacher.findById(teacherId).lean();

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, teacher, "Teacher fetched successfully"));
});
