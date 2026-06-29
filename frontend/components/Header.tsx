"'use client"
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import { Bell, LogOut, Settings, X } from "lucide-react";
import { Search } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import NotificationPannel from "./NotificationPannel";
import CalenderPannel from "./CalenderPannel";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/store/authSlice";

const Header = () => {

  const dispatch = useDispatch()


  const [isNotificationPannelOpen, setIsNotificationPannelOpen] = useState(false)
  const [isCalenderPannelOpen, setIsCalenderPannelOpen] = useState(false)

  const [openProfile, setOpenProfile] = useState(false)

  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)

  const user = useSelector((state: any) => state.auth.user)



  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenProfile(false)
      }
    }

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openProfile])



  if (!user) {
    return null
  }


  console.log("Header user:", user);

  return (
    <>
      <div className="h-16 relative rounded-2xl bg-white shadow-xl flex flex-row justify-between items-center pl-4 pr-2 py-2 px-6">
        <Image className="cursor-pointer" src="/arnifilogo.png" loading="eager" alt="Arnifi Logo" width={100} height={40} />

        <div className="flex flex-row items-center gap-4 ">
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
            <div onClick={() => setOpenProfile((prev) => !prev)} className="relative">
              <FaUserCircle size={30} className="text-gray-500 cursor-pointer" />

              {openProfile && (
                <div onClick={(e) => e.stopPropagation()} ref={modalRef} className="p-4 rounded-lg bg-white absolute top-8 flex items-center justify-center flex-col gap-4">

                  <div className="w-30 truncate md:w-36">
                    <h1 className=" text-xs md:text-sm font-medium">{user.name}</h1>
                    <p className="text-[0.6rem] md:text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button className="flex flex-row cursor-pointer"><Settings />&nbsp;Settings</button>
                  <button onClick={() => setConfirmDeletePopup((prev) => !prev)} className="flex flex-row bg-red-500 text-white rounded-md cursor-pointer p-1"><LogOut />&nbsp;Logout</button>

                </div>
              )}

            </div>
            <div className="w-30 truncate md:w-36">
              <h1 className=" text-xs md:text-sm font-medium">{user.name}</h1>
              <p className="text-[0.6rem] md:text-xs text-gray-500">{user.email}</p>
            </div>
          </div>



        </div>



        {confirmDeletePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="p-6 flex flex-col w-80 rounded-md bg-white justify-center items-center shadow-xl">
              <p>Are you sure you want to logout?</p>

              <div className="flex flex-row items-center w-full justify-between px-6">
                <button onClick={() => setConfirmDeletePopup(false)} className="rounded cursor-pointer bg-gray-200 py-1 px-3">No</button>
                <button onClick={() => {
                  dispatch(clearCredentials())
                  localStorage.removeItem("token");
                  sessionStorage.removeItem('token');
                  window.location.href = "/login"
                }} className="rounded py-1 px-3 bg-blue-300 cursor-pointer text-white">Yes</button>
              </div>


            </div>
          </div>
        )}

      </div >



      {isNotificationPannelOpen && <NotificationPannel onClose={() => setIsNotificationPannelOpen(false)} />}

      {
        isCalenderPannelOpen && <CalenderPannel onClose={() => setIsCalenderPannelOpen(false)} />
      }


    </>
  );
}

export default Header;
