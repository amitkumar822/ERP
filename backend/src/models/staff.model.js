import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [
        /^[6-9]\d{9}$/,
        "Phone number must be a valid 10-digit Indian number starting with 6 to 9",
      ],
      minlength: [10, "Phone number must be at least 10 characters long"],
      maxlength: [10, "Phone number must be at most 10 characters long"],
      index: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: Date,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
      required: [true, "Joining date is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
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
    status: {
      type: String,
      enum: ["Active", "Resigned", "Retired"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// ✅ Compound Indexing for Better Performance
staffSchema.index({ phone: 1, email: 1 }, { unique: true });

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
