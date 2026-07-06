"use client"
import React, { useState } from 'react';
import EMPCard from './cards/EMPCard';
import { Search, X } from 'lucide-react';
import LeaveReqDetails from './LeaveReqDetails';
import { useGetMyLeaves } from '@/hooks/useGetMyLeave';
import { useSelector } from 'react-redux';


export interface Activity {
  label: string;
  timestamp: string;
  completed: boolean
}


export interface LeaveData {
  _id: string;
  employeeId: string;
  empId: string;
  employeeName: string;
  designation: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: string;
  reason: string;
  status: string;
  createdAt?: string;
  activity?: Activity[];


}

const EmployeeLeaveRequest = () => {

  const [filter, setFilter] = useState("all")
  const filters = ["all", "pending", "approved", "rejected", "withdrawn"]
  const { data } = useGetMyLeaves({ filter })
  const leaves: LeaveData[] = data?.leaves ?? []

  const user = useSelector((state: any) => state.auth.user)
  if (!user) {
    return null;
  }

  const [selectedEmp, setSelectedEmp] = useState("")

  const selectedLeave = leaves?.find(
    (leave) => leave._id === selectedEmp
  );

  console.log(filter)

  return (
    <div className='flex h-[calc(100vh-140px)]  flex-row w-full gap-6'>

      {/* Leave Applications */}
      <div className='p-6 w-72  rounded-lg border-2 bg-primary/10 border-primary/40 flex flex-col justify-between max-w-sm md:w-full'>

        <div className='flex flex-col gap-4 '>
          <span className='font-lexend'>My Leave Applications</span>


          {/* Tab Filters */}
          <div className='flex flex-row w-full items-center justify-between'>

            {filters.map((f, i) => (<button onClick={() => setFilter(f)} key={i} className={`p-1 px-3 text-[10px] rounded-xl cursor-pointer font-lexend ${filter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>))}
          </div>



          <div className='overflow-y-auto custom-scrollbar flex flex-col gap-2' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

            <div className="overflow-y-auto custom-scrollbar flex flex-col gap-2">
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <EMPCard
                    key={leave._id}
                    leave={leave}
                    selectedEmp={selectedEmp}
                    setSelectedEmp={setSelectedEmp}
                  />
                ))
              ) : (
                <div className="py-10 text-center text-gray-500">
                  No {filter === "all" ? "" : filter} leave requests found.
                </div>
              )}
            </div>



          </div>
        </div>

        {user.role === "employee" && (
          <button className='w-full py-3  font-lexend bg-primary text-white rounded-lg'>Create Leave Request</button>
        )}





      </div>


      {/* Leave req details */}
      <div className="w-full">
        {selectedLeave ? (
          <LeaveReqDetails userData={selectedLeave} />
        ) : (
          <div className="h-full flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                No leave request selected
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Select a leave request from the list to view its details.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default EmployeeLeaveRequest;
