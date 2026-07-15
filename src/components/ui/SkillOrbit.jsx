import { useEffect, useMemo, useRef, useState } from 'react';
import { orbitSkills, categoryMeta } from '../../data/orbitSkills';

const RING_CONFIG = [
  { radius: 26, size: 40, speed: 7 },
  { radius: 38, size: 35, speed: -4.5 },
  { radius: 50, size: 28, speed: 3 },
];

export default function SkillOrbit() {
  const stageRef = useRef(null);
  const iconRefs = useRef({});
  const rafRef = useRef(null);
  const draggingRef = useRef(false);
  const lastPointerAngleRef = useRef(0);
  const hoveredRingRef = useRef(null);

  const [hovered, setHovered] = useState(null); // { ri, ii }
  const [activeCategory, setActiveCategory] = useState(null);

  const rings = useMemo(() => {
    const sorted = [...orbitSkills].sort((a, b) => b.level - a.level);
    const chunkSize = Math.ceil(sorted.length / RING_CONFIG.length);
    return RING_CONFIG.map((cfg, i) => ({
      ...cfg,
      items: sorted.slice(i * chunkSize, i * chunkSize + chunkSize),
    })).filter((r) => r.items.length > 0);
  }, []);

  const ringAnglesRef = useRef(rings.map(() => Math.random() * 360));

  const hubBackgrounds = [
`
conic-gradient(
from 0deg,
rgba(34,211,238,.18),
rgba(59,130,246,.18),
rgba(34,211,238,.18)
)
`,
`
conic-gradient(
from 0deg,
rgba(168,85,247,.18),
rgba(236,72,153,.18),
rgba(168,85,247,.18)
)
`,
`
conic-gradient(
from 0deg,
rgba(16,185,129,.18),
rgba(34,197,94,.18),
rgba(16,185,129,.18)
)
`,
];

const hubGlows = [
  '0 0 45px rgba(34,211,238,.28)',
  '0 0 45px rgba(139,92,246,.28)',
  '0 0 45px rgba(59,130,246,.28)',
  '0 0 45px rgba(16,185,129,.28)',
  '0 0 45px rgba(245,158,11,.28)',
  '0 0 45px rgba(236,72,153,.28)',
];

const [hubColorIndex, setHubColorIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setHubColorIndex((prev) => (prev + 1) % hubBackgrounds.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    let last = performance.now();

    function frame(t) {
      const dt = (t - last) / 1000;
      last = t;

      rings.forEach((ring, ri) => {
        if (!draggingRef.current && hoveredRingRef.current !== ri) {
          ringAnglesRef.current[ri] += ring.speed * dt;
        }
        ring.items.forEach((item, ii) => {
          const baseAngle = (360 / ring.items.length) * ii + ri * 14;
          const angleDeg = baseAngle + ringAnglesRef.current[ri];
          const rad = (angleDeg * Math.PI) / 180;
          const x = 50 + ring.radius * Math.cos(rad);
          const y = 50 + ring.radius * Math.sin(rad);
          const el = iconRefs.current[`${ri}-${ii}`];
          if (el) {
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
          }
        });
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rings]);

  function getAngle(e, rect) {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
  }

  function onPointerDown(e) {
    draggingRef.current = true;
    const rect = stageRef.current.getBoundingClientRect();
    lastPointerAngleRef.current = getAngle(e, rect);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    const rect = stageRef.current.getBoundingClientRect();
    if (draggingRef.current) {
      const angle = getAngle(e, rect);
      let delta = angle - lastPointerAngleRef.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      ringAnglesRef.current = ringAnglesRef.current.map((a) => a + delta);
      lastPointerAngleRef.current = angle;
    } else {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      stageRef.current.style.setProperty('--tiltY', `${dx * 6}deg`);
      stageRef.current.style.setProperty('--tiltX', `${-dy * 6}deg`);
    }
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  function onStageLeave() {
    stageRef.current?.style.setProperty('--tiltX', '0deg');
    stageRef.current?.style.setProperty('--tiltY', '0deg');
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 560 }}>
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onStageLeave}
        className="relative aspect-square cursor-grab select-none touch-none active:cursor-grabbing"
        style={{ perspective: 1000, '--tiltX': '0deg', '--tiltY': '0deg' }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(var(--tiltX)) rotateY(var(--tiltY))',
            transformStyle: 'preserve-3d',
            transition: 'transform 300ms ease-out',
          }}
        >
          {/* ambient glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: '70%',
              height: '70%',
              background: 'radial-gradient(circle, rgba(34,211,238,0.10), transparent 70%)',
            }}
          />

          {/* dashed orbit guides */}
          {rings.map((ring, ri) => (
            <div
              key={ri}
              className="absolute rounded-full border border-dashed border-white/10"
              style={{
                left: `${50 - ring.radius}%`,
                top: `${50 - ring.radius}%`,
                width: `${ring.radius * 2}%`,
                height: `${ring.radius * 2}%`,
              }}
            />
          ))}

          {/* center hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
            style={{
              width: 96,
              height: 96,
              background: hubBackgrounds[hubColorIndex],
              transition: 'background 0.8s ease',
              boxShadow: `${hubGlows[hubColorIndex]}, inset 0 0 20px rgba(255,255,255,.05)`,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span className="font-mono text-xl font-semibold text-cyan-300">{'</>'}</span>
          </div>

          {/* orbiting skills */}
          {rings.map((ring, ri) =>
            ring.items.map((item, ii) => {
              const id = `${ri}-${ii}`;
              const isHovered = hovered?.ri === ri && hovered?.ii === ii;
              const dimmed = activeCategory && item.category !== activeCategory;
              const size = isHovered ? ring.size + 14 : ring.size;

              return (
                <div
                  key={id}
                  ref={(el) => (iconRefs.current[id] = el)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: '50%', top: '50%', zIndex: isHovered ? 50 : 20 - ri }}
                  onMouseEnter={() => {
                    hoveredRingRef.current = ri;
                    setHovered({ ri, ii });
                  }}
                  onMouseLeave={() => {
                    hoveredRingRef.current = null;
                    setHovered(null);
                  }}
                >
                  <div
                    className="relative flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: size,
                      height: size,
                      background: 'rgba(10,14,26,0.88)',
                      border: `1.5px solid ${item.color}${isHovered ? 'ff' : '90'}`,
                      boxShadow: isHovered
                        ? `0 0 18px ${item.color}, 0 0 4px ${item.color}`
                        : `0 0 8px ${item.color}55`,
                      opacity: dimmed ? 0.2 : 1,
                    }}
                  >
                    <item.Icon style={{ color: item.color, width: ring.size * 0.45, height: ring.size * 0.45 }} />
                    {isHovered && (
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-900/95 px-2.5 py-1 text-[11px] text-white/90 shadow-lg">
                        {item.name} <span className="text-white/40">· {item.level}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <p className="mt-4 pt-6 text-center text-xs text-white/30">Drag to spin the orbit</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {Object.entries(categoryMeta).map(([key, meta]) => (
          <button
            key={key}
            type="button"
            onMouseEnter={() => setActiveCategory(key)}
            onMouseLeave={() => setActiveCategory(null)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
            {meta.label}
          </button>
        ))}
      </div>
    </div>
  );
}