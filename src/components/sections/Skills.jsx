import { skillCategories } from '../../data/skills';
import StarMeter from '../ui/StarMeter';
import OrbitGauge from '../ui/OrbitGauge';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="What I Know"
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to bring ideas to life."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => {
            const avg = Math.round(
              cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length
            );
            return (
              <div
                key={cat.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 overflow-hidden hover:border-white/20 transition-colors"
              >
                {/* faint corner stars, echoes the hero starfield */}
                <span className="absolute top-5 right-20 w-1 h-1 rounded-full bg-white/30" />
                <span className="absolute bottom-8 left-10 w-0.5 h-0.5 rounded-full bg-white/20" />

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-white font-semibold">{cat.title}</h3>
                  <OrbitGauge value={avg} color={cat.skills[0]?.color || '#22d3ee'} />
                </div>

                <div className="divide-y divide-white/5">
                  {cat.skills.map((s) => (
                    <StarMeter key={s.name} name={s.name} level={s.level} color={s.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}