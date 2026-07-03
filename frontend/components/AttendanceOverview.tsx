"use client"
import { useGetMyAttendance } from '@/hooks/useGetMyAttendance';
import { Calendar } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { FaSliders } from "react-icons/fa6"

const statusStyles: Record<string, string> = {
  'work_from_office': 'bg-gray-100 text-gray-500',
  'absent': 'bg-red-100 text-red-500',
  'late_arrival': 'bg-yellow-100 text-yellow-600',
  'work_from_home': 'bg-gray-100 text-gray-400',
  'present': 'bg-success/10 text-success',
  'half_day': 'bg-warning/10 text-warning',
}

const StatusBadge = ({ status }: { status: string }) => {
  console.log("Status:", JSON.stringify(status))
  console.log({
    status,
    style: statusStyles[status],
  });
  return (
    <span className={`px-2 py-1 rounded-md text-xs w-fit ${statusStyles[status] ?? 'bg-gray-100 text-gray-500'}`}>
      {status ? status.replace("_", "") : "---"}
    </span>
  )
}

const AttendanceOverview = () => {
  const filter = [{ label: "All", value: "all" }, { label: "Present", value: "present" }, { label: "Half Day", value: "half_day" }, { label: "Absent", value: "absent" }]
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [date, setDate] = useState("")


  const dateRef = useRef<HTMLInputElement>(null)

  const { data, isFetching } = useGetMyAttendance({
    page,
    status: activeFilter === "all" ? undefined : activeFilter,
    date,
  })

  const totalPages = data?.pagination?.totalPages || 1
  const totalRecords = data?.pagination?.total || 0



  const column = ["Date", "Day", "Check-in", "", "Check-out", "Work hours", "Status"]



  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPage(1); // Reset to first page when filter changes
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };



  return (
    <div className='px-4 pt-8 pb-2 h-[calc(100vh-100px)] bg-white font-lexend w-full rounded-lg shadow-sm'>

      {/* Upper section for List */}
      <div className='flex flex-row items-center justify-between flex-wrap gap-4'>
        <span className='font-light text-gray-600'>Attendance Overview</span>

        <div className='flex flex-row gap-4 flex-wrap'>
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            {filter.map((f) => (
              <button
                key={f.label}
                onClick={() => handleFilterChange(f.value)}
                className={`flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer transition-colors`}
              >
                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${activeFilter === f.value ? "border-primary" : "border-gray-400"}`}>
                  {activeFilter === f.value && (<div className="w-1.5 h-1.5 rounded-full bg-primary" />)}
                </div>
                <span className={activeFilter === f.value ? "text-primary font-medium" : "text-gray-400"}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>


          <button onClick={() => {
            if (date) {
              setDate("")
            } else if (activeFilter) {
              setActiveFilter("all")

            }
          }} className='rounded-lg text-gray-400 cursor-pointer bg-gray-200 text-sm px-2 p-1'>{date ? "Reset Date" : "Reset status"}</button>

          {/* Date Picker */}
          <div className='rounded-lg px-2 bg-gray-200 text-sm text-gray-400 flex gap-2 flex-row items-center justify-center'>
            <input
              ref={dateRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='w-0 opacity-0 absolute'
            />
            <Calendar
              size={14}
              className='cursor-pointer text-primary'
              onClick={() => dateRef.current?.showPicker()}
            />
            &nbsp;{date ? new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }) : "Select the date"}
          </div>

          <button className='p-2 rounded-lg bg-primary text-white font-light text-sm flex flex-row items-center justify-center hover:bg-primary-dark transition-colors'>
            <FaSliders />&nbsp; View Attendance
          </button>
        </div>
      </div>

      <div className='w-full h-0.5 bg-gray-200 mt-4 rounded-lg'></div>

      {/* Header for list */}
      <div className='grid grid-cols-7 text-gray-400 text-xs px-4 py-2 mt-2'>
        {column.map((col, index) => (
          <span key={index} className={col === "" ? "hidden md:block" : ""}>
            {col}
          </span>
        ))}
      </div>

      <div className='w-full h-0.5 bg-gray-200 mt-2 rounded-lg'></div>

      {/*  Loading State */}
      {isFetching && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Rows */}
      {!isFetching && data?.attendance?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No attendance records found
        </div>
      )}

      {!isFetching && data?.attendance?.map((row) => (
        <div key={row._id} className='grid grid-cols-7 px-4 py-3 border-b text-xs border-gray-100 hover:bg-gray-50 items-center'>
          <span className='text-gray-500'>
            {row.date ? new Date(row.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit"
            }) : "---"}
          </span>
          <span className='text-blue-500'>{row.day}</span>
          <span className='text-blue-600 font-medium'>
            {row.checkIn ? new Date(row.checkIn).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }) : "---"}
          </span>
          <div className='flex items-center'>
            <div className='w-16 border-t-3 border-dashed border-gray-300'></div>
          </div>
          <span className='text-blue-600 font-medium'>
            {row.checkOut ? new Date(row.checkOut).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }) : "---"}
          </span>
          <span className='font-medium'>{row.workHours || "---"}</span>
          <StatusBadge status={row.status} />
        </div>
      ))}

      {/* Footer Paginator */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm text-gray-500 flex-wrap gap-2">
          <span>
            Page {page} of {totalPages}
            {totalRecords > 0 && ` (${totalRecords} total records)`}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isFetching}
              className="px-3 py-1 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ‹
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, index) => (
              p === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-gray-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p as number)}
                  disabled={isFetching}
                  className={`px-3 py-1 rounded-md border text-sm transition-colors ${p === page
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {p}
                </button>
              )
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || isFetching}
              className="px-3 py-1 rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendanceOverview;