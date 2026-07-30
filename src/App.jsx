import { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ThemeProvider } from './hooks/ThemeContext';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';

// Lazy load below-the-fold components and heavy canvas background
const AnimatedBackground = lazy(() => import('./components/ui/AnimatedBackground'));
const Skills = lazy(() => import('./components/sections/Skills'));
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Services = lazy(() => import('./components/sections/Services'));
const Achievements = lazy(() => import('./components/sections/Achievements'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ThemeSwitcher = lazy(() => import('./components/ui/ThemeSwitcher'));

function FaviconController() {
  useDynamicFavicon();
  return null;
}

// Simple layout-shift preventing placeholder
function SectionPlaceholder({ minHeight }) {
  return <div className="w-full opacity-0" style={{ minHeight }} />;
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
  }, []);

  return (
    <ThemeProvider>
      <FaviconController />
      <div className="relative overflow-x-hidden w-full">
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionPlaceholder minHeight="450px" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="450px" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="650px" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="650px" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="500px" />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="600px" />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<SectionPlaceholder minHeight="120px" />}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <ThemeSwitcher />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

