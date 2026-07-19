import SkillOrbit from '../ui/SkillOrbit';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="What I Know"
          title="Skills & Expertise"
          subtitle="Technologies and tools I use to bring ideas to life."
        />
        <SkillOrbit />
      </div>
    </section>
  );
}