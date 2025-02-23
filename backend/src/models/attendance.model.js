import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },
    section: {
      type: String,
      required: true,
      index: true,
    },
    academicYear: {
      type: String,
      required: true,
      index: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    records: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
          index: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late", "Excused"],
          required: true,
        },
        remarks: {
          type: String,
          trim: true,
          maxlength: 250,
        },
      },
    ],
  },
  { timestamps: true }
);

// Compound index for faster lookups
attendanceSchema.index({ classId: 1, section: 1, academicYear: 1, date: 1 });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;