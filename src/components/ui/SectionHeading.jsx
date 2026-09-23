import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeading({ eyebrow, title, subtitle }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="text-center mb-8 md:mb-12">
      {eyebrow && (
        <span className="inline-block text-nebula-blue text-xs sm:text-sm font-mono tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-theme-from via-theme-via to-theme-to bg-clip-text text-transparent mt-1 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-theme-muted mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-4">
          {subtitle}
        </p>
      )}
    </div>
  );
}