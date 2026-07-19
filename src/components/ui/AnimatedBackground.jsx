import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/ThemeContext';

export default function AnimatedBackground() {
  const { theme, currentConfig } = useTheme();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);
  const isTabVisible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle storage arrays
    let particles = [];
    let extras = []; // For splashes, birds, shooting stars
    let planets = []; // For space planets
    let time = 0;
    
    // Lightning state for Rain theme
    let lightningFlash = { active: false, alpha: 0, duration: 0 };

    const prefersReducedMotion = { current: window.matchMedia('(prefers-reduced-motion: reduce)').matches };

    const initParticles = (activeTheme) => {
      particles = [];
      extras = [];
      planets = [];
      time = 0;
      lightningFlash = { active: false, alpha: 0, duration: 0 };

      // If user prefers reduced motion, we scale down counts to almost 0 or disable
      const countMultiplier = prefersReducedMotion.current ? 0.05 : 1.0;

      if (activeTheme === 'space' || activeTheme === 'nightsky') {
        const count = activeTheme === 'space' ? Math.round(120 * countMultiplier) : Math.round(80 * countMultiplier);
        for (let i = 0; i < count; i++) {
          const depth = Math.random() * 0.85 + 0.15;
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: depth * 2.0 + 0.3,
            speedX: (Math.random() - 0.5) * 0.04,
            speedY: (Math.random() - 0.5) * 0.04,
            depth,
            alpha: Math.random() * 0.7 + 0.3,
            alphaSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
          });
        }

        // Faint cosmic dust / floating particles
        if (activeTheme === 'space' && !prefersReducedMotion.current) {
          for (let i = 0; i < 30; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: Math.random() * 4 + 1,
              speedX: (Math.random() - 0.5) * 0.08,
              speedY: (Math.random() - 0.5) * 0.08,
              alpha: Math.random() * 0.15 + 0.05,
              depth: 0.1, // very slow background movement
              isDust: true,
            });
          }

          // Let's create two planets
          planets = [
            {
              x: width * 0.15,
              y: height * 0.35,
              radius: 25,
              color: '#4f46e5',
              ringColor: 'rgba(99, 102, 241, 0.4)',
              hasRings: true,
              speedX: 0.002,
              speedY: -0.001,
            },
            {
              x: width * 0.8,
              y: height * 0.65,
              radius: 16,
              color: '#0284c7',
              hasRings: false,
              speedX: -0.0015,
              speedY: 0.002,
            }
          ];
        }
      } else if (activeTheme === 'snowy') {
        const count = Math.round(90 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2.8 + 0.6,
            vy: Math.random() * 0.6 + 0.3,
            vx: (Math.random() - 0.5) * 0.15,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            swaySpeed: Math.random() * 0.01 + 0.005,
            swayOffset: Math.random() * Math.PI * 2,
            swayWidth: Math.random() * 1.8 + 0.4,
          });
        }
      } else if (activeTheme === 'rainy') {
        const count = Math.round(150 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            length: Math.random() * 18 + 12,
            vy: Math.random() * 10 + 12,
            vx: -3 - Math.random() * 1.5, // angled rain
          });
        }
      } else if (activeTheme === 'cloudy') {
        const count = Math.round(15 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * (width + 250) - 125,
            y: Math.random() * (height * 0.8),
            radius: Math.random() * 90 + 75,
            vx: Math.random() * 0.08 + 0.03,
            alpha: Math.random() * 0.025 + 0.01,
            layer: Math.floor(Math.random() * 3), // 3 layers for parallax
          });
        }
      } else if (activeTheme === 'sunset') {
        const count = Math.round(60 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height + 10,
            size: Math.random() * 2.5 + 0.6,
            vy: -(Math.random() * 0.6 + 0.25),
            vx: (Math.random() - 0.5) * 0.15,
            swaySpeed: Math.random() * 0.012 + 0.004,
            swayOffset: Math.random() * Math.PI * 2,
            alpha: Math.random() * 0.7 + 0.3,
            color: Math.random() < 0.6 ? '#f97316' : '#f43f5e',
          });
        }

        // Add 1-2 birds occasionally in Sunset
        if (!prefersReducedMotion.current) {
          extras = [
            {
              x: -100,
              y: height * 0.25,
              vx: 0.8 + Math.random() * 0.4,
              vy: (Math.random() - 0.5) * 0.1,
              size: 5,
              wingPhase: 0,
              wingSpeed: 0.15,
            }
          ];
        }
      } else if (activeTheme === 'ocean') {
        const count = Math.round(50 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height + 50,
            size: Math.random() * 3.8 + 1.2,
            vy: -(Math.random() * 0.8 + 0.35),
            swaySpeed: Math.random() * 0.018 + 0.008,
            swayOffset: Math.random() * Math.PI * 2,
            swayWidth: Math.random() * 2.5 + 0.5,
            alpha: Math.random() * 0.25 + 0.08,
          });
        }
        // Faint slow underwater dust particles
        if (!prefersReducedMotion.current) {
          for (let i = 0; i < 20; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: Math.random() * 1.5 + 0.5,
              vy: -(Math.random() * 0.15 + 0.05),
              vx: (Math.random() - 0.5) * 0.05,
              alpha: Math.random() * 0.15 + 0.05,
              isDust: true,
            });
          }
        }
      } else if (activeTheme === 'forest') {
        const count = Math.round(35 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height - 100,
            size: Math.random() * 5 + 4,
            vy: Math.random() * 0.6 + 0.4,
            vx: Math.random() * 0.35 + 0.15,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.015,
            color: Math.random() < 0.6 ? '#10b981' : Math.random() < 0.85 ? '#84cc16' : '#22c55e',
          });
        }

        // Add Fireflies in Forest (blinking yellow-green dots)
        if (!prefersReducedMotion.current) {
          for (let i = 0; i < 18; i++) {
            extras.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.3,
              vy: (Math.random() - 0.5) * 0.3,
              blinkSpeed: Math.random() * 0.03 + 0.015,
              blinkPhase: Math.random() * Math.PI * 2,
              maxAlpha: Math.random() * 0.6 + 0.4,
              size: Math.random() * 2 + 1,
              isFirefly: true,
            });
          }
        }
      } else if (activeTheme === 'sakura') {
        const count = Math.round(45 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height - 100,
            size: Math.random() * 6 + 3.5,
            vy: Math.random() * 0.6 + 0.5,
            vx: Math.random() * 0.6 + 0.3,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            swaySpeed: Math.random() * 0.015 + 0.008,
            swayOffset: Math.random() * Math.PI * 2,
            color: Math.random() < 0.85 ? '#f472b6' : '#fbcfe8',
          });
        }
      } else if (activeTheme === 'aurora') {
        const count = Math.round(40 * countMultiplier);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.3,
            alpha: Math.random() * 0.6 + 0.2,
            alphaSpeed: Math.random() * 0.008 + 0.003,
          });
        }

        // Faint green/purple glowing dust particles floating up
        if (!prefersReducedMotion.current) {
          for (let i = 0; i < 20; i++) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              size: Math.random() * 3 + 1,
              vy: -(Math.random() * 0.2 + 0.1),
              vx: (Math.random() - 0.5) * 0.05,
              alpha: Math.random() * 0.2 + 0.05,
              color: Math.random() < 0.5 ? '#10b981' : '#a855f7',
              isDust: true,
            });
          }
        }
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles(theme);
    };

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - centerX) * 0.04;
      mouseRef.current.targetY = (e.clientY - centerY) * 0.04;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    // Visibility change handler
    const handleVisibilityChange = () => {
      isTabVisible.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Reduced motion change listener
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e) => {
      prefersReducedMotion.current = e.matches;
      initParticles(theme);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Initial positioning
    scrollRef.current = window.scrollY;
    initParticles(theme);

    // Main animation loop
    const animate = () => {
      if (!isTabVisible.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const activeTheme = theme;
      time += 0.01;

      // Mouse Parallax Lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // --- 1. RENDER PLANETS & NEBULA ORBS (SPACE THEME) ---
      if (activeTheme === 'space' && !prefersReducedMotion.current) {
        planets.forEach((p) => {
          // Slow dynamic drift
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap boundaries
          if (p.x < -p.radius * 2) p.x = width + p.radius * 2;
          if (p.x > width + p.radius * 2) p.x = -p.radius * 2;
          if (p.y < -p.radius * 2) p.y = height + p.radius * 2;
          if (p.y > height + p.radius * 2) p.y = -p.radius * 2;

          const px = p.x - mouse.x * 0.2;
          const py = (p.y - scrollRef.current * 0.04 - mouse.y * 0.2);

          ctx.save();
          // Glow shadow
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 20;

          // Draw Planet Base
          const planetGrad = ctx.createRadialGradient(px - p.radius * 0.3, py - p.radius * 0.3, p.radius * 0.1, px, py, p.radius);
          planetGrad.addColorStop(0, '#ffffff');
          planetGrad.addColorStop(0.3, p.color);
          planetGrad.addColorStop(1, '#020208');
          ctx.fillStyle = planetGrad;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;

          // Draw Rings if applicable
          if (p.hasRings) {
            ctx.strokeStyle = p.ringColor;
            ctx.lineWidth = 4;
            ctx.save();
            ctx.translate(px, py);
            ctx.scale(2.2, 0.45); // Squash circle into ellipse ring
            ctx.rotate(-Math.PI / 12);
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          ctx.restore();
        });
      }

      // --- 2. THEME-SPECIFIC PARTICLE LOOPS ---

      if (activeTheme === 'space' || activeTheme === 'nightsky') {
        // Night / Space moon overlay
        if (activeTheme === 'nightsky') {
          // Draw moon
          ctx.save();
          const moonX = width - 110 - mouse.x * 0.15;
          const moonY = 120 + mouse.y * 0.15;
          const radius = 34;
          
          ctx.shadowColor = 'rgba(241, 245, 249, 0.35)';
          ctx.shadowBlur = 25;
          ctx.fillStyle = 'rgba(241, 245, 249, 0.95)';
          ctx.beginPath();
          ctx.arc(moonX, moonY, radius, 0, Math.PI * 2);
          ctx.fill();

          // Clip into crescent shape by overlaying matching sky background color
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#020817'; // Night sky bg
          ctx.beginPath();
          ctx.arc(moonX - 11, moonY - 3, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Draw Twinkling Star Particles
        particles.forEach((p) => {
          if (p.isDust) {
            // Draw Cosmic dust
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            const dx = p.x - mouse.x * 0.1;
            const dy = (p.y - scrollRef.current * 0.02 - mouse.y * 0.1) % height;
            const finalY = dy < 0 ? dy + height : dy;

            ctx.fillStyle = 'rgba(124, 58, 237, 0.08)'; // Purple dust spec
            ctx.beginPath();
            ctx.arc(dx, finalY, p.size, 0, Math.PI * 2);
            ctx.fill();
            return;
          }

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Parallax calculation
          const posX = p.x - mouse.x * p.depth;
          const posY = (p.y - scrollRef.current * p.depth * 0.10 - mouse.y * p.depth) % height;
          const finalY = posY < 0 ? posY + height : posY;
          const finalX = posX < 0 ? posX + width : posX > width ? posX - width : posX;

          // Twinkle logic
          p.alpha += p.alphaSpeed;
          if (p.alpha > 0.95 || p.alpha < 0.2) {
            p.alphaSpeed = -p.alphaSpeed;
          }

          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, p.alpha))})`;
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Shooting Stars (active in Space and Night Sky)
        if (!prefersReducedMotion.current) {
          const spawnChance = activeTheme === 'space' ? 0.005 : 0.003;
          if (Math.random() < spawnChance && extras.length < 2) {
            extras.push({
              x: Math.random() * width,
              y: Math.random() * (height * 0.4),
              len: Math.random() * 70 + 40,
              speed: Math.random() * 11 + 9,
              angle: Math.PI / 6 + (Math.random() - 0.5) * 0.05,
              life: 1,
            });
          }

          extras = extras.filter((ss) => {
            const dx = Math.cos(ss.angle) * ss.speed;
            const dy = Math.sin(ss.angle) * ss.speed;
            ss.x += dx;
            ss.y += dy;
            ss.life -= 0.025;

            if (ss.life <= 0 || ss.x > width || ss.y > height) return false;

            ctx.save();
            const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - dx * 1.5, ss.y - dy * 1.5);
            grad.addColorStop(0, `rgba(255, 255, 255, ${ss.life})`);
            grad.addColorStop(0.5, activeTheme === 'space' ? `rgba(6, 182, 212, ${ss.life * 0.5})` : `rgba(56, 189, 248, ${ss.life * 0.4})`);
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
            ctx.stroke();
            ctx.restore();
            return true;
          });
        }

        // Night Sky drifting clouds
        if (activeTheme === 'nightsky' && !prefersReducedMotion.current) {
          // If we don't have night clouds init, let's inject a few in extras
          if (extras.filter(e => e.isNightCloud).length === 0) {
            for (let i = 0; i < 4; i++) {
              extras.push({
                x: Math.random() * width,
                y: Math.random() * (height * 0.6),
                radius: Math.random() * 100 + 80,
                vx: Math.random() * 0.05 + 0.02,
                alpha: Math.random() * 0.03 + 0.01,
                isNightCloud: true,
              });
            }
          }
          extras.forEach(nc => {
            if (!nc.isNightCloud) return;
            nc.x += nc.vx;
            if (nc.x - nc.radius > width) nc.x = -nc.radius;
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.save();
            ctx.globalAlpha = nc.alpha;
            ctx.beginPath();
            ctx.arc(nc.x, nc.y - scrollRef.current * 0.04, nc.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }
      } else if (activeTheme === 'snowy') {
        // Continuous Snow
        particles.forEach((p) => {
          p.y += p.vy;
          p.swayOffset += p.swaySpeed;
          p.x += p.vx + Math.sin(p.swayOffset) * p.swayWidth * 0.2;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Draw a small snowflake dot
          ctx.save();
          ctx.globalAlpha = 0.75;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = '#ffffff';

          if (p.size > 2.0 && !prefersReducedMotion.current) {
            // Draw a basic snowflake cross shape for larger flakes
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = '#ffffff';
            ctx.beginPath();
            for (let i = 0; i < 4; i++) {
              ctx.moveTo(-p.size, 0);
              ctx.lineTo(p.size, 0);
              ctx.rotate(Math.PI / 4);
            }
            ctx.stroke();
          } else {
            // Circle snowflake
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });
      } else if (activeTheme === 'rainy') {
        // Lightning Flash Logic (random flash trigger)
        if (!prefersReducedMotion.current && Math.random() < 0.0015 && !lightningFlash.active) {
          lightningFlash.active = true;
          lightningFlash.alpha = Math.random() * 0.35 + 0.15; // random brightness
          lightningFlash.duration = Math.floor(Math.random() * 8) + 4; // duration in frames
        }

        if (lightningFlash.active) {
          ctx.save();
          ctx.fillStyle = `rgba(224, 242, 254, ${lightningFlash.alpha})`;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();

          lightningFlash.duration--;
          if (lightningFlash.duration <= 0) {
            lightningFlash.active = false;
          }
        }

        // Slanted rain lines
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.45)';
        ctx.lineWidth = 1.0;
        particles.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx;

          if (p.y > height) {
            // Rain hits bottom: trigger a ripple/splash in extras
            if (!prefersReducedMotion.current && Math.random() < 0.3 && extras.length < 35) {
              extras.push({
                x: p.x,
                y: height - Math.random() * 15,
                radius: 0.5,
                maxRadius: Math.random() * 8 + 4,
                alpha: 0.5,
                isSplash: true,
              });
            }
            p.y = -p.length;
            p.x = Math.random() * (width + 200);
          }

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 0.7, p.y + p.length);
          ctx.stroke();
        });

        // Draw raindrop splashes / ripples at bottom
        if (extras.length > 0) {
          extras = extras.filter((sp) => {
            if (!sp.isSplash) return true;
            sp.radius += 0.4;
            sp.alpha -= 0.025;

            if (sp.alpha <= 0 || sp.radius >= sp.maxRadius) return false;

            ctx.strokeStyle = `rgba(186, 230, 253, ${sp.alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.ellipse(sp.x, sp.y, sp.radius, sp.radius * 0.3, 0, 0, Math.PI * 2); // oval ripple
            ctx.stroke();
            return true;
          });
        }
      } else if (activeTheme === 'cloudy') {
        // Parallax Layered Moving Clouds
        particles.forEach((p) => {
          p.x += p.vx * (p.layer + 1); // layer multiplier for speed depth

          if (p.x - p.radius > width) {
            p.x = -p.radius;
            p.y = Math.random() * (height * 0.8);
          }

          ctx.fillStyle = 'rgba(255, 255, 255, 1)';
          ctx.save();
          // Opacity based on layer depth
          ctx.globalAlpha = p.alpha * (0.5 + p.layer * 0.25);
          const finalY = p.y - scrollRef.current * (0.02 + p.layer * 0.02);

          ctx.beginPath();
          // Draw standard cloud shape with overlapping puffs
          ctx.arc(p.x, finalY, p.radius, 0, Math.PI * 2);
          ctx.arc(p.x + p.radius * 0.5, finalY - p.radius * 0.1, p.radius * 0.8, 0, Math.PI * 2);
          ctx.arc(p.x - p.radius * 0.5, finalY - p.radius * 0.05, p.radius * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      } else if (activeTheme === 'sunset') {
        // Ascending sunset embers
        particles.forEach((p) => {
          p.y += p.vy;
          p.swayOffset += p.swaySpeed;
          p.x += Math.sin(p.swayOffset) * 0.25;

          const lifeRatio = Math.max(0, p.y / height); // fades out near the top
          const drawAlpha = p.alpha * lifeRatio;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = drawAlpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Sunset flying birds (extras)
        if (!prefersReducedMotion.current) {
          extras.forEach((bird) => {
            if (bird.isSplash || bird.isFirefly) return;

            bird.x += bird.vx;
            bird.y += bird.vy;
            bird.wingPhase += bird.wingSpeed;

            if (bird.x > width + 100) {
              bird.x = -100;
              bird.y = height * (0.1 + Math.random() * 0.35);
            }

            // Draw V shape soaring bird
            ctx.save();
            ctx.strokeStyle = 'rgba(45, 17, 35, 0.45)'; // dark warm shadow color
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            
            const wingY = Math.sin(bird.wingPhase) * bird.size * 0.8;
            ctx.moveTo(bird.x - bird.size * 1.5, bird.y - wingY);
            ctx.quadraticCurveTo(bird.x - bird.size * 0.7, bird.y - bird.size * 0.3, bird.x, bird.y);
            ctx.quadraticCurveTo(bird.x + bird.size * 0.7, bird.y - bird.size * 0.3, bird.x + bird.size * 1.5, bird.y - wingY);
            ctx.stroke();
            ctx.restore();
          });
        }
      } else if (activeTheme === 'ocean') {
        // Ocean Light Rays (swaying volumetric lights)
        if (!prefersReducedMotion.current) {
          ctx.save();
          const rayGrad = ctx.createLinearGradient(0, 0, 0, height);
          rayGrad.addColorStop(0, 'rgba(34, 211, 238, 0.06)');
          rayGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.02)');
          rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = rayGrad;
          
          // Draw 4 swaying light rays
          for (let r = 0; r < 4; r++) {
            const rayX = width * 0.2 + r * (width * 0.2) + Math.sin(time * 0.8 + r) * 50;
            ctx.beginPath();
            ctx.moveTo(rayX - 30, 0);
            ctx.lineTo(rayX + 30, 0);
            ctx.lineTo(rayX + 120 + Math.sin(time * 0.8 + r) * 30, height);
            ctx.lineTo(rayX - 60 + Math.sin(time * 0.8 + r) * 30, height);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }

        // Draw Overlapping Waves at bottom
        ctx.save();
        ctx.fillStyle = 'rgba(6, 42, 71, 0.15)';
        for (let w = 0; w < 3; w++) {
          const waveHeight = 55 - w * 12;
          const waveOffset = w * Math.PI * 0.5;
          const speed = 1.0 + w * 0.3;
          ctx.beginPath();
          ctx.moveTo(0, height);
          for (let x = 0; x <= width; x += 20) {
            const y = height - waveHeight + Math.sin(x * 0.004 + time * speed + waveOffset) * 12;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Ocean rising bubbles & dust
        particles.forEach((p) => {
          if (p.isDust) {
            p.y += p.vy;
            p.x += p.vx;
            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
            ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y - scrollRef.current * 0.02, p.size, 0, Math.PI * 2);
            ctx.fill();
            return;
          }

          p.y += p.vy;
          p.swayOffset += p.swaySpeed;
          p.x += Math.sin(p.swayOffset) * p.swayWidth * 0.15;

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.45)';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(p.x, p.y - scrollRef.current * 0.03, p.size, 0, Math.PI * 2);
          ctx.stroke();

          // Tiny specular light inside bubble
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - scrollRef.current * 0.03 - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      } else if (activeTheme === 'forest') {
        // Forest light beams (swaying beams from top left)
        if (!prefersReducedMotion.current) {
          ctx.save();
          const beamGrad = ctx.createLinearGradient(0, 0, width * 0.6, height);
          beamGrad.addColorStop(0, 'rgba(132, 204, 22, 0.05)'); // lime green glow
          beamGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.02)');
          beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = beamGrad;

          for (let r = 0; r < 3; r++) {
            const sway = Math.sin(time * 0.4 + r) * 40;
            ctx.beginPath();
            ctx.moveTo(sway - 50 + r * 120, 0);
            ctx.lineTo(sway + 50 + r * 120, 0);
            ctx.lineTo(sway + 250 + r * 180, height);
            ctx.lineTo(sway + 100 + r * 180, height);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }

        // Falling Leaf Particles
        particles.forEach((p) => {
          p.y += p.vy;
          p.x += p.vx + Math.sin(time * 2 + p.y * 0.01) * 0.25;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y - scrollRef.current * 0.04);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.55;

          // Draw double-elliptical leaf
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.75, 0, 0, Math.PI * 2);
          ctx.fill();

          // Vein
          ctx.strokeStyle = 'rgba(255,255,255,0.2)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-p.size * 1.4, 0);
          ctx.lineTo(p.size * 1.4, 0);
          ctx.stroke();

          ctx.restore();
        });

        // Blinking Fireflies (extras)
        extras.forEach((ff) => {
          if (!ff.isFirefly) return;

          ff.x += ff.vx;
          ff.y += ff.vy;
          ff.blinkPhase += ff.blinkSpeed;

          // Wrap boundaries
          if (ff.x < 0) ff.x = width;
          if (ff.x > width) ff.x = 0;
          if (ff.y < 0) ff.y = height;
          if (ff.y > height) ff.y = 0;

          // Pulse Alpha
          const pulse = (Math.sin(ff.blinkPhase) + 1) * 0.5; // 0 to 1
          const finalAlpha = ff.maxAlpha * pulse;

          if (finalAlpha > 0.05) {
            ctx.save();
            ctx.globalAlpha = finalAlpha;
            // Yellow green glow
            const glow = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.size * 5);
            glow.addColorStop(0, 'rgba(234, 179, 8, 1)');
            glow.addColorStop(0.3, 'rgba(163, 230, 53, 0.4)');
            glow.addColorStop(1, 'rgba(163, 230, 53, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(ff.x, ff.y, ff.size * 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      } else if (activeTheme === 'sakura') {
        // Sakura blossom petals falling
        particles.forEach((p) => {
          p.y += p.vy;
          p.swayOffset += p.swaySpeed;
          p.x += p.vx + Math.sin(p.swayOffset) * 0.5;
          p.rotation += p.rotationSpeed;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(p.x, p.y - scrollRef.current * 0.04);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.65;

          // Sakura petal curved teardrop path
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.75, -p.size * 0.75, p.size * 0.45, p.size);
          ctx.quadraticCurveTo(0, p.size * 0.55, -p.size * 0.45, p.size);
          ctx.quadraticCurveTo(-p.size * 0.75, -p.size * 0.75, 0, -p.size);
          ctx.fill();
          ctx.restore();
        });
      } else if (activeTheme === 'aurora') {
        // Background Stars twinkling
        particles.forEach((p) => {
          if (p.isDust) {
            // Glow spec drifting
            p.y += p.vy;
            p.x += p.vx;
            if (p.y < -10) {
              p.y = height + 10;
              p.x = Math.random() * width;
            }
            ctx.fillStyle = p.color;
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return;
          }

          p.alpha += p.alphaSpeed;
          if (p.alpha > 0.85 || p.alpha < 0.15) {
            p.alphaSpeed = -p.alphaSpeed;
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, p.alpha)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Waving Aurora ribbons (3 layered bands)
        ctx.save();
        const baseHeight = height * 0.38;
        const startY = height * 0.12;

        for (let band = 0; band < 3; band++) {
          const colorGrad = ctx.createLinearGradient(0, startY, 0, startY + baseHeight);
          if (band === 0) {
            colorGrad.addColorStop(0, 'rgba(16, 185, 129, 0)'); // Emerald green fading in
            colorGrad.addColorStop(0.35, 'rgba(16, 185, 129, 0.15)');
            colorGrad.addColorStop(0.7, 'rgba(34, 211, 238, 0.08)');
            colorGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
          } else if (band === 1) {
            colorGrad.addColorStop(0, 'rgba(139, 92, 246, 0)'); // Purple fading in
            colorGrad.addColorStop(0.4, 'rgba(139, 92, 246, 0.12)');
            colorGrad.addColorStop(0.8, 'rgba(236, 72, 153, 0.06)');
            colorGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
          } else {
            colorGrad.addColorStop(0, 'rgba(6, 182, 212, 0)'); // Cyan fading in
            colorGrad.addColorStop(0.3, 'rgba(6, 182, 212, 0.08)');
            colorGrad.addColorStop(0.75, 'rgba(124, 58, 237, 0.05)');
            colorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          }

          ctx.fillStyle = colorGrad;
          ctx.beginPath();
          ctx.moveTo(0, height);
          ctx.lineTo(0, startY);

          // Horizontal drift speed per band
          const wavePhase = time * 0.5 + band * Math.PI * 0.4;
          for (let x = 0; x <= width; x += 40) {
            const y = startY + Math.sin(x * 0.0025 + wavePhase) * 55 + Math.cos(x * 0.001 - wavePhase * 0.6) * 25;
            ctx.lineTo(x, y - scrollRef.current * 0.03);
          }
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      {/* Background env backdrop transition */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 transition-all duration-1000 ease-in-out"
        style={{
          background: currentConfig.gradient,
          backgroundColor: 'var(--space-900)',
        }}
      />
      {/* Dynamic environmental particles canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10"
      />
    </>
  );
}
