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
  ];
  if (requiredFields.includes(undefined)) {
    throw new ApiError(400, "All fields are required");
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

export const getAllStudents = asyncHandler(async (_, res) => {
  const groupedStudents = await Student.aggregate([
    {
      $group: {
        _id: {
          className: "$className",
          section: "$section",
          academicYear: "$academicYear",
        },
        students: { $push: "$$ROOT" },
      },
    },
    {
      $sort: { "_id.academicYear": -1, "_id.className": 1, "_id.section": 1 },
    },
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
