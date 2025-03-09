import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { classValidate } from "../helpers/classValidate.js";
import Class from "../models/class.model.js";

//^ Create a new class used to create a new class in the database
export const createClass = asyncHandler(async (req, res) => {
  const { className, academicYear, section, capacity } = req.body;

  if (!className || !academicYear || !section || !capacity) {
    throw new ApiError(400, "Please provide all required fields");
  }

  if (!classValidate.includes(className)) {
    throw new ApiError(
      400,
      `Invalid className. Please enter a valid className: ${classValidate.join(
        ", "
      )}`
    );
  }

  const existingClass = await Class.findOne({
    className,
    academicYear,
    sections: section,
  }).lean();

  if (existingClass) {
    throw new ApiError(
      409,
      `Class with the same name ${
        (className, academicYear, section)
      } already exists`
    );
  }

  const newClass = new Class({
    className,
    academicYear,
    sections: section,
    capacity,
  });
  await newClass.save();

  return res
    .status(201)
    .json(new ApiResponse(201, newClass, "Class created successfully"));
});

//^ Update a class used to update an existing class in the database
export const updateClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const { className, academicYear, section, capacity } = req.body;
  console.log(classId);
  console.log(req.body);
  

  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new ApiError(400, "Invalid class ID");
  }

  // Validate className if provided
  if (className && !classValidate.includes(className)) {
    throw new ApiError(
      400,
      `Invalid className. Please enter a valid className: ${classValidate.join(
        ", "
      )}`
    );
  }

  // Check for duplicate class directly in the update operation
  const existingClass = await Class.findOne({
    className,
    academicYear,
    sections: section,
    _id: { $ne: classId }, // Exclude current class from duplicate check
  }).lean();

  if (existingClass) {
    throw new ApiError(409, "Class with the same details already exists.");
  }

  // Use findOneAndUpdate to combine checking and updating in a single query
  const updateFields = {};
  if (className) updateFields.className = className;
  if (academicYear) updateFields.academicYear = academicYear;
  if (section) updateFields.sections = section;
  if (capacity) updateFields.capacity = capacity;

  const updatedClass = await Class.findOneAndUpdate(
    { _id: classId },
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedClass) {
    throw new ApiError(404, "Class not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedClass, "Class updated successfully"));
});

//^ Delete a class used to delete an existing class from the database
export const deleteClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(classId)) {
    throw new ApiError(400, "Invalid class ID");
  }

  const deletedClass = await Class.findByIdAndDelete(classId);

  if (!deletedClass) {
    throw new ApiError(404, "Class not found");
  }

  return res.json(
    new ApiResponse(200, deletedClass, "Class deleted successfully")
  );
});

//^ Get all classes used to fetch all classes from the database
export const getAllClasses = asyncHandler(async (_, res) => {
  const classes = await Class.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "studentsId",
      select: "fullName fatherName motherName rollNumber dob",
      options: { sort: { rollNumber: 1 } },
    })
    .lean();

  if (!classes || classes.length === 0) {
    throw new ApiError(404, "No classes found");
  }

  return res.json(
    new ApiResponse(200, classes, "All classes fetched successfully")
  );
});

//^ Get classes by academic year, className and section used to fetch classes by academic year, className and section from the database
export const getClassesByAcademicYearSection = asyncHandler(
  async (req, res) => {
    const { academicYear, className, section } = req.params;

    if (!academicYear || !className || !section) {
      throw new ApiError(400, "Please provide all required fields");
    }

    const classes = await Class.find({
      academicYear,
      className,
      sections: section,
    })
      .populate({
        path: "studentsId",
        select: "fullName rollNumber fatherNumber",
        options: { sort: { rollNumber: 1 } },
      })
      .lean();

    if (!classes || classes.length === 0) {
      throw new ApiError(404, "No classes found");
    }
    return res.json(
      new ApiResponse(200, classes, "Classes fetched successfully")
    );
  }
);

/**
 * @desc  Get all Only Class Details
 * @route "GET" /get-class-details-only
 * @access Private (Admin)
 */
export const getAllClassDetailsOnly = asyncHandler(async (_, res) => {
  const classes = await Class.find()
    .select("-studentsId -timeTable")
    .sort({ className: 1, academicYear: 1, sections: 1 })
    .lean();

  if (!classes || classes.length === 0) {
    throw new ApiError(404, "No classes found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, classes, "All classes fetched successfully"));
});
