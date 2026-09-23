import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillOrbit from '../ui/SkillOrbit';
import SectionHeading from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const orbitWrapperRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (orbitWrapperRef.current) {
        gsap.fromTo(
          orbitWrapperRef.current,
          {
            opacity: 0,
            scale: 0.94,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: orbitWrapperRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="portfolio-section relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-nebula-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="portfolio-container relative z-10">
        <SectionHeading
          eyebrow="What I Know"
          title="Skills & Expertise"
          subtitle="Technologies, libraries, and design workflows I use to bring ideas to life."
        />
        <div ref={orbitWrapperRef}>
          <SkillOrbit />
        </div>
      </div>
    </section>
  );
}