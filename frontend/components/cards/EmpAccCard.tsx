"use client"
import { RxAvatar } from 'react-icons/rx';


type EmpProps = {
  user: { name: string, designation: string, department: string, avatar: string, role: string };
  isSelected: boolean;
  onSelect: (user: any) => void
}

const EmpAccCard = ({ user, isSelected, onSelect }: EmpProps) => {

  const { name, designation, avatar, role, department } = user


  return (
    <div className={`p-4 gap-2 font-lexend text-xs  rounded-lg flex flex-col border ${isSelected ? "border-primary border-2  bg-gray-50" : "border-gray-200 bg-white"}`} onClick={() => onSelect(user)}>


      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center  flex-row gap-2'>
          {avatar !== null ? (<div></div>) : (
            <RxAvatar size={35} />
          )}
          <div className='flex flex-col'>
            <span>{department}&nbsp;|&nbsp;{designation}</span>
            <p className='text-gray-600'>{name}</p>
          </div>
        </div>
        <input
          checked={isSelected}
          onChange={() => onSelect(user)}
          onClick={(e) => e.stopPropagation()}
          className='h-6 w-6 cursor-pointer' type='radio'></input>
      </div>


      <div className={`flex flex-row  rounded-lg w-fit p-1 px-2 gap-2 ${role === "admin" ? "bg-amber-200" : "bg-green-200"}`}>
        <label className='text-gray-600' htmlFor="leaveType">Role:</label>
        <span className='text-gray-700'>{role}</span>
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
