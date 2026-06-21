import Image from "next/image";

const NotificationCard = () => {
  return (
    <div className='p-4 rounded-lg font-lexend w-full bg-white/90 backdrop-blur-sm '>

      <div className="flex flex-row justify-between w-full">

        <div className="flex flex-col">
          <span>Arnifi</span>
          <p className="text-sm">Employee X is late</p>
        </div>


        <p className="text-xs font-light">now</p>
      </div>

      <p className="text-xs font-light">2 hours ago</p>

    </div>
  );
}

export default NotificationCard;
