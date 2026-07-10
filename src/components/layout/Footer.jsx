import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-scroll';

const quickLinks = ["Home", "Skills", "About", "Experience", "Projects", "Contact"];
const socials = [
  { icon: FaGithub, url: "https://github.com" },
  { icon: FaLinkedin, url: "https://linkedin.com" },
  { icon: FaTwitter, url: "https://twitter.com" },
  { icon: FaInstagram, url: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-10">
        <div>
          <h3 className="font-display text-white font-bold">Alex Carter</h3>
          <p className="text-slate-400 text-sm mt-2">
            Senior Frontend Developer building fast, elegant web experiences.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            {quickLinks.map((link) => (
              <li key={link}>
                <Link to={link.toLowerCase()} smooth duration={500} className="cursor-pointer hover:text-nebula-blue transition">
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
              <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-nebula-blue transition text-lg">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-slate-500 text-xs mt-10">
        © {new Date().getFullYear()} Alex Carter. All rights reserved.
      </p>
    </footer>
  );
}