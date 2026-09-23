import { useState, useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaRocket, FaTerminal, FaReact, FaVuejs, FaWordpress, 
  FaHtml5, FaCss3Alt, FaCreditCard, FaCode, FaShoppingBag, 
  FaJs, FaGlobe, FaCogs, FaAward, FaUsers, FaBriefcase,
  FaDownload, FaArrowRight, FaCalendarAlt
} from 'react-icons/fa';
import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';
import { useTheme } from '../../hooks/ThemeContext';
import '../css/experience.css';

gsap.registerPlugin(ScrollTrigger);

// Helper to map technologies to logos/colors
const getTagIcon = (tag) => {
  const t = tag.toLowerCase();
  if (t.includes('react')) return { icon: FaReact, color: '#61dafb' };
  if (t.includes('vue')) return { icon: FaVuejs, color: '#42b883' };
  if (t.includes('javascript') || t === 'js' || t.includes('jquery')) return { icon: FaJs, color: '#f7df1e' };
  if (t.includes('wordpress') || t.includes('divi') || t.includes('elementor')) return { icon: FaWordpress, color: '#21759b' };
  if (t.includes('woocommerce')) return { icon: FaShoppingBag, color: '#96588a' };
  if (t === 'html') return { icon: FaHtml5, color: '#e34f26' };
  if (t === 'css' || t.includes('sass') || t.includes('tailwind')) return { icon: FaCss3Alt, color: '#38bdf8' };
  if (t.includes('payment') || t.includes('credit')) return { icon: FaCreditCard, color: '#10b981' };
  return { icon: FaCode, color: '#94a3b8' };
};

// Helper to map statistics to icons
const getStatIcon = (label) => {
  const l = label.toLowerCase();
  if (l.includes('sites') || l.includes('projects')) return FaGlobe;
  if (l.includes('tech') || l.includes('modules')) return FaCogs;
  if (l.includes('vitals') || l.includes('score') || l.includes('award')) return FaAward;
  if (l.includes('client') || l.includes('satisfaction') || l.includes('users')) return FaUsers;
  return FaBriefcase;
};

// Animated Stat Counter Component
function StatCounter({ value }) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      setCurrent(value);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start: 'top 90%',
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => setCurrent(Math.round(obj.val)),
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [value]);

  const suffix = value.includes('+') ? '+' : value.includes('%') ? '%' : '';
  return <span ref={elementRef}>{current}{suffix}</span>;
}

// Particle Background component
function ThemeBackground({ theme }) {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${4 + Math.random() * 92}%`,
      top: `${4 + Math.random() * 92}%`,
      size: `${2 + Math.random() * 4}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${5 + Math.random() * 6}s`,
    }));
  }, []);

  if (theme === 'space' || theme === 'nightsky' || theme === 'aurora') {
    return (
      <div className="theme-background-wrapper">
        <div className="space-nebula-cloud top-[-60px] left-[-60px]" />
        <div
          className="space-nebula-cloud bottom-[-60px] right-[-60px]"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--theme-from) 7%, transparent), transparent 70%)' }}
        />
        {particles.map((p) => (
          <div
            key={p.id}
            className="twinkle-star"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'forest') {
    return (
      <div className="theme-background-wrapper">
        {particles.map((p) => (
          <div
            key={p.id}
            className="forest-leaf-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'sunset' || theme === 'desert') {
    return (
      <div className="theme-background-wrapper">
        {particles.map((p) => (
          <div
            key={p.id}
            className="sunset-ember-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'ocean') {
    return (
      <div className="theme-background-wrapper">
        {particles.map((p) => (
          <div
            key={p.id}
            className="ocean-bubble-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'rainy') {
    return (
      <div className="theme-background-wrapper">
        {particles.map((p) => (
          <div
            key={p.id}
            className="rain-splash-line"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: `${1 + Math.random() * 0.8}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'snowy') {
    return (
      <div className="theme-background-wrapper">
        {particles.map((p) => (
          <div
            key={p.id}
            className="snow-flake-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'sakura') {
    return (
      <div className="theme-background-wrapper">
        {particles.map((p) => (
          <div
            key={p.id}
            className="sakura-petal-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="theme-background-wrapper">
      <div className="neon-scanline-beam" />
    </div>
  );
}

// Sub-component for individual card content
function CardContent({ job, idx, theme, isLatest }) {
  return (
    <>
      <ThemeBackground theme={theme} />
      <div className="relative z-10 p-5 sm:p-6 md:p-7 space-y-4 sm:space-y-5 overflow-y-auto hide-scrollbar max-h-[85vh] md:max-h-none md:overflow-visible overscroll-contain">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="futuristic-company-badge">
              <div
                className="badge-orbit-ring"
                style={{ borderColor: 'color-mix(in srgb, var(--theme-to) 25%, transparent)' }}
              >
                <div className="badge-orbit-node" />
              </div>
              <div className="badge-icon-core text-white">
                {job.badgeIcon === 'rocket' ? (
                  <FaRocket
                    className="text-xl text-theme-to"
                    style={{ color: 'var(--theme-to)', filter: 'drop-shadow(0 0 6px var(--theme-to))' }}
                  />
                ) : (
                  <FaTerminal
                    className="text-xl text-theme-from"
                    style={{ color: 'var(--theme-from)', filter: 'drop-shadow(0 0 6px var(--theme-from))' }}
                  />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  MISSION // 0{idx + 1}
                </span>
                {isLatest && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    CURRENT ROLE
                  </span>
                )}
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {job.role}
              </h3>
              <p className="text-sm font-semibold text-slate-300 mt-0.5 flex items-center gap-2">
                <span className="bg-gradient-to-r from-theme-from to-theme-to bg-clip-text text-transparent font-bold">
                  {job.company}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <FaCalendarAlt className="text-[10px] text-slate-500" />
                  {job.period}
                </span>
              </p>
            </div>
          </div>

          <div className="self-start sm:self-center">
            <div className="active-pulse-beacon">
              {job.status === 'ACTIVE' ? (
                <>
                  <div
                    className="beacon-dot"
                    style={{ backgroundColor: 'var(--theme-to)', boxShadow: '0 0 10px var(--theme-to)' }}
                  />
                  <span className="text-[11px] font-mono font-bold tracking-wider" style={{ color: 'var(--theme-to)' }}>
                    MISSION ACTIVE
                  </span>
                </>
              ) : (
                <>
                  <div className="beacon-dot" style={{ backgroundColor: 'var(--theme-muted)' }} />
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400">
                    ACCOMPLISHED
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mission Summary Callout */}
        <div className="relative pl-4 sm:pl-5 py-1.5">
          <div
            className="objective-left-accent"
            style={{ background: 'linear-gradient(to bottom, var(--theme-from), var(--theme-to))' }}
          />
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed italic">
            "{job.summary}"
          </p>
        </div>

        {/* Key Mission Objectives */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-mono text-slate-400 font-bold block tracking-wider uppercase">
            // Core Responsibilities & Impact
          </span>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {job.points.map((point, pIdx) => (
              <div
                key={pIdx}
                className="objective-item-row flex items-start gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5 relative overflow-hidden"
              >
                <div
                  className="objectives-bullet-glow mt-0.5 shrink-0"
                  style={{
                    color: 'var(--theme-to)',
                    borderColor: 'color-mix(in srgb, var(--theme-to) 25%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--theme-to) 8%, transparent)',
                  }}
                >
                  ✓
                </div>
                <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Inventory */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-mono text-slate-400 font-bold block tracking-wider uppercase">
            // Technology Deck
          </span>
          <div className="grid sm:grid-cols-3 gap-2.5">
            {Object.entries(job.techCategories).map(([categoryName, tags]) => (
              <div key={categoryName} className="tech-category-panel">
                <h5 className="text-[11px] font-mono font-bold text-slate-300 tracking-wider mb-2 border-b border-white/5 pb-1 uppercase">
                  {categoryName}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => {
                    const tagMeta = getTagIcon(t);
                    const Icon = tagMeta.icon;
                    return (
                      <div
                        key={t}
                        className="tech-dossier-pill"
                        style={{
                          '--pill-color': tagMeta.color,
                          '--pill-color-shadow': `${tagMeta.color}35`,
                        }}
                      >
                        <Icon className="tech-dossier-icon" />
                        <span>{t}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics & KPIs */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-mono text-slate-400 font-bold block tracking-wider uppercase">
            // Validated Mission Metrics
          </span>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {job.stats.map((s, sIdx) => {
              const Icon = getStatIcon(s.label);
              return (
                <div key={sIdx} className="stat-widget-glass">
                  <div className="flex justify-center">
                    <Icon className="stat-widget-icon" style={{ color: 'var(--theme-to)' }} />
                  </div>
                  <h4 className="text-white font-display font-extrabold text-base sm:text-xl md:text-2xl mt-0.5 tracking-tight">
                    <StatCounter value={s.value} />
                  </h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
          <div className="flex flex-wrap gap-3">
            <a href={job.cta.projectsLink} className="cta-cockpit-primary">
              <span>View Projects</span>
              <FaArrowRight className="text-[10px]" />
            </a>
            <a href="/resume/My-Resume.pdf" className="cta-cockpit-secondary" download>
              <FaDownload className="text-xs" />
              <span>Download Resume</span>
            </a>
          </div>
          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block">
            VERIFIED MISSION DOSSIER • SECURE
          </span>
        </div>
      </div>
    </>
  );
}

export default function Experience() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const card0Ref = useRef(null);
  const card1Ref = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const card0 = card0Ref.current;
    const card1 = card1Ref.current;
    const pinEl = pinWrapperRef.current;
    if (!card0 || !card1 || !pinEl) return;

    const ctx = gsap.context(() => {
      // Set initial positions
      gsap.set(card0, {
        transformOrigin: 'center top',
        y: 0,
        scale: 1,
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
      });

      // Card 1 starts translated down below Card 0, tilted in 3D
      gsap.set(card1, {
        transformOrigin: 'center top',
        yPercent: 120,
        rotateX: 10,
        scale: 0.96,
        opacity: 1,
        filter: 'brightness(0.9) blur(0px)',
      });

      // Pinned stacking scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top 10%',
          end: '+=1300', // 1300px smooth scroll distance
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const activeIdx = self.progress > 0.45 ? 1 : 0;
            setActiveTab(activeIdx);
          },
        },
      });

      // Card 0: scales down to 0.94, tilts up slightly (-30px), dims with 3D depth and shadow
      tl.to(
        card0,
        {
          scale: 0.94,
          y: -30,
          filter: 'brightness(0.62) blur(1.2px)',
          boxShadow: '0 45px 100px rgba(0, 0, 0, 0.95)',
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      // Card 1: slides up over Card 0, straightens rotateX to 0, scales to 1.0, full brightness
      tl.to(
        card1,
        {
          yPercent: 0,
          rotateX: 0,
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          boxShadow: '0 30px 85px rgba(0, 0, 0, 0.9)',
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      );

      tlRef.current = tl;
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const goToCard = (index) => {
    setActiveTab(index);
    const tl = tlRef.current;
    if (tl && tl.scrollTrigger) {
      const start = tl.scrollTrigger.start;
      const end = tl.scrollTrigger.end;
      const targetScroll = index === 0 ? start + 10 : end - 10;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="experience" ref={sectionRef} className="portfolio-section relative">
      {/* Background ambient nebula glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] bg-theme-to/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] max-w-[450px] max-h-[450px] bg-theme-from/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="portfolio-container relative z-10">
        <SectionHeading
          eyebrow="Career Timeline"
          title="Work Experience"
          subtitle="Explore my professional missions in a true 3D stacked deck. Scroll down to watch the cards stack over each other."
        />

        {/* Pinned Card Stack Stage */}
        <div ref={pinWrapperRef} className="relative w-full max-w-5xl mx-auto pt-2">
          {/* Quick-Jump Card Stack Navigation Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                STACK DECK
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-theme-to">
                0{activeTab + 1} / 02
              </span>
            </div>

            <div className="flex items-center gap-2">
              {experience.map((job, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={job.company}
                    type="button"
                    onClick={() => goToCard(idx)}
                    className={`stack-switcher-pill ${isActive ? 'active' : ''}`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isActive ? 'var(--theme-to)' : '#64748b' }}
                    />
                    <span>MISSION // 0{idx + 1}</span>
                    <span className="text-white/30">•</span>
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>{job.company}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stacking Cards Deck Area */}
          <div className="relative w-full [perspective:1400px]">
            {/* Card 0: iB Arts (relative, base of the stack) */}
            <article
              ref={card0Ref}
              className={`experience-stack-card theme-${theme} relative z-10 w-full`}
            >
              <CardContent job={experience[0]} idx={0} theme={theme} isLatest={true} />
            </article>

            {/* Card 1: SB Infowaves (absolute inset-0, stacks directly over Card 0) */}
            <article
              ref={card1Ref}
              className={`experience-stack-card theme-${theme} absolute top-0 left-0 w-full z-20`}
            >
              <CardContent job={experience[1]} idx={1} theme={theme} isLatest={false} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}