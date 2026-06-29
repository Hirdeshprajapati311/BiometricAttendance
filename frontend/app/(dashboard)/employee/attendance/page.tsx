"use client"
import { LuPencilLine } from "react-icons/lu";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LuBookCheck } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { useCheckedIn } from "@/hooks/useCheckedIn";


const page = () => {

  const { data: isCheckedIn } = useCheckedIn()

  return (
    <div
      style={{ gap: "20px" }}
      className="flex flex-col  w-full">
      <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow-sm">
        <div className="font-lexend flex flex-row items-center justify-between">
          <span>Attendance for {new Date(isCheckedIn?.attendance.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}</span>

          <div className="flex flex-row gap-4">
            <button className="flex text-sm flex-row gap-1 px-2 py-1 bg-gray-200 items-center cursor-pointer justify-center border rounded-lg border-gray-300"><LuPencilLine /> Request Correction</button>
            {isCheckedIn?.checkedIn && !isCheckedIn.attendance?.checkOut ? (<button
              style={{ backgroundColor: '#22c559' }}
              className="flex flex-row  text-white text-sm px-2 gap-1 py-1 cursor-pointer items-center justify-center rounded-lg"><div className="font-bold"><AiOutlineLoading3Quarters size={10} /> </div>CHECK OUT</button>) : (
              <button
                className="flex flex-row bg-primary text-white text-sm px-2 gap-1 py-1 cursor-pointer items-center justify-center rounded-lg"><div className="font-bold"><LogOut size={10} /> </div>CHECK IN</button>
            )}
          </div>
        </div>

      </div>


      {/* Work Time-log */}

      <div className="px-4 py-6 mt-8 shadow-sm bg-white flex flex-col gap-4 rounded-lg ">
        <h1 className="font-lexend text-lg">Work Time-log</h1>

        <div className="rounded-lg border border-gray-300 flex flex-col gap-4 px-4 py-6 font-lexend">

          <div className='flex flex-row gap-3'>
            <div className='flex flex-col items-center mt-1 gap-0.5'>
              <div className='p-2 rounded-full bg-blue-100 text-blue-600'><LuBookCheck size={20} /></div>
              <div className='w-0.5 h-6 bg-gray-300' />
              <div className='p-2 rounded-full bg-blue-100 text-blue-600'><FaRegClock size={20} /></div>
              <div className='w-0.5 h-6 bg-gray-300' />
              <div className='p-2 rounded-full bg-blue-100 text-blue-600'><LogOut size={20} /></div>
            </div>



            <div className='flex flex-col gap-2  w-full'>
              <div>
                <div className='flex flex-col '>
                  <span className=''>Checked-in</span>
                  <p className='text-xs text-gray-500'>Checkek-in at {new Date(isCheckedIn?.attendance.checkIn).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}(Central Standard Time)</p>
                </div>

                <div className='flex flex-col py-6'>
                  <span className=''>Lunch Break:</span>
                  <p className='text-xs text-gray-500'>12:00 PM - 1:00 PM</p>
                </div>
                <div className='flex flex-col '>
                  <span className=''>Checked-out at:</span>
                  <p className='text-xs text-gray-500'>5:00 PM</p>
                </div>
              </div>


              <div className="w-full h-0.5  bg-gray-200" />

              <span>Total work duration for the day.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default page;
