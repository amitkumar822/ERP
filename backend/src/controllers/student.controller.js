import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js";

export const addStudent = asyncHandler(async (req, res) => {
  const {
    fullName,
    className,
    section,
    academicYear,
    caste,
    admissionDate,
    rollNumber,
    religion,
    category,
    studentNumber,
    dob,
    gender,
    bloodGroup,
    motherTongue,
    studentEmail,
    fatherName,
    fatherOccupation,
    fatherNumber,
    motherName,
    motherOccupation,
    motherNumber,
    permanentAddress,
    currentAddress,
  } = req.body;

  // if (
  //   !fullName ||
  //   !className ||
  //   !caste ||
  //   !admissionDate ||
  //   !rollNumber ||
  //   !religion ||
  //   !category ||
  //   !dob ||
  //   !gender ||
  //   !fatherName ||
  //   !fatherNumber ||
  //   !motherName ||
  //   !permanentAddress ||
  //   !section ||
  //   !academicYear
  // ) {
  //   throw new ApiError(400, "All Field Must be required");
  // }

  const findClass = await Class.findOne({
    className,
    section,
    academicYear,
  });

  if(!findClass || findClass?.length === 0) {
    throw new ApiError( 404, "Class not found",);
  }

  res.status(201).json(new ApiResponse(201,findClass, "Student added successfully"));
});

export const getAllStudents = asyncHandler(async (_, res) => {
  const students = await Student.find()
    .sort({
      createdAt: -1,
    })
    .lean();

  if (!students || students?.length === 0) {
    throw new ApiError("No students found", 404);
  }

  res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully"));
});
