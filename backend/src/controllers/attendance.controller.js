import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Attendance from "../models/attendance.model.js";
import Class from "../models/class.model.js";

//^ Create or Update Attendance
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

  // ✅ Use upsert to either create or update the attendance document for the class and date
  const attendance = await Attendance.findOneAndUpdate(
    { classId, date: attendanceDate },
    {
      $set: {
        classId,
        date: attendanceDate,
        teacherId,
        records,
      },
      $setOnInsert: { createdAt: new Date() }, // Set only for new documents
    },
    { upsert: true, new: true } // Update if exists, Insert if not exists
  );

  res
    .status(200)
    .json(new ApiResponse(200, attendance, "Attendance marked successfully"));
});

//^ Get Attendance by Class, Month and Date
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

  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    classId: classes[0]._id,
    date: attendanceDate,
  })
    .select("-__v -createdAt -updatedAt").populate("records.studentId", "fullName rollNumber fatherNumber")
    .lean(); // Improves performance records

  if (!attendance) {
    throw new ApiError(404, "No attendance found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, attendance, "Attendance retrieved successfully")
    );
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
