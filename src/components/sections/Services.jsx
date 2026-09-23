import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaReact, FaWordpress, FaLaptopCode, FaPaintBrush, FaServer, FaArrowRight } from 'react-icons/fa';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import { useTheme } from '../../hooks/ThemeContext';
import '../css/services.css';

gsap.registerPlugin(ScrollTrigger);

// Import background images
import frontendDevBg from '../../assets/services/frontend_dev.webp';
import reactDevBg from '../../assets/services/react_dev.webp';
import wordpressDevBg from '../../assets/services/wordpress_dev.webp';
import optimizationBg from '../../assets/services/optimization.webp';
import uiDevBg from '../../assets/services/ui_dev.webp';
import fullStackBg from '../../assets/services/full_stack.webp';

const iconMap = {
  code: FaCode,
  react: FaReact,
  wordpress: FaWordpress,
  speed: FaLaptopCode,
  design: FaPaintBrush,
  stack: FaServer,
};

const bgMap = {
  frontend_dev: frontendDevBg,
  react_dev: reactDevBg,
  wordpress_dev: wordpressDevBg,
  optimization: optimizationBg,
  ui_dev: uiDevBg,
  full_stack: fullStackBg,
};

function CardParticles({ theme }) {
  if (theme === 'snowy') {
    return (
      <div className="card-particles-container">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="snowflake-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    );
  }
  
  
  if (theme === 'rainy') {
    return (
      <div className="card-particles-container">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="raindrop-particle"
            style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'sakura') {
    return (
      <div className="card-particles-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="sakura-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'forest') {
    return (
      <div className="card-particles-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="firefly-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'sunset') {
    return (
      <div className="card-particles-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="ember-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'ocean') {
    return (
      <div className="card-particles-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="bubble-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'space' || theme === 'nightsky') {
    return (
      <div className="card-particles-container">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="star-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'cloudy') {
    return (
      <div className="card-particles-container">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="fog-particle"
            style={{
              top: `${25 + i * 25}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${7 + i * 3}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'desert') {
    return (
      <div className="card-particles-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="desert-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'cyberpunk') {
    return (
      <div className="card-particles-container">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="cyber-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (theme === 'neon') {
    return (
      <div className="card-particles-container">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="neon-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    );
  }
  return null;
}

export default function Services() {
  const { theme } = useTheme();
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          {
            opacity: 0,
            y: 50,
            rotateX: 10,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="portfolio-section relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-nebula-blue/5 blur-[120px] pointer-events-none" />

      <div className="portfolio-container relative z-10">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services I Offer"
          subtitle="Comprehensive frontend solutions to bring your digital vision to life with high quality."
        />
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]">
          {services.map((s) => {
            const Icon = iconMap[s.icon] || FaCode;
            const bgImage = bgMap[s.bgImage];
            const isActive = activeCard === s.title;
            return (
              <div
                key={s.title}
                className="service-card-wrapper"
              >
                <div
                  className={`service-card theme-${theme} ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setActiveCard(isActive ? null : s.title);
                    }
                  }}
                >
                  {/* Soft animated gradient border */}
                  <div className="service-card-border-glow"></div>

                  {/* Full-card background image */}
                  <div className="service-card-bg-container">
                    <img
                      src={bgImage}
                      className="service-card-bg"
                      alt={s.title}
                      loading="lazy"
                    />
                    <div className="service-card-overlay"></div>
                  </div>

                  {/* Environmental particles overlay */}
                  <CardParticles theme={theme} />

                  {/* Default centered view */}
                  <div className="service-card-default-view">
                    <div className="service-card-icon-wrapper">
                      <Icon className="text-3xl" />
                    </div>
                    <h3 className="service-card-title">{s.title}</h3>
                    <span className="text-[10px] text-slate-400 mt-3 font-semibold tracking-wider uppercase opacity-80 sm:hidden flex items-center gap-1 animate-pulse">
                      Tap to expand
                    </span>
                  </div>

                  {/* Hover Shutter Panel */}
                  <div className="service-card-hover-panel">
                    {/* Diagonal glass reflection sweep */}
                    <div className="glass-reflection-sweep"></div>

                    <div className="panel-header">
                      <h4 className="panel-title">{s.title}</h4>
                      <FaArrowRight className="panel-arrow" />
                    </div>

                    <p className="panel-desc">{s.description}</p>

                    <ul className="panel-features">
                      {s.points.map((p, idx) => (
                        <li
                          key={p}
                          className="stagger-item"
                          style={{ '--delay': `${idx * 80}ms` }}
                        >
                          <span className="stagger-dot" />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="panel-techs">
                      {s.technologies.map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
