"use client"
import { useCheckedIn } from "@/hooks/useCheckedIn";
import { useCheckIn } from "@/hooks/useCheckIn";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSun } from "react-icons/im";
import { useSelector } from "react-redux";

const DateCard = () => {

  const { role } = useSelector((state: any) => state.auth.user)


  const [formattedTime, setFormattedTime] = useState("")
  const router = useRouter()

  const { mutate: checkIn, isPending } = useCheckIn();
  const { data: checkinStatus } = useCheckedIn();

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

  const isWeekend = () => {
    const today = new Date();
    const day = today.getDay();
    return day === 0 || day === 6

  }

  const dayName = date.toLocaleString("en-US", { weekday: "long" })

  const isWeekendToday = isWeekend()


  // Time Formating


  useEffect(() => {
    const updateTime = () => {
      const timeString = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setFormattedTime(timeString);
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`bg-white hover:scale-105 transition-all duration-300 flex flex-1  flex-col  gap-4 rounded-lg shadow-md p-4 px-6 w-full  lg:w-52 ${role === "employee" ? "md:gap-4" : "md:gap-10"}`}>


      {/* Time content */}
      <div className={`flex flex-row mt-2  items-center  gap-2 ${role === "employee" ? "md:mt-4" : "md:mt-6"}`}>
        <ImSun size={30} className="text-gray-400" />
        <div className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-lexend text-gray-400">{formattedTime || "Loading"}</h3>
          <p className="text-[8px] sm:text-[10px] font-lexend text-gray-400" >Realtime Insight</p>
        </div>


      </div>

      {/* Date content */}
      <div className="flex flex-col  self-end md:self-start font-lexend text-sm sm:text-base ">

        <span>Today: </span>
        <p >{formattedDate}</p>

      </div>


      {role === "employee" && (
        <>
          {isWeekendToday ? (<div className="flex items-center px-5 py-2 bg-purple-100 text-purple-700 text-[10px] justify-center rounded-lg font-medium border border-purple-200">It's {dayName}&nbsp;
            Happy Weekend! 🎉
          </div>) : (
            <>
              <div className="flex font-lexend justify-between items-center flex-row">
                {checkinStatus?.checkedIn && !checkinStatus?.attendance.checkOut ? (<p

                  className="text-[8px] text-green-400">Yor are checked In</p>) : (<p className="text-[8px]">Yor are not checked In</p>)}
                <div className="h-full w-1 bg-gray-500" />
                {checkinStatus?.checkedIn && !checkinStatus?.attendance.checkOut ? (<button
                  style={{ backgroundColor: "#22c559" }}
                  className="flex flex-row cursor-pointer gap-2 bg-green-500 text-xs p-1 rounded-lg text-white">
                  CHECK OUT<LogOut />
                </button>) : (
                  <button disabled={isPending} onClick={() => checkIn()} className="flex flex-row cursor-pointer gap-2 bg-primary text-xs p-1 rounded-lg text-white">{isPending ? "CHECKING..." : "CHECK IN"} <LogOut /></button>
                )}

              </div>
            </>
          )}
        </>
      )}


      {/* Attendance button */}

      <button onClick={() => router.push("/employee/attendance")} className="bg-primary cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors text-xs sm:text-sm font-lexend duration-300">
        View Attandance
      </button>
    </div >
  );
}

export default DateCard;
