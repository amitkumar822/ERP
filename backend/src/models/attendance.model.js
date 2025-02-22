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
      index: true, // Helps with filtering
    },
    academicYear: {
      type: String,
      required: true,
      index: true, // Helps with year-based queries
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    records: {
      type: Map,
      of: {
        status: {
          type: Number,
          enum: [1, 2, 3, 4], // 1=Present, 2=Absent, 3=Late, 4=Excused
          required: true,
        },
        remarks: {
          type: String,
          trim: true,
          maxlength: 250,
        },
      },
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index for faster lookups
attendanceSchema.index({ classId: 1, section: 1, academicYear: 1, date: 1 });

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;



// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema(
//   {
//     date: {
//       type: Date,
//       required: [true, "Attendance date is required"],
//       index: true,
//     },
//     classId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Class",
//       required: [true, "Class ID is required"],
//       index: true,
//     },
//     teacherId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Teacher",
//       // required: true,
//     },
//     records: [
//       {
//         studentId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Student",
//           required: [true, "Student ID is required"],
//           index: true, // Optimizes student-specific queries
//         },
//         status: {
//           type: Number,
//           enum: [1, 2, 3, 4], // 1=Present, 2=Absent, 3=Late, 4=Excused
//           required: [true, "Attendance status is required"],
//         },
//         remarks: {
//           type: String,
//           trim: true,
//           maxlength: [250, "Remarks should not exceed 250 characters"],
//         },
//       },
//     ],
//     isUpdated: {
//       type: Boolean,
//       default: false, // Tracks if attendance was edited
//     },
//   },
//   { timestamps: true }
// );

// // Indexing for faster lookups
// attendanceSchema.index({ classId: 1, date: 1 });
// // attendanceSchema.index({ "records.studentId": 1 });

// const Attendance = mongoose.model("Attendance", attendanceSchema);

// export default Attendance;
