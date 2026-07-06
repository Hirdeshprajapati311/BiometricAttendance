"use client"
import { RxAvatar } from 'react-icons/rx';
import { FaCircleCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { LeaveData } from './EmployeeLeaveRequest';

const LeaveReqDetails = ({ userData }: { userData: LeaveData }) => {
  const user = useSelector((state: any) => state.auth.user)
  if (!user) {
    return null;
  }



  return (
    <div className='w-full bg-white font-lexend text-sm shadow-lg rounded-lg'>

      {/* Details Head */}
      <div className='px-6 pt-6 rounded-lg   pb-2 flex flex-col bg-white w-full'>
        <div className='flex flex-row justify-between items-center'>

          <div className='flex flex-row items-center gap-2'>
            <RxAvatar size={60} />
            <div className='flex flex-col'>
              <span className='font-bold '>{userData?.employeeName}</span>
              <p>{userData?.designation}</p>
              <p>{userData?.empId}</p>

            </div>
          </div>

          <div className='flex flex-col '>
            <p className='font-extralight text-gray-400'>Submitted by:</p>
            <p className='font-light'>{userData?.createdAt ? new Date(userData?.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }) : "N/A"}</p>
          </div>
        </div>


      </div>


      {/* Seperator */}
      <div className='w-full px-6 flex items-center justify-center'>
        <div className='h-0.5 w-full bg-gray-200 ' />

      </div>



      {/* three cards */}
      <div className='flex flex-row items-center p-4 justify-around gap-2'>
        {/* Type of Leave card*/}
        <div className='flex flex-col p-4 w-1/3 rounded-lg bg-gray-100 '>
          <label className='text-gray-500' htmlFor="">Type of Leave</label>
          <span>{userData?.leaveType.charAt(0).toUpperCase() + userData?.leaveType.slice(1)} Leave</span>
        </div>


        {/* Period Card */}
        <div className='flex flex-col p-4 w-1/3 rounded-lg bg-gray-100 '>
          <label className='text-gray-500' htmlFor="">Period</label>
          <span>{new Date(userData?.startDate).toLocaleString("en-IN", {
            day: "numeric",
            month: "short"
          })} - {new Date(userData?.endDate).toLocaleString("en-IN", {
            day: "numeric",
            month: "short"
          })}</span>
        </div>


        {/* Duration Card */}
        <div className='flex flex-col p-4 w-1/3 rounded-lg bg-gray-100 '>
          <label className='text-gray-500' htmlFor="">Total Duration</label>
          <span>{userData?.totalDays} Days</span>
        </div>
      </div>


      {/* Reason for Leave */}

      <div className='flex flex-col px-6 py-4 bg-background'>
        <span className='text-black'>Reason for Leave</span>
        <p className='text-gray-500'>{userData?.reason}</p>

        <div className='w-full mt-4 flex items-center justify-center'>
          <div className='h-0.5 w-full bg-gray-200 ' />

        </div>

      </div>

      {/* Activity & Notes */}
      <div className='px-6 py-4 pb-6 gap-4 w-full flex flex-col'>
        <span>Activity & Notes</span>



        <div className='flex flex-row gap-3'>
          <div className='flex flex-col items-center mt-1 gap-0.5'>
            {userData?.createdAt && (<div className='text-primary'><FaCircleCheck size={12} /></div>)}
            {/* <div className='w-0.5 h-6 bg-gray-300' />
            <div className='text-gray-400'><FaArrowRight size={10} /></div> */}
            {userData?.status === "approved" && (
              <>
                <div className='w-0.5 h-10 bg-gray-300' />
                <div className='w-3 h-3 border border-gray-400 rounded-full'></div>
              </>
            )}
          </div>



          <div className='flex flex-col '>
            {userData?.createdAt && (<div className='flex flex-col'>
              <span className=''>Submitted</span>
              <p className='text-xs text-gray-500'>Sub, {new Date(userData?.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }).replace("am", "AM")
                .replace("pm", "PM")}</p>
            </div>)}

            {/* <div className='mt-1'>HR Review</div> */}
            {userData?.status === "approved" && (
              <div className='mt-4'>Manager Approval Pending</div>

            )}
          </div>

        </div>










        {user.role === "admin" && userData.status === "pending" && (
          <>
            <input type="text" className='text-gray-500 rounded-lg bg-gray-100 border border-gray-300 p-3 w-full' placeholder='Comments...' />



            <div className='flex flex-row w-full justify-between items-center gap-4'>
              <button className='bg-gray-400 rounded-lg p-2 w-1/2 items-center justify-center text-white'>Reject</button>
              <button className='p-2 rounded-lg bg-primary  w-1/2 items-center justify-center text-white'>Approve Leave</button>

            </div>
          </>
        )}

        {user.role === "admin" && userData.status === "approved" && (

          <div className='text-green-500 rounded-lg bg-green-100 border border-green-300 p-3 w-full' >
            Approved
          </div>
        )}

        {user.role === "admin" && userData.status === "withdrawn" && (

          <div className='text-blue-500 rounded-lg bg-blue-100 border border-blue-300 p-3 w-full' >
            Withdrawn by employee
          </div>
        )}

        {user.role === "admin" && userData.status === "rejected" && (

          <div className='text-red-500 rounded-lg bg-red-100 border border-red-300 p-3 w-full' >
            rejected
          </div>
        )}

        {user.role === "employee" && (
          <div className='px-6 flex w-full flex-row justify-end py-4'>
            {userData?.status === "pending" && (
              <button className="p-2 cursor-pointer rounded-lg text-primary border border-primary bg-blue-100">Withdraw Request</button>
            )}

          </div>
        )}




      </div>







    </div>

  );
}

export default LeaveReqDetails;
