import { FaCode, FaReact, FaWordpress, FaLaptopCode, FaPaintBrush, FaServer, FaArrowRight } from 'react-icons/fa';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import { useTheme } from '../../hooks/ThemeContext';
import '../css/services.css';

// Import background images
import frontendDevBg from '../../assets/services/frontend_dev.png';
import reactDevBg from '../../assets/services/react_dev.png';
import wordpressDevBg from '../../assets/services/wordpress_dev.png';
import optimizationBg from '../../assets/services/optimization.png';
import uiDevBg from '../../assets/services/ui_dev.png';
import fullStackBg from '../../assets/services/full_stack.png';

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

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--mouse-x', x.toFixed(3));
    card.style.setProperty('--mouse-y', y.toFixed(3));
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--mouse-x', '0');
    card.style.setProperty('--mouse-y', '0');
  };

  return (
    <section id="services" className="py-8 md:py-10 lg:py-12">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services I Offer"
          subtitle="Comprehensive frontend solutions to bring your digital vision to life with high quality."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || FaCode;
            const bgImage = bgMap[s.bgImage];
            return (
              <div
                key={s.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className={`service-card theme-${theme}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
