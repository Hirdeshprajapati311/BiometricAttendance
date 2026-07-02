"use client"
import { X } from 'lucide-react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateLeaveData, createLeaveSchema } from "@/validators/leave.validation"



const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Adjustment Leave",
  "Unpaid Leave",
  "Half Leave"
]

interface LRPopUPProps {
  onClose: () => void
}

const LeaveRequestPopUp = ({ onClose }: LRPopUPProps) => {


  const { register, handleSubmit, formState: { errors } } = useForm<CreateLeaveData>({
    resolver: zodResolver(createLeaveSchema),
    defaultValues: {
      type: "",
      startDate: "",
      endDate: "",
      reason: ""
    }
  })



  const onSubmit = (data: CreateLeaveData) => {
    console.log(data)
  }

  return (

    <div className='fixed inset-0 z-10 absolute items-center justify-center backdrop-blur-xs bg-primary/20 flex'>
      <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-6 text-gray-600  max-w-84 lg:w-full bg-white rounded-lg font-lexend shadow-primary-xl flex flex-col gap-6'>

        {/* Upper section */}
        <div className='w-full flex flex-row  items-center justify-between'>
          <span className='text-black'>Request for leave</span>
          <button onClick={onClose} className='text-primary cursor-pointer'><X /></button>

        </div>

        {/* Types of leave */}
        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="Type">Type</label>
          <select className='border cursor-pointer border-gray-300 text-xs w-2/3 rounded-lg p-2' id="" {...register('type')}>
            <option value="">Select leave type</option>
            {leaveTypes.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}

        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="startDate">Start Date</label>
          <input className='border cursor-pointer border-gray-300 rounded-lg p-2 text-xs w-2/3' type="date" placeholder='Select start date' {...register('startDate')} />
        </div>


        {/* End Date */}

        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="endDate">End Date</label>
          <input className='border cursor-pointer border-gray-300 rounded-lg p-2 text-xs w-2/3' type="date" placeholder='Select end date' {...register('endDate')} />
        </div>


        {/* Reason */}

        <div className='flex gap-4 flex-row justify-between'>
          <label htmlFor="reason">Reason</label>
          <textarea className='border border-gray-300 rounded-lg p-2 text-xs w-2/3' id="reason" placeholder='Enter your reason ' rows={3} {...register('reason')} />

        </div>



        {/* Done Button */}

        <button type="submit" className='bg-primary text-sm md:text-base px-4 py-2 cursor-pointer text-white rounded-lg self-end' >Done</button>




      </form>

    </div>

  );
}

export default LeaveRequestPopUp;
