import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaRocket, FaTerminal } from 'react-icons/fa';
import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';
import '../css/experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const cometRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const [geometry, setGeometry] = useState({ width: 0, height: 0, d: '', points: [] });

  const registerItemRef = (i) => (el) => {
    itemRefs.current[i] = el;
  };

  // Measure real card positions and build a smooth S-curve through them
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || itemRefs.current.some((el) => !el)) return;

    const width = container.offsetWidth;
    const height = container.scrollHeight;
    const cx = width / 2;
    const amplitude = Math.min(width * 0.22, 160);

    const points = experience.map((_, i) => {
      const el = itemRefs.current[i];
      const y = el.offsetTop + el.offsetHeight / 2;
      const x = cx + (i % 2 === 0 ? -amplitude : amplitude);
      return { x, y };
    });

    // build smooth S-curve: cubic bezier between each pair, control points
    // at the vertical midpoint so the line eases from side to side
    let d = '';
    points.forEach((p, i) => {
      if (i === 0) {
        d += `M ${p.x} ${p.y}`;
      } else {
        const prev = points[i - 1];
        const midY = (prev.y + p.y) / 2;
        d += ` C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`;
      }
    });

    setGeometry({ width, height, d, points });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', measure);
    // re-measure once more after paint in case fonts/images shift heights
    const t = setTimeout(measure, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t);
    };
  }, [measure]);

  // draw + comet animation, tied to a single scrub'd ScrollTrigger
  useEffect(() => {
    if (!geometry.d || !pathRef.current) return;

    const path = pathRef.current;
    const total = path.getTotalLength();
    path.style.strokeDasharray = total;
    path.style.strokeDashoffset = total;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        end: 'bottom 65%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          path.style.strokeDashoffset = String(total * (1 - progress));
          const pt = path.getPointAtLength(total * progress);
          if (cometRef.current) {
            cometRef.current.setAttribute('cx', pt.x);
            cometRef.current.setAttribute('cy', pt.y);
            cometRef.current.style.opacity = progress <= 0.001 ? '0' : '1';
          }
        },
      });
      return () => st.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [geometry.d]);

  return (
    <section id="experience" className="py-8 md:py-10 lg:py-12">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="My Journey"
          title="Work Experience"
          subtitle="A timeline of my professional career as a frontend developer, listing roles and technologies."
        />

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Orbital trajectory (behind cards) */}
          {geometry.width > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none"
              width={geometry.width}
              height={geometry.height}
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            >
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--theme-from)" />
                  <stop offset="50%" stopColor="var(--theme-via)" />
                  <stop offset="100%" stopColor="var(--theme-to)" />
                </linearGradient>
                <radialGradient id="cometGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--theme-to)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--theme-to)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* faint full-length guide */}
              <path d={geometry.d} fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="2" />

              {/* animated drawn path */}
              <path
                ref={pathRef}
                d={geometry.d}
                fill="none"
                stroke="url(#curveGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px var(--theme-to))' }}
              />

              {/* orbit nodes */}
              {geometry.points.map((p, i) => (
                <g key={i} className="experience-node-group">
                  <circle cx={p.x} cy={p.y} r="18" className="experience-node-pulse" fill="none" stroke="var(--theme-from)" strokeWidth="1" strokeOpacity="0.35" />
                  <circle cx={p.x} cy={p.y} r="12" className="experience-node-rotate" fill="none" stroke="var(--theme-to)" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.7" />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="5.5"
                    fill="var(--theme-via)"
                    className="experience-node-core"
                    style={{ filter: 'drop-shadow(0 0 6px var(--theme-to))' }}
                  />
                </g>
              ))}

              {/* traveling comet head */}
              <circle ref={cometRef} r="16" fill="url(#cometGlow)" opacity="0" />
            </svg>
          )}

          {/* Job entries, in normal flow so we can measure their real position */}
          <div className="relative">
            {experience.map((job, i) => (
              <div
                key={job.role}
                ref={registerItemRef(i)}
                className={`relative mb-16 md:mb-24 flex ${
                  i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                }`}
                data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}
              >
                <div className="w-full md:w-[46%] experience-card p-5 md:p-6 group">
                  {/* Glowing station ID */}
                  <span className="absolute -top-3 left-5 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 group-hover:border-theme-from/40 group-hover:text-theme-from transition-colors duration-300">
                    STATION {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex justify-between items-start mb-4 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="experience-icon-orb text-nebula-blue">
                        {i === 0 ? <FaRocket className="text-xl" /> : <FaTerminal className="text-xl" />}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono tracking-wider bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          {job.period}
                        </span>
                        <h3 className="text-white font-display font-semibold text-base mt-1.5 group-hover:text-theme-to transition-colors duration-300">
                          {job.role}
                        </h3>
                        <p className="text-slate-400 text-xs mt-0.5">{job.company}</p>
                      </div>
                    </div>

                    <span className={`experience-status-tag shrink-0 ${i === 0 ? 'active' : 'completed'}`}>
                      {i === 0 ? 'Mission Active' : 'Accomplished'}
                    </span>
                  </div>

                  <ul className="text-slate-400 text-xs mt-3 space-y-2 font-sans">
                    {job.points.map((p) => (
                      <li key={p} className="leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-nebula-blue/60 group-hover:before:bg-theme-to transition-colors duration-300">
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-1.5 mt-5 flex-wrap">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 group-hover:border-theme-via/40 group-hover:text-white transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}