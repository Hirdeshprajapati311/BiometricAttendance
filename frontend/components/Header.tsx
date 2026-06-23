"'use client"
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import NotificationPannel from "./NotificationPannel";
import CalenderPannel from "./CalenderPannel";
import { useSelector } from "react-redux";

const Header = () => {


  const [isNotificationPannelOpen, setIsNotificationPannelOpen] = useState(false)
  const [isCalenderPannelOpen, setIsCalenderPannelOpen] = useState(false)

  const user = useSelector((state: any) => state.auth.user)
  if (!user) {
    return null;
  }





  return (
    <>
      <div className="h-16 rounded-2xl bg-white shadow-xl flex flex-row justify-between items-center pl-4 pr-2 py-2 px-6">
        <Image className="cursor-pointer" src="/arnifilogo.png" loading="eager" alt="Arnifi Logo" width={100} height={40} />

        <div className="flex flex-row items-center gap-4">
          {/* search */}
          <div className="md:flex hover:scale-105 transform duration-300 hidden flex-row items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
            <Search size={20} className="text-gray-500" />
            <input placeholder="Quick Search..." className="bg-transparent border-none focus:outline-none" />

          </div>

          {/* seperator */}
          <div className="hidden md:block w-px h-6 bg-gray-300" >

          </div>


          {/* calendar, notification & profile */}
          <div className="flex flex-row items-center gap-4">
            <button onClick={() => setIsCalenderPannelOpen((prev) => !prev)} className="bg-blue-accent border border-bg-secondary-blue rounded-full p-1 md:p-2">
              <IoCalendarOutline size={20} className="text-bg-secondary-blue   cursor-pointer" />
            </button>
            <button onClick={() => setIsNotificationPannelOpen(prev => !prev)} className="bg-blue-accent border border-bg-secondary-blue rounded-full p-1 md:p-2">
              <Bell size={20} className="text-bg-secondary-blue cursor-pointer " />
            </button>
            <FaUserCircle size={30} className="text-gray-500 cursor-pointer" />
            <div>
              <h1 className=" text-xs md:text-sm font-medium">{user.name}</h1>
              <p className="text-[0.6rem] md:text-xs text-gray-500">{user.email}</p>
            </div>
          </div>



        </div>




      </div >

      {isNotificationPannelOpen && <NotificationPannel onClose={() => setIsNotificationPannelOpen(false)} />}

      {
        isCalenderPannelOpen && <CalenderPannel onClose={() => setIsCalenderPannelOpen(false)} />
      }


    </>
  );
}

export default Header;
