import React, { useEffect, useRef } from 'react';

const MouseParticles = ({ theme }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Deep bright colors based on theme
    const colors = theme === 'light' 
      ? ['#0284c7', '#1d4ed8', '#6d28d9'] // Light mode deep cyan, blue, purple
      : ['#00F2FE', '#4FACFE', '#B224EF']; // Dark mode neon cyan, blue, purple

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 6 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size -= 0.1;
      }
      draw() {
        if (this.size <= 0 || this.life <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    let isAnimating = false;

    const handleMouseMove = (e) => {
      // Add a few particles on mouse move
      for(let i = 0; i < 3; i++){
        particles.current.push(new Particle(e.clientX, e.clientY));
      }
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (particles.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isAnimating = false;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        particles.current[i].draw();
        if (particles.current[i].life <= 0 || particles.current[i].size <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

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
        zIndex: 50 // Ensures it stays above backgrounds but below content
      }} 
    />
  );
};

export default MouseParticles;
