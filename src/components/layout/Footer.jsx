import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-scroll';

const quickLinks = ["Home", "Skills", "About", "Experience", "Projects", "Services", "Achievements", "Contact"];
const socials = [
  { icon: FaGithub, url: "https://github.com/its-shilpa/" },
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/shilpa-mukherjee/" },
  { icon: FaInstagram, url: "https://www.instagram.com/snowy_shilpa/" },
  { icon: FaEnvelope, url: "mailto:shilpa.mukherjee625@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-[30px] md:pt-[40px] pb-12">
      <div className="portfolio-container grid sm:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-white font-bold text-lg">Shilpa Mukherjee</h3>
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
            {socials.map(({ icon: Icon, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-nebula-blue hover:text-nebula-blue flex items-center justify-center transition duration-300 text-lg"
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