export default function SkillBar({ icon: Icon, name, level, color }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 text-sm text-slate-200">
          {Icon && <Icon className="text-base" style={{ color }} />}
          {name}
        </div>
        <span className="text-xs text-slate-400">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${level}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}