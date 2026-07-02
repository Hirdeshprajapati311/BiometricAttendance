import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    leaveType: {
      type: String,
      enum: ["casual", "sick", "earned", "adjustment", "unpaid", "half"],
      default: "casual",
      required: true,
    },
    empId: {
      type: String,
      required: true,
    },

    employeeName: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    totalDays: {
      type: Number,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "withdrawn"],
      default: "pending",
    },
    adminComment: {
      type: String,
    },
    activity: [
      {
        label: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now(),
        },
        completed: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

const Leave = mongoose.model("Leave", LeaveSchema);
export default Leave;
