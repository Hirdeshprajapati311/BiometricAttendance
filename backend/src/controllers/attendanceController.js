import Attendance from "../model/Attendance.model.js";
import User from "../model/User.model.js";

/**
 * GET /api/v1/attendance/me
 */

export const getMyAttendance = async (req, res) => {
  try {
    const { userId } = req.user;

    const attendance = await Attendance.find({
      employeeId: userId,
    }).populate("employeeId", "name empId email");

    return res.status(200).json({
      success: true,
      attendance,
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
export const checkOut = async (req, res) => {};

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
