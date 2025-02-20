import mongoose from "mongoose";
import { classValidate } from "../helpers/classValidate.js";

const studentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name should be at least 3 characters"],
      maxlength: [50, "Full name should not exceed 50 characters"],
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class Name is required"],
    },
    className: {
      type: String,
      required: [true, "Class Name is required"],
      trim: true,
      enum: {
        values: classValidate,
        message: `Class name must be either ${classValidate.join(", ")} `,
      },
    },
    section: {
      type: String,
      // required: [true, "Section is required"],
      enum: {
        values: ["A", "B", "C", "D"],
        message: "Section must be either 'A','B','C','D'",
      },
    },
    academicYear: {
      type: String,
      // required: [true, "Academic Year is required"],
      trim: true,
    },
    caste: {
      type: String,
      required: [true, "Caste is required"],
      trim: true,
      minlength: [3, "Caste should be at least 3 characters"],
      maxlength: [50, "Caste should not exceed 50 characters"],
    },
    admissionDate: {
      type: String,
      trim: true,
      required: [true, "Admission Date is required"],
    },
    rollNumber: {
      type: Number,
      required: [true, "Roll number is required"],
      // unique: true,
      min: [1, "Roll number must be a positive integer"],
    },
    religion: {
      type: String,
      trim: true,
      required: [true, "Religion is required"],
      minlength: [3, "Religion should be at least 3 characters"],
      maxlength: [50, "Religion should not exceed 50 characters"],
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Category is required"],
      minlength: [3, "Category should be at least 3 characters"],
      maxlength: [50, "Category should not exceed 50 characters"],
    },
    studentNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    dob: {
      type: String,
      trim: true,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be either 'Male', 'Female', 'Other'",
      },
      required: [true, "Gender is required"],
    },
    studentImage: {
      type: String,
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    motherTongue: {
      type: String,
      trim: true,
    },
    studentEmail: {
      type: String,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    fatherName: {
      type: String,
      required: [true, "Father name is required"],
      trim: true,
      minlength: [3, "Father name should be at least 3 characters"],
      maxlength: [50, "Father name should not exceed 50 characters"],
    },
    fatherOccupation: {
      type: String,
      trim: true,
    },
    fatherNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    motherName: {
      type: String,
      required: [true, "Mother name is required"],
      trim: true,
      minlength: [3, "Mother name should be at least 3 characters"],
      maxlength: [50, "Mother name should not exceed 50 characters"],
    },
    motherOccupation: {
      type: String,
      trim: true,
    },
    motherNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be a 10-digit number"],
    },
    address: {
      permanentAddress: {
        street: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          required: [true, "Permanent city is required"],
          trim: true,
        },
        state: {
          type: String,
          required: [true, "Permanent state is required"],
          trim: true,
        },
        zipCode: {
          type: String,
          required: [true, "Permanent zip code is required"],
          trim: true,
          match: [/^\d{6}$/, "Permanent zip code must be a 6-digit number"],
        },
      },
      currentAddress: {
        street: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          trim: true,
        },
        state: {
          type: String,
          trim: true,
        },
        zipCode: {
          type: String,
          trim: true,
          match: [/^\d{6}$/, "Current zip code must be a 6-digit number"],
        },
      },
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
