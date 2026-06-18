"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { FaSliders } from "react-icons/fa6"
import { useState } from "react"

const data = [
  { date: "01 Aug", value: 60 },
  { date: "02 Aug", value: 75 },
  { date: "03 Aug", value: 70 },
  { date: "04 Aug", value: 65 },
  { date: "07 Aug", value: 91 },
  { date: "08 Aug", value: 55 },
  { date: "09 Aug", value: 50 },
  { date: "10 Aug", value: 45 },
  { date: "14 Aug", value: 60 },
  { date: "15 Aug", value: 55 },
  { date: "16 Aug", value: 65 },
]

const AttendanceChart = () => {



  const [active, setActive] = useState("Daily")
  const filter = ["Daily", "Weekly", "Monthly"]

  return (
    <div className="bg-white text-xs sm:text-sm md:text-base rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-4">
        <h3 className="font-semibold ">Attendance Comparison Chart</h3>
        {/* Daily/Weekly/Monthly toggle here */}
        <div className="flex flex-row gap-4">

          <div className="flex items-center gap-3">
            {filter.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`flex items-center gap-1.5  text-xs sm:text-sm md:text-base cursor-pointer`}
              >
                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${active === f ? "border-primary" : "border-gray-400"}`}>
                  {active === f && (<div className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </div>
                <span className={active === f ? "text-primary font-medium" : "text-gray-400"}>
                  {f}
                </span>

              </button>
            ))}
          </div>

          <button className="cursor-pointer p-1 rounded-full hover:bg-gray-100"><FaSliders /></button>

        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B5BDB" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B5BDB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B5BDB"
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={{ fill: "#3B5BDB", r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart;