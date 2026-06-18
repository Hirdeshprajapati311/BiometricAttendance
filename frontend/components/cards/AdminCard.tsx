




interface AdminCardProps {
  stats: number;
  title: string;
  smallIcon: React.ReactNode;
  largeIcon: React.ReactNode;
  content: string;
}


const AdminCard = ({ stats, title, smallIcon, largeIcon, content }: AdminCardProps) => {
  return (
    <div className="bg-white hover:scale-105 flex flex-col gap-4 rounded-lg shadow-md p-1 md:p-3 px-3 md:px-6 min-w-28 sm:w-36 md:w-52">

      <div className="flex flex-row font-lexend items-center justify-between">
        <span className='text-xl sm:text-2xl '>{stats}</span>
        <div className="bg-background p-1 sm:p-2 rounded-full">{largeIcon}</div>

      </div>

      <div className="flex flex-col font-lexend ">
        <span className="text-xs sm:text-sm md:text-base">{title}</span>
        <p className="  text-[8px] sm:text-[10px] gap-1 flex flex-row  items-center text-gray-500">
          {smallIcon}
          {content}</p>
        <div></div>
      </div>

    </div>
  );
}

export default AdminCard;
