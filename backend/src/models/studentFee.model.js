import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
      index: true,
    },
    academicYear: {
      type: String,
      required: [true, "Academic Year is required"],
    },
    month: {
      type: String,
      required: [true, "Fee month is required"],
    },
    feeDetails: [
      {
        paymentDate: {
          type: Date,
          default: Date.now,
        },
        tuitionFee: {
          type: Number,
          default: 0,
          min: [0, "Tuition fee cannot be negative"],
        },
        examFee: {
          type: Number,
          default: 0,
          min: [0, "Exam fee cannot be negative"],
        },
        transportFee: {
          type: Number,
          default: 0,
          min: [0, "Transport fee cannot be negative"],
        },
        hostelFee: {
          type: Number,
          default: 0,
          min: [0, "Hostel fee cannot be negative"],
        },
        miscellaneousFee: {
          type: Number,
          default: 0,
          min: [0, "Miscellaneous fee cannot be negative"],
        },
        discountFees: {
          type: Number,
          default: 0,
          min: [0, "Discount fees cannot be negative"],
        },
        paymentAmount: {
          type: Number,
          required: [true, "Payment amount is required"],
          default: 0,
          min: [0, "Payment amount cannot be negative"],
        },
        totalFee: {
          type: Number,
          required: [true, "Total fee amount is required"],
          min: [0, "Total fee cannot be negative"],
        },
        pendingAmount: {
          type: Number,
          default: 0,
          min: [0, "Pending amount cannot be negative"],
        },
        paymentMode: {
          type: String,
          enum: ["Cash", "Online"],
        },
        transactionId: {
          type: String,
          default: null,
        },
        otherFees: {
          type: Number,
          default: 0,
          min: [0, "Other fees cannot be negative"],
        },
        status: {
          type: String,
          enum: ["Paid", "Partial", "Pending"],
          default: "Pending",
        },
      },
    ],
    lastPaymentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// **Indexing for optimized queries**
studentFeeSchema.index({ studentId: 1, academicYear: 1, month: 1 });

// **✅ Corrected Pre-save Hook for `pendingAmount`**
studentFeeSchema.pre("save", function (next) {
  this.feeDetails.forEach((fee) => {
    fee.pendingAmount = fee.totalFee - fee.paymentAmount;
  });
  next();
});

//** ✅ Pre-save hook to update lastPaymentDate */
studentFeeSchema.pre("save", function (next) {
  if (this.feeDetails.length > 0) {
    // Sort feeDetails by paymentDate (ascending order)
    this.feeDetails.sort(
      (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate)
    );

    // If at least two payments exist, set lastPaymentDate to the second last payment
    if (this.feeDetails.length > 1) {
      this.lastPaymentDate =
        this.feeDetails[this.feeDetails.length - 2].paymentDate;
    } else {
      // If only one payment exists, set lastPaymentDate to the first payment
      this.lastPaymentDate = this.feeDetails[0].paymentDate;
    }
  }
  next();
});

const StudentFee = mongoose.model("StudentFee", studentFeeSchema);
export default StudentFee;
