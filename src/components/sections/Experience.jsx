import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/experience';
import SectionHeading from '../ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="py-8 md:py-10 lg:py-12">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="My Journey"
          title="Work Experience"
          subtitle="A timeline of my professional career as a frontend developer, listing roles and technologies."
        />
        
        <div className="max-w-3xl mx-auto">
          <div ref={lineRef} className="relative border-l border-white/10 ml-3">
          {experience.map((job, i) => (
            <div key={job.role} className="group mb-12 pl-8 relative" data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-nebula-blue ring-4 ring-space-900 group-hover:scale-125 group-hover:bg-nebula-purple group-hover:shadow-[0_0_12px_rgba(124,58,237,0.8)] transition-all duration-300" />
              <span className="text-xs text-nebula-blue group-hover:text-nebula-purple transition-colors duration-300">{job.period}</span>
              <h3 className="text-white font-display font-semibold mt-1 group-hover:text-nebula-blue transition-colors duration-300">{job.role}</h3>
              <p className="text-slate-400 text-sm">{job.company}</p>
              <ul className="text-slate-400 text-sm mt-3 space-y-2 list-disc list-outside pl-5">
                {job.points.map((p) => <li key={p} className="leading-relaxed">{p}</li>)}
              </ul>
              <div className="flex gap-2 mt-3 flex-wrap">
                {job.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 group-hover:border-nebula-purple/30 transition-colors duration-300">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}