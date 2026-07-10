import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

const links = ["Home", "Skills", "About", "Experience", "Projects", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);   // mobile menu open/closed
  const [scrolled, setScrolled] = useState(false); // add background after scrolling

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll); // cleanup!
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-space-900/80 backdrop-blur-md border-b border-white/10' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="font-display font-bold text-white">Alex Carter</span>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 text-sm text-slate-300">
          {links.map((link) => (
            <li key={link}>
              <Link to={link.toLowerCase()} smooth duration={500} className="cursor-pointer hover:text-nebula-blue transition">
                {link}
              </Link>
            </li>
          ))}
        </ul>

        <button className="hidden md:block px-4 py-2 rounded-full bg-gradient-to-r from-nebula-purple to-nebula-blue text-white text-sm">
          Resume
        </button>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu — conditional rendering */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 text-slate-300">
          {links.map((link) => (
            <li key={link}>
              <Link to={link.toLowerCase()} smooth duration={500} onClick={() => setIsOpen(false)}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}