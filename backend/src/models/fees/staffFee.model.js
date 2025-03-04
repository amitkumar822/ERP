import mongoose from "mongoose";

const staffFeeSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "Staff ID is required"],
      index: true,
    },
    monthYear: {
      type: Date,
      required: [true, "Month and Year are required"],
      index: true,
      default: function () {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
      },
    },
    basicSalary: {
      type: Number,
      required: [true, "Basic Salary is required"],
    },
    bonus: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    grossSalary: {
      type: Number,
      required: [true, "Gross Salary is required"],
    },
    netSalary: {
      type: Number,
      required: [true, "Net Salary is required"],
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Bank Transfer", "UPI"],
    },
    transactionId: {
      type: String,
      default: null,
    },
    paymentAmount: {
      type: Number,
      required: [true, "Payment Amount is required"],
    },
    pendingAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Partial",
      enum: ["Partial", "Paid"],
    },
  },
  { timestamps: true }
);

// ✅ Compound Index for Fast Queries
staffFeeSchema.index({ staffId: 1, monthYear: 1 }, { unique: true });

// ✅ Pre-save Hook for `pendingAmount`
staffFeeSchema.pre("save", function (next) {
  this.pendingAmount = this.netSalary - this.paymentAmount;
  if (this.pendingAmount === 0) {
    this.status = "Paid";
  } else if (this.pendingAmount > 0) {
    this.status = "Partial";
  }
  next();
});

const StaffFee = mongoose.model("StaffFee", staffFeeSchema);

export default StaffFee;
