import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaArrowDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-scroll';
import avatarImg from '../../assets/My-Profile.webp';
import ibartsimg from '../../assets/ib-arts-img.webp';
import topPerformer from '../../assets/top-performer-img.webp';
import awardImage from '../../assets/award-image.webp';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'WordPress Expert',
];

const profileImages = [
  { src: avatarImg, caption: 'Shilpa Mukherjee' },
  { src: ibartsimg, caption: 'At iB Arts' },
  { src: awardImage, caption: 'Award Recognition' },
  { src: topPerformer, caption: 'Top Performer Award' },
];

function TypingSubtitle() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl text-slate-300 font-display font-medium min-h-[28px] sm:min-h-[32px] whitespace-nowrap overflow-hidden">
      {displayText}
      <span className="inline-block w-0.5 h-5 sm:h-6 bg-nebula-blue ml-1 animate-pulse" />
    </h2>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const imgRef = useRef(null);
  const scrollRef = useRef(null);
  const shockwaveRef = useRef(null);
  const badgeRef = useRef(null);

  const [activeImg, setActiveImg] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const imgLayerRefs = useRef({});
  const prevImgRef = useRef(0);

  const nextImage = useCallback(() => {
    setActiveImg((prev) => (prev + 1) % profileImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setActiveImg((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  }, []);

  // Auto-cycle profile images every 3.5s with pause support
  useEffect(() => {
    if (profileImages.length < 2 || isPaused) return;
    const interval = setInterval(nextImage, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextImage]);

  // Dynamic GSAP Banner Image Transition (3D Morph, Clip-path wipe & Shockwave)
  useEffect(() => {
    const prev = prevImgRef.current;
    const current = activeImg;
    prevImgRef.current = current;

    profileImages.forEach((_, i) => {
      const layer = imgLayerRefs.current[i];
      if (!layer) return;

      if (i === current) {
        // Incoming banner image sequence
        gsap.killTweensOf(layer);
        gsap.fromTo(
          layer,
          {
            opacity: 0,
            scale: 1.18,
            rotation: 2.5,
            clipPath: 'circle(12% at 50% 50%)',
            filter: 'blur(8px) brightness(1.25)',
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            clipPath: 'circle(100% at 50% 50%)',
            filter: 'blur(0px) brightness(1)',
            duration: 1.05,
            ease: 'power3.out',
          }
        );
      } else if (i === prev) {
        // Outgoing image pulls back gracefully
        gsap.killTweensOf(layer);
        gsap.to(layer, {
          opacity: 0,
          scale: 0.94,
          filter: 'blur(5px)',
          duration: 0.75,
          ease: 'power2.inOut',
        });
      } else {
        gsap.set(layer, { opacity: 0 });
      }
    });

    // Shockwave pulse animation
    if (shockwaveRef.current) {
      gsap.fromTo(
        shockwaveRef.current,
        { scale: 0.92, opacity: 0.75 },
        { scale: 1.35, opacity: 0, duration: 0.85, ease: 'power2.out' }
      );
    }

    // Badge spring bounce reaction
    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 1.1, y: -3 },
        { scale: 1, y: 0, duration: 0.5, ease: 'back.out(2.2)' }
      );
    }
  }, [activeImg]);

  // GSAP entrance animations & Scroll Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline on individual child elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        imgRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)' },
        '-=0.6'
      )
      .fromTo(
        scrollRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Parallax on scroll (gentle drift without shrinking image or pushing text out of view)
      gsap.to(nameRef.current, {
        y: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(imgRef.current, {
        y: 45,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative z-10 min-h-[90vh] flex flex-col justify-center items-stretch lg:items-center pt-24 sm:pt-28 pb-[25px] md:pb-[35px] lg:pb-[50px] overflow-visible"
    >
      {/* Decorative floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-nebula-purple/10 blur-[60px] sm:blur-[80px] md:blur-[100px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-[10%] right-[5%] w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-nebula-blue/8 blur-[70px] sm:blur-[100px] md:blur-[120px] animate-pulse pointer-events-none"
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
          <div className="mt-3 sm:mt-4">
            <TypingSubtitle />
            <p className="text-theme-muted mt-3 sm:mt-4 max-w-lg leading-relaxed text-sm md:text-base">
              A passionate Frontend Developer with 2+ years of experience crafting
              immersive, high-performance web applications using React, Tailwind CSS,
              and modern JavaScript frameworks.
            </p>
          </div>

          {/* Action buttons & Social icons cluster */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-7">
            <Link
              to="projects"
              smooth
              duration={500}
              offset={-80}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-xs sm:text-sm font-semibold shadow-lg shadow-nebula-purple/25 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>View Projects</span>
              <span className="inline-block ml-1.5 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="/resume/My-Resume.pdf"
              download
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 text-white text-xs sm:text-sm font-medium hover:bg-white/5 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Download Resume
            </a>
            <div className="flex items-center gap-2 sm:gap-2.5 pl-0.5">
              {[
                { icon: FaGithub, url: 'https://github.com/its-shilpa/', label: 'GitHub' },
                { icon: FaLinkedin, url: 'https://www.linkedin.com/in/shilpa-mukherjee/', label: 'LinkedIn' },
              ].map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border flex items-center justify-center transition-all duration-300 social-icon-btn ${label.toLowerCase()}`}
                  title={label}
                  aria-label={label}
                >
                  <Icon className="text-base sm:text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Profile / Banner image column */}
        <div className="flex items-center justify-center w-full order-1 lg:order-2">
          <div
            ref={imgRef}
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Pulsing Shockwave Aura on transition */}
            <div
              ref={shockwaveRef}
              className="absolute -inset-6 sm:-inset-10 rounded-full border-2 border-nebula-blue/40 pointer-events-none opacity-0"
            />

            {/* Outer ambient glow ring */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-nebula-purple/30 via-nebula-blue/20 to-nebula-pink/30 blur-xl sm:blur-2xl animate-pulse pointer-events-none" />

            {/* Rotating border ring */}
            <div className="relative w-44 h-44 xs:w-52 xs:h-52 sm:w-64 sm:h-64 md:w-76 md:h-76 lg:w-84 lg:h-84 xl:w-96 xl:h-96 aspect-square shrink-0">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-nebula-purple via-nebula-blue to-nebula-pink p-[2px] sm:p-[3px]"
                style={{ animation: 'spin 14s linear infinite' }}
              >
                <div className="w-full h-full rounded-full bg-space-900" />
              </div>

              {/* Animated image stack with GSAP clip-path and morph */}
              <div className="absolute inset-[4px] sm:inset-[6px] w-[calc(100%-8px)] sm:w-[calc(100%-12px)] h-[calc(100%-8px)] sm:h-[calc(100%-12px)] rounded-full overflow-hidden z-10 shadow-2xl">
                {profileImages.map((img, i) => (
                  <img
                    key={i}
                    ref={(el) => {
                      imgLayerRefs.current[i] = el;
                    }}
                    src={img.src}
                    alt={img.caption}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                    fetchPriority={i === 0 ? 'high' : undefined}
                  />
                ))}

                {/* Subtle vignette layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Quick prev/next chevron hover controls */}
              <button
                type="button"
                aria-label="Previous profile image"
                onClick={prevImage}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-space-900/80 border border-white/20 text-white flex items-center justify-center hover:bg-nebula-blue hover:text-space-950 shadow-lg cursor-pointer"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>
              <button
                type="button"
                aria-label="Next profile image"
                onClick={nextImage}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-space-900/80 border border-white/20 text-white flex items-center justify-center hover:bg-nebula-blue hover:text-space-950 shadow-lg cursor-pointer"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>

            {/* Image indicator dots & caption */}
            {profileImages.length > 1 && (
              <div className="absolute -bottom-7 sm:-bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20">
                <div className="flex gap-1.5 sm:gap-2">
                  {profileImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`Show image ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                        i === activeImg
                          ? 'w-6 sm:w-8 bg-gradient-to-r from-theme-from to-theme-to shadow-[0_0_10px_var(--theme-to)]'
                          : 'w-1.5 bg-white/20 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Elegant Floating experience badge with GSAP bounce */}
            <div
              ref={badgeRef}
              className="absolute -bottom-1 -right-1 sm:bottom-2 sm:right-2 md:bottom-4 md:right-4 z-20 px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-space-800/90 border border-white/10 backdrop-blur-md shadow-xl shadow-black/50"
            >
              <span className="text-[11px] sm:text-xs md:text-sm text-nebula-blue font-bold tracking-wider">
                2+ YRS
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-300 font-medium">Experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="hidden lg:flex absolute bottom-2 left-1/2 -translate-x-1/2"
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