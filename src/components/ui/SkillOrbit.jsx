import { useEffect, useMemo, useRef, useState } from "react";
import { orbitSkills, categoryMeta } from "../../data/orbitSkills";
import "../css/skill-orbit.css";

const RING_CONFIG = [
  { radius: 22, size: 40, speed: 7 },
  { radius: 34, size: 35, speed: -4.5 },
  { radius: 45, size: 28, speed: 3 },
];
const RING_COLORS = ["#22d3ee", "#a855f7", "#10b981"];
const TRAIL_LENGTH = 14;
const BASE_STAGE_WIDTH = 560; // the width all fixed px values below were designed for

export default function SkillOrbit() {
  const stageRef = useRef(null);
  const iconRefs = useRef({});
  const rafRef = useRef(null);
  const draggingRef = useRef(false);
  const lastPointerAngleRef = useRef(0);
  const hoveredRingRef = useRef(null);
  const [hovered, setHovered] = useState(null); // { ri, ii }
  const [activeCategory, setActiveCategory] = useState(null);

  // 👉 Track the actual rendered width of the stage so we can scale
  // every fixed-pixel value (hub, icons, dots, borders) responsively.
  const [stageWidth, setStageWidth] = useState(BASE_STAGE_WIDTH);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) setStageWidth(width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Clamp the minimum scale so things never become unreadably tiny
  // on very small phones (e.g. 320px wide).
  const scale = Math.max(stageWidth / BASE_STAGE_WIDTH, 0.5);

  const rings = useMemo(() => {
    const sorted = [...orbitSkills].sort((a, b) => b.level - a.level);
    const chunkSize = Math.ceil(sorted.length / RING_CONFIG.length);
    return RING_CONFIG.map((cfg, i) => ({
      ...cfg,
      items: sorted.slice(i * chunkSize, i * chunkSize + chunkSize),
    })).filter((r) => r.items.length > 0);
  }, []);

  const ringAnglesRef = useRef(rings.map(() => Math.random() * 360));
  const satelliteRefs = useRef({});
  const trailRefs = useRef({});
  const trailHistoryRef = useRef(rings.map(() => []));

  const hubBackgrounds = [
    `conic-gradient(from 0deg, rgba(34,211,238,.18), rgba(59,130,246,.18), rgba(34,211,238,.18))`,
    `conic-gradient(from 0deg, rgba(168,85,247,.18), rgba(236,72,153,.18), rgba(168,85,247,.18))`,
    `conic-gradient(from 0deg, rgba(16,185,129,.18), rgba(34,197,94,.18), rgba(16,185,129,.18))`,
  ];
  const hubGlows = [
    "0 0 45px rgba(34,211,238,.28)",
    "0 0 45px rgba(139,92,246,.28)",
    "0 0 45px rgba(59,130,246,.28)",
    "0 0 45px rgba(16,185,129,.28)",
    "0 0 45px rgba(245,158,11,.28)",
    "0 0 45px rgba(236,72,153,.28)",
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
        const headAngle = ringAnglesRef.current[ri];
        const headRad = (headAngle * Math.PI) / 180;
        const hx = 50 + ring.radius * Math.cos(headRad);
        const hy = 50 + ring.radius * Math.sin(headRad);
        const headEl = satelliteRefs.current[ri];
        if (headEl) {
          headEl.style.left = `${hx}%`;
          headEl.style.top = `${hy}%`;
        }
        const hist = trailHistoryRef.current[ri];
        hist.unshift({ x: hx, y: hy });
        if (hist.length > TRAIL_LENGTH) hist.pop();
        for (let ti = 0; ti < TRAIL_LENGTH; ti++) {
          const el = trailRefs.current[`${ri}-${ti}`];
          if (!el) continue;
          const pos = hist[ti];
          if (!pos) {
            el.style.opacity = "0";
            continue;
          }
          const progress = ti / TRAIL_LENGTH;
          el.style.left = `${pos.x}%`;
          el.style.top = `${pos.y}%`;
          el.style.opacity = String((1 - progress) * 0.55);
          const dotScale = 1 - progress * 0.75;
          el.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
        }
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
      stageRef.current.style.setProperty("--tiltY", `${dx * 6}deg`);
      stageRef.current.style.setProperty("--tiltX", `${-dy * 6}deg`);
    }
  }
  function onPointerUp() {
    draggingRef.current = false;
  }
  function onStageLeave() {
    stageRef.current?.style.setProperty("--tiltX", "0deg");
    stageRef.current?.style.setProperty("--tiltY", "0deg");
  }

  // Pre-computed scaled values, reused below
  const hubSize = Math.round(110 * scale);
  const hubFontSize = Math.max(16, Math.round(30 * scale));
  const dotSize = Math.max(4, Math.round(7 * scale));
  const cometSize = Math.max(5, Math.round(8 * scale));
  const borderWidth = Math.max(1, 1.5 * scale);

  return (
    <div className="mx-auto w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[560px]">
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onStageLeave}
        className="relative aspect-square w-full cursor-grab select-none touch-none active:cursor-grabbing"
        style={{ perspective: 1000, "--tiltX": "0deg", "--tiltY": "0deg" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(var(--tiltX)) rotateY(var(--tiltY))",
            transformStyle: "preserve-3d",
            transition: "transform 300ms ease-out",
          }}
        >
          {/* ambient glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: "70%",
              height: "70%",
              background:
                "radial-gradient(circle, rgba(34,211,238,0.10), transparent 70%)",
            }}
          />
          {/* orbit guides + comet head + trail, per ring */}
          {rings.map((ring, ri) => {
            const color = RING_COLORS[ri % RING_COLORS.length];
            return (
              <div key={`ring-fx-${ri}`}>
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${ring.radius * 2}%`,
                    height: `${ring.radius * 2}%`,
                    transform: "translate(-50%, -50%)",
                    border: "1px dashed rgba(255,255,255,0.14)",
                    boxSizing: "border-box",
                  }}
                />
                {Array.from({ length: TRAIL_LENGTH }).map((_, ti) => (
                  <div
                    key={`trail-${ri}-${ti}`}
                    ref={(el) => (trailRefs.current[`${ri}-${ti}`] = el)}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: dotSize,
                      height: dotSize,
                      left: "50%",
                      top: "50%",
                      background: color,
                      opacity: 0,
                      transform: "translate(-50%, -50%)",
                      zIndex: 4,
                    }}
                  />
                ))}
                <div
                  ref={(el) => (satelliteRefs.current[ri] = el)}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: cometSize,
                    height: cometSize,
                    left: "50%",
                    top: "50%",
                    background: color,
                    boxShadow: `0 0 ${8 * scale}px ${color}, 0 0 ${16 * scale}px ${color}80`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 5,
                  }}
                />
              </div>
            );
          })}

          {/* center hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hub-wrapper"
            style={{ width: hubSize, height: hubSize }}
          >
            <div
              className="absolute inset-0 rounded-full hub-gradient"
              style={{
                background: hubBackgrounds[hubColorIndex],
                boxShadow: `${hubGlows[hubColorIndex]}, inset 0 0 20px rgba(255,255,255,.05)`,
                border: "1px solid rgba(255,255,255,.08)",
              }}
            />
            <div className="relative z-10 flex h-full w-full items-center justify-center">
              <span
                className="font-mono font-bold text-cyan-300"
                style={{ fontSize: hubFontSize }}
              >
                {"</>"}
              </span>
            </div>
          </div>

          {/* orbiting skills */}
          {rings.map((ring, ri) =>
            ring.items.map((item, ii) => {
              const id = `${ri}-${ii}`;
              const isHovered = hovered?.ri === ri && hovered?.ii === ii;
              const isActiveCategory =
                activeCategory && item.category === activeCategory;
              const dimmed = activeCategory && item.category !== activeCategory;
              const baseSize = ring.size * scale;
              const size = isHovered ? baseSize + 14 * scale : baseSize;
              const borderAlpha = isHovered || isActiveCategory ? "ff" : "c0";
              const glow = isHovered
                ? `0 0 ${20 * scale}px ${item.color}, 0 0 ${6 * scale}px ${item.color}`
                : isActiveCategory
                  ? `0 0 ${16 * scale}px ${item.color}, 0 0 ${4 * scale}px ${item.color}cc`
                  : `0 0 ${10 * scale}px ${item.color}80`;
              return (
                <div
                  key={id}
                  ref={(el) => (iconRefs.current[id] = el)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: "50%",
                    top: "50%",
                    zIndex: isHovered ? 50 : 20 - ri,
                  }}
                  onMouseEnter={() => {
                    hoveredRingRef.current = ri;
                    setHovered({ ri, ii });
                  }}
                  onMouseLeave={() => {
                    hoveredRingRef.current = null;
                    setHovered(null);
                  }}
                  onTouchStart={() => {
                    hoveredRingRef.current = ri;
                    setHovered({ ri, ii });
                  }}
                  onTouchEnd={() => {
                    hoveredRingRef.current = null;
                    setHovered(null);
                  }}
                >
                  <div
                    className="relative flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: size,
                      height: size,
                      background: "rgba(10,14,26,0.88)",
                      border: `${borderWidth}px solid ${item.color}${borderAlpha}`,
                      boxShadow: glow,
                      opacity: dimmed ? 0.2 : 1,
                      transform: isActiveCategory ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    <item.Icon
                      style={{
                        color: item.color,
                        width: ring.size * 0.45 * scale,
                        height: ring.size * 0.45 * scale,
                        filter:
                          isActiveCategory || isHovered
                            ? "drop-shadow(0 0 4px currentColor)"
                            : "none",
                      }}
                    />
                    {isHovered && (
                      <div
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-900/95 text-white/90 shadow-lg"
                        style={{
                          top: -9 * scale - 22,
                          padding: `${4 * scale}px ${10 * scale}px`,
                          fontSize: Math.max(9, 11 * scale),
                        }}
                      >
                        {item.name}{" "}
                        <span className="text-white/40">· {item.level}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      <p className="mt-3 sm:mt-4 pt-4 sm:pt-6 text-center text-[11px] sm:text-xs text-white/30">
        Drag to spin the orbit
      </p>


      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {Object.entries(categoryMeta).map(([key, meta]) => (
          <button
            key={key}
            type="button"
            onMouseEnter={() => setActiveCategory(key)}
            onMouseLeave={() => setActiveCategory(null)}
            onClick={() =>
              setActiveCategory((prev) => (prev === key ? null : key))
            }
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: meta.color }}
            />
            {meta.label}
          </button>
        ))}
      </div>
    </div>
  );
}

