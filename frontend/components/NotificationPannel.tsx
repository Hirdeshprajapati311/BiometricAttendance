import { X } from 'lucide-react';

interface NotificationProps {
  isNotificationPannelOpen: boolean;
  setIsNotificationPannelOpen: (value: boolean) => void;
}

const NotificationPannel = ({ isNotificationPannelOpen, setIsNotificationPannelOpen }: NotificationProps) => {
  return (
    <div className='flex flex-col transition-all duration-300 z-[60] bg-primary/20 shadow-2xl backdrop-blur-lg border-l border-primary/30  absolute right-0 w-64 h-screen p-4'>
      <button className='self-end cursor-pointer ' onClick={() => setIsNotificationPannelOpen(!isNotificationPannelOpen)}><X /></button>
      some notification

    </div>
  );
}

export default NotificationPannel;
