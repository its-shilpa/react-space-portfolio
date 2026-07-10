import { skillCategories } from '../../data/skills';
import SkillBar from '../ui/SkillBar';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="What I Know" title="Skills & Expertise" subtitle="Technologies and tools I use to bring ideas to life." />
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6"
            >
              <h3 className="font-display text-white font-semibold mb-4">{cat.title}</h3>
              {cat.skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}