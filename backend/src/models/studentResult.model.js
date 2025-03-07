import mongoose from "mongoose";

const studentResultsSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },
    subjects: [
      {
        subjectName: { type: String, required: true },
        marks: { type: Number, min: 0, max: 100, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Index for faster queries when searching results for a student in a class
studentResultsSchema.index({ studentId: 1, classId: 1 });

const StudentResult = mongoose.model("StudentResult", studentResultsSchema);

export default StudentResult;
