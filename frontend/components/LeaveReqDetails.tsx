import { RxAvatar } from 'react-icons/rx';
import { FaCircleCheck } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { role } from '@/app/(dashboard)/page';

const LeaveReqDetails = () => {
  return (
    <div className='w-full bg-white font-lexend text-sm shadow-lg rounded-lg'>

      {/* Details Head */}
      <div className='px-6 pt-6 rounded-lg   pb-2 flex flex-col bg-white w-full'>
        <div className='flex flex-row justify-between items-center'>

          <div className='flex flex-row items-center gap-2'>
            <RxAvatar size={60} />
            <div className='flex flex-col'>
              <span className='font-bold '>Priya Patel</span>
              <p>UI/UX Designer</p>
              <p>EMP-1102</p>

            </div>
          </div>

          <div className='flex flex-col '>
            <p className='font-extralight text-gray-400'>Submitted by:</p>
            <p className='font-light'>17th Nov 2023</p>
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
          <span>Casual Leave</span>
        </div>


        {/* Period Card */}
        <div className='flex flex-col p-4 w-1/3 rounded-lg bg-gray-100 '>
          <label className='text-gray-500' htmlFor="">Period</label>
          <span>20 Nov - 21 Nov</span>
        </div>


        {/* Duration Card */}
        <div className='flex flex-col p-4 w-1/3 rounded-lg bg-gray-100 '>
          <label className='text-gray-500' htmlFor="">Total Duration</label>
          <span>2 Days</span>
        </div>
      </div>


      {/* Reason for Leave */}

      <div className='flex flex-col px-6 py-4 bg-background'>
        <span className='text-black'>Reason for Leave</span>
        <p className='text-gray-500'>Requesting leave to attend my sister's wedding in another city.</p>

        <div className='w-full mt-4 flex items-center justify-center'>
          <div className='h-0.5 w-full bg-gray-200 ' />

        </div>

      </div>

      {/* Activity & Notes */}
      <div className='px-6 py-4 pb-6 gap-4 w-full flex flex-col'>
        <span>Activity & Notes</span>



        <div className='flex flex-row gap-3'>
          <div className='flex flex-col items-center mt-1 gap-0.5'>
            <div className='text-primary'><FaCircleCheck size={12} /></div>
            <div className='w-0.5 h-6 bg-gray-300' />
            <div className='text-gray-400'><FaArrowRight size={10} /></div>
            <div className='w-0.5 h-6 bg-gray-300' />
            <div className='w-3 h-3 border border-gray-400 rounded-full'></div>
          </div>



          <div className='flex flex-col '>
            <div className='flex flex-col'>
              <span className=''>Submitted</span>
              <p className='text-xs text-gray-500'>Sub, 17 Nov 3:11 AM</p>
            </div>

            <div className='mt-1'>HR Review</div>
            <div className='mt-4'>Manager Approval Pending</div>

          </div>

        </div>










        {role === "admin" && (
          <>
            <input type="text" className='text-gray-500 rounded-lg bg-gray-100 border border-gray-300 p-3 w-full' placeholder='Comments...' />



            <div className='flex flex-row w-full justify-between items-center gap-4'>
              <button className='bg-gray-400 rounded-lg p-2 w-1/2 items-center justify-center text-white'>Reject</button>
              <button className='p-2 rounded-lg bg-primary  w-1/2 items-center justify-center text-white'>Approve Leave</button>

            </div>
          </>
        )}

        {role === "employee" && (
          <div className='px-6 flex w-full flex-row justify-end py-4'>
            <button className="p-2  rounded-lg text-primary border border-primary bg-blue-100">Withdraw Request</button>
          </div>
        )}




      </div>






    </div>
  );
}

export default LeaveReqDetails;
