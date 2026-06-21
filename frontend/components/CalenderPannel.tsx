import { X } from 'lucide-react';
import Calendar from 'react-calendar';


const CalenderPannel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='flex flex-col transition-all duration-300 z-[60] bg-white/20 shadow-2xl backdrop-blur-lg border-l border-white/30 gap-3  absolute right-0 w-72 h-screen p-4'>
      <div className='flex flex-row items-center justify-between'>
        <span className='font-semibold font-lexend'>Calendar</span>
        <button className=' cursor-pointer ' onClick={onClose}><X /></button>
      </div>

      <div className='h-0.5 w-full bg-gray-200' />


      <Calendar className="p-4 bg-white rounded-lg text-sm" />


      {/* Global Attendance Card */}
      <div className='p-4 font-lexend flex flex-col bg-white rounded-lg'>
        <span>Global Attendance</span>


        <p className='text-xs mt-2 text-gray-400'>Today:</p>

        <div className='flex flex-row w-full items-center justify-between'>
          <span>18 Nov</span>
          <span>0%</span>
        </div>


        <div className='flex flex-row w-full items-center justify-between'>
          <p className='text-xs text-gray-400'>Global Attendance</p>
          <p className='text-xs text-gray-400'>work duration</p>
        </div>
      </div>

    </div>
  );
}

export default CalenderPannel;
