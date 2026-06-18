import { FaSliders } from "react-icons/fa6";
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
    <div className="bg-white text-xs sm:text-sm md:text-base rounded-lg shadow-md p-4">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-semibold mb-4">Weekly Attendance</h3>
        <button className="cursor-pointer p-1 rounded-full hover:bg-gray-100"><FaSliders /></button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={barData} barSize={30}>
          <CartesianGrid strokeDasharray="2 2" stroke="#f0f0f0" />
          <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="value" radius={[0, 1, 0, 0]}>
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