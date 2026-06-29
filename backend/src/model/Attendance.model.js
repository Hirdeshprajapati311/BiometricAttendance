import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "true",
    },
    date: {
      type: Date,
      required: true,
    },
    day: {
      type: String,
    },
    checkIn: {
      type: Date,
      default: null,
    },
    checkOut: {
      type: Date,
      default: null,
    },
    workHours: {
      type: String,
      default: "0m",
    },
    status: {
      type: String,
      enum: [
        "present",
        "absent",
        "late_arrival",
        "work_from_home",
        "work_from_office",
        "half_day",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Enforce: Only ONE document per employee per day
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
