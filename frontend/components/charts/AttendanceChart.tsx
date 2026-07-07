"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { FaSliders } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { useGetChartEmp } from "@/hooks/useGetChartEmp"
import { Chart } from "@/services/attendance.api"
import { useGetGraphChart } from "@/hooks/useGetGraphChart"
import { useSelector } from "react-redux"


const AttendanceChart = () => {



  const [active, setActive] = useState("Daily")
  const filter = ["Daily", "Weekly", "Monthly"]

  const { role } = useSelector((state: any) => state.auth.user)


  const { data: chartData = [], isLoading } = useGetChartEmp(active.toLowerCase() as Chart["filter"])

  const { data: graphChart = [] } = useGetGraphChart(active.toLowerCase() as Chart["filter"])

  const graphData = chartData?.chartData ?? []
  const adminGraphData = graphChart?.chartData ?? []


  const chart =
    role === "admin" ? adminGraphData : graphData;



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
        <AreaChart data={chart}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B5BDB" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B5BDB" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} tickFormatter={(v) => `${v.toFixed(1)}h`} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => `${v}hrs`} />
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