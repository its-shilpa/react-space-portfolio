import { useEffect, useState } from 'react';

export default function OrbitGauge({ value, size = 56, stroke = 3, color = '#22d3ee' }) {
  const [progress, setProgress] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(value));
    return () => cancelAnimationFrame(id);
  }, [value]);

  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)',
            filter: `drop-shadow(0 0 4px ${color}aa)`,
          }}
        />
      </svg>
      <span className="absolute text-[11px] font-semibold text-white/90 tabular-nums">
        {Math.round(progress)}%
      </span>
    </div>
  );
}