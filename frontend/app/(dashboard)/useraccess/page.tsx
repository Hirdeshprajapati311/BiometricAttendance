"use client";
import EmpAccCard from '@/components/cards/EmpAccCard';
import CreateAccount from '@/app/(dashboard)/useraccess/_components/CreateAccount';
import { useGetAllEmployees } from '@/hooks/useGetAllEMPs';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';


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
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

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

  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];

    if (!debouncedSearchTerm.trim()) return data.users;

    const searchLower = debouncedSearchTerm.toLowerCase().trim();
    return data.users.filter((user: User) => {
      return (
        user.name?.toLowerCase().includes(searchLower) || user.email?.toLowerCase().includes(searchLower) || user.department?.toLowerCase().includes(searchLower) || user.designation?.toLowerCase().includes(searchLower) || user.role?.toLowerCase().includes(searchLower)
      );
    });
  }, [data?.users, debouncedSearchTerm])


  if (isLoading) return <p>Loading...</p>;
  return (
    <div className='flex flex-row w-full h-[calc(100vh-100px)] gap-6'>

      {/* Leave Applications */}
      <div className='p-6 w-72 rounded-lg border-2 bg-primary/10 border-primary/40 flex flex-col gap-4 max-w-sm md:w-full'>

        <span className='font-lexend font-semibold  text-lg'>Accounts</span>




        {/* Search */}
        <div className='gap-2 px-3 py-2 text-gray-400 border border-gray-300 bg-white rounded-lg flex flex-row'>
          <Search />
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm} type="text" className='border-none placeholder:text-gray-400 w-full outline-none' placeholder='Search...'
            autoFocus
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")}
              type='button'
              className='text-gray-400 hover:text-gray600 transition-colors'
            >
              <X size={16} />
            </button>
          )}
        </div>


        <div className="text-xs text-gray-500">
          {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
        </div>

        {/* Card */}
        <div
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
          className='flex-1 overflow-y-auto space-y-3 custom-scrollbar scrollbar-hide'>




          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: User) => (
              <EmpAccCard key={user._id} user={user} isSelected={selectedUser?._id === user._id} onSelect={handleSelectUser} />
            ))
          ) : (<div className="text-center text-gray-500 py-8">
            <p>No users found</p>
            <p className="text-xs mt-1">Try adjusting your search</p>
          </div>)}

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
