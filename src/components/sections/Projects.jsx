import { useState } from 'react';
import { projects } from '../../data/projects';

const filters = ["All", "Frontend", "React", "Backend", "WordPress", "Full Stack"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const visible = active === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                active === f ? 'bg-nebula-blue text-space-900' : 'bg-white/5 text-slate-300 border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <div key={p.title} data-aos="fade-up" className="rounded-xl overflow-hidden bg-white/5 border border-white/10 group">
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition duration-500" />
              <div className="p-4">
                <h3 className="text-white font-semibold">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{p.description}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {p.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}