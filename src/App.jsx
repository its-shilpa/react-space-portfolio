import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import StarField from './components/ui/StarField';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Services from './components/sections/Services';
import Achievements from './components/sections/Achievements';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
  }, []);

  return (
    <div className="relative overflow-x-hidden w-full">
      <StarField />
      <Navbar />
      <Hero />
      <Skills />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

