import Attendance from "../model/Attendance.model.js";
import User from "../model/User.model.js";
import calculateWorkHours from "../utils/calculateWorkHours.js";

/**
 * GET /api/v1/attendance/me
 */

export const getMyAttendance = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const { userId } = req.user;

    const total = await Attendance.countDocuments({ employeeId: userId });
    const attendance = await Attendance.find({
      employeeId: userId,
    })
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * POST /api/v1/attendance/checkin
 */

export const checkIn = async (req, res) => {
  try {
    const { userId } = req.user;

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await Attendance.create({
        employeeId: user._id,
        date: today,
        day,
        checkIn: now,
        checkedIn: true,
        status: "present",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * PATCH /api/v1/attendance/checkout
 */

const MIN_CHECKOUT_HOURS = 3;
const FULL_DAY_HOURS = 4;
export const checkOut = async (req, res) => {
  try {
    const { userId } = req.user;

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: userId,
      date: today,
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "No attendance found",
      });
    }

    if (!attendance.checkIn) {
      return res.status(400).json({
        success: false,
        message: "Cannot check out without checking in",
      });
    }

    if (attendance.checkOut !== null) {
      return res.status(400).json({
        success: false,
        message: "Already checked out",
      });
    }

    const hourseWorked = (now - attendance.checkIn) / (1000 * 60 * 60);

    if (hourseWorked < MIN_CHECKOUT_HOURS) {
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
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * GET /api/v1/attendance/checkedin
 */

export const checkedIn = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
