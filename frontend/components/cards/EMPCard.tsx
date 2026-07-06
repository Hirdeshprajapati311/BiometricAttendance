"use client"
import { RxAvatar } from 'react-icons/rx';
import { IoIosWarning } from "react-icons/io";
import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { useGetMyLeaves } from '@/hooks/useGetMyLeave';
import { FcApproval } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { LeaveData } from '../EmployeeLeaveRequest';


interface LeaveEMP {
  leave: LeaveData;
  selectedEmp: string
  setSelectedEmp: Dispatch<SetStateAction<string>>
}



const EMPCard = ({ selectedEmp, leave, setSelectedEmp }: LeaveEMP) => {
  const user = useSelector((state: any) => state.auth.user)






  if (!user) {
    return null;
  }
  return (
    <div className='p-4 gap-2 font-lexend text-xs bg-white rounded-lg flex flex-col border border-gray-200'>


      <div className='flex flex-row items-center justify-between'>
        <div className='flex items-center  flex-row gap-2'>
          <RxAvatar size={35} />
          <div className='flex flex-col'>
            <span>{leave?.employeeName}</span>
            <p className='text-gray-600'>{leave?.empId}</p>
          </div>
        </div>

        <input name='leave' checked={selectedEmp === leave?._id} value={leave?._id} onChange={() => setSelectedEmp(leave?._id)} className='h-6 w-6 cursor-pointer' type='radio'></input>

      </div>

      {user.role === "admin" && (
        <div className='flex flex-row gap-2'>
          <label className='text-gray-600' htmlFor="leaveType">Leave Type:</label>
          <span className='text-gray-700'>{leave?.leaveType} Leave</span>
        </div>
      )}

      <div className='flex flex-row gap-1'>
        <p>{new Date(leave?.startDate).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric"
        })}</p>
        <p>-</p>
        <p>{new Date(leave?.endDate).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric"
        })}</p>
        <p>({leave?.totalDays} days)</p>
      </div>

      <div className='flex flex-row gap-2 items-center '>
        <span className='text-gray-600'>Status</span>
        <div className='flex flex-row items-center gap-1'>
          <div className='h-1.5 w-1.5 rounded-full bg-yellow-500' />
          <div>{leave?.status}</div>
        </div>
      </div>

      {user.role === "admin" && (
        <div className='flex flex-row '>
          <label className='text-gray-600' htmlFor="">Snippet:&nbsp;</label>
          <p className='text-gray-600 truncate'>{leave.reason}</p>

        </div>
      )}


      {user.role === "employee" && (
        <>
          {leave?.status === "pending" && (<div className='flex flex-row gap-2 bg-amber-100 items-center border border-amber-500 rounded-lg px-3 p-1'>
            <div className='text-amber-500'><IoIosWarning size={15} /></div>
            Awaiting Approval
          </div>)}
          {leave?.status === "rejected" && (<div className='flex flex-row gap-2 bg-red-100 items-center border border-red-500 rounded-lg px-3 p-1'>
            <div className='text-red-500'><FcDisapprove size={15} /></div>
            Rejected
          </div>)}
          {leave?.status === "withdrawn" && (<div className='flex flex-row gap-2 bg-blue-100 items-center border border-blue-500 rounded-lg px-3 p-1'>
            Withdrawn
          </div>)}

          {leave?.status === "approved" && (<div className='flex flex-row gap-2 bg-green-100 items-center border border-green-500 rounded-lg px-3 p-1'>
            <div className='text-green-500'><FcApproval size={15} /></div>
            Approved
          </div>)}
        </>
      )}




    </div>

  );
}

export default EMPCard;
