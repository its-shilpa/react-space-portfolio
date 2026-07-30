import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { HiSparkles } from 'react-icons/hi2';

const quickLinks = ["Home", "Skills", "About", "Experience", "Projects", "Services", "Achievements", "Contact"];
const socials = [
  { icon: FaGithub, url: "https://github.com/its-shilpa/", name: "github" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/shilpa-mukherjee/", name: "linkedin" },
  { icon: FaInstagram, url: "https://www.instagram.com/snowy_shilpa/", name: "instagram" },
  { icon: FaEnvelope, url: "mailto:shilpa.mukherjee625@gmail.com", name: "envelope" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-[30px] md:pt-[40px] pb-12">
      <div className="portfolio-container grid sm:grid-cols-3 gap-10">
        <div>
          {/* Premium Footer Logo */}
          <Link to="home" smooth duration={500} className="cursor-pointer flex items-center gap-2.5 group mb-4 inline-flex">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center shadow-lg shadow-nebula-purple/20 group-hover:shadow-nebula-purple/40 group-hover:scale-110 transition-all duration-300 animate-logo-glow">
              <HiSparkles className="text-white text-base animate-logo-sparkle" />
            </div>
            <div className="flex flex-col leading-none">
              <span 
                className="font-display font-extrabold text-base bg-clip-text text-transparent animate-text-shimmer"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--theme-from), var(--theme-via), var(--theme-to), var(--theme-via), var(--theme-from))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Shilpa Mukherjee
              </span>
              <span className="text-[8px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-0.5">
                Digital Space
              </span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            Frontend Developer building modern, high-performance, and visually stunning web experiences.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
            {quickLinks.map((link) => (
              <li key={link}>
                <Link
                  to={link.toLowerCase()}
                  smooth
                  duration={500}
                  offset={-80}
                  className="cursor-pointer hover:text-nebula-blue transition"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Connect</h4>
          <div className="flex gap-4">
            {socials.map(({ icon: Icon, url, name }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-lg bg-white/5 border flex items-center justify-center transition duration-300 text-lg social-icon-btn ${name}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="portfolio-container border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Shilpa Mukherjee. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs">
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}