import { X } from 'lucide-react';



const leaveTypes = [
  "Casual Leave",
  "Sick Leave",
  "Earned Leave",
  "Adjustment Leave",
  "Unpaid Leave",
  "Half Leave"
]

const LeaveRequestPopUp = ({ onClose }: { onClose: () => void }) => {
  return (

    <div className='fixed inset-0 z-10 absolute items-center justify-center backdrop-blur-xs bg-primary/20 flex'>
      <div className='px-4 py-6 text-gray-600  max-w-84 lg:w-full bg-white rounded-lg font-lexend shadow-primary-xl flex flex-col gap-6'>

        {/* Upper section */}
        <div className='w-full flex flex-row  items-center justify-between'>
          <span className='text-black'>Request for leave</span>
          <button onClick={onClose} className='text-primary cursor-pointer'><X /></button>

        </div>

        {/* Types of leave */}
        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="Type">Type</label>
          <select className='border cursor-pointer border-gray-300 text-xs w-2/3 rounded-lg p-2' name="type" id="">
            <option value="">Select leave type</option>
            {leaveTypes.map((t, i) => (
              <option key={i}>{t}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}

        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="endDate">End Date</label>
          <input className='border cursor-pointer border-gray-300 rounded-lg p-2 text-xs w-2/3' type="date" placeholder='Select start date' />
        </div>


        {/* End Date */}

        <div className='flex flex-row items-center justify-between'>
          <label htmlFor="endDate">End Date</label>
          <input className='border cursor-pointer border-gray-300 rounded-lg p-2 text-xs w-2/3' type="date" placeholder='Select end date' />
        </div>


        {/* Reason */}

        <div className='flex gap-4 flex-row justify-between'>
          <label htmlFor="reason">Reason</label>
          <textarea className='border border-gray-300 rounded-lg p-2 text-xs w-2/3' name="reason" id="reason" placeholder='Enter your reason ' rows={3} />

        </div>



        {/* Done Button */}

        <button className='bg-primary text-sm md:text-base px-4 py-2 text-white rounded-lg self-end' >Done</button>




      </div>

    </div>

  );
}

export default LeaveRequestPopUp;
