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
          required: [true, "Tuition fee is required"],
        },
        examFee: {
          type: Number,
          default: 0,
        },
        transportFee: {
          type: Number,
          default: 0,
        },
        hostelFee: {
          type: Number,
          default: 0,
        },
        miscellaneousFee: {
          type: Number,
          default: 0,
        },
        discountFees: {
          type: Number,
          default: 0,
        },
        paymentAmount: {
          type: Number,
          default: 0,
        },
        totalFee: {
          type: Number,
          required: [true, "Total fee amount is required"],
        },
        pendingAmount: {
          type: Number,
        },
        paymentMode: {
          type: String,
          enum: ["Cash", "Online"],
        },
        transactionId: {
          type: String,
          default: null,
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

// **Virtual to calculate total fee**
studentFeeSchema.virtual("calculatedTotalFee").get(function () {
  return (
    this.tuitionFee +
    this.examFee +
    this.transportFee +
    this.hostelFee +
    this.miscellaneousFee -
    this.discountFees
  );
});

// **Pre-save hook to ensure pendingAmount integrity**
studentFeeSchema.pre("save", function (next) {
  this.pendingAmount = this.totalFee - this.paymentAmount;
  next();
});

const StudentFee = mongoose.model("StudentFee", studentFeeSchema);
export default StudentFee;




// import mongoose from "mongoose";

// const studentFeeSchema = mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Student",
//     required: [true, "Student ID is required"],
//     index: true,
//   },
//   academicYear: {
//     type: String,
//     required: [true, "Academic Year is required"],
//   },
//   month: {
//     type: String,
//     required: [true, "Fee month is required"],
//   },
//   feeDetails: [
//     {
//       paymentDate: {
//         type: Date,
//         default: Date.now,
//       },
//       tuitionFee: {
//         type: Number,
//         default: 0,
//         required: [true, "Total fee amount is required"],
//       },
//       examFee: {
//         type: Number,
//         default: 0,
//       },
//       transportFee: {
//         type: Number,
//         default: 0,
//       },
//       hostelFee: {
//         type: Number,
//         default: 0,
//       },
//       totalFee: {
//         type: Number,
//         required: [true, "Total fee amount is required"],
//       },
//       paymentMode: [
//         {
//           type: String,
//           enum: ["Cash", "Online"],
//         },
//         { transactionId: String }, // For online payments
//       ],
//       miscellaneousFee: {
//         type: Number,
//         default: 0,
//       },
//       discountFees: {
//         type: Number,
//         default: 0,
//       },
//       paymentAmount: {
//         type: Number,
//         default: 0,
//       },
//       pendingAmount: {
//         type: Number,
//       },
//       status: {
//         type: String,
//         enum: ["Paid", "Partial", "Pending"],
//         default: "Pending",
//       },
//     },
//   ],
//   lastPaymentDate: {
//     type: Date,
//   },
// }, { timestamps: true});

// studentFeeSchema.index({ studentId: 1, month: 1 });
// studentFeeSchema.index({ academicYear: 1 });

// const StudentFee = mongoose.model("StudentFee", studentFeeSchema);
// export default StudentFee;
