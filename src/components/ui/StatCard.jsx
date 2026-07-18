export default function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-center hover:border-nebula-blue/50 transition">
      <Icon className="mx-auto text-2xl text-nebula-blue mb-2" />
      <div className="font-display text-lg sm:text-2xl font-bold text-white leading-tight">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}