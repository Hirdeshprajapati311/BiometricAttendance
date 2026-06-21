"use client";
import EmpAccCard from '@/components/cards/EmpAccCard';
import CreateAccount from '@/components/CreateAccount';
import { Search } from 'lucide-react';
import { useState } from 'react';

const page = () => {
  const [filter, setFilter] = useState("All")
  const filters = ["All", "Pending", "Approved", "Rejected"]

  return (
    <div className='flex flex-row w-full h-[calc(100vh-100px)] gap-6'>

      {/* Leave Applications */}
      <div className='p-6 w-72 rounded-lg border-2 bg-primary/10 border-primary/40 flex flex-col gap-4 max-w-sm md:w-full'>

        <span className='font-lexend font-semibold  text-lg'>Accounts</span>


        {/* Tab Filters */}
        <div className='flex flex-row w-full items-center justify-between'>

          {filters.map((f, i) => (<button key={i} className={`p-1 px-3 text-sm rounded-xl cursor-pointer font-lexend ${filter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}>
            {f}
          </button>))}
        </div>

        {/* Search */}
        <div className='gap-2 px-3 py-2 text-gray-400 border border-gray-300 bg-white rounded-lg flex flex-row'>
          <Search />
          <input type="text" className='border-none placeholder:text-gray-400 w-full outline-none' placeholder='Search...' />
        </div>

        {/* Card */}
        <div
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
          className='flex-1 overflow-y-auto space-y-3 custom-scrollbar scrollbar-hide'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <EmpAccCard />
            </div>
          ))}
        </div>

        <button className='flex items-center justify-center w-full bg-primary text-white rounded-lg font-lexend py-2 cursor-pointer'>Create New</button>


      </div>


      {/* Leave req details */}
      <div className='w-full'>
        <CreateAccount />


      </div>

    </div>
  );
}

export default page;
