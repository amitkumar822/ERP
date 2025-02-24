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
    // match: [/^[6-9]\d{9}$/, "Please enter a valid 10 digit phone number"],
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
      required: [true, "At least one subject is required"],
    },
  ],
  timeTable: [
    {
      day: {
        type: String,
        enum: {
          values: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          message:
            "Please enter a valid days Sunday or Monday or Tuesday or Wednesday or Thursday or Friday or Saturday",
        },
      },
      periods: [
        {
          subject: {
            type: String,
          },
          startTime: {
            type: String,
          },
          endTime: {
            type: String,
          },
          className: {
            type: String,
            enum: {
              values: classValidate,
              message: "Invalid class name",
            },
          },
          roomNumber: {
            type: String,
          },
          section: {
            type: String,
            enum: {
              values: ["A", "B", "C", "D"],
              message: "Invalid section",
            },
          }
        },
      ],
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
