




interface AdminCardProps {
  stats: number;
  title: string;
  smallIcon: React.ReactNode;
  largeIcon: React.ReactNode;
  content: string;
}


const AdminCard = ({ stats, title, smallIcon, largeIcon, content }: AdminCardProps) => {
  return (
    <div className="bg-white hover:scale-105 flex flex-col gap-4 rounded-lg shadow-md p-3 px-6 w-52">

      <div className="flex flex-row font-lexend items-center justify-between">
        <span className='text-2xl'>{stats}</span>
        <div className="bg-background p-2 rounded-full">{largeIcon}</div>

      </div>

      <div className="flex flex-col font-lexend ">
        <span>{title}</span>
        <p className="text-[10px] gap-1 flex flex-row  items-center text-gray-500">
          {smallIcon}
          {content}</p>
        <div></div>
      </div>

    </div>
  );
}

export default AdminCard;
