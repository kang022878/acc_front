// src/components/DonutChart.tsx
interface DonutChartProps {
  percent: number; // 0~100
  size?: number;   // px
  stroke?: number; // px
  label?: string;
}

export default function DonutChart({ percent, size = 92, stroke = 10, label }: DonutChartProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="drop-shadow-[0_0_18px_rgba(34,211,238,0.18)]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(34,211,238,0.18)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(34,211,238,0.95)"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-sm font-bold text-cyan-200">{clamped}%</div>
        {label && <div className="text-[10px] text-slate-400">{label}</div>}
      </div>
    </div>
  );
}
