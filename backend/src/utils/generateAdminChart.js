import convertToHours from "./converToHours.js";

function generateAdminChart(attendance, filter) {
  const map = {};

  attendance.forEach((record) => {
    let key;

    if (filter === "daily") {
      key = record.date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });
    }

    if (filter === "weekly") {
      const weekStart = new Date(record.date);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());

      key = weekStart.toISOString().split("T")[0];
    }

    if (filter === "monthly") {
      key = record.date.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      });
    }

    if (!map[key]) {
      map[key] = {
        totalHours: 0,
        employees: 0,
      };
    }

    map[key].totalHours += convertToHours(record.workHours);
    map[key].employees++;
  });

  return Object.entries(map).map(([key, data]) => ({
    date:
      filter === "weekly"
        ? new Date(key).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : key,
    value: +(data.totalHours / data.employees).toFixed(2),
  }));
}

export default generateAdminChart;
