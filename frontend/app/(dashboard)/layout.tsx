"use client"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { allNavItems } from "@/components/Sidebar";
import { IoGitPullRequest } from "react-icons/io5";
import { useState } from "react";
import LeaveRequestPopUp from "@/components/popups/LeaveRequestPopUp";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {



  const [isPopUpOpen, setIsPopUpOpen] = useState(false)


  const pathname = usePathname();
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
          <div className="flex flex-row items-center justify-center gap-1">
            {currentPageName} <Image src="/triangle.png" alt="Triangle" width={11} height={11} />

          </div>
          {pathname === "/employee" && (<button onClick={() => setIsPopUpOpen((prev) => !prev)} className="p-2 font-lexend text-xs md:text-sm flex flex-row items-center justify-center rounded-lg cursor-pointer  bg-primary text-white"><IoGitPullRequest />&nbsp; Request for leave</button>)}

          {isPopUpOpen && (
            <LeaveRequestPopUp onClose={() => setIsPopUpOpen(false)} />
          )}


        </div>
        <main className="flex-1 overflow-y-auto py-6 px-6 sm:px-30 md:px-28 xl:px-52 bg-background">
          {children}
        </main>


      </div>

    </div>
  );
}

export default DashboardLayout;
