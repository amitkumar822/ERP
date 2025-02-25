import mongoose from "mongoose";
import { classValidate } from "../helpers/classValidate.js";

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Teacher full name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  joiningDate: {
    type: String,
    required: [true, "Joining date is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be at least 4 characters long"],
    maxlength: [10, "Password must be at most 10 characters long"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    minlength: [10, "Phone Number must be at least 10 characters long"],
    maxlength: [10, "Phone Number must be at most 10 characters long"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "Gender must be either 'Male', 'Female', 'Other'",
    },
    required: [true, "Gender is required"],
  },
  designation: {
    type: String,
    trim: true,
    minlength: [4, "Designation must be at least 4 characters long"],
    maxlength: [50, "Designation must be at most 50 characters long"],
  },
  dob: {
    type: String,
    trim: true,
  },
  qualification: {
    type: String,
    required: [true, "Qualification are required"],
  },
  profileImage: {
    type: String,
  },
  document: {
    type: String,
  },
  identification: {
    type: String,
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
  },
  previousInstitutionName: {
    type: String,
  },
  extracurricularActivities: {
    type: String,
  },
  address: {
    permanentAddress: {
      street: {
        type: String,
        trim: true,
      },
      permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"],
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
      currentAddress: {
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

  //^ Below is the working mode
  subjects: [
    {
      type: String,
      // required: [true, "At least one subject is required"],
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
