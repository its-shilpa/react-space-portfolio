export default function StarMeter({ name, level, color = '#22d3ee' }) {
  const dots = Array.from({ length: 10 });
  const lit = Math.round(level / 10);

  return (
    <div className="group py-2.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/90 font-medium">{name}</span>
        <span className="text-xs text-white/40 tabular-nums group-hover:text-white/70 transition-colors">
          {level}%
        </span>
      </div>
      <div className="flex items-center gap-[5px]">
        {dots.map((_, i) => {
          const isLit = i < lit;
          return (
            <span
              key={i}
              className={`rounded-full transition-all duration-500 ${isLit ? 'animate-pulse' : ''}`}
              style={{
                width: isLit ? 6 : 4,
                height: isLit ? 6 : 4,
                background: isLit ? color : 'rgba(255,255,255,0.12)',
                boxShadow: isLit ? `0 0 6px ${color}` : 'none',
                animationDelay: `${i * 140}ms`,
                animationDuration: '2.6s',
                transitionDelay: `${i * 35}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}