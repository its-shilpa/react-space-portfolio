import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data/projects';
import SectionHeading from '../ui/SectionHeading';

const filters = ["All", "Frontend", "React", "REST API", "Tailwind CSS"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const visible = active === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="My Work"
          title="Featured Projects"
          subtitle="A showcase of recent applications and platforms I have built with modern web technologies."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition duration-300 ${
                active === f
                  ? 'bg-nebula-blue text-space-900 border-nebula-blue font-semibold'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, idx) => (
            <div
              key={p.title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video bg-space-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-display font-semibold text-lg group-hover:text-nebula-blue transition duration-300">
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {p.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 font-medium border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-white/5 flex justify-between items-center">
                <a
                  href={p.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5 font-medium"
                >
                  <FaGithub className="text-sm" /> GitHub
                </a>
                <a
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-nebula-blue hover:text-nebula-blue/80 hover:underline transition flex items-center gap-1.5 font-semibold"
                >
                  Live Demo <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}