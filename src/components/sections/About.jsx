import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaCode, FaUsers, FaTrophy, FaArrowRight } from "react-icons/fa";
import StatCard from "../ui/StatCard";
import SectionHeading from "../ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const JOIN_DATE = new Date("2023-09-20T00:00:00");

function getExperienceDuration(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
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
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate left story elements
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, x: -50, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Animate right stat cards with 3D elevation
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
          { opacity: 0, y: 55, scale: 0.9, rotateX: 12 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightColRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="portfolio-section relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-nebula-purple/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-nebula-blue/5 blur-[100px] pointer-events-none" />

      <div className="portfolio-container relative z-10">
        <SectionHeading
          eyebrow="My Story"
          title="About Me"
          subtitle="Discover who I am, my core mission, and the professional milestones I have reached."
        />
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div ref={leftColRef} className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
              I'm <span className="bg-gradient-to-r from-theme-from to-theme-to bg-clip-text text-transparent">Shilpa Mukherjee</span>, a Creative Frontend Developer based in India.
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              I specialize in creating highly interactive, modern, and accessible web experiences. With over 2 years of hands-on experience, I enjoy turning complicated problems into simple, beautiful, and intuitive designs.
            </p>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              My expertise covers the React ecosystem, responsive frontend styling, component architecture, and integration of interactive tools like GSAP. Whether building a custom WordPress theme or a heavy React application, I prioritize clean code, performance, and pixel-perfect responsiveness.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-theme-from to-theme-to text-space-950 font-bold text-sm hover:scale-105 shadow-lg shadow-theme-to/20 transition-all duration-300 cursor-pointer"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="text-xs" />
              </a>
              <a
                href="/resume/My-Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-all duration-300"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div ref={rightColRef} className="grid grid-cols-2 gap-4 [perspective:1000px]">
            {stats.map((stat, i) => (
              <StatCard key={i} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}