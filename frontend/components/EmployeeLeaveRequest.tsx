"use client"
import React, { useState } from 'react';
import EMPCard from './cards/EMPCard';
import { Search } from 'lucide-react';
import LeaveReqDetails from './LeaveReqDetails';

const EmployeeLeaveRequest = () => {

  const [filter, setFilter] = useState("All")
  const filters = ["All", "Pending", "Approved", "Rejected"]

  return (
    <div className='flex flex-row w-full gap-6'>

      {/* Leave Applications */}
      <div className='p-6 w-72 rounded-lg border-2 bg-primary/10 border-primary/40 flex flex-col gap-4 max-w-sm md:w-full'>

        <span className='font-lexend'>My Leave Applications</span>


        {/* Tab Filters */}
        <div className='flex flex-row w-full items-center justify-between'>

          {filters.map((f, i) => (<button key={i} className={`p-1 px-3 text-sm rounded-xl cursor-pointer font-lexend ${filter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}>
            {f}
          </button>))}
        </div>

        {/* Search */}
        <div className='gap-2 px-3 py-2 text-gray-400 border border-gray-300 bg-white rounded-lg flex flex-row'>
          <Search />
          <input type="text" className='border-none placeholder:text-gray-400 outline-none' placeholder='Search...' />
        </div>

        <EMPCard />

        <EMPCard />
        <EMPCard />
        <EMPCard />


      </div>


      {/* Leave req details */}
      <div className='w-full'>
        <LeaveReqDetails />


      </div>

    </div>
  );
}

export default EmployeeLeaveRequest;
