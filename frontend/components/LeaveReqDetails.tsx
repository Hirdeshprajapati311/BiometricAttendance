"use client"
import { RxAvatar } from 'react-icons/rx';
import { FaCircleCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { LeaveData } from './EmployeeLeaveRequest';
import { useGetApproval } from '@/hooks/useGetApproval';
import { ChangeEvent, useState } from 'react';
import { FcApproval, FcDisapprove } from 'react-icons/fc';
import { useUpdateWithdraw } from '@/hooks/useUpdateWithdraw';
import { IoArrowBack } from 'react-icons/io5';
import { ImWarning } from 'react-icons/im';

const LeaveReqDetails = ({ userData }: { userData: LeaveData }) => {
  const user = useSelector((state: any) => state.auth.user)
  if (!user) {
    return null;
  }

  const [comment, setComment] = useState("")


  const { mutate, isPending } = useGetApproval()
  const { mutate: withdrawReq } = useUpdateWithdraw()
  const [confirmWithdraw, setConfirmWithdraw] = useState(false)

  const handleApproval = (status: "approved" | "rejected") => {
    mutate({
      id: userData._id,
      status,
      comment
    })
    setComment("")

  }

  const handleWithdraw = () => {
    withdrawReq({
      id: userData._id
    })
  }


  return (
    <div className='w-full bg-white font-lexend text-sm shadow-lg rounded-lg'>

      {confirmWithdraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl p-6">

            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.17 19h17.66a1 1 0 00.88-1.5l-8-14a1 1 0 00-1.74 0z"
                  />
                </svg>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Withdraw Leave Request?
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to withdraw this leave request?
                This action cannot be undone without submitting a new request.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmWithdraw(false)}
                className="flex-1 cursor-pointer rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleWithdraw();
                  setConfirmWithdraw(false);
                }}
                className="flex-1 cursor-pointer rounded-lg bg-red-600 py-2.5 font-medium text-white transition hover:bg-red-700"
              >
                Withdraw
              </button>
            </div>

          </div>
        </div>
      )}

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
            {userData?.status === "pending" ? (
              <>
                <div className='w-0.5 h-10 bg-gray-300' />
                <div className='w-3 h-3 border border-gray-400 rounded-full'></div>
              </>
            ) : userData?.status === "withdrawn" ? (<>
              <div className='w-0.5 h-10 bg-gray-300' />
              <div className='text-primary'><IoArrowBack size={14} /></div>
            </>) : userData?.status === "rejected" ? (<>
              <div className='w-0.5 h-10 bg-gray-300' />
              <div className='text-primary'><FcDisapprove size={14} /></div>
            </>) : userData?.status === "expired" ? (<>
              <div className='w-0.5 h-10 bg-gray-300' />
              <div className='text-primary'><ImWarning size={14} /></div>
            </>) : (
              <>
                <div className='w-0.5 h-10 bg-gray-300' />
                <div className='text-primary'><FcApproval size={14} /></div>
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
            {userData?.status === "pending" && (
              <div className='mt-4'>Waiting for Approval</div>
            )}
            {userData?.status === "approved" && (
              <div className='mt-4'> <span className=''>Approved</span>
                <p className='text-xs text-gray-500'>Sub, {new Date(userData?.updatedAt ? userData?.updatedAt : "--").toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).replace("am", "AM").replace("pm", "PM")}
                </p>
              </div>
            )}

            {userData?.status === "rejected" && (
              <div className='mt-4'> <span className=''>Rejected</span>
                <p className='text-xs text-gray-500'>Sub, {new Date(userData?.updatedAt ? userData?.updatedAt : "--").toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).replace("am", "AM").replace("pm", "PM")}
                </p>
              </div>
            )}
            {userData?.status === "withdrawn" && (
              <div className='mt-4'> <span className=''>Withdrawn At</span>
                <p className='text-xs text-gray-500'>Sub, {new Date(userData?.updatedAt ? userData?.updatedAt : "--").toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).replace("am", "AM").replace("pm", "PM")}
                </p>
              </div>
            )}
          </div>

        </div>










        {user.role === "admin" && userData.status === "pending" && (
          <>
            <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className='text-gray-500 rounded-lg bg-gray-100 border border-gray-300 p-3 w-full' placeholder='Comments...' />



            <div className='flex flex-row w-full justify-between items-center gap-4'>
              <button onClick={() => handleApproval("rejected")} className='bg-gray-400 rounded-lg p-2 w-1/2 items-center justify-center text-white'>Reject</button>
              <button onClick={() => handleApproval("approved")} className='p-2 rounded-lg bg-primary  w-1/2 items-center justify-center text-white'>Approve Leave</button>

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

        {user.role === "admin" && userData.status === "expired" && (

          <div className='text-amber-500 rounded-lg bg-amber-100 border border-amber-300 p-3 w-full' >
            expired
          </div>
        )}

        {user.role === "employee" && (
          <div className='px-6 flex w-full flex-row justify-end py-4'>
            {userData?.status === "pending" && (
              <button onClick={() => setConfirmWithdraw((prev) => !prev)} className="p-2 cursor-pointer rounded-lg text-primary border border-primary bg-blue-100">Withdraw Request</button>
            )}


            {userData?.status === "approved" && (
              <div className="p-2 w-full rounded-lg text-white border border-primary bg-blue-100">request approved</div>
            )}

            {userData?.status === "rejected" && (
              <div className="p-2 w-full rounded-lg text-white border border-red bg-red-300">request rejected
                <p>Reason: {userData?.adminComment ? userData?.adminComment : "N/A"}</p>
              </div>
            )}

            {userData?.status === "withdrawn" && (
              <div className="p-2 w-full rounded-lg text-primary border border-primary bg-blue-100">request withdrawn</div>
            )}

            {userData?.status === "expired" && (
              <div className="p-2 w-full rounded-lg text-white border border-amber-600 bg-amber-100">request expired reach admin</div>
            )}
          </div>
        )}




      </div>







    </div>

  );
}

export default LeaveReqDetails;
