import convertToHours from "./converToHours.js";

function genearteChart(attendance, filter) {
  let chartData = [];
  if (filter === "daily") {
    chartData = attendance.map((record) => ({
      date: record.date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      value: convertToHours(record.workHours),
    }));
  }

  if (filter === "weekly") {
    const weeklyMap = {};
    attendance.forEach((record) => {
      const weekStart = new Date(record.date);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      const key = weekStart.toISOString().split("T")[0];

      if (!weeklyMap[key]) {
        weeklyMap[key] = 0;
      }
      weeklyMap[key] += convertToHours(record.workHours);
    });
    chartData = Object.entries(weeklyMap).map(([week, hours]) => ({
      date: new Date(week).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      value: +hours.toFixed(2),
    }));
  }

  if (filter === "monthly") {
    const monthlyMap = {};

    attendance.forEach((record) => {
      const key = record.date.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });

      if (!monthlyMap[key]) {
        monthlyMap[key] = 0;
      }

      monthlyMap[key] += convertToHours(record.workHours);
    });
    chartData = Object.entries(monthlyMap).map(([month, hours]) => ({
      date: month,
      value: +hours.toFixed(2),
    }));
  }

  return chartData;
}

export default genearteChart;
