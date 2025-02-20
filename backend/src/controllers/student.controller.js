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
  console.log("BODY: ", req.body);
  

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
    Student.findOne({ rollNumber }).lean(),
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
      `Student with roll number ${rollNumber} already exists`
    );
  }

  // Create student
  const student = new Student({
    fullName,
    classId: findClass._id,
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

// export const addStudent = asyncHandler(async (req, res) => {
//   const {
//     fullName,
//     className,
//     section,
//     academicYear,
//     caste,
//     admissionDate,
//     rollNumber,
//     religion,
//     category,
//     studentNumber,
//     dob,
//     gender,
//     bloodGroup,
//     motherTongue,
//     studentEmail,
//     fatherName,
//     fatherOccupation,
//     fatherNumber,
//     motherName,
//     motherOccupation,
//     motherNumber,
//     permanentAddress,
//     currentAddress,
//   } = req.body;

//   if (
//     !fullName ||
//     !className ||
//     !caste ||
//     !admissionDate ||
//     !rollNumber ||
//     !religion ||
//     !category ||
//     !dob ||
//     !gender ||
//     !fatherName ||
//     !fatherNumber ||
//     !motherName ||
//     !permanentAddress ||
//     !section ||
//     !academicYear
//   ) {
//     throw new ApiError(400, "All Field Must be required");
//   }

//   const findClass = await Class.findOne({
//     className,
//     sections: section,
//     academicYear,
//   });

//   if (!findClass || findClass?.length === 0) {
//     throw new ApiError(
//       404,
//       `Class not found with ${className} or ${section} or ${academicYear}`
//     );
//   }

//   const existingStudent = await Student.findOne({ rollNumber }).lean();
//   if (existingStudent) {
//     throw new ApiError(
//       409,
//       `Student with the same roll number ${rollNumber} already exists`
//     );
//   }

//   const student = await Student.create({
//     fullName,
//     classId: findClass?._id,
//     section,
//     academicYear,
//     caste,
//     admissionDate,
//     rollNumber,
//     religion,
//     category,
//     studentNumber,
//     dob,
//     gender,
//     bloodGroup,
//     motherTongue,
//     studentEmail,
//     fatherName,
//     fatherOccupation,
//     fatherNumber,
//     motherName,
//     motherOccupation,
//     motherNumber,
//     address: {
//       permanentAddress,
//       currentAddress,
//     },
//   });

//   findClass.studentsId.push(student._id);
//   await findClass.save();

//   res
//     .status(201)
//     .json(new ApiResponse(201, student, "Student admission successfully"));
// });

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
