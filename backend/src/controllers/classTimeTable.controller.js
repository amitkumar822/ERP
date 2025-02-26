import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Class from "../models/class.model.js";
import Teacher from "../models/teacher.model.js";
import ClassTimeTable from "../models/classTimeTable.model.js";

/**
 * @MainRoute /v1/class
 * @desc  Create and update a class time table
 * @route POST /create-class-timetable
 * @access Private (Admin)
 */
export const createUpdateTimeTable = asyncHandler(async (req, res) => {
  const {
    className,
    section,
    academicYear,
    day,
    period,
    periodTime,
    subject,
    emailPhone,
  } = req.body;

  if (
    !className ||
    !section ||
    !academicYear ||
    !day ||
    !period ||
    !periodTime ||
    !subject ||
    !emailPhone
  ) {
    throw new ApiError(400, "Please provide all required fields");
  }

  const [findClass, teacher] = await Promise.all([
    Class.findOne({ className, sections: section, academicYear })
      .select("_id")
      .lean(),
    Teacher.findOne({
      $or: [{ email: emailPhone }, { phoneNumber: emailPhone }],
    })
      .select("_id")
      .lean(),
  ]);

  if (!findClass) {
    throw new ApiError(
      404,
      `Class not found for ${className} in ${section} and ${academicYear}`
    );
  }

  if (!teacher) {
    throw new ApiError(
      404,
      `Teacher not found with this email/phone ${emailPhone}`
    );
  }

  let existingTimeTable = await ClassTimeTable.findOne({
    day,
    "periods.className": findClass._id,
    "periods.section": section,
  });

  if (existingTimeTable) {
    // Check if the period already exists for this class and section
    const periodExists = existingTimeTable.periods.some(
      (p) =>
        p.period === period &&
        p.section === section &&
        p.subject === subject.toString().trim()
    );
    if (periodExists) {
      throw new ApiError(
        400,
        `Period ${period} already exists for ${className} in section ${section} on ${day}`
      );
    }

    // Push the new period inside the existing timetable
    existingTimeTable.periods.push({
      className: findClass._id,
      teacher: teacher._id,
      subject,
      periodsTime: periodTime,
      section,
      period,
    });

    await existingTimeTable.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          existingTimeTable,
          "Successfully updated the time table"
        )
      );
  }

  // Create a new time table
  const newTimeTable = await ClassTimeTable.create({
    day,
    periods: [
      {
        className: findClass._id,
        teacher: teacher._id,
        subject,
        periodsTime: periodTime,
        section,
        period,
      },
    ],
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        newTimeTable,
        "Successfully created a new time table"
      )
    );
});

/**
 * @desc  Gets the time table
 * @route GET /get-class-timetable
 * @access Private (Admin)
 */
export const getAllTimeTable = asyncHandler(async (_, res) => {
  const timeTable = await ClassTimeTable.find({})
    .populate("periods.className", "className")
    .populate("periods.teacher", "fullName email phoneNumber")
    .lean();

  if (!timeTable) {
    throw new ApiError(404, "No time table found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, timeTable, "Successfully fetched all time tables")
    );
});

/**
 * @desc  Edit a time table
 * @route PUT /edit-timetable-period/:periodId
 * @access Private (Admin)
 */
export const editTimeTablePeriod = asyncHandler(async (req, res) => {
  const { periodId } = req.params;
  const { period, subject, periodTime } = req.body;

  if (!mongoose.Types.ObjectId.isValid(periodId)) {
    throw new ApiError(400, "Invalid period ID");
  }

  const updatedTimeTable = await ClassTimeTable.findOneAndUpdate(
    { "periods._id": periodId },
    {
      $set: {
        "periods.$.period": period,
        "periods.$.subject": subject,
        "periods.$.periodsTime": periodTime,
      },
    },
    { new: true }
  );

  console.log(updatedTimeTable);

  if (!updatedTimeTable) {
    return res.status(404).json(new ApiResponse(404, null, "Period not found"));
  }

  res.status(200).json(new ApiResponse(200, updatedTimeTable, "success"));
});

/**
 * @desc  Delete a time table
 * @route DELETE /delete-timetable-period/:periodId
 * @access Private (Admin)
 */
export const deleteTimeTablePeriod = asyncHandler(async (req, res) => {
  const { periodId } = req.params;

  const deletedTimeTable = await ClassTimeTable.findOneAndUpdate(
    { "periods._id": periodId },
    { $pull: { periods: { _id: periodId } } },
    { new: true }
  );

  if (!deletedTimeTable) {
    return res.status(404).json(new ApiResponse(404, null, "Period not found"));
  }

  res.status(200).json(new ApiResponse(200, deletedTimeTable, "success"));
});
