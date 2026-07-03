"use client"
import { X } from 'lucide-react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateLeaveData, createLeaveSchema } from "@/validators/leave.validation"
import { useCreateLeaveR } from '@/hooks/useCreateLeaveR';



const leaveTypes = [
  { value: "casual", label: "Casual Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "earned", label: "Earned Leave" },
  { value: "adjustment", label: "Adjustment Leave" },
  { value: "unpaid", label: "Unpaid Leave" },
  { value: "half", label: "Half Leave" }
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

  const { mutate, isPending } = useCreateLeaveR()



  const onSubmit = (data: CreateLeaveData) => {
    mutate({
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    })
    onClose();

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
          <div className='flex flex-col gap-1 w-2/3'>
            <select className='border cursor-pointer border-gray-300 text-xs  rounded-lg p-2' id="type" {...register("type")}>
              <option value="">Select leave type</option>
              {leaveTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            {errors.type && <span className='text-red-500 text-xs '>{errors.type.message}</span>}


          </div>
        </div>



        {/* Start Date */}

        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="startDate">Start Date</label>
          <div className='flex flex-col gap-1 w-2/3'>
            <input className='border cursor-pointer border-gray-300 rounded-lg p-2 text-xs' type="date" placeholder='Select start date' {...register('startDate')} />
            {errors.startDate && <span className='text-red-500 text-xs'>{errors.startDate.message}</span>}
          </div>
        </div>


        {/* End Date */}

        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="endDate">End Date</label>
          <div className='flex flex-col gap-1 w-2/3'>
            <input className='border cursor-pointer border-gray-300 rounded-lg p-2 text-xs' type="date" placeholder='Select end date' {...register('endDate')} />
            {errors.endDate && <span className='text-red-500 text-xs'>{errors.endDate.message}</span>}
          </div>
        </div>


        {/* Reason */}

        <div className='flex gap-4 flex-row justify-between'>
          <label htmlFor="reason">Reason</label>
          <div className='flex flex-col gap-1 w-2/3'>
            <textarea className='border border-gray-300 rounded-lg p-2 text-xs' id="reason" placeholder='Enter your reason ' rows={3} {...register('reason')} />
            {errors.reason && <span className='text-red-500 text-xs'>{errors.reason.message}</span>}
          </div>
        </div>


        {/* Done Button */}

        <button type="submit" className='bg-primary text-sm md:text-base px-4 py-2 cursor-pointer text-white rounded-lg self-end' >Done</button>




      </form>

    </div>

  );
}

export default LeaveRequestPopUp;
