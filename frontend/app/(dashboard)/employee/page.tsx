"use client"
import AdminCard from "@/components/cards/AdminCard"
import DateCard from "@/components/cards/DateCard"
import { Users } from 'lucide-react';
import AvgTimeOutlineRoundedIcon from '@iconify-react/material-symbols/avg-time-outline-rounded';
import WeatherTimeIcon from '@iconify-react/mdi/weather-time';
import TimeOutIcon from '@iconify-react/pajamas/time-out';
import { Moon } from "lucide-react";
import { CalendarClock } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { Plus } from "lucide-react";
import AttendanceGraph from "@/components/charts/AttendanceChart";
import AttendanceBar from "@/components/charts/WeeklyChart";
import EmployeeCard from "@/components/cards/EmployeeCard";
import AttendanceOverview from "@/components/AttendanceOverview";
import { useGetLeaveBalance } from "@/hooks/useGetLeaveBalance";


const data = [



  { label: "Casual leave", used: 4, total: 7 },
  { label: "Sick leave", used: 4, total: 7 },
  { label: "Earned leave", used: 4, total: 7 },

  { label: "Adjustment leave", used: 4, total: 7 },

  { label: "Upaid leave", used: 4, total: 7 },

  { label: "Half leave", used: 4, total: 7 },


]


const page = () => {


  const { data: leaveReqData } = useGetLeaveBalance()


  return (
    <div className="flex flex-col gap-4 md:gap-6 min-h-screen pb-8">

      {/* Upper Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">

        {/* Date Card - Full width on mobile, normal on desktop */}
        <div className="col-span-1 lg:row-span-2">
          <DateCard />
        </div>

        {/* Regular Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 sm:col-span-2 lg:col-span-3 order-2 lg:order-2">
          {/* EmployeeCard */}

          {leaveReqData?.leaveBalance && Object.entries(leaveReqData.leaveBalance).map(([key, value]: any) => (
            <EmployeeCard key={key} used={value.used} total={value.total} label={key} />
          ))}


        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-4 md:mt-6">
        <div className="flex flex-col  gap-4 md:gap-6">
          <div className=" w-full overflow-x-auto">
            <AttendanceGraph />
          </div>

        </div>
      </div>

      {/* Attendance List Section - Placeholder for future content */}
      <div className="mt-4 md:mt-6">
        {/* Add your attendance list component here */}
        <AttendanceOverview />
      </div>
    </div>
  )
}

export default page