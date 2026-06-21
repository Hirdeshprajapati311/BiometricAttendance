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
import AttendanceOverAdmin from "@/components/AttendanceOverAdmin";

const cardData = [
  { id: 1, stats: 467, title: "Total Employees", smallIcon: <Plus size={9} />, largeIcon: <Users size={20} className="text-primary" />, content: "2 new employees added" },
  { id: 2, stats: 360, title: "On Time", smallIcon: <TrendingUp size={9} />, largeIcon: <AvgTimeOutlineRoundedIcon height="1.5em" className="text-primary" />, content: "10% increase from last month" },
  { id: 3, stats: 30, title: "Absent ", smallIcon: <TrendingDown size={9} />, largeIcon: <WeatherTimeIcon height="1.5em" className="text-primary" />, content: "5% decrease from last month" },
  { id: 4, stats: 62, title: "Late Arrival", smallIcon: <TrendingDown size={9} />, largeIcon: <TimeOutIcon height="1.3em" className="text-primary" />, content: "8% increase from last month" },
  { id: 5, stats: 6, title: "Early Departure", smallIcon: <TrendingUp size={9} />, largeIcon: <Moon size={20} className="text-primary" />, content: "3% decrease from last month" },
  { id: 6, stats: 42, title: "Time Off", smallIcon: <TrendingUp size={9} />, largeIcon: <CalendarClock size={20} className="text-primary" />, content: "15% increase from last month" },
]

const page = () => {
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
          {cardData.map((card, index) => (
            <AdminCard
              key={index}
              stats={card.stats}
              title={card.title}
              smallIcon={card.smallIcon}
              largeIcon={card.largeIcon}
              content={card.content}
            />
          ))}
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