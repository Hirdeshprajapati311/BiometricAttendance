

"use client"
import { Calendar } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaSliders } from "react-icons/fa6"

const ITEMS_PER_PAGE = 8

const mockData = [
  { empId: "EMP-12", empName: "Hirdesh Prajapati", date: '29 July 2023', day: 'Monday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 2m', status: 'Work from office' },
  { empId: "EMP-14", empName: "Syarn Prajapati", date: '29 July 2023', day: 'Saturday', checkIn: '00:00', checkOut: '00:00', workHours: '0m', status: 'Absent' },
  { empId: "EMP-52", empName: "Avnath Prajapati", date: '29 July 2023', day: 'Saturday', checkIn: '10:30', checkOut: '18:00', workHours: '8h 30m', status: 'Late arrival' },
  { empId: "EMP-11", empName: "Rajesh Prajapati", date: '29 July 2023', day: 'Thursday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 5m', status: 'Work from home' },
  { empId: "EMP-17", empName: "Sneha Prajapati", date: '29 July 2023', day: 'Saturday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 2m', status: 'Work from office' },
  { empId: "EMP-19", empName: "Raju Zore", date: '29 July 2023', day: 'Saturday', checkIn: '9:00', checkOut: '18:00', workHours: '10h 12m', status: 'Work from office' },
  { empId: "EMP-29", empName: "Nitin Sutar", date: '29 July 2023', day: 'Monday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 2m', status: 'Work from office' },
  { empId: "EMP-24", empName: "Nilesh Verma", date: '29 July 2023', day: 'Friday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 2m', status: 'Present' },
  { empId: "EMP-47", empName: "Ashwini Zore", date: '29 July 2023', day: 'Wednesday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 2m', status: 'Work from office' },
  { empId: "EMP-33", empName: "Avinya Prajapati", date: '29 July 2023', day: 'Tuesday', checkIn: '09:00', checkOut: '18:00', workHours: '10h 2m', status: 'Late arrival' },
]

const statusStyles: Record<string, string> = {
  'Work from office': 'bg-gray-100 text-gray-500',
  'Absent': 'bg-red-100 text-red-500',
  'Late arrival': 'bg-yellow-100 text-yellow-600',
  'Work from home': 'bg-gray-100 text-gray-400',
}

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2 py-1 rounded-md text-[10px] w-fit ${statusStyles[status] ?? 'bg-gray-100 text-gray-500'}`}>
    {status}
  </span>
)

const AttendanceOverAdmin = () => {

  const [active, setActive] = useState("All")
  const filter = ["All", "Present", "Half Day", "Absent"]


  const dateRef = useRef<HTMLInputElement>(null)

  const [selectedDate, setSelectedDate] = useState("");
  const [todayDisplay, setTodayDisplay] = useState("")

  const [page, setPage] = useState(1)
  const totalPages = 100


  const column = ["EMP-ID", "Name", "Date", "Day", "Check-in", "Check-out", "Work hours", "Status"]



  useEffect(() => {

    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]
    const formattedDisplay = today.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric"
    })

    setSelectedDate(formattedDate)
    setTodayDisplay(formattedDisplay)
  }, [])

  return (
    <div className='px-4 pt-8 pb-2 bg-white font-lexend w-full rounded-lg'>

      {/* Upper section for List */}
      <div className='flex flex-row items-center justify-between'>


        <span className='font-light text-gray-600'>Attendance Overview</span>


        <div className='flex flex-row gap-4'>

          {/* Filters */}
          <div className="flex items-center gap-3">
            {filter.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`flex items-center gap-1.5  text-xs sm:text-sm  cursor-pointer`}
              >
                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${active === f ? "border-primary" : "border-gray-400"}`}>
                  {active === f && (<div className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </div>
                <span className={active === f ? "text-primary font-medium" : "text-gray-400"}>
                  {f}
                </span>

              </button>
            ))}
          </div>

          <div className='rounded-lg px-2 bg-gray-200 text-sm text-gray-400 flex gap-2 flex-row items-center justify-center'>
            <input
              ref={dateRef} type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='w-0 opacity-0 absolute' /><Calendar size={14} className='cursor-pointer text-primary' onClick={() => dateRef.current?.showPicker()} />&nbsp;{todayDisplay}</div>

          <button className='p-2 rounded-lg bg-primary text-white font-light text-sm flex flex-row items-center justify-center'><FaSliders />&nbsp; View Attendance</button>
        </div>
      </div>

      <div className='w-full h-0.5 bg-gray-200 mt-4 rounded-lg'></div>

      {/* Header for list*/}
      <div className='grid grid-cols-8 text-gray-400 text-xs px-4 py-2 mt-2'>
        {column.map(col => <span key={col}>{col}</span>)}
      </div>

      <div className='w-full h-0.5 bg-gray-200 mt-2 rounded-lg'></div>


      {/* Rows */}
      {mockData.map((row, i) => (
        <div key={i} className='grid grid-cols-8 px-4 py-3 border-b text-xs border-gray-100 hover:bg:gray-50 items-center'>
          <span className='text-gray-500'>{row.empId}</span>
          <span className='text-gray-500'>{row.empName.split(" ")[0]}</span>
          <span className='text-gray-500'>{row.date}</span>
          <span className='text-blue-500'>{row.day}</span>
          <span className='text-blue-600 font-medium'>{row.checkIn}</span>

          <span className='text-blue-600 font-medium'>{row.checkOut}</span>
          <span className='font-medium'>{row.workHours}</span>

          <StatusBadge status={row.status} />


        </div>
      ))}




      {/* footer Paginator */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
        <span>Page {page} of {totalPages}</span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
          >
            ‹
          </button>

          {/* page number pills */}
          {[...Array(totalPages)].slice(page - 1, page + 2).map((_, i) => {
            const p = page - 1 + i + 1
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded-md border text-sm ${p === page ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                {p}
              </button>
            )
          })}

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
          >
            ›
          </button>
        </div>
      </div>

    </div>
  );
}

export default AttendanceOverAdmin;
