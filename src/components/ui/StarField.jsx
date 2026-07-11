import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate stars
    const numStars = 150;
    const stars = Array.from({ length: numStars }, () => {
      // depth factor between 0.15 and 1
      const depth = Math.random() * 0.85 + 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: depth * 2.0 + 0.3, // stars of different sizes
        speedX: (Math.random() - 0.5) * 0.05, // very slow drift
        speedY: (Math.random() - 0.5) * 0.05,
        depth,
        alpha: Math.random() * 0.7 + 0.3,
        alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      // Normalize mouse coords relative to center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - centerX) * 0.05; // parallax factor
      mouseRef.current.targetY = (e.clientY - centerY) * 0.05;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Initial scroll position
    scrollRef.current = window.scrollY;

    const animate = () => {
      // Smoothly interpolate mouse position (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Draw nebula clouds
      ctx.save();
      
      // Purple nebula (top-left)
      const gradPurple = ctx.createRadialGradient(
        width * 0.2 + mouse.x * 0.4,
        height * 0.2 + mouse.y * 0.4,
        10,
        width * 0.2 + mouse.x * 0.4,
        height * 0.2 + mouse.y * 0.4,
        Math.max(width, height) * 0.5
      );
      gradPurple.addColorStop(0, 'rgba(124, 58, 237, 0.12)'); // violet-600 with opacity
      gradPurple.addColorStop(0.5, 'rgba(124, 58, 237, 0.04)');
      gradPurple.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = gradPurple;
      ctx.fillRect(0, 0, width, height);

      // Blue nebula (bottom-right)
      const gradBlue = ctx.createRadialGradient(
        width * 0.85 + mouse.x * 0.2,
        height * 0.8 + mouse.y * 0.2 - scrollRef.current * 0.1,
        10,
        width * 0.85 + mouse.x * 0.2,
        height * 0.8 + mouse.y * 0.2 - scrollRef.current * 0.1,
        Math.max(width, height) * 0.5
      );
      gradBlue.addColorStop(0, 'rgba(6, 182, 212, 0.1)'); // cyan-500 with opacity
      gradBlue.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      gradBlue.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = gradBlue;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Normal slow drift
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around borders if they drift off canvas
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Calculate positions with mouse & scroll parallax
        const posX = star.x - mouse.x * star.depth;
        const posY = (star.y - scrollRef.current * star.depth * 0.12 - mouse.y * star.depth) % height;
        const finalY = posY < 0 ? posY + height : posY;
        const finalX = posX < 0 ? posX + width : posX > width ? posX - width : posX;

        // Twinkle (pulse alpha)
        star.alpha += star.alphaSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.25) {
          star.alphaSpeed = -star.alphaSpeed;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-[#05050f] pointer-events-none"
    />
  );
}