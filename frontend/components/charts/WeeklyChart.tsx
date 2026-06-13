import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const barData = [
  { dept: "Sales", value: 40 },
  { dept: "IT", value: 55 },
  { dept: "Marketing", value: 86 },
  { dept: "Legal", value: 45 },
  { dept: "API", value: 38 },
]

const WeeklyChart = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold mb-4">Weekly Attendance</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="value" radius={[1, 1, 0, 0]}>
            {barData.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.dept === "Marketing" ? "#3B5BDB" : "#C5D1F5"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeeklyChart;