import { useState, useEffect, useCallback, useMemo } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { projects } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';

const filters = ["All", "JS Project", "WordPress Project", "WooCommerce Project"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );
  const count = visible.length;

  useEffect(() => setIndex(0), [active]);

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const offsetOf = (i) => {
    let d = i - index;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  const cardTransform = (offset) => {
    const abs = Math.abs(offset);
    if (abs > 2) {
      return { 
        transform: 'translate(-50%,-50%) translate3d(0,0,-400px) scale(0.4)', 
        opacity: 0, 
        pointerEvents: 'none', 
        zIndex: 0 
      };
    }
    const dir = Math.sign(offset);
    
    let tx = 0;
    let tz = 0;
    let ry = 0;
    let scale = 1.0;
    
    if (offset === 0) {
      tx = 0;
      tz = 0;
      ry = 0;
      scale = 1.05;
    } else {
      // Curve spread spacing for side cards
      const spacing = isMobile ? 54 : 68;
      tx = dir * spacing * (abs === 1 ? 1 : 1.6);
      tz = isMobile ? -80 * abs : -150 * abs;
      ry = -28 * dir; // Tilted inwards
      scale = isMobile ? 0.74 - (abs - 1) * 0.15 : 0.8 - (abs - 1) * 0.12;
    }

    const opacity = offset === 0 ? 1 : (abs === 1 ? 0.65 : 0.25);
    const z = 30 - abs * 10;
    
    return {
      transform: `translate(-50%,-50%) translate3d(${tx}%, 0px, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex: z,
      pointerEvents: offset === 0 ? 'auto' : 'pointer',
    };
  };

  if (!count) return null;

  return (
    <section id="projects" className="py-14 md:py-20 relative overflow-hidden">
      <div className="portfolio-container relative">
        <SectionHeading
          eyebrow="My Work"
          title="Featured Projects"
          subtitle="Explore a collection of projects I've built across different technologies and domains."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 md:mb-14 px-2" data-aos="fade-up">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition duration-300 whitespace-nowrap cursor-pointer ${
                active === f
                  ? 'bg-nebula-blue text-space-950 border-nebula-blue shadow-[0_0_15px_rgba(var(--nebula-blue),0.25)]'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Stage */}
        <div className="relative">
          {/* ambient glows */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[560px] h-[85vw] max-h-[560px] rounded-full bg-nebula-purple/15 blur-[120px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[320px] h-[55vw] max-h-[320px] rounded-full bg-nebula-blue/20 blur-[100px]" />

          <div
            className="relative h-[430px] sm:h-[470px] md:h-[510px] lg:h-[550px] [perspective:2000px] [transform-style:preserve-3d] overflow-visible mb-6"
            data-aos="fade-up"
          >
            {visible.map((p, i) => {
              const offset = offsetOf(i);
              const isActive = offset === 0;
              const style = cardTransform(offset);
              return (
                <article
                  key={p.title}
                  style={style}
                  onClick={() => !isActive && goTo(i)}
                  className={`absolute left-1/2 top-1/2 w-[82vw] max-w-[280px] sm:max-w-[310px] md:max-w-[340px] lg:max-w-[380px] flex flex-col ${
                    isActive ? 'cursor-default' : 'cursor-pointer'
                  } transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] rounded-2xl overflow-hidden border backdrop-blur-xl [transform-style:preserve-3d] ${
                    isActive
                      ? 'border-nebula-blue/60 shadow-[0_0_50px_-8px_var(--nebula-blue)] bg-gradient-to-b from-white/[0.08] to-white/[0.02]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                  }`}
                >
                  {/* inner hairline glow ring */}
                  <div className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isActive ? 'ring-1 ring-inset ring-nebula-blue/35' : 'ring-1 ring-inset ring-white/5'
                  }`} />

                  {/* Featured Tag (visible on active card) */}
                  <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-nebula-blue/15 text-nebula-blue border border-nebula-blue/40 backdrop-blur-md shadow-[0_0_10px_var(--nebula-blue)]/20 transition-all duration-500 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                  }`}>
                    Featured
                  </span>

                  {/* Card Image Area */}
                  <div className={`relative w-full bg-space-950 overflow-hidden shrink-0 transition-all duration-500 ${isActive ? 'aspect-video' : 'aspect-[4/3] sm:aspect-[16/10]'}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-950/95 via-space-950/20 to-transparent" />
                  </div>

                  {/* Card Details Area */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 transition-all duration-500">
                    <h3
                      className={`font-display font-bold transition-all duration-500 ${
                        isActive 
                          ? 'text-base sm:text-lg lg:text-xl text-nebula-blue font-semibold' 
                          : 'text-xs sm:text-sm text-white'
                      }`}
                    >
                      {p.title}
                    </h3>

                    {/* Description - transitions text style and clamp */}
                    <p
                      className={`transition-all duration-500 mt-1.5 leading-relaxed text-[11px] sm:text-xs md:text-sm ${
                        isActive
                          ? 'text-slate-300'
                          : 'text-slate-500 line-clamp-2'
                      }`}
                    >
                      {p.description}
                    </p>

                    {/* Tags - unfolds and fades in for active card */}
                    <div
                      className={`flex gap-1.5 flex-wrap transition-all duration-500 origin-top overflow-hidden ${
                        isActive
                          ? 'mt-3.5 max-h-[80px] opacity-100'
                          : 'max-h-0 opacity-0 pointer-events-none mt-0'
                      }`}
                    >
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 font-medium border border-white/10 hover:border-nebula-blue/30 transition duration-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons - unfolds and fades in for active card */}
                    <div
                      className={`flex items-center gap-3 transition-all duration-500 origin-top overflow-hidden ${
                        isActive
                          ? 'mt-4 pt-1 max-h-[60px] opacity-100'
                          : 'max-h-0 opacity-0 pointer-events-none mt-0'
                      }`}
                    >
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-[10px] sm:text-xs font-semibold px-3 py-2 rounded-xl bg-gradient-to-r from-theme-from to-theme-to text-space-950 hover:brightness-110 shadow-[0_0_15px_rgba(var(--nebula-blue),0.2)] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Live Demo <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center text-[10px] sm:text-xs font-semibold px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FaGithub /> GitHub
                      </a>
                    </div>

                    {/* Arrow Next indicator (visible on inactive cards) */}
                    <div
                      className={`mt-auto pt-3 flex justify-end transition-all duration-500 origin-bottom overflow-hidden ${
                        !isActive
                          ? 'max-h-[50px] opacity-100'
                          : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white hover:border-white/20 transition duration-300">
                        <FaArrowRight className="text-[10px]" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Space Dock — glowing platform rings under the stack */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-45px] sm:bottom-[-55px] w-[95%] max-w-[700px] h-[140px] flex items-end justify-center [perspective:1000px] [transform-style:preserve-3d] overflow-visible z-0">
            <div 
              className="relative w-full h-full flex items-center justify-center transition-transform duration-1000"
              style={{ transform: 'rotateX(78deg)' }}
            >
              {/* Outer rotating dashed tech ring */}
              <div className="absolute w-[100%] h-[100%] rounded-full border-2 border-dashed border-nebula-blue/15 animate-[spin_50s_linear_infinite]" />
              
              {/* Middle rotating solid double ring */}
              <div className="absolute w-[82%] h-[82%] rounded-full border border-double border-nebula-blue/25 animate-[spin_30s_linear_infinite_reverse]" />
              
              {/* Inner glowing radar ring */}
              <div className="absolute w-[64%] h-[64%] rounded-full border border-nebula-blue/35 shadow-[inset_0_0_20px_var(--nebula-blue)]/20" 
                style={{ boxShadow: 'inset 0 0 20px var(--nebula-blue)' }}
              />
              
              {/* Central pad ring */}
              <div className="absolute w-[44%] h-[44%] rounded-full border-2 border-nebula-blue/45" />

              {/* Core glowing sources */}
              <div className="absolute w-[26%] h-[26%] rounded-full bg-nebula-blue/20 blur-xl animate-pulse" />
              <div className="absolute w-[12%] h-[12%] rounded-full bg-nebula-blue/45 blur-md" />
            </div>
          </div>

          {/* Arrow nav */}
          {count > 1 && (
            <>
              <button
                aria-label="Previous project"
                onClick={prev}
                className="flex absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-nebula-blue hover:border-nebula-blue/40 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                aria-label="Next project"
                onClick={next}
                className="flex absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 z-40 items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-nebula-blue hover:border-nebula-blue/40 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </>
          )}
        </div>

        {/* Progress / index caption */}
        {count > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-16 md:mt-20 px-4 text-center" data-aos="fade-up">
            <span className="text-xs font-mono text-nebula-blue border border-nebula-blue/30 bg-nebula-blue/10 rounded px-2 py-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {visible.map((p, i) => (
                <button
                  key={p.title}
                  aria-label={`Go to ${p.title}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === index ? 'w-6 bg-nebula-blue' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">{visible[index]?.title}</span>
          </div>
        )}
      </div>
    </section>
  );
}