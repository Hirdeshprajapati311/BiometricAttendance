"use client"
import { RxDashboard } from "react-icons/rx";
import { MessageSquareText } from 'lucide-react';
import { ImHistory } from "react-icons/im";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navItems = [
  { name: "Dashboard", icon: <RxDashboard size={22} />, path: "/" },
  { name: "Messages", icon: <MessageSquareText size={22} />, path: "/messages" },
  { name: "History", icon: <ImHistory size={22} />, path: "/history" }
]

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-t-2xl border-t border-gray-200">
          <div className="flex items-center justify-around py-2 px-4">
            {navItems.map((item, index) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`relative group flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 ${active
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {active && (
                    <div className="absolute -top-2 w-8 h-1 bg-primary rounded-full" />
                  )}
                  <div className="transform transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className={`text-xs font-medium ${active ? "text-primary" : "text-gray-500"}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Vertical */}
      <div className={`
        hidden md:flex z-40 bg-white absolute top-20 rounded-2xl shadow-sm 
        flex-col transition-all duration-300 ease-in-out w-16
        h-48
      `}>
        <div className="flex flex-col items-center justify-around h-full">
          {navItems.map((item, index) => {
            const active = isActive(item.path);
            return (
              <Link
                key={index}
                href={item.path}
                className={`relative group flex py-1.5 cursor-pointer w-full items-center justify-center ${active ? "text-primary" : "text-gray-500"
                  }`}
              >
                {active && (
                  <div className="absolute -left-1 w-2.5 md:w-3 h-6 md:h-10 bg-primary rounded-r-md md:rounded-r-lg" />
                )}
                <div className="ml-1">
                  {item.icon}
                </div>
                {/* Tooltip for desktop */}
                <div className="absolute left-full ml-2 px-2 py-1 rounded-md text-sm bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;