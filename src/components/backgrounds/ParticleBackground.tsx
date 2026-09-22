import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
}

export const ParticleBackground: React.FC<{ className?: string }> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 60;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const observer = new ResizeObserver(() => resize());
    observer.observe(container);

    const initParticles = () => {
      particles.length = 0;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      for (let i = 0; i < particleCount; i++) {
        const baseOpacity = Math.random() * 0.25 + 0.15; // 0.15 to 0.4
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 3 + 1.2,
          speedY: -(Math.random() * 0.45 + 0.15), // upward effervescent drift
          speedX: (Math.random() - 0.5) * 0.25,
          opacity: baseOpacity,
          baseOpacity,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    };

    initParticles();

    let time = 0;
    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      ctx.clearRect(0, 0, width, height);

      time += 0.03;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;
          p.opacity = p.baseOpacity + Math.sin(time + i) * 0.08;

          // Wrap around screen boundaries
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Draw particle with gentle red glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 0, 9, ${Math.max(0.1, Math.min(0.5, p.opacity))})`;
        ctx.shadowColor = "#F40009";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full bg-[#000000] overflow-hidden pointer-events-none ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black pointer-events-none" />
    </div>
  );
};

export default ParticleBackground;
