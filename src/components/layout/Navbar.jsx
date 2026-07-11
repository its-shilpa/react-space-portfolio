import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { HiSparkles } from 'react-icons/hi2';

const links = ["Home", "Skills", "About", "Experience", "Projects", "Services", "Achievements", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen ? 'bg-space-900/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Premium Logo */}
          <Link to="home" smooth duration={500} className="cursor-pointer flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center shadow-lg shadow-nebula-purple/20 group-hover:shadow-nebula-purple/40 group-hover:scale-110 transition-all duration-300">
              <HiSparkles className="text-white text-lg" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-nebula-blue group-hover:to-nebula-purple transition-all duration-300">
                Shilpa
              </span>
              <span className="text-[9px] text-slate-500 font-medium tracking-[0.2em] uppercase">
                Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex gap-6 text-[13px] text-slate-300 font-medium">
            {links.map((link) => (
              <li key={link}>
                <Link
                  to={link.toLowerCase()}
                  smooth
                  duration={500}
                  offset={-80}
                  activeClass="!text-nebula-blue"
                  spy={true}
                  className="cursor-pointer hover:text-nebula-blue transition relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-nebula-blue after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          <button className="hidden lg:block px-5 py-2 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-xs font-semibold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md shadow-nebula-purple/20">
            Resume
          </button>

          {/* Mobile toggle button */}
          <button
            className="lg:hidden text-white z-50 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 items-center justify-center w-5">
              <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
              <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Premium Full-Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-space-900/98 backdrop-blur-2xl flex flex-col justify-center items-center gap-6 transition-all duration-500 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Logo in mobile menu */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-nebula-purple to-nebula-blue flex items-center justify-center">
            <HiSparkles className="text-white text-xl" />
          </div>
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Shilpa
          </span>
        </div>

        <ul className="flex flex-col gap-4 text-center text-slate-300">
          {links.map((link, idx) => (
            <li key={link} style={{ animationDelay: `${idx * 60}ms` }}>
              <Link
                to={link.toLowerCase()}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-nebula-blue transition-all duration-300 text-xl font-display font-medium block py-2 hover:tracking-wider"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm font-semibold mt-4 shadow-lg shadow-nebula-purple/25 hover:scale-105 transition-all duration-300">
          Download Resume
        </button>
      </div>
    </>
  );
}