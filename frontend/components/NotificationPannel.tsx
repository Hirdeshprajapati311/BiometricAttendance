import { X } from 'lucide-react';
import NotificationCard from './cards/NotificationCard';



const NotificationPannel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='flex flex-col transition-all duration-300 z-[60] bg-primary/20 shadow-2xl backdrop-blur-lg border-l border-primary/30 gap-3  absolute right-0 w-64 h-screen p-4'>
      <div className='flex flex-row items-center justify-between'>
        <span className='font-semibold font-lexend'>Notifications</span>
        <button className=' cursor-pointer ' onClick={onClose}><X /></button>
      </div>

      <div className='h-0.5 w-full bg-gray-200' />


      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <NotificationCard />
        </div>
      ))}



    </div>
  );
}

export default NotificationPannel;
