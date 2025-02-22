import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Attendance from "../models/attendance.model.js";
import mongoose from "mongoose";

/**
 * @desc  Create or Update Attendance in Bulk (Optimized)
 * @route POST /api/attendance
 * @access Private (Teacher/Admin)
 */

export const markAttendance = asyncHandler(async (req, res) => {
  const { date, classId, teacherId, records } = req.body;
  // const teacherId = req.params;

  if (!date || !classId || !records) {
    throw new ApiError(400, "Date, classId, and records are required");
  }

  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  // Convert records array to an object for optimized updates
  const attendanceRecords = {};
  records.forEach(({ studentId, status, remarks }) => {
    attendanceRecords[studentId] = { status, remarks };
  });

  // Use upsert to either create or update the attendance document for the class and date
  const attendance = await Attendance.findOneAndUpdate(
    { classId, date: attendanceDate },
    {
      $set: {
        classId,
        date: attendanceDate,
        teacherId,
        records: attendanceRecords,
      },
      $setOnInsert: { createdAt: new Date() }, // Set only for new documents
    },
    { upsert: true, new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, attendance, "Attendance marked successfully"));
});

// export const markAttendance = asyncHandler(async (req, res) => {
//   const { date, classId, records, teacherId } = req.body;
//   // const teacherId = req.user.id;

//   if (!date || !classId || !records || !records.length) {
//     throw new ApiError(400, "All fields (date, classId, records) are required");
//   }

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const attendanceDate = new Date(date);
//     attendanceDate.setHours(0, 0, 0, 0);

//     const bulkOps = records.map((record) => ({
//       updateOne: {
//         filter: { classId, date: attendanceDate, "records.studentId": record.studentId },
//         update: {
//           $set: {
//             "records.$.status": record.status,
//             "records.$.remarks": record.remarks || "",
//             "records.$.isUpdated": true, // Mark as updated
//             "records.$.teacherId": teacherId, // Store teacher ID
//           },
//         },
//         upsert: true, // Insert if not exists
//       },
//     }));

//     if (bulkOps.length > 0) {
//       await Attendance.bulkWrite(bulkOps, { session });
//     }

//     await session.commitTransaction();
//     session.endSession();

//     res.status(200).json(new ApiResponse(200, null, "Attendance updated successfully"));
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     throw new ApiError(500,error.message);
//   }
// });

/**
 * @desc  Get Attendance by Class and Date
 * @route GET /api/attendance
 * @access Private (Teacher/Admin)
 */
export const getAttendanceByClass = asyncHandler(async (req, res) => {
  const { date, classId } = req.body;

  if (!date || !classId) {
    throw new ApiError(400, "Date and classId are required");
  }

  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({ classId, date: attendanceDate })
    .select("-__v -createdAt -updatedAt")
    .lean(); // Improves performance

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