import Leave from "../model/Leave.model.js";
import User from "../model/User.model.js";

/**
 *  GET getLeaveBalance
 */

export const getLeaveBalance = async (req, res) => {
  try {
    const { userId } = req.user;

    const { leaveBalance } = await User.findById(userId).select("leaveBalance");

    res.status(200).json({
      success: true,
      leaveBalance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * POST /api/v1/leave-request/create
 */
export const createLeaveRequest = async (req, res) => {
  try {
    console.log("LEAVE BODY:", req.body);

    const { type, startDate, endDate, reason } = req.body;

    const { userId } = req.user;

    const employee = await User.findById(userId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const existingLeave = await Leave.findOne({
      employeeId: userId,
      status: { $in: ["approved", "pending"] },
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
    });

    if (existingLeave) {
      const message =
        existingLeave.status === "pending"
          ? "You already have a pending leave request for the selected dates."
          : "You already have approved leave for the selected dates.";
      return res.status(409).json({
        success: false,
        message,
        status: existingLeave.status,
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leave = new Leave({
      employeeId: userId,
      empId: employee.empId,
      employeeName: employee.name,
      designation: employee.designation,
      leaveType: type,
      startDate,
      endDate,
      totalDays,
      reason,
      status: "pending",
      activity: [{ label: "Leave request submitted" }],
    });

    await leave.save();

    return res.status(201).json({
      success: true,
      message: "Leave request submitted successfully.",
      leave,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * GET /api/v1/leave-request/me
 */

export const getMyLeaveRequest = async (req, res) => {
  try {
    const { filter } = req.query;

    let query = {
      employeeId: req.user.userId,
    };

    if (
      filter === "pending" ||
      filter === "approved" ||
      filter === "rejected" ||
      filter === "withdrawn"
    ) {
      query.status = filter.toLowerCase();
    }

    const leaves = await Leave.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * GET /api/v1/leave-request
 * Admin Route
 */

export const getLeaves = async (req, res) => {
  try {
    const { filter, search } = req.query;

    let query = {};

    if (
      filter === "pending" ||
      filter === "approved" ||
      filter === "rejected" ||
      filter === "withdrawn"
    ) {
      query.status = filter.toLowerCase();
    }

    if (search) {
      query.$or = [
        { empId: { $regex: search, $options: "i" } },
        { employeeName: { $regex: search, $options: "i" } },
      ];
    }

    const leaves = await Leave.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};
