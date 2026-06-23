"use client"
import { RxAvatar } from 'react-icons/rx';
import { IoIosWarning } from "react-icons/io";
import { useSelector } from 'react-redux';

const EMPCard = () => {
  const user = useSelector((state: any) => state.auth.user)

  if (!user) {
    return null;
  }
  return (
    <div className='p-4 gap-2 font-lexend text-xs bg-white rounded-lg flex flex-col border border-gray-200'>


      <div className='flex items-center  flex-row gap-2'>
        <RxAvatar size={35} />
        <div className='flex flex-col'>
          <span>Priya Patel</span>
          <p className='text-gray-600'>Emp-1102</p>
        </div>
      </div>

      {user.role === "admin" && (
        <div className='flex flex-row gap-2'>
          <label className='text-gray-600' htmlFor="leaveType">Leave Type:</label>
          <span className='text-gray-700'>Casual Leave</span>
        </div>
      )}

      <div className='flex flex-row gap-1'>
        <p>Nov 20</p>
        <p>- Nov 21</p>
        <p>(2 days)</p>
      </div>

      <div className='flex flex-row gap-2 items-center '>
        <span className='text-gray-600'>Status</span>
        <div className='flex flex-row items-center gap-1'>
          <div className='h-1.5 w-1.5 rounded-full bg-yellow-500' />
          <div>Sick</div>
        </div>
      </div>

      {user.role === "admin" && (
        <div className='flex flex-row '>
          <label className='text-gray-600' htmlFor="">Snippet:</label>
          <p className='text-gray-600 truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, commodi. Alias pariatur ratione magni, est facere doloribus asperiores mollitia molestias, totam nulla et.</p>

        </div>
      )}


      {user.role === "employee" && (
        <div className='flex flex-row gap-2 bg-amber-100 items-center border border-amber-500 rounded-lg px-3 p-1'>
          <div className='text-amber-500'><IoIosWarning size={15} /></div>
          Awaiting Approval
        </div>
      )}


    </div>
  );
}

export default EMPCard;
