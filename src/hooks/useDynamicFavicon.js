import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

const FAVICON_STATES = ['{S}', '</S>', '[S]','<S/>'];
const FRAME_RATE_MS = 150; // Update favicon every 150ms for smooth rendering
const TICKS_PER_STATE = 20; // 20 ticks * 150ms = 3000ms per text state
const TRANSITION_TICKS = 3; // Fade transition duration in ticks (450ms)

// Helper to convert hex colors to RGBA with custom opacities
function colorWithOpacity(hex, opacity) {
  if (!hex || !hex.startsWith('#')) return hex;
  const cleanHex = hex.replace('#', '');
  let r, g, b;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Draws particle effects based on theme and current animation tick
function drawThemeParticles(ctx, themeId, accentColor, baseColor, tick) {
  ctx.fillStyle = '#ffffff';

  // Snowy Theme: falling snow drift particles
  if (themeId === 'snowy') {
    const flakes = [
      { x: 6, y: (tick * 1.2) % 32, size: 1.5 },
      { x: 26, y: ((tick + 7) * 1.5) % 32, size: 1.2 },
      { x: 16, y: ((tick + 14) * 0.9) % 32, size: 1.0 }
    ];
    ctx.fillStyle = colorWithOpacity(accentColor, 0.85);
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

  // Rainy Theme: vertical raindrop lines
  if (themeId === 'rainy') {
    ctx.strokeStyle = colorWithOpacity(accentColor, 0.6);
    ctx.lineWidth = 1.2;
    const drops = [
      { x: 8, y: (tick * 2.2) % 32, length: 3.5 },
      { x: 24, y: ((tick + 6) * 2.5) % 32, length: 4 },
      { x: 4, y: ((tick + 12) * 2) % 32, length: 3 }
    ];
    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 0.8, d.y + d.length);
      ctx.stroke();
    });
    return;
  }

  // Sunset & Desert Themes: warm rising ember dots
  if (themeId === 'sunset' || themeId === 'desert') {
    ctx.fillStyle = accentColor;
    const embers = [
      { x: 5, y: 32 - (tick * 1.5) % 32, r: 1.2 },
      { x: 27, y: 32 - ((tick + 8) * 1.2) % 32, r: 1.5 },
      { x: 14, y: 32 - ((tick + 14) * 1.8) % 32, r: 1.0 }
    ];
    embers.forEach(e => {
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

  // Sakura Theme: drifting pink petals
  if (themeId === 'sakura') {
    ctx.fillStyle = colorWithOpacity(accentColor, 0.75);
    const petals = [
      { x: (tick * 0.6) % 32, y: (tick * 0.9) % 32 },
      { x: 30 - ((tick + 9) * 0.7) % 32, y: ((tick + 5) * 1.2) % 32 }
    ];
    petals.forEach(p => {
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, 2, 1.2, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

  // Forest Theme: floating green/gold leaves/sparks
  if (themeId === 'forest') {
    const sparks = [
      { x: 6, y: 32 - (tick * 1.1) % 32, color: accentColor },
      { x: 26, y: 32 - ((tick + 10) * 1.4) % 32, color: baseColor }
    ];
    sparks.forEach(s => {
      ctx.fillStyle = colorWithOpacity(s.color, 0.8);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.3, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }

  // Cyberpunk & Neon Themes: bright neon grid pixels/glitches
  if (themeId === 'cyberpunk' || themeId === 'neon') {
    const gridTicks = tick % 8;
    ctx.fillStyle = gridTicks < 4 ? accentColor : baseColor;
    ctx.fillRect(gridTicks < 4 ? 4 : 26, gridTicks < 4 ? 5 : 24, 2, 2);
    ctx.fillStyle = gridTicks < 4 ? baseColor : accentColor;
    ctx.fillRect(gridTicks < 4 ? 26 : 5, gridTicks < 4 ? 22 : 8, 2, 2);
    return;
  }

  // Space, Nightsky & Aurora (Cosmic/Twinkling Stars)
  const stars = [
    { x: 5, y: 6, op: 0.3 + Math.sin(tick * 0.5) * 0.5 },
    { x: 27, y: 8, op: 0.3 + Math.cos(tick * 0.4) * 0.5 },
    { x: 6, y: 25, op: 0.2 + Math.sin(tick * 0.7) * 0.5 }
  ];
  ctx.fillStyle = '#ffffff';
  stars.forEach(s => {
    ctx.globalAlpha = Math.max(0.1, Math.min(1.0, s.op));
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1.0;
}

export function useDynamicFavicon() {
  const { theme, currentConfig } = useTheme();
  const tickRef = useRef(0);

  useEffect(() => {
    // Instantiate offscreen canvas for rendering
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    const updateFavicon = () => {
      const colors = currentConfig.colors;
      const themeId = theme;
      const tick = tickRef.current;

      // 1. Clear background
      ctx.clearRect(0, 0, 32, 32);

      const fromColor = colors['theme-from'] || '#7c3aed';
      const toColor = colors['theme-to'] || '#06b6d4';

      // 2. Render subtle ambient glow
      ctx.save();
      const glowGrad = ctx.createRadialGradient(16, 16, 3, 16, 16, 15);
      glowGrad.addColorStop(0, colorWithOpacity(toColor, 0.22));
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Render theme particles
      ctx.save();
      drawThemeParticles(ctx, themeId, toColor, fromColor, tick);
      ctx.restore();

      // 4. Render logo text with glowing cross-fade
      ctx.save();
      ctx.shadowColor = toColor;
      ctx.shadowBlur = 6;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textGrad = ctx.createLinearGradient(0, 6, 32, 26);
      textGrad.addColorStop(0, '#ffffff');
      textGrad.addColorStop(0.5, toColor);
      textGrad.addColorStop(1, fromColor);
      ctx.fillStyle = textGrad;

      // Compute cross-fade frames
      const stateCycleTick = tick % TICKS_PER_STATE;
      const stateIndex = Math.floor(tick / TICKS_PER_STATE) % FAVICON_STATES.length;

      if (stateCycleTick >= TICKS_PER_STATE - TRANSITION_TICKS) {
        // Transition fade phase
        const transitionProgress = (stateCycleTick - (TICKS_PER_STATE - TRANSITION_TICKS)) / TRANSITION_TICKS;
        const textOut = FAVICON_STATES[stateIndex];
        const textIn = FAVICON_STATES[(stateIndex + 1) % FAVICON_STATES.length];

        // Draw outgoing state
        ctx.globalAlpha = 1 - transitionProgress;
        const fontOut = textOut.length === 3 ? 'bold 18px' : 'bold 14px';
        ctx.font = `${fontOut} "Space Grotesk", Inter, monospace`;
        ctx.fillText(textOut, 16, 16.5);

        // Draw incoming state
        ctx.globalAlpha = transitionProgress;
        const fontIn = textIn.length === 3 ? 'bold 18px' : 'bold 14px';
        ctx.font = `${fontIn} "Space Grotesk", Inter, monospace`;
        ctx.fillText(textIn, 16, 16.5);
      } else {
        // Solid state phase
        ctx.globalAlpha = 1.0;
        const textActive = FAVICON_STATES[stateIndex];
        const fontActive = textActive.length === 3 ? 'bold 18px' : 'bold 14px';
        ctx.font = `${fontActive} "Space Grotesk", Inter, monospace`;
        ctx.fillText(textActive, 16, 16.5);
      }

      ctx.restore();

      // 5. Update HTML Favicon link
      const dataUrl = canvas.toDataURL('image/png');
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.type = 'image/png';
      link.href = dataUrl;
    };

    // Main animation timer loop
    const timer = setInterval(() => {
      tickRef.current = (tickRef.current + 1) % (FAVICON_STATES.length * TICKS_PER_STATE);
      updateFavicon();
    }, FRAME_RATE_MS);

    // Initial render
    updateFavicon();

    return () => {
      clearInterval(timer);
    };
  }, [theme, currentConfig]);
}
