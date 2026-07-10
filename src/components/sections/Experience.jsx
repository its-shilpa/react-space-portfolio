import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../../data/experience';

gsap.registerPlugin(ScrollTrigger); // imports + this line go at the top, run once

export default function Experience() {
  const lineRef = useRef(null); // 1. create the ref

  useEffect(() => {
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
  }, []); // 2. run the animation once, after first render

  return (
    <section id="experience" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div ref={lineRef} className="relative border-l border-white/10 ml-3">
          {/* 3. attach the ref to the element with the vertical line */}
          {experience.map((job, i) => (
            <div key={job.role} className="mb-12 pl-8 relative" data-aos={i % 2 === 0 ? 'fade-right' : 'fade-left'}>
              <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-nebula-blue ring-4 ring-space-900" />
              <span className="text-xs text-nebula-blue">{job.period}</span>
              <h3 className="text-white font-display font-semibold mt-1">{job.role}</h3>
              <p className="text-slate-400 text-sm">{job.company}</p>
              <ul className="text-slate-400 text-sm mt-3 space-y-1 list-disc list-inside">
                {job.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div className="flex gap-2 mt-3 flex-wrap">
                {job.tags.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
}