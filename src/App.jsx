import { useEffect, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ThemeProvider } from './hooks/ThemeContext';
import { useDynamicFavicon } from './hooks/useDynamicFavicon';
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

import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy canvas starfield and theme switcher in background
const AnimatedBackground = lazy(() => import('./components/ui/AnimatedBackground'));
const ThemeSwitcher = lazy(() => import('./components/ui/ThemeSwitcher'));

function FaviconController() {
  useDynamicFavicon();
  return null;
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 60 });
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Only run Lenis on fine-pointer (mouse/trackpad) devices to provide wheel momentum.
    // Touch devices already possess native 120Hz hardware momentum scrolling.
    const isFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

    let lenis = null;
    let tickerCb = null;

    if (isFinePointer) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      window.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      tickerCb = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCb);
    }

    // Refresh ScrollTrigger once DOM is mounted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    const onResize = () => {
      if (lenis) lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      if (tickerCb) gsap.ticker.remove(tickerCb);
      if (lenis) {
        lenis.destroy();
        delete window.lenis;
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <FaviconController />
      <div className="relative w-full overflow-x-clip">
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
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
        <Suspense fallback={null}>
          <ThemeSwitcher />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

