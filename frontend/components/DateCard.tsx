"use client";
import { ImSun } from "react-icons/im";

const DateCard = () => {



  // Date Formating

  const date = new Date();

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;


  // Time Formating

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  })

  return (
    <div className="bg-white hover:scale-105 transition-all duration-300 flex flex-col gap-10 rounded-lg shadow-md p-4 px-6 w-52">


      {/* Time content */}
      <div className="flex flex-row mt-6 items-center  gap-2">
        <ImSun size={30} className="text-gray-400" />
        <div className="flex flex-col">
          <h3 className="text-xl font-lexend text-gray-400">{formattedTime}</h3>
          <p className="text-[10px] font-lexend text-gray-400" >Realtime Insight</p>
        </div>


      </div>

      {/* Date content */}
      <div className="flex flex-col font-lexend ">

        <span>Today: </span>
        <p >{formattedDate}</p>

      </div>


      {/* Attendance button */}

      <button className="bg-primary cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors text-sm font-lexend duration-300">
        View Attandance
      </button>
    </div>
  );
}

export default DateCard;
