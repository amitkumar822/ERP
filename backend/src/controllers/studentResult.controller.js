import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import StudentResult from "../models/studentResult.model.js";

/**
 * @desc  Publish a new student result
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

  const existingResult = await StudentResult.findOne({ studentId, classId }).lean();
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
