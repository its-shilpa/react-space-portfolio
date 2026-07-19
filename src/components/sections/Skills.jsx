import SkillOrbit from '../ui/SkillOrbit';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-8 md:py-10 lg:py-12">
      <div className="portfolio-container">
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