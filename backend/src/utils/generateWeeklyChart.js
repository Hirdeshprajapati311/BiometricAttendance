 function generateWeeklyDepartmentChart(attendance) {
  const departmentMap = {};

  attendance.forEach((record) => {
    const department = record.employeeId?.department || "Unknown";

    if (!departmentMap[department]) {
      departmentMap[department] = {
        present: 0,
        total: 0,
      };
    }

    departmentMap[department].total++;

    if (record.status === "present" || record.status === "late_arrival") {
      departmentMap[department].present++;
    }
  });

  return Object.entries(departmentMap).map(([department, data]) => ({
    department,
    percentage: +((data.present / data.total) * 100).toFixed(1),
  }));
}

export default generateWeeklyDepartmentChart;