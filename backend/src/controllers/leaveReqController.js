import Leave from "../model/Leave.model.js";
import User from "../model/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

/**
 *  GET getLeaveBalance
 */

export const getLeaveBalance = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const { leaveBalance } = await User.findById(userId).select("leaveBalance");

  res.status(200).json({
    success: true,
    leaveBalance,
  });
});

/**
 * POST /api/v1/leave-request/create
 */
export const createLeaveRequest = asyncHandler(async (req, res) => {
  console.log("LEAVE BODY:", req.body);

  const { type, startDate, endDate, reason } = req.body;

  const { userId } = req.user;

  const employee = await User.findById(userId);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
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
});

/**
 * GET /api/v1/leave-request/me
 */

export const getMyLeaveRequest = asyncHandler(async (req, res) => {
  await Leave.updateMany(
    {
      status: "pending",
      startDate: { $lt: new Date() },
    },
    {
      $set: {
        status: "expired",
      },
    },
  );

  const { filter } = req.query;

  let query = {
    employeeId: req.user.userId,
  };

  if (
    filter === "pending" ||
    filter === "approved" ||
    filter === "rejected" ||
    filter === "withdrawn" ||
    filter === "expired"
  ) {
    query.status = filter.toLowerCase();
  }

  const leaves = await Leave.find(query).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    leaves,
  });
});

/**
 * GET /api/v1/leave-request
 * Admin Route
 */

export const getLeaves = asyncHandler(async (req, res) => {
  await Leave.updateMany(
    {
      status: "pending",
      startDate: { $lt: new Date() },
    },
    {
      $set: {
        status: "expired",
      },
    },
  );

  const { filter, search } = req.query;

  let query = {};

  if (
    filter === "pending" ||
    filter === "approved" ||
    filter === "rejected" ||
    filter === "withdrawn" ||
    filter === "expired"
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
});

/**
 * PATCH /api/v1/leave-request/:id
 * Admin Route
 */

export const updateLeaveRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { comment, status } = req.body;

  const allowedStatus = [
    "approved",
    "rejected",
    "pending",
    "withdrawn",
    "expired",
  ];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const leaveRequest = await Leave.findById(id);

  if (!leaveRequest) {
    throw new ApiError(404, "Leave request not found");
  }

  leaveRequest.status = status;
  leaveRequest.adminComment = comment;

  await leaveRequest.save();

  return res.status(200).json({
    success: true,
    message: `Leave request ${status}`,
    data: leaveRequest,
  });
});

/**
 * PATCH /api/v1/leave-request/withdraw/:id
 * Admin Route
 */
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const leaveRequest = await Leave.findById(id);

  if (!leaveRequest) {
    throw new ApiError(404, "Leave request not found");
  }

  if (leaveRequest.status !== "pending") {
    throw new ApiEror(400, "Only pending leave requests can be withdrawn");
  }

  leaveRequest.status = "withdrawn";

  await leaveRequest.save();

  return res.status(200).json({
    success: true,
    message: "Leave request withdrawn successfully",
    data: leaveRequest,
  });
});
