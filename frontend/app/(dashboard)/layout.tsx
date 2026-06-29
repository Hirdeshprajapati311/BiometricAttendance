"use client"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { allNavItems } from "@/components/Sidebar";
import { IoGitPullRequest } from "react-icons/io5";
import { useEffect, useState } from "react";
import LeaveRequestPopUp from "@/components/popups/LeaveRequestPopUp";
import { useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state: any) => state.auth)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()


  useEffect(() => {
    const timer = setTimeout(() => setIsChecking(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      window.location.href = "/login"
    }
  }, [isAuthenticated, isChecking])

  if (isChecking) return null
  if (!isAuthenticated) return null





  const activeItem = allNavItems.find(item => {
    if (item.path === "/admin" || item.path === "/employee" || item.path === "/") {
      return pathname === "/admin" || pathname === "/employee" || pathname === "/"
    }
    return item.path === pathname
  });


  const currentPageName = activeItem?.name;

  return (
    <div className="flex lg:flex-row flex-col h-screen w-screen">


      <Sidebar />
      <div className="flex flex-col  flex-1">
        <Header />

        <div className="flex items-center justify-between relative sm:px-30 w-full  md:px-28 xl:px-52 pt-4 md:pt-6 gap-1 px-6
        ">
          {pathname === "/employee/attendance" ? (<button onClick={() => router.back()} className="flex flex-row gap-2 items-center cursor-pointer"><ArrowLeft size={18} /> Back</button>) : (
            <div className="flex flex-row items-center justify-center gap-1">
              {currentPageName} <Image src="/triangle.png" alt="Triangle" width={11} height={11} /></div>
          )}


          {pathname === "/employee/attendance" ? (
            <button
              onClick={() => router.push("/history")}
              className="p-2 font-lexend text-xs md:text-sm rounded-lg bg-primary text-white cursor-pointer"
            >
              Back to Overview
            </button>
          ) : pathname === "/employee" ? (
            <button
              onClick={() => setIsPopUpOpen((prev) => !prev)}
              className="p-2 font-lexend text-xs md:text-sm flex items-center justify-center rounded-lg bg-primary text-white cursor-pointer"
            >
              <IoGitPullRequest />
              &nbsp; Request for leave
            </button>
          ) : null}

          {isPopUpOpen && (
            <LeaveRequestPopUp onClose={() => setIsPopUpOpen(false)} />
          )}


        </div>
        <main className="flex-1 overflow-y-auto py-6 px-6 sm:px-30 md:px-28 xl:px-52 bg-background">
          {children}
        </main>


      </div>

    </div >
  );
}

export default DashboardLayout;
