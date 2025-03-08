import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import StudentResult from "../models/studentResult.model.js";

/**
 * @desc  Create Student Result
 * @rootRoute /api/v1/student
 * @route "POST" /create-student-results/:classId
 * @access Private (Admin)
 */
export const createStudentResult = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { studentId, subjects } = req.body;

  if (!studentId || !classId) {
    throw new ApiError(400, "Student ID and class ID are required.");
  }

  if (!Array.isArray(subjects) || subjects.length === 0) {
    throw new ApiError(400, "Subjects array is required and cannot be empty.");
  }

  // Validate subject marks
  for (const subject of subjects) {
    if (
      typeof subject.marks !== "number" ||
      subject.marks < 0 ||
      subject.marks > 100
    ) {
      throw new ApiError(
        409,
        `Invalid marks for ${subject.subjectName}. Marks must be between 0 and 100.`
      );
    }
  }

  const existingResult = await StudentResult.findOne({
    studentId,
    classId,
  }).lean();
  if (existingResult) {
    throw new ApiError(400, "Student result already exists for this class.");
  }

  const newStudentResult = await StudentResult.create({
    studentId,
    classId,
    subjects,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newStudentResult,
        "Student result created successfully"
      )
    );
});

/**
 * @desc  Get All Student Result
 * @route GET /get-all-students-results
 * @access Private (Admin)
 */
export const getAllStudentResult = asyncHandler(async (req, res) => {
  const results = await StudentResult.find({}, "studentId classId subjects")
    .populate("studentId", "fullName rollNumber fatherName motherName dob")
    .populate("classId", "className sections academicYear")
    .lean();

  if (!results) {
    throw new ApiError(404, "No student results found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, results, "Student results fetched successfully")
    );
});

/**
 * @desc  Get Results by Class
 * @route GET /get-student-results-class-wise/:classId
 * @access Private (Admin)
 */
export const getResultsByClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  if (!classId) {
    throw new ApiError(400, "Class ID is required.");
  }

  const results = await StudentResult.find({ classId })
    .populate("studentId", "fullName rollNumber")
    .lean();

  res
    .status(200)
    .json(new ApiResponse(200, results, "Results fetched successfully"));
});

/**
 * @desc  Get Student Result
 * @route GET /get-single-student-result/:studentId
 * @access Private (Admin)
 */
export const getStudentResult = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    throw new ApiError(400, "Student ID is required.");
  }

  const result = await StudentResult.findOne({ studentId })
    .populate("classId", "className")
    .lean();

  if (!result) {
    throw new ApiError(404, "Result not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "Student result fetched successfully"));
});

/**
 * @desc  Update Student Result
 * @route PUT /api/v1/results/:studentId
 * @access Private (Admin)
 */
export const updateStudentResult = asyncHandler(async (req, res) => {
  const { studentId } = req.params;
  const { subjects } = req.body;

  if (!studentId || !subjects || !Array.isArray(subjects)) {
    throw new ApiError(400, "Student ID and subjects array are required.");
  }

  // Validate subject marks
  for (const subject of subjects) {
    if (
      typeof subject.marks !== "number" ||
      subject.marks < 0 ||
      subject.marks > 100
    ) {
      throw new ApiError(
        409,
        `Invalid marks for ${subject.name}. Must be between 0-100.`
      );
    }
  }

  // Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const updatedResult = await StudentResult.findOneAndUpdate(
      { studentId },
      { subjects },
      { new: true, session }
    );

    if (!updatedResult) {
      throw new ApiError(404, "Result not found.");
    }

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedResult,
          "Student result updated successfully"
        )
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, "Failed to update student result", error);
  }
});

/**
 * @desc  Delete Student Result
 * @route DELETE /api/v1/results/:studentId
 * @access Private (Admin)
 */
export const deleteStudentResult = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    throw new ApiError(400, "Student ID is required.");
  }

  // Start a transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedResult = await StudentResult.findOneAndDelete({
      studentId,
    }).session(session);

    if (!deletedResult) {
      throw new ApiError(404, "Result not found.");
    }

    await session.commitTransaction();
    session.endSession();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Student result deleted successfully"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(500, "Failed to delete student result", error);
  }
});
