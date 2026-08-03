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
                <div
                  ref={modalRef}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-10 w-72 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden z-50"
                >
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-sm truncate">
                        {user.name}
                      </h2>
                      <p className="text-xs text-gray-500  truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="p-2">
                    <button
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={() => setConfirmDeletePopup(true)}
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
            <div className="hidden md:block truncate md:w-36">
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
