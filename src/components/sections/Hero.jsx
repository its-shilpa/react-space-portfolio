import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-scroll';
import avatar from '../../assets/MyPic.jpg';
import avatarImg from '../../assets/My-Profile.png';
import topPerformer from '../../assets/top-performer-img.png';
import awardImg from '../../assets/award-img.png';
import awardImage from '../../assets/award-image.png';

const roles = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'WordPress Expert',
];

const profileImages = [avatarImg, awardImage, topPerformer];

export default function Hero() {
  const nameRef = useRef(null);
  const imgRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [activeImg, setActiveImg] = useState(0);
  const imgLayerRefs = useRef({});

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

  // Auto-cycle profile images every 3s
  useEffect(() => {
    if (profileImages.length < 2) return;
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % profileImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Crossfade + subtle zoom/blur whenever activeImg changes
  useEffect(() => {
    profileImages.forEach((_, i) => {
      const layer = imgLayerRefs.current[i];
      if (!layer) return;

      if (i === activeImg) {
        gsap.fromTo(
          layer,
          { opacity: 0, scale: 1.08, filter: 'blur(6px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
        );
      } else {
        gsap.to(layer, { opacity: 0, scale: 1, duration: 0.8, ease: 'power2.inOut' });
      }
    });
  }, [activeImg]);

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
    <section
      id="home"
      className="relative z-10 min-h-screen flex flex-col justify-center items-stretch lg:items-center pt-28 pb-[30px] md:pb-[40px] sm:pt-24 overflow-hidden"
    >
      {/* Decorative floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-nebula-purple/8 blur-[60px] sm:blur-[80px] md:blur-[100px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-[10%] right-[5%] w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-nebula-blue/6 blur-[70px] sm:blur-[100px] md:blur-[120px] animate-pulse pointer-events-none"
        style={{ animationDelay: '2s' }}
      />

      <div className="portfolio-container grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
        {/* Text content */}
        <div ref={nameRef} className="flex flex-col justify-center text-left order-2 lg:order-1">
          <div className="self-start inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Available for work</span>
          </div>
          <p className="text-nebula-blue font-medium text-base sm:text-lg tracking-wide">Hello, I'm</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mt-2 sm:mt-3 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Shilpa
            </span>
            <br />
            <span className="bg-gradient-to-r from-nebula-purple via-nebula-blue to-nebula-pink bg-clip-text text-transparent">
              Mukherjee
            </span>
          </h1>
          <div ref={subtitleRef} className="mt-3 sm:mt-4">
            <h2 className="text-lg sm:text-xl md:text-2xl text-slate-300 font-display font-medium h-7 sm:h-8">
              {displayText}
              <span className="inline-block w-0.5 h-5 sm:h-6 bg-nebula-blue ml-1 animate-pulse" />
            </h2>
            <p className="text-slate-400 mt-3 sm:mt-4 max-w-lg leading-relaxed text-sm md:text-base">
              A passionate Frontend Developer with 2+ years of experience crafting
              immersive, high-performance web applications using React, Tailwind CSS,
              and modern JavaScript frameworks.
            </p>
          </div>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8">
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-80}
              className="flex-1 text-center px-6 py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm font-semibold shadow-lg shadow-nebula-purple/25 hover:scale-105 transition-all duration-300"
            >
              View Projects
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <button className="flex-1 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Download Resume
            </button>
          </div>
          {/* Social icons */}
          <div className="flex gap-3 mt-6 sm:mt-8">
            {[
              { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
              { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
            ].map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-nebula-blue hover:border-nebula-blue/50 hover:bg-white/10 transition-all duration-300"
                title={label}
              >
                <Icon className="text-base sm:text-lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Profile image column */}
        <div className="flex items-center justify-center w-full order-1 lg:order-2">
          <div ref={imgRef} className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-nebula-purple/25 via-nebula-blue/15 to-nebula-pink/25 blur-xl sm:blur-2xl animate-pulse pointer-events-none" />

            {/* Rotating border ring */}
            <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 aspect-square shrink-0">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-nebula-purple via-nebula-blue to-nebula-pink p-[2px] sm:p-[3px]"
                style={{ animation: 'spin 12s linear infinite' }}
              >
                <div className="w-full h-full rounded-full bg-space-900" />
              </div>

              {/* Crossfading image stack */}
              <div className="absolute inset-[4px] sm:inset-[6px] w-[calc(100%-8px)] sm:w-[calc(100%-12px)] h-[calc(100%-8px)] sm:h-[calc(100%-12px)] rounded-full overflow-hidden z-10">
                {profileImages.map((src, i) => (
                  <img
                    key={i}
                    ref={(el) => {
                      imgLayerRefs.current[i] = el;
                    }}
                    src={src}
                    alt={`Shilpa Mukherjee ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Image indicator dots */}
            {profileImages.length > 1 && (
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
                {profileImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                      i === activeImg
                        ? 'w-5 sm:w-6 bg-nebula-blue'
                        : 'w-1 sm:w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Elegant Floating badge */}
            <div className="absolute -bottom-1 -right-1 sm:bottom-2 sm:right-2 md:bottom-4 md:right-4 z-20 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-space-800/90 border border-white/10 backdrop-blur-md shadow-lg shadow-black/40">
              <span className="text-[10px] sm:text-xs md:text-sm text-nebula-blue font-bold tracking-wider">2+ YRS</span>
              <p className="text-[8px] sm:text-[10px] text-slate-300 font-medium">Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on very small screens to avoid crowding */}
      <div
        ref={scrollRef}
        className="hidden sm:flex absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
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