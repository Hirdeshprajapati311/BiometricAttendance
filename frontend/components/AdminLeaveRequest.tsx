"use client"
import { useMemo, useState } from 'react';
import EMPCard from './cards/EMPCard';
import LeaveReqDetails from './LeaveReqDetails';
import { Search, X } from 'lucide-react';
import { useGetLeaves } from '@/hooks/useGetLeaves';
import { LeaveData } from './EmployeeLeaveRequest';
import { useDebounce } from '@/hooks/useDebounce';

const AdminLeaveRequest = () => {


  const [search, setSearch] = useState("");
  const [filter, setFilters] = useState("all");
  const { data } = useGetLeaves({ filter, search });
  const [selectedEmp, setSelectedEmp] = useState("");

  const leaves: LeaveData[] = data?.leaves ?? []

  const selectedLeave = leaves?.find(
    (leaves) => leaves._id === selectedEmp
  );


  const filters = ["all", "pending", "approved", "rejected", "withdrawn"]

  const debounceSearch = useDebounce(search, 300)


  const filteredUsers = useMemo(() => {
    if (!leaves) return []

    if (!debounceSearch.trim()) return leaves;
    const searchLower = debounceSearch.toLowerCase().trim();
    return leaves.filter((leave) => {
      return (
        leave.employeeName?.toLocaleLowerCase().includes(searchLower) || leave.empId.toLocaleLowerCase().includes(searchLower)
      )
    })
  }, [leaves, debounceSearch])

  return (
    <div className='flex flex-row w-full h-[calc(100vh-140px)] gap-6'>

      {/* Leave Applications */}
      <div className='p-6 w-72 rounded-lg border-2 bg-primary/10 border-primary/40 flex flex-col gap-4 max-w-sm md:w-full'>

        <span className='font-lexend'>Leave Applications</span>


        {/* Tab Filters */}
        <div className='flex flex-row w-full items-center justify-between'>

          {filters.map((f, i) => (<button onClick={() => setFilters(f)} key={i} className={`p-1 px-3 text-sm rounded-xl cursor-pointer text-[10px] font-lexend ${filter === f ? "bg-primary text-white" : "bg-gray-100 text-gray-700 border border-gray-300"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>))}
        </div>

        {/* Search */}
        <div className='gap-2 px-3 py-2 text-gray-400 border border-gray-300 bg-white rounded-lg flex flex-row'>
          <Search />
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='border-none placeholder:text-gray-400 w-full outline-none' placeholder='Search...' />
          {search && (
            <button onClick={() => setSearch("")}
              type='button'
              className='text-gray-400 hover:text-gray600 transition-colors'
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="text-xs text-gray-500">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'leave' : 'leaves'} found
        </div>

        <div
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
          className='flex-1 overflow-y-auto space-y-3 custom-scrollbar scrollbar-hide'>

          <div className="overflow-y-auto custom-scrollbar flex flex-col gap-2">
            {leaves.length > 0 ? (
              filteredUsers.map((leave) => (
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

export default AdminLeaveRequest;
