import { RxAvatar } from 'react-icons/rx';
import { IoIosWarning } from "react-icons/io";
import { role } from '@/app/(dashboard)/page';

const EmpAccCard = () => {
  return (
    <div className='p-4 gap-2 font-lexend text-xs bg-white rounded-lg flex flex-col border border-gray-200'>


      <div className='flex items-center  flex-row gap-2'>
        <RxAvatar size={35} />
        <div className='flex flex-col'>
          <span>HR Employee</span>
          <p className='text-gray-600'>Rohan Gupta</p>
        </div>
      </div>


      <div className='flex flex-row bg-blue-200 rounded-lg w-fit p-1 px-2 gap-2'>
        <label className='text-gray-600' htmlFor="leaveType">Department:</label>
        <span className='text-gray-700'>IT</span>
      </div>


      <div className='flex flex-row gap-2 bg-gray-200 rounded-lg w-fit p-1 px-2'>
        <label className='text-gray-600' htmlFor="leaveType">Designation: HR</label>
        <span className='text-gray-700'>IT</span>
      </div>

    </div>
  );
}

export default EmpAccCard;
