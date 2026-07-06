"use client"
import AdminCard from "@/components/cards/AdminCard"
import DateCard from "@/components/cards/DateCard"
import { Minus, Users } from 'lucide-react';
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
import AttendanceOverAdmin from "@/components/AttendanceOverAdmin";
import { useGetAdminDashboard } from "@/hooks/useGetAdminDasboard";
import { useEffect } from "react";

const cardConfig = [
  {
    key: "totalEmployees",
    title: "Total Employees",
    largeIcon: <Users size={20} className="text-primary" />,
  },
  {
    key: "onTime",
    title: "On Time",
    largeIcon: (
      <AvgTimeOutlineRoundedIcon
        height="1.5em"
        className="text-primary"
      />
    ),
  },
  {
    key: "absent",
    title: "Absent",
    largeIcon: (
      <WeatherTimeIcon
        height="1.5em"
        className="text-primary"
      />
    ),
  },
  {
    key: "lateArrival",
    title: "Late Arrival",
    largeIcon: (
      <TimeOutIcon
        height="1.3em"
        className="text-primary"
      />
    ),
  },
  {
    key: "earlyDeparture",
    title: "Early Departure",
    largeIcon: <Moon size={20} className="text-primary" />,
  },
  {
    key: "timeOffToday",
    title: "Time Off",
    largeIcon: <CalendarClock size={20} className="text-primary" />,
  },
] as const;


const page = () => {


  const {
    data,
    error,
    isError,
    isLoading,
    isFetching,
  } = useGetAdminDashboard();

  const dashboard = data?.data

  useEffect(() => {
    console.log("Dashboard:", dashboard)
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }





  return (
    <div className="flex flex-col gap-4 md:gap-6 min-h-screen pb-8">

      {/* Upper Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">

        {/* Date Card - Full width on mobile, normal on desktop */}
        <div className="col-span-1 lg:row-span-2">
          <DateCard />
        </div>

        {/* Regular Cards Grid */}
        <div className="grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 sm:col-span-2 lg:col-span-3 order-2 lg:order-2">
          {cardConfig.map((card) => {
            const value = dashboard?.[card.key];

            const smallIcon =
              value?.trend === "up" ? (
                <TrendingUp size={9} />
              ) : value?.trend === "down" ? (
                <TrendingDown size={9} />
              ) : (
                <Minus size={9} />
              );

            return (
              <AdminCard
                key={card.key}
                stats={value?.count ?? 0}
                title={card.title}
                smallIcon={smallIcon}
                largeIcon={card.largeIcon}
                content={`${value?.change ?? 0}% ${value?.trend ?? "same"
                  } from last month`}
              />
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-4 ">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 w-full overflow-x-auto">
            <AttendanceGraph />
          </div>
          <div className="w-full overflow-x-auto">
            <AttendanceBar />
          </div>
        </div>
      </div>

      {/* Attendance List Section - Placeholder for future content */}
      <div className="mt-4 md:mt-6">
        {/* Add your attendance list component here */}
        <AttendanceOverAdmin />
      </div>
    </div>
  )
}

export default page