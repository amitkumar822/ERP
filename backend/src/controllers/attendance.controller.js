import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Attendance from "../models/attendance.model.js";
import Class from "../models/class.model.js";

/**
 * @desc  Create or Update Attendance in Bulk (Optimized)
 * @route POST /api/attendance
 * @access Private (Teacher/Admin)
 */

export const markAttendance = asyncHandler(async (req, res) => {
  const { date, classId, teacherId, records } = req.body;

  if (!date || !classId || !records || !Array.isArray(records)) {
    throw new ApiError(
      400,
      "Date, classId, and valid records array are required"
    );
  }

  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  // ✅ Remove duplicate studentId entries
  // const uniqueRecords = Array.from(
  //   new Map(records.map((record) => [record.studentId, record])).values()
  // );

  // ✅ Use upsert to either create or update the attendance document for the class and date
  const attendance = await Attendance.findOneAndUpdate(
    { classId, date: attendanceDate },
    {
      $set: {
        classId,
        date: attendanceDate,
        teacherId,
        records,
        // records: uniqueRecords,
      },
      $setOnInsert: { createdAt: new Date() }, // Set only for new documents
    },
    { upsert: true, new: true } // Update if exists, Insert if not exists
  );

  res
    .status(200)
    .json(new ApiResponse(200, attendance, "Attendance marked successfully"));
});

/**
 * @desc  Get Attendance by Class and Date
 * @route GET /api/attendance
 * @access Private (Teacher/Admin)
 */
export const getAttendanceByClassMonthDate = asyncHandler(async (req, res) => {
  const { date, academicYear, className, section } = req.body;

  if (!date || !academicYear || !className || !section) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const classes = await Class.find({
    academicYear,
    className,
    sections: section,
  })
    .select("-studentsId")
    .lean();

  if (!classes || classes.length === 0) {
    throw new ApiError(404, "No classes found");
  }

  console.log("Class: ", classes[0]._id);

  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    classId: classes[0]._id,
    date: attendanceDate,
  })
    .select("-__v -createdAt -updatedAt")
    .lean(); // Improves performance

  if (!attendance) {
    throw new ApiError(404, "No attendance found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, attendance, "Attendance retrieved successfully"));
});

/**
 * @desc  Delete Attendance for a Class on a Specific Date
 * @route DELETE /api/attendance
 * @access Private (Admin)
 */
export const deleteAttendance = asyncHandler(async (req, res) => {
  const { date, classId } = req.query;

  if (!date || !classId) {
    throw new ApiError(400, "Date and classId are required");
  }

  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  await Attendance.deleteOne({ classId, date: attendanceDate });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Attendance deleted successfully"));
});
