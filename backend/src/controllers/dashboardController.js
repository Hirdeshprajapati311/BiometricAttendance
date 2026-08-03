import Attendance from "../model/Attendance.model.js";
import Leave from "../model/Leave.model.js";
import User from "../model/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calcluateChange } from "../utils/calculateChange.js";
import generateAdminChart from "../utils/generateAdminChart.js";
import generateWeeklyDepartmentChart from "../utils/generateWeeklyChart.js";
import { ApiError } from "../utils/ApiError.js";


/**
 * GET /api/v1/dashboard/summary
 */

const getAttendanceCount = asyncHandler(async (status, start, end) => {
  return Attendance.countDocuments({
    status,
    date: {
      $gte: start,
      $lte: end,
    },
  });
});

export const dashboardSummary = asyncHandler(async (req, res) => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1,
  );

  const endOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    0,
    23,
    59,
    59,
    999,
  );

  const employeesCount = await User.countDocuments({ role: "employee" });

  const lastMonthEmployees = await User.countDocuments({
    role: "employee",
    createdAt: {
      $lte: endOfLastMonth,
    },
  });

  // OnTime
  const onTimeToday = await getAttendanceCount("present", startOfDay, endOfDay);

  const lastMonthPresent = await getAttendanceCount(
    "present",
    startOfLastMonth,
    endOfLastMonth,
  );

  // Absent
  const absentToday = await getAttendanceCount("absent", startOfDay, endOfDay);

  const lastMonthAbsent = await getAttendanceCount(
    "absent",
    startOfLastMonth,
    endOfLastMonth,
  );

  // Late Arrival
  const lateArrivalToday = await getAttendanceCount(
    "late_arrival",
    startOfDay,
    endOfDay,
  );

  const lastMonthLateArrival = await getAttendanceCount(
    "late_arrival",
    startOfLastMonth,
    endOfLastMonth,
  );

  // Early Departure

  const officeEndToday = new Date(today);
  officeEndToday.setHours(17, 0, 0, 0); // 5:00 PM

  const earlyDepartureToday = await Attendance.countDocuments({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
    checkOut: {
      $ne: null,
      $lt: officeEndToday,
    },
  });

  const lastMonthEarlyDeparture = await Attendance.countDocuments({
    date: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
    $expr: {
      $lt: [
        "$checkOut",
        {
          $dateFromParts: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
            hour: 17,
            minute: 0,
            second: 0,
          },
        },
      ],
    },
  });
  // Time Off

  const timeOffToday = await Leave.countDocuments({
    status: "approved",
    startDate: {
      $lte: endOfDay,
    },
    endDate: {
      $gte: startOfDay,
    },
  });

  const lastMonthTimeOff = await Leave.countDocuments({
    status: "approved",
    startDate: {
      $lte: endOfLastMonth,
    },
    endDate: {
      $gte: startOfLastMonth,
    },
  });

  const dashboardData = {
    totalEmployees: {
      count: employeesCount,
      ...calcluateChange(employeesCount, lastMonthEmployees),
    },
    onTime: {
      count: onTimeToday,
      ...calcluateChange(onTimeToday, lastMonthPresent),
    },
    lateArrival: {
      count: lateArrivalToday,
      ...calcluateChange(lateArrivalToday, lastMonthLateArrival),
    },
    absent: {
      count: absentToday,
      ...calcluateChange(absentToday, lastMonthAbsent),
    },
    earlyDeparture: {
      count: earlyDepartureToday,
      ...calcluateChange(earlyDepartureToday, lastMonthEarlyDeparture),
    },
    timeOffToday: {
      count: timeOffToday,
      ...calcluateChange(timeOffToday, lastMonthTimeOff),
    },
  };

  res.status(200).json({
    success: true,
    data: dashboardData,
  });
});




/**
 * GET /api/v1/attendance/graphChart
 */

export const getComparisonAdminChart = asyncHandler(async (req, res) => {
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
    date: {
      $gte: startDate,
    },
  }).sort({ date: 1 });

  const chartData = generateAdminChart(attendance, filter);

  return res.status(200).json({
    success: true,
    chartData,
  });
});



/**
 * GET /api/v1/attendance/barChart
 */

export const getWeeklyAdminChart = asyncHandler(async (req, res) => {

    const today = new Date();

    const startOfWeek = new Date(today);

    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const attendance = await Attendance.find({
      date: {
        $gte: startOfWeek,
      },
    }).populate("employeeId", "department");

    const chartData = generateWeeklyDepartmentChart(attendance);

    return res.status(200).json({
      success: true,
      chartData,
    });
  
})
