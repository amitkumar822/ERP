import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js";

/**
 * @desc  add a new student or joining a new student
 * @route "POST" /add
 * @access Private (Admin)
 */
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

    tuitionFees,
    admissionFees,
    otherFees,
    examFees,
    transportFees,
    hostelFees,
  } = req.body;

  // Validate required fields in one check
  const requiredFields = [
    fullName,
    className,
    section,
    academicYear,
    caste,
    admissionDate,
    rollNumber,
    religion,
    category,
    dob,
    gender,
    fatherName,
    fatherNumber,
    motherName,
    permanentAddress,
    tuitionFees,
  ];
  if (requiredFields.includes(undefined)) {
    throw new ApiError(400, "Some fields are required");
  }

  // Run two database queries in parallel
  const [findClass, existingStudent] = await Promise.all([
    Class.findOne({ className, sections: section, academicYear }).lean(),
    // Student.findOne({ rollNumber }).lean(),
    Student.findOne({
      rollNumber,
      className,
      section,
      academicYear,
    }).lean(),
  ]);

  if (!findClass) {
    throw new ApiError(
      404,
      `Class not found with ${className}, section ${section}, and academic year ${academicYear}`
    );
  }

  if (existingStudent) {
    throw new ApiError(
      409,
      `Student with roll number ${rollNumber}, ${className}, section ${section}, and academic year ${academicYear} already exists`
    );
  }

  // Create student
  const student = new Student({
    fullName,
    classId: findClass._id,
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
    address: { permanentAddress, currentAddress },

    tuitionFees,
    admissionFees,
    otherFees,
    examFees,
    transportFees,
    hostelFees,
  });

  // Save student and update class in parallel
  await Promise.all([
    student.save(),
    Class.updateOne(
      { _id: findClass._id },
      { $push: { studentsId: student._id } }
    ),
  ]);

  res
    .status(201)
    .json(new ApiResponse(201, student, "Student admission successful"));
});

/**
 * @desc  Get all students in parallel
 * @route "GET" /get-all-students
 * @access Private (Admin)
 */
export const getAllStudents = asyncHandler(async (_, res) => {
  // const { page = 1, limit = 100 } = req.query;

  const groupedStudents = await Student.aggregate([
    // Step 1: Sort Students first (Optimized Performance)
    { $sort: { academicYear: -1, className: 1, section: 1, rollNumber: 1 } },

    // Step 2: Group students efficiently
    {
      $group: {
        _id: {
          className: "$className",
          section: "$section",
          academicYear: "$academicYear",
        },
        students: { $push: "$$ROOT" }, // Push sorted students
      },
    },

    // Step 3: Paginate Groups (Limit the number of groups)
    // { $skip: (page - 1) * limit },
    // { $limit: parseInt(limit) },
  ]);

  if (!groupedStudents || groupedStudents.length === 0) {
    throw new ApiError("No students found", 404);
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, groupedStudents, "Students grouped successfully")
    );
});

/**
 * @desc  Delete a student
 * @route "DELETE" /delete/:studentId
 * @access Private (Admin)
 */
export const deleteStudentById = asyncHandler(async (req, res) => {
  const { studentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    throw new ApiError(400, "Invalid student ID");
  }

  const student = await Student.findByIdAndDelete(studentId);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  res.status(200).json(new ApiResponse(200, [], "Student deleted"));
});

/**
 * @desc  Promote a student
 * @route "POST" /promote-students/:newClassId
 * @access Private (Admin)
 */
export const promoteStudents = asyncHandler(async (req, res) => {
  const { newClassId } = req.params;
  const { studentsID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(newClassId)) {
    throw new ApiError(400, "Invalid class ID format.");
  }

  if (!Array.isArray(studentsID) || studentsID.length === 0) {
    throw new ApiError(
      400,
      "Students ID array is required and cannot be empty."
    );
  }

  if (!studentsID.every((id) => mongoose.Types.ObjectId.isValid(id))) {
    throw new ApiError(400, "One or more student IDs are invalid.");
  }

  // ✅ Fetch Class Details
  const findClass = await Class.findById(newClassId).lean();
  if (!findClass) {
    throw new ApiError(404, "Class not found.");
  }

  // ✅ Bulk Update Students Efficiently (Without Transactions)
  const { modifiedCount } = await Student.updateMany(
    { _id: { $in: studentsID } },
    {
      $set: {
        className: findClass.className,
        classId: findClass._id,
        section: findClass.sections,
        academicYear: findClass.academicYear,
      },
    }
  );

  if (modifiedCount === 0) {
    throw new ApiError(
      400,
      "No students were updated. They may already be in the same class."
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, modifiedCount, "Students promoted successfully.")
    );
});

/**
 * @desc  Get students in the same class
 * @route "POST" /get-same-class-students/:classId
 * @access Private (Admin)
 */
export const getSameClassStudents = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new ApiError(400, "Invalid class ID format.");
  }

  const students = await Student.find({ classId })
    .select("_id fullName rollNumber fatherName motherName fatherNumber")
    .lean();
  if (!students || students.length === 0) {
    throw new ApiError(404, "No students found in the specified class.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, students, "Students fetched successfully."));
});
