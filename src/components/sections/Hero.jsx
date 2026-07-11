import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-scroll';
import avatar from '../../assets/MyPic.jpg';

const roles = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'WordPress Expert',
];

export default function Hero() {
  const nameRef = useRef(null);
  const imgRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(nameRef.current, { y: 60, opacity: 0, duration: 1 })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from(imgRef.current, { scale: 0.6, opacity: 0, duration: 1, ease: 'back.out(1.4)' }, '-=0.6')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(scrollRef.current, { y: -10, opacity: 0, duration: 0.5 }, '-=0.2');
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative z-10 min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Decorative floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-nebula-purple/8 blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-nebula-blue/6 blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div className="max-w-6xl mx-auto w-full px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div ref={nameRef}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">Available for work</span>
          </div>

          <p className="text-nebula-blue font-medium text-lg tracking-wide">Hello, I'm</p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mt-3 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Shilpa
            </span>
            <br />
            <span className="bg-gradient-to-r from-nebula-purple via-nebula-blue to-nebula-pink bg-clip-text text-transparent">
              Mukherjee
            </span>
          </h1>

          <div ref={subtitleRef} className="mt-4">
            <h2 className="text-xl md:text-2xl text-slate-300 font-display font-medium h-8">
              {displayText}
              <span className="inline-block w-0.5 h-6 bg-nebula-blue ml-1 animate-pulse" />
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg leading-relaxed text-sm md:text-base">
              A passionate Frontend Developer with 2+ years of experience crafting
              immersive, high-performance web applications using React, Tailwind CSS,
              and modern JavaScript frameworks.
            </p>
          </div>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-8">
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-80}
              className="group cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm font-semibold shadow-lg shadow-nebula-purple/25 hover:shadow-nebula-purple/40 hover:scale-105 transition-all duration-300"
            >
              View Projects
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <button className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 hover:border-white/40 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Download Resume
            </button>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mt-8">
            {[
              { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
              { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
            ].map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-nebula-blue hover:border-nebula-blue/50 hover:bg-white/10 transition-all duration-300"
                title={label}
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Profile image */}
        <div ref={imgRef} className="justify-self-center relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-nebula-purple/30 via-nebula-blue/20 to-nebula-pink/30 blur-xl animate-pulse" />

          {/* Rotating border ring */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-nebula-purple via-nebula-blue to-nebula-pink p-[3px]"
              style={{ animation: 'spin 8s linear infinite' }}
            >
              <div className="w-full h-full rounded-full bg-space-900" />
            </div>

            {/* Actual image */}
            <img
              src={avatar}
              alt="Shilpa Mukherjee"
              className="absolute inset-[6px] rounded-full object-cover z-10"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-2 -right-2 md:bottom-2 md:right-0 z-20 px-4 py-2 rounded-xl bg-space-800/90 border border-white/10 backdrop-blur-md shadow-lg">
            <span className="text-xs text-nebula-blue font-bold">2+ YRS</span>
            <p className="text-[10px] text-slate-400">Experience</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Link
          to="skills"
          smooth
          duration={500}
          offset={-80}
          className="cursor-pointer flex flex-col items-center gap-2 text-slate-500 hover:text-nebula-blue transition-colors duration-300"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll Down</span>
          <FaArrowDown className="text-sm animate-bounce" />
        </Link>
      </div>
    </section>
  );
}