"use client"
import { RxAvatar } from 'react-icons/rx';


type EmpProps = { name: string, designation: string, department: string, avatar: string, role: string }

const EmpAccCard = ({ name, designation, department, avatar, role }: EmpProps) => {


  return (
    <div className='p-4 gap-2 font-lexend text-xs bg-white rounded-lg flex flex-col border border-gray-200'>


      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center  flex-row gap-2'>
          <RxAvatar size={35} />
          <div className='flex flex-col'>
            <span>{department}</span>
            <p className='text-gray-600'>{name}</p>
          </div>
        </div>
        <input className='h-6 w-6 cursor-pointer' type='radio'></input>
      </div>


      <div className='flex flex-row bg-blue-200 rounded-lg w-fit p-1 px-2 gap-2'>
        <label className='text-gray-600' htmlFor="leaveType">Department:</label>
        <span className='text-gray-700'>{department}</span>
      </div>


      <div className='flex flex-row gap-2 bg-gray-200 rounded-lg w-fit p-1 px-2'>
        <label className='text-gray-600' htmlFor="leaveType">Designation:</label>
        <span className='text-gray-700'>{designation}</span>
      </div>

    </div>
  );
}

export default EmpAccCard;
