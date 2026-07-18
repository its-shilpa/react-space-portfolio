import { useEffect, useState } from "react";
import { FaBriefcase, FaCode, FaUsers, FaTrophy } from "react-icons/fa";
import StatCard from "../ui/StatCard";
import SectionHeading from "../ui/SectionHeading";

const JOIN_DATE = new Date("2023-09-20T00:00:00");

function getExperienceDuration(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    // days in the month before `to`
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

function useExperienceCounter(joinDate) {
  const [duration, setDuration] = useState(() =>
    getExperienceDuration(joinDate, new Date())
  );

  useEffect(() => {
    // recalculate once a minute — plenty for a day-level counter,
    // cheap on renders
    const interval = setInterval(() => {
      setDuration(getExperienceDuration(joinDate, new Date()));
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [joinDate]);

  return duration;
}

function ExperienceValue() {
  const { years, months, days } = useExperienceCounter(JOIN_DATE);

  return (
    <span className="inline-flex items-baseline gap-1 font-display font-bold">
      <span className="bg-gradient-to-r from-nebula-purple via-nebula-blue to-cyan-400 bg-clip-text text-transparent">
        {years}
        <span className="text-base align-top">y</span>
      </span>
      <span className="bg-gradient-to-r from-nebula-blue via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
        {months}
        <span className="text-base align-top">m</span>
      </span>
      <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-nebula-purple bg-clip-text text-transparent">
        {days}
        <span className="text-base align-top">d</span>
      </span>
    </span>
  );
}

export default function About() {
  const stats = [
    {
      icon: FaBriefcase,
      value: <ExperienceValue />,
      label: "Experience",
    },
    { icon: FaCode, value: "50+ Projects", label: "Completed" },
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