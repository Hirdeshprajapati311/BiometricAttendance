import Attendance from "../model/Attendance.model.js";
import User from "../model/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import calculateWorkHours from "../utils/calculateWorkHours.js";
import generateChart from "../utils/generateChart.js";
import { isWeekend } from "../utils/isWeekend.js";
/**
 * GET /api/v1/attendance
 * Admin
 */

export const getAttendance = asyncHandler(async (req, res) => {
  console.log(req.query);

  const { page, status, date } = req.query;

  const usepage = parseInt(page) || 1;
  const limit = 8;
  const skip = (usepage - 1) * limit;

  const query = {};
  console.log(query);

  if (status && status !== "all") {
    query.status = status;
  }

  if (date) {
    const [year, month, day] = date.split("-").map(Number);
    const startOfDay = new Date(year, month - 1, day);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);
    query.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  const total = await Attendance.countDocuments(query);

  const attendance = await Attendance.find(query)
    .populate("employeeId", "name empId")
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    attendance,
    pagination: {
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
});

/**
 * GET /api/v1/attendance/me
 */

export const getMyAttendance = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const { status, date } = req.query;
  const limit = 8;
  const skip = (page - 1) * limit;
  const { userId } = req.user;

  const query = {
    employeeId: userId,
  };
  if (status && status !== "all") {
    query.status = status;
  }

  if (date) {
    const [year, month, day] = date.split("-").map(Number);

    const startOfDay = new Date(year, month - 1, day);
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59, 999);

    query.date = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  const total = await Attendance.countDocuments(query);

  const attendance = await Attendance.find(query)
    .populate("employeeId", "name empId")
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    attendance,
    pagination: {
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  });
});

/**
 * POST /api/v1/attendance/checkin
 */

export const checkIn = asyncHandler(async (req, res) => {
  const OFFICE_START_HOUR = 9;
  const OFFICE_START_MINUTE = 15;

  const { userId } = req.user;

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isWeekend(today)) {
    throw new ApiError(400, "Check-in is not allowed on weekends.");
  }

  const attendance = await Attendance.findOne({
    employeeId: userId,
    date: today,
  });

  const day = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  if (!attendance) {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const isPastCutoff =
      currentHour > OFFICE_START_HOUR ||
      (currentHour === OFFICE_START_HOUR &&
        currentMinute > OFFICE_START_MINUTE);

    const calculatedStatus = isPastCutoff ? "late_arrival" : "present";

    await Attendance.create({
      employeeId: user._id,
      date: today,
      day,
      checkIn: now,
      checkedIn: true,
      status: calculatedStatus,
    });

    return res.status(200).json({
      success: true,
      message: "Checked in successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Already checked in today",
    });
  }
});

/**
 * PATCH /api/v1/attendance/checkout
 */

const MIN_CHECKOUT_HOURS = 3;
const FULL_DAY_HOURS = 4;
export const checkOut = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendance = await Attendance.findOne({
    employeeId: userId,
    date: today,
  });

  if (!attendance) {
    throw new ApiError(404, "No attendance found");
  }

  if (!attendance.checkIn) {
    throw new ApiError(400, "Cannot check out without checking in");
  }

  if (attendance.checkOut !== null) {
    throw new ApiError(400, "Already checked out");
  }

  const hoursWorked = (now - attendance.checkIn) / (1000 * 60 * 60);

  if (hoursWorked < MIN_CHECKOUT_HOURS) {
    const remainingMs =
      attendance.checkIn.getTime() +
      MIN_CHECKOUT_HOURS * 60 * 60 * 1000 -
      now.getTime();

    const remainingMinutesTotal = Math.ceil(remainingMs / 60000);
    const remHours = Math.floor(remainingMinutesTotal / 60);
    const remMinutes = remainingMinutesTotal % 60;

    const remainingText =
      remHours > 0 ? `${remHours}h ${remMinutes}m` : `${remMinutes}m`;
    return res.status(400).json({
      success: false,
      code: "MIN_HOURS_NOT_MET",
      message: `You can check out only after ${MIN_CHECKOUT_HOURS} hours from check-in. ${remainingText} minutes remaining.`,
    });
  }

  attendance.checkOut = now;
  attendance.workHours = calculateWorkHours;
  (attendance.checkIn, now);
  attendance.status = hourseWorked < FULL_DAY_HOURS ? "half_day" : "present";
  await attendance.save();

  return res.status(200).json({
    success: true,
    message:
      attendance.status === "half_day"
        ? "Checked out successfully. Marked as half day"
        : "Checked out successfully",
    attendance,
  });
});

/**
 * GET /api/v1/attendance/checkedin
 */

export const checkedIn = asyncHandler(async (req, res) => {

    const { userId } = req.user;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: userId,
      date: today,
    });

    return res.status(200).json({
      status: true,
      checkedIn: !!attendance,
      attendance,
    });
  
}
)




/**
 * GET /api/v1/attendance/chart
 */

export const getComparisonChart = asyncHandler(async (req, res) => {

    const { userId } = req.user;
    const { filter } = req.query;

    let startDate = new Date();

    switch (filter) {
      case "daily":
        startDate.setDate(startDate.getDate() - 6);
        break;
      case "weekly":
        startDate.setDate(startDate.getDate() - 49);
        break;
      case "monthly":
        startDate.setDate(startDate.getDate() - 11);
        break;
      default:
        throw new ApiError(400, "Invalid filter");
    }

    const attendance = await Attendance.find({
      employeeId: userId,
      date: {
        $gte: startDate,
      },
    }).sort({ date: 1 });

    const chartData = generateChart(attendance, filter);

    return res.status(200).json({
      success: true,
      chartData,
    });
  
})
