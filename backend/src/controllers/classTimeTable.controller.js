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
//^ Create and update a class time table for a given class
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
