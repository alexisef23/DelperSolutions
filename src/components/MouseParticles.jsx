import { useEffect, useRef } from 'react';

const MouseParticles = ({ theme }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isMoved: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    // Deep bright colors based on theme
    const colors = theme === 'light' 
      ? ['#0284c7', '#0284c7', '#1d4ed8', '#4338ca', '#6d28d9'] 
      : ['#00F2FE', '#00F2FE', '#4FACFE', '#7F00FF', '#B224EF'];

    class Particle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.initialSize = Math.random() * 3.5 + 2.5;
        this.size = this.initialSize;
        this.speedX = (Math.random() - 0.5) * 0.8 + (vx * 0.08);
        this.speedY = (Math.random() - 0.5) * 0.8 + (vy * 0.08) - 0.15; // Gentle upward buoyancy
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.maxLife = Math.random() * 25 + 25; // ~35 frames
        this.life = this.maxLife;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= 0.94; // Organic deceleration
        this.speedY *= 0.94;
        this.life -= 1;
        
        const progress = 1 - (this.life / this.maxLife);
        // Soft organic pulse: grows slightly first 20%, then shrinks
        if (progress < 0.2) {
          this.size = this.initialSize * (1 + progress * 0.8);
        } else {
          this.size = this.initialSize * 1.16 * (1 - (progress - 0.2) / 0.8);
        }
      }
      draw() {
        if (this.size <= 0.1 || this.life <= 0) return;
        const progress = 1 - (this.life / this.maxLife);
        // Smooth sine wave alpha curve (fade-in -> peak -> fade-out)
        const alpha = Math.sin(progress * Math.PI) * 0.85;

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    let isAnimating = false;

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (particlesRef.current.length > 0) {
        const remaining = [];
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i];
          p.update();
          p.draw();
          if (p.life > 0 && p.size > 0.2) {
            remaining.push(p);
          }
        }
        particlesRef.current = remaining;
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      if (!mouseRef.current.isMoved) {
        mouseRef.current.lastX = x;
        mouseRef.current.lastY = y;
        mouseRef.current.isMoved = true;
      }

      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      const dist = Math.hypot(dx, dy);

      // Interpolate particles along the mouse movement vector for a continuous trail
      const steps = Math.min(Math.max(Math.floor(dist / 4), 1), 10);
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const px = mouseRef.current.lastX + dx * t;
        const py = mouseRef.current.lastY + dy * t;
        
        if (particlesRef.current.length < 120) {
          particlesRef.current.push(new Particle(px, py, dx, dy));
        }
      }

      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;

      startAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50
      }} 
    />
  );
};

export default MouseParticles;
