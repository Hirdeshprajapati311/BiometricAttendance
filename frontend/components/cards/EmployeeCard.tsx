




interface LeaveCardProps {
  label: string;
  total: number;
  used: number;
}

const RADIUS = 30
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const EmployeeCard = ({ used, label, total }: LeaveCardProps) => {
  const remaining = total - used
  const dashOffSet = CIRCUMFERENCE * (1 - used / total);



  return (
    <div className="bg-white hover:scale-105 flex flex-row gap-4 font-lexend rounded-lg items-center justify-center shadow-md p-1 md:p-3 px-3 md:px-6 min-w-28 sm:w-36 md:w-58 lg:w-48 xl:w-58 h-30">

      <div className="relative w-16 h-16 shrink-0">
        <svg width="64" height="64" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="6" />

          <circle cx="36" cy="36" r={RADIUS} fill="none" stroke="#3354f4" strokeWidth="6" strokeLinecap="round" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffSet} transform="rotate(-90 36 36)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {used}/{total}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-1">
        <p className="text-xs font-medium text-gray-800" >{label}</p>
        {[
          { color: "#3354f4", text: `Remaining • ${remaining}` },
          { color: "#2c3e70", text: `Used • ${used}` },
          { color: "#1a1a2e", text: `Total • ${total}` }
        ].map(({ color, text }) => (
          <div key={text} className="flex items-center gap-2 text-[10px] text-gray-500">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
            {text}

          </div>
        ))}

      </div>


    </div>
  );
}

export default EmployeeCard;



