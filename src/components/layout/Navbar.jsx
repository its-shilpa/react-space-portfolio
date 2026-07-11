import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

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
          <Link to="home" smooth duration={500} className="font-display font-bold text-white text-xl cursor-pointer">
            Shilpa
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 text-sm text-slate-300 font-medium">
            {links.map((link) => (
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

          <button className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-xs font-semibold hover:opacity-90 transition">
            Resume
          </button>

          {/* Mobile toggle button */}
          <button
            className="md:hidden text-white z-50 p-2 focus:outline-none text-xl"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Premium Full-Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-space-950/98 backdrop-blur-xl flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-6 text-center text-slate-300">
          {links.map((link) => (
            <li key={link}>
              <Link
                to={link.toLowerCase()}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-nebula-blue transition text-2xl font-display font-medium block py-2"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm font-semibold mt-4 shadow-lg">
          Resume
        </button>
      </div>
    </>
  );
}