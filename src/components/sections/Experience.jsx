import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { 
  FaRocket, FaTerminal, FaReact, FaVuejs, FaWordpress, 
  FaHtml5, FaCss3Alt, FaCreditCard, FaCode, FaShoppingBag, 
  FaJs, FaGlobe, FaCogs, FaAward, FaUsers, FaBriefcase,
  FaDownload, FaArrowRight
} from 'react-icons/fa';
import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';
import { useTheme } from '../../hooks/ThemeContext';
import '../css/experience.css';

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
  
  useEffect(() => {
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) {
      setCurrent(value);
      return;
    }
    
    const controls = animate(0, numericValue, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setCurrent(Math.round(latest))
    });
    
    return () => controls.stop();
  }, [value]);
  
  const suffix = value.includes('+') ? '+' : value.includes('%') ? '%' : '';
  return <span>{current}{suffix}</span>;
}

// Handcrafted Particle Background component
function ThemeBackground({ theme }) {
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${4 + Math.random() * 92}%`,
      top: `${4 + Math.random() * 92}%`,
      size: `${2 + Math.random() * 5}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${5 + Math.random() * 7}s`
    }));
  }, []);

  if (theme === 'space' || theme === 'nightsky' || theme === 'aurora') {
    return (
      <div className="theme-background-wrapper">
        <div className="space-nebula-cloud top-[-80px] left-[-80px]" />
        <div className="space-nebula-cloud bottom-[-80px] right-[-80px]" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--theme-from) 6%, transparent), transparent 70%)' }} />
        {particles.map(p => (
          <div
            key={p.id}
            className="twinkle-star"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'forest') {
    return (
      <div className="theme-background-wrapper">
        {particles.map(p => (
          <div
            key={p.id}
            className="forest-leaf-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'sunset' || theme === 'desert') {
    return (
      <div className="theme-background-wrapper">
        {particles.map(p => (
          <div
            key={p.id}
            className="sunset-ember-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'ocean') {
    return (
      <div className="theme-background-wrapper">
        {particles.map(p => (
          <div
            key={p.id}
            className="ocean-bubble-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'rainy') {
    return (
      <div className="theme-background-wrapper">
        {particles.map(p => (
          <div
            key={p.id}
            className="rain-splash-line"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: `${1 + Math.random() * 0.8}s`
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'snowy') {
    return (
      <div className="theme-background-wrapper">
        {particles.map(p => (
          <div
            key={p.id}
            className="snow-flake-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'sakura') {
    return (
      <div className="theme-background-wrapper">
        {particles.map(p => (
          <div
            key={p.id}
            className="sakura-petal-particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>
    );
  }

  // default / cyberpunk / neon
  return (
    <div className="theme-background-wrapper">
      <div className="neon-scanline-beam" />
    </div>
  );
}

// Framer Motion staggered transition variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 120 } }
};

export default function Experience() {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeJob = experience[activeIndex];

  // 3D Card Tilt Configuration
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 140 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 140 });

  const rotateX = useTransform(springY, [-300, 300], [5, -5]);
  const rotateY = useTransform(springX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    mouseX.set(x);
    mouseY.set(y);

    const spotlight = spotlightRef.current;
    if (spotlight) {
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      spotlight.style.transform = `translate3d(calc(-50% + ${sx}px), calc(-50% + ${sy}px), 0)`;
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    const spotlight = spotlightRef.current;
    if (spotlight) {
      spotlight.style.transform = 'translate3d(-50%, -50%, 0)';
    }
  };

  return (
    <section id="experience" className="py-10 md:py-16 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-theme-to/5 rounded-full blur-[130px] pointer-events-none z-0" />
      
      <div className="portfolio-container relative z-10">
        <SectionHeading
          eyebrow="My Journey"
          title="Work Experience"
          subtitle="An interactive control dossier detailing my career missions, stats, and technologies."
        />

        <div className="w-full mt-10">
          
          {/* Main 3D Dossier Board */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY }}
            className={`experience-dossier-board theme-${theme}`}
          >
            {/* Spotlight Overlay & Theme-aware particle grids */}
            <div ref={spotlightRef} className="experience-spotlight" />
            <ThemeBackground theme={theme} />

            {/* Inner Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 md:p-7 relative z-10">
              
              {/* Mobile Horizontal Switcher Tabs (Hidden on desktop) */}
              <div className="lg:hidden col-span-1 w-full">
                <div className="mobile-tab-scroll">
                  {experience.map((job, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <div
                        key={job.company}
                        onClick={() => setActiveIndex(idx)}
                        className={`mobile-tab-item ${isActive ? 'active' : ''}`}
                        style={{
                          borderColor: isActive ? 'color-mix(in srgb, var(--theme-to) 31%, transparent)' : 'rgba(255,255,255,0.06)',
                          boxShadow: isActive ? '0 0 12px color-mix(in srgb, var(--theme-to) 15%, transparent)' : ''
                        }}
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] shrink-0">
                          {job.badgeIcon === 'rocket' ? (
                            <FaRocket style={{ color: isActive ? 'var(--theme-to)' : '#94a3b8' }} />
                          ) : (
                            <FaTerminal style={{ color: isActive ? 'var(--theme-from)' : '#94a3b8' }} />
                          )}
                        </div>
                        <div className="text-left">
                          <h4 
                            className={`text-xs font-bold leading-tight transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-theme-from to-theme-to bg-clip-text text-transparent' : 'text-slate-300'}`}
                            style={isActive ? {
                              backgroundImage: 'linear-gradient(to right, var(--theme-from), var(--theme-to))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            } : {}}
                          >
                            {job.company}
                          </h4>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">{job.period}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Left Column: Sidebar Job Switcher (Desktop Only) */}
              <div className="hidden lg:block lg:col-span-4 space-y-4">
                <div className="border-b border-white/10 pb-3 mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 font-bold block tracking-widest uppercase">
                    // Career Mission Logs
                  </span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    DECRYPTED
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {experience.map((job, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <div
                        key={job.company}
                        onClick={() => setActiveIndex(idx)}
                        className={`dossier-sidebar-item ${isActive ? 'active' : ''}`}
                        style={{ borderColor: isActive ? 'color-mix(in srgb, var(--theme-to) 25%, transparent)' : '' }}
                      >
                        <div className="sidebar-scanline" />
                        
                        <div className="flex items-center justify-between">
                          <h4 
                            className={`font-display font-bold text-sm transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-theme-from to-theme-to bg-clip-text text-transparent' : 'text-slate-300'}`}
                            style={isActive ? {
                              backgroundImage: 'linear-gradient(to right, var(--theme-from), var(--theme-to))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            } : {}}
                          >
                            {job.company}
                          </h4>
                          {isActive && (
                            <div className="active-pulse-dot" style={{ backgroundColor: 'var(--theme-to)', boxShadow: `0 0 10px var(--theme-to)` }} />
                          )}
                        </div>
                        
                        <p className="text-xs text-slate-400 font-medium mt-1">
                          {job.role}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3 text-[10px] font-mono text-slate-500">
                          <span>{job.period}</span>
                          <span style={{ color: job.status === 'ACTIVE' ? 'var(--theme-to)' : 'var(--theme-muted)' }}>
                            {job.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Mission dossier details sheet */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="space-y-6"
                  >
                    {/* Header: Company Badge, Title, Period, and Beacon */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-4">
                        
                        {/* Orbiting Ring Badge */}
                        <div className="futuristic-company-badge">
                          <div className="badge-orbit-ring" style={{ borderColor: 'color-mix(in srgb, var(--theme-to) 19%, transparent)' }}>
                            <div className="badge-orbit-node" />
                          </div>
                          <div className="badge-icon-core text-white">
                            {activeJob.badgeIcon === 'rocket' ? (
                              <FaRocket className="text-xl text-theme-to" style={{ color: 'var(--theme-to)', filter: 'drop-shadow(0 0 5px var(--theme-to))' }} />
                            ) : (
                              <FaTerminal className="text-xl text-theme-from" style={{ color: 'var(--theme-from)', filter: 'drop-shadow(0 0 5px var(--theme-from))' }} />
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 
                            className="font-display font-extrabold text-lg md:text-xl tracking-tight leading-none bg-gradient-to-r from-theme-from to-theme-to bg-clip-text text-transparent"
                            style={{
                              backgroundImage: 'linear-gradient(to right, var(--theme-from), var(--theme-to))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            {activeJob.company}
                          </h3>
                          <p className="text-slate-400 text-xs font-semibold mt-1">
                            {activeJob.role} <span className="text-slate-500 font-mono font-medium ml-1.5">• {activeJob.period}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <div className="active-pulse-beacon">
                          {activeJob.status === 'ACTIVE' ? (
                            <>
                              <div className="beacon-dot" style={{ backgroundColor: 'var(--theme-to)', boxShadow: '0 0 10px var(--theme-to)' }} />
                              <span className="text-[10px] font-mono font-bold tracking-wider text-theme-to" style={{ color: 'var(--theme-to)' }}>
                                MISSION ACTIVE
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="beacon-dot" style={{ backgroundColor: 'var(--theme-muted)', boxShadow: 'none' }} />
                              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-500">
                                COMPLETED
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Responsibilities list with left accent and checks */}
                    <motion.div variants={itemVariants} className="space-y-3">
                      <span className="text-[10px] font-mono text-slate-500 font-bold block tracking-wider uppercase">
                        // Mission Objectives
                      </span>
                      <div className="space-y-2.5">
                        {activeJob.points.map((p, idx) => (
                          <div 
                            key={idx} 
                            className="objective-item-row flex items-start gap-4 p-2.5 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-300 relative pl-5 overflow-hidden"
                          >
                            <div className="objective-left-accent" style={{ background: 'linear-gradient(to bottom, var(--theme-from), var(--theme-to))' }} />
                            
                            <div className="objectives-bullet-glow mt-0.5 shrink-0" style={{
                              color: 'var(--theme-to)',
                              borderColor: 'color-mix(in srgb, var(--theme-to) 21%, transparent)',
                              backgroundColor: 'color-mix(in srgb, var(--theme-to) 6%, transparent)'
                            }}>
                              ✓
                            </div>
                            <span className="text-slate-300 text-sm leading-relaxed font-sans">{p}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Categorized Tech Inventory */}
                    <motion.div variants={itemVariants} className="space-y-3">
                      <span className="text-[10px] font-mono text-slate-500 font-bold block tracking-wider uppercase">
                        // Technology Inventory
                      </span>
                      <div className="grid sm:grid-cols-3 gap-4">
                        {Object.entries(activeJob.techCategories).map(([categoryName, tags]) => (
                          <div key={categoryName} className="tech-category-panel">
                            <h5 className="text-white text-xs font-bold tracking-wide mb-2.5 border-b border-white/5 pb-1.5">
                              {categoryName}
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                              {tags.map((t) => {
                                const tagMeta = getTagIcon(t);
                                const Icon = tagMeta.icon;
                                const isReact = t.toLowerCase().includes('react');
                                return (
                                  <div
                                    key={t}
                                    className={`tech-dossier-pill ${isReact ? 'react' : ''}`}
                                    style={{
                                      '--pill-color': tagMeta.color,
                                      '--pill-color-shadow': `${tagMeta.color}35`
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
                    </motion.div>

                    {/* Statistics widgets */}
                    <motion.div variants={itemVariants} className="space-y-3">
                      <span className="text-[10px] font-mono text-slate-500 font-bold block tracking-wider uppercase">
                        // Decrypted Metrics
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {activeJob.stats.map((s, idx) => (
                          <div 
                            key={idx} 
                            className="stat-widget-glass"
                            style={{ borderColor: activeJob.status === 'ACTIVE' ? 'color-mix(in srgb, var(--theme-to) 12.5%, transparent)' : '' }}
                          >
                            <div className="flex justify-center">
                              {(() => {
                                const Icon = getStatIcon(s.label);
                                return <Icon className="stat-widget-icon" style={{ color: 'var(--theme-to)' }} />;
                              })()}
                            </div>
                            
                            <h4 className="text-white font-display font-extrabold text-base sm:text-xl mt-1 tracking-tight">
                              <StatCounter value={s.value} />
                            </h4>
                            <p className="text-[9px] text-slate-500 font-mono tracking-tighter uppercase mt-0.5">
                              {s.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA Cockpit Actions */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-3 border-t border-white/5">
                      <a href={activeJob.cta.projectsLink} className="cta-cockpit-primary">
                        <span>View Projects</span>
                        <FaArrowRight className="text-[10px]" />
                      </a>
                      <a href="/resume/My-Resume.pdf" className="cta-cockpit-secondary" download>
                        <FaDownload className="text-xs" />
                        <span>Download Resume</span>
                      </a>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}