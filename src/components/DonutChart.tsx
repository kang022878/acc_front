interface DonutChartProps {
  daysSinceActive: number;
  siteName: string;
}

export default function DonutChart({ daysSinceActive, siteName }: DonutChartProps) {
  const maxDays = 730; // 2 years = 730 days
  const percentage = Math.min((daysSinceActive / maxDays) * 100, 100);
  
  // Calculate stroke dash array for the donut chart
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on how long it's been inactive
  const getColor = () => {
    if (daysSinceActive > 365) return '#ef4444'; // red for over a year
    if (daysSinceActive > 180) return '#f59e0b'; // orange for over 6 months
    return '#3b82f6'; // blue for less than 6 months
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold" style={{ color }}>
            {daysSinceActive}
          </div>
          <div className="text-xs text-slate-400">일</div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="font-bold text-lg">{siteName}</div>
        <div className="text-xs text-slate-400">마지막 활동</div>
      </div>
    </div>
  );
}
