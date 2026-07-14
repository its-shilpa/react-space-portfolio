import { FaBriefcase, FaCode, FaUsers, FaTrophy } from 'react-icons/fa';
import StatCard from '../ui/StatCard';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  const stats = [
    { icon: FaBriefcase, value: "2+ Years", label: "Experience" },
    { icon: FaCode, value: "15+ Projects", label: "Completed" },
    { icon: FaUsers, value: "500k+", label: "Active Users Reached" },
    { icon: FaTrophy, value: "3+ Awards", label: "Won & Certified" },
  ];

  return (
    <section id="about" className="py-24">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="My Story"
          title="About Me"
          subtitle="Discover who I am, my core mission, and the professional milestones I have reached."
        />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="space-y-6">
            <h3 className="text-2xl font-display font-semibold text-white">
              I'm Shilpa Mukherjee, a Creative Frontend Developer based in India.
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I specialize in creating highly interactive, modern, and accessible web experiences. With over 2 years of hands-on experience, I enjoy turning complicated problems into simple, beautiful, and intuitive designs.
            </p>
            <p className="text-slate-300 leading-relaxed">
              My expertise covers the React ecosystem, responsive frontend styling, component architecture, and integration of interactive tools like GSAP. Whether building a custom WordPress theme or a heavy React application, I prioritize clean code, performance, and pixel-perfect responsiveness.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm font-medium hover:opacity-90 transition duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}