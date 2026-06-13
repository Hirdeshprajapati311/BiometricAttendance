"use client"
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {


  const pathname = usePathname();
  const activeItem = navItems.find(item => item.path === pathname);


  const currentPageName = activeItem?.name;

  return (
    <div className="flex h-screen w-screen">


      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex items-center   md:pl-52 pt-4 md:pt-6 gap-1 pl-6
        ">
          {currentPageName} <Image src="/triangle.png" alt="Triangle" width={11} height={11} />
        </div>
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </main>


      </div>

    </div>
  );
}

export default DashboardLayout;
