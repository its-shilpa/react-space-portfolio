export default function StarField() {
  // Generate an array of N stars once (not on every render)
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 4,
  }));
  

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-space-900">
      {/* Radial nebula glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-nebula-purple/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-nebula-blue/20 blur-[120px]" />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: s.size,
            height: s.size,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}