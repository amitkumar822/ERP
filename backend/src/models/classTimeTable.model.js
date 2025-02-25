import mongoose from "mongoose";
import { daysValidate } from "../helpers/daysValidate.js";

const classTimeTableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      enum: {
        values: daysValidate,
        message: "Invalid day. Choose from Monday to Saturday.",
      },
      required: [true, "Day is required."],
      index: true,
    },
    periods: [
      {
        className: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          required: [true, "Class name is required."],
        },
        teacher: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          required: [true, "Teacher is required."],
        },
        subject: {
          type: String,
          trim: true,
          required: [true, "Subject is required."],
        },
        periodsTime: {
          type: String,
          required: [true, "Start time is required."],
        },
        roomNumber: {
          type: String,
          required: [true, "Room number is required."],
        },
        section: {
          type: String,
          enum: {
            values: ["A", "B", "C", "D"],
            message: "Invalid section. Choose from A, B, C, or D.",
          },
          required: [true, "Section is required."],
        },
      },
    ],
  },
  { timestamps: true }
);

// High-performance indexing for queries
classTimeTableSchema.index({ day: 1, "periods.className": 1, "periods.section": 1 });
classTimeTableSchema.index({ "periods.teacher": 1 });

const ClassTimeTable = mongoose.model("ClassTimeTable", classTimeTableSchema);
export default ClassTimeTable;
