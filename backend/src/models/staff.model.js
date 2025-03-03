import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
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
    match: [/^[6-9]\d{9}$/, "Phone number must be a 10-digit valid Indian number"],
    minlength: [10, "Phone Number must be at least 10 characters long"],
    maxlength: [10, "Phone Number must be at most 10 characters long"],
    index: true,
  },
  position: {
    type: String,
    required: [true, "Position is required"],
  },
  joiningDate: {
    type: Date,
    default: new Date(),
    required: [true, "Joining date is required"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
}, { timestamps: true });

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;