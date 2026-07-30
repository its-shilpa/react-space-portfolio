export default function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-3 xs:p-5 text-center hover:border-nebula-blue/50 transition w-full overflow-hidden">
      <Icon className="mx-auto text-xl sm:text-2xl text-nebula-blue mb-2" />
      <div className="font-display text-sm xs:text-base sm:text-2xl font-bold text-white leading-tight">{value}</div>
      <div className="text-[10px] sm:text-xs text-slate-400 mt-1 truncate">{label}</div>
    </div>
  );
}