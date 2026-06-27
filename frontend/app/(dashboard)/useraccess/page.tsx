"use client";
import EmpAccCard from '@/components/cards/EmpAccCard';
import CreateAccount from '@/app/(dashboard)/useraccess/_components/CreateAccount';
import { useGetAllEmployees } from '@/hooks/useGetAllEMPs';
import { Search } from 'lucide-react';
import { useState } from 'react';


interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  designation: string;
  department: string;
  role: string;
  avatar?: string;
}

const page = () => {

  const { data, isLoading, error, refetch } = useGetAllEmployees()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isCreating, setIsCreating] = useState(false);


  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsCreating(false);
  }

  const handleCreateNew = () => {
    setSelectedUser(null);
    setIsCreating(true);
  }

  const handleCancel = () => {
    setSelectedUser(null);
    setIsCreating(false);
  }

  const handleSuccess = () => {
    setSelectedUser(null);
    setIsCreating(false)
    refetch()
  }


  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='flex flex-row w-full h-[calc(100vh-100px)] gap-6'>

      {/* Leave Applications */}
      <div className='p-6 w-72 rounded-lg border-2 bg-primary/10 border-primary/40 flex flex-col gap-4 max-w-sm md:w-full'>

        <span className='font-lexend font-semibold  text-lg'>Accounts</span>




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

          {data?.users.map((user) => (
            <EmpAccCard key={user._id} user={user} isSelected={selectedUser?._id === user._id} onSelect={handleSelectUser} />
          ))}

        </div>

        <button disabled={isCreating} onClick={handleCreateNew} className={`flex items-center justify-center w-full  text-white rounded-lg font-lexend py-2 cursor-pointer ${isCreating ? "bg-gray-400" : "bg-primary"}`}>Create New</button>


      </div>


      {/* Leave req details */}
      <div className='w-full'>
        <CreateAccount
          selectedUser={selectedUser}
          isCreating={isCreating}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />


      </div>

    </div>
  );
}

export default page;
