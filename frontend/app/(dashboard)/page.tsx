"use client"
import AdminCard from "@/components/AdminCard"
import DateCard from "@/components/DateCard"
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


const cardData = [
  { id: 1, stats: 467, title: "Total Employees", smallIcon: <Plus size={9} />, largeIcon: <Users size={20} className="text-primary" />, content: "2 new employees added" },
  { id: 2, stats: 360, title: "On Time", smallIcon: <TrendingUp size={9} />, largeIcon: <AvgTimeOutlineRoundedIcon height="1.5em" className="text-primary" />, content: "10% increase from last month" },
  { id: 3, stats: 30, title: "Absent ", smallIcon: <TrendingDown size={9} />, largeIcon: <WeatherTimeIcon height="1.5em" className="text-primary" />, content: "5% decrease from last month" },
  { id: 4, stats: 62, title: "Late Arrival", smallIcon: <TrendingDown size={9} />, largeIcon: <TimeOutIcon height="1.3em" className="text-primary" />, content: "8% increase from last month" },
  { id: 5, stats: 6, title: "Early Departure", smallIcon: <TrendingUp size={9} />, largeIcon: <Moon size={20} className="text-primary" />, content: "3% decrease from last month" },
  { id: 6, stats: 42, title: "Time Off", smallIcon: <TrendingUp size={9} />, largeIcon: <CalendarClock size={20} className="text-primary" />, content: "15% increase from last month" },

]

const Home = () => {
  return (
    <div className="flex flex-col gap-2 md:px-48  h-screen">
      {/* upper cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 grid-rows-2">

        <div className="row-span-2">
          <DateCard />

        </div>

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

      {/* Charts */}
      <div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AttendanceGraph />
          <AttendanceBar />
        </div>

      </div>


      {/* Attendance List */}
      <div>

      </div>
    </div>
  )
}

export default Home
