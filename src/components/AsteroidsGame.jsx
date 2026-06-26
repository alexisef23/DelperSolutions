import React, { useState, useEffect, useRef } from 'react';

const AsteroidsGame = () => {
  const [isActive, setIsActive] = useState(false);
  const idleTimeoutRef = useRef(null);
  const canvasRef = useRef(null);

  // Game state
  const gameState = useRef({
    ship: { x: window.innerWidth / 2, y: window.innerHeight / 2, angle: -Math.PI / 2, vx: 0, vy: 0 },
    keys: { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, Space: false, w: false, a: false, s: false, d: false, " ": false },
    projectiles: [],
    particles: [],
    targets: [],
    enemies: [],
    lastShot: 0,
    lives: 3,
    startTime: 0,
    lastEnemySpawn: 0,
    gameOver: false,
    gameOverTime: 0
  });

  const animationFrameRef = useRef(null);

  // --- Idle Detection ---
  useEffect(() => {
    const resetIdleTimer = (e) => {
      // Don't reset if game is active, except for ESC key
      if (isActive) {
        if (e.type === 'keydown' && e.key === 'Escape') {
          setIsActive(false);
          document.body.style.overflow = '';
        }
        return; 
      }
      
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setIsActive(true);
      }, 4000); // 4 seconds idle
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetIdleTimer));
    
    idleTimeoutRef.current = setTimeout(() => {
      setIsActive(true);
    }, 4000);

    return () => {
      events.forEach(event => window.removeEventListener(event, resetIdleTimer));
      clearTimeout(idleTimeoutRef.current);
    };
  }, [isActive]);

  // --- Game Initialization ---
  useEffect(() => {
    if (!isActive) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    document.body.style.overflow = 'hidden'; 
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    gameState.current.ship = { 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2, 
      angle: -Math.PI / 2, 
      vx: 0, 
      vy: 0 
    };
    gameState.current.projectiles = [];
    gameState.current.particles = [];
    gameState.current.enemies = [];
    gameState.current.lives = 3;
    gameState.current.gameOver = false;
    gameState.current.startTime = performance.now();
    
    const elements = document.querySelectorAll('h1, h2, h3, p, a, button, img, svg, .glass-panel, .eco-card, .btn');
    const targets = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
        targets.push({ element: el, rect, active: true, originalVisibility: el.style.visibility });
      }
    });
    gameState.current.targets = targets;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') return; 
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault(); 
      }
      gameState.current.keys[e.key] = true;
    };

    const handleKeyUp = (e) => {
      gameState.current.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    let lastTime = performance.now();
    
    const loop = (time) => {
      const dt = (time - lastTime) / 1000; 
      lastTime = time;
      
      update(dt);
      draw(ctx, canvas.width, canvas.height);
      
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    
    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameRef.current);
      document.body.style.overflow = '';
      
      gameState.current.targets.forEach(t => {
        if (!t.active) {
          t.element.style.visibility = t.originalVisibility;
          t.element.style.opacity = '1';
        }
      });
    };
  }, [isActive]);

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 200 + 50;
      gameState.current.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color || ['#00F2FE', '#4FACFE', '#B224EF', '#ffffff'][Math.floor(Math.random() * 4)]
      });
    }
  };

  const update = (dt) => {
    const state = gameState.current;
    let safeDt = dt;
    if (safeDt > 0.1) safeDt = 0.1; 

    const { ship, keys, projectiles, particles, targets, enemies } = state;

    if (state.gameOver) {
      // Game Over exit logic
      if (performance.now() - state.gameOverTime > 3000) {
        setIsActive(false);
      }
    } else {
      // Ship controls
      const isAccelerating = keys.ArrowUp || keys.w;
      const isTurningLeft = keys.ArrowLeft || keys.a;
      const isTurningRight = keys.ArrowRight || keys.d;
      const isShooting = keys[' '] || keys.Space;

      if (isTurningLeft) ship.angle -= 5 * safeDt;
      if (isTurningRight) ship.angle += 5 * safeDt;

      if (isAccelerating) {
        ship.vx += Math.cos(ship.angle) * 800 * safeDt;
        ship.vy += Math.sin(ship.angle) * 800 * safeDt;
      }

      ship.vx *= 0.98;
      ship.vy *= 0.98;

      ship.x += ship.vx * safeDt;
      ship.y += ship.vy * safeDt;

      if (ship.x < 0) ship.x = window.innerWidth;
      if (ship.x > window.innerWidth) ship.x = 0;
      if (ship.y < 0) ship.y = window.innerHeight;
      if (ship.y > window.innerHeight) ship.y = 0;

      if (isShooting && performance.now() - state.lastShot > 150) {
        projectiles.push({
          x: ship.x + Math.cos(ship.angle) * 15,
          y: ship.y + Math.sin(ship.angle) * 15,
          vx: ship.vx + Math.cos(ship.angle) * 1000,
          vy: ship.vy + Math.sin(ship.angle) * 1000,
          life: 1.5
        });
        state.lastShot = performance.now();
      }

      const timeSinceStart = performance.now() - state.startTime;
      const allTargetsDestroyed = targets.length > 0 && targets.every(t => !t.active);
      
      // Changed to 5 seconds to be more engaging
      if (timeSinceStart > 5000 || allTargetsDestroyed) {
        if (performance.now() - state.lastEnemySpawn > 1000) {
          let ex, ey;
          if (Math.random() > 0.5) {
            ex = Math.random() > 0.5 ? -40 : window.innerWidth + 40;
            ey = Math.random() * window.innerHeight;
          } else {
            ex = Math.random() * window.innerWidth;
            ey = Math.random() > 0.5 ? -40 : window.innerHeight + 40;
          }
          enemies.push({ x: ex, y: ey, speed: Math.random() * 80 + 100 });
          state.lastEnemySpawn = performance.now();
        }
      }
    }

    // Update projectiles & Collisions
    for (let i = projectiles.length - 1; i >= 0; i--) {
      let p = projectiles[i];
      p.x += p.vx * safeDt;
      p.y += p.vy * safeDt;
      p.life -= safeDt;

      let hit = false;
      
      if (p.x < 0) p.x = window.innerWidth;
      if (p.x > window.innerWidth) p.x = 0;
      if (p.y < 0) p.y = window.innerHeight;
      if (p.y > window.innerHeight) p.y = 0;

      // Check collision with DOM targets
      for (let t of targets) {
        if (!t.active) continue;
        if (p.x >= t.rect.left && p.x <= t.rect.right && p.y >= t.rect.top && p.y <= t.rect.bottom) {
          hit = true;
          t.active = false;
          t.element.style.visibility = 'hidden';
          t.element.style.opacity = '0';
          t.element.style.transition = 'opacity 0.2s';
          createExplosion(p.x, p.y);
          break;
        }
      }

      if (hit || p.life <= 0) {
        projectiles.splice(i, 1);
      }
    }

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      let e = enemies[i];
      
      const dx = ship.x - e.x;
      const dy = ship.y - e.y;
      const angle = Math.atan2(dy, dx);
      
      e.x += Math.cos(angle) * e.speed * safeDt;
      e.y += Math.sin(angle) * e.speed * safeDt;
      
      // Collision with player
      if (!state.gameOver && Math.hypot(ship.x - e.x, ship.y - e.y) < 25) {
        state.lives -= 1;
        createExplosion(e.x, e.y, '#FF3366');
        createExplosion(ship.x, ship.y, '#00F2FE');
        enemies.splice(i, 1);
        
        if (state.lives <= 0) {
          state.gameOver = true;
          state.gameOverTime = performance.now();
        }
        continue;
      }

      // Collision with projectiles
      let hitProjectile = false;
      for (let j = projectiles.length - 1; j >= 0; j--) {
        let p = projectiles[j];
        if (Math.hypot(p.x - e.x, p.y - e.y) < 25) {
          hitProjectile = true;
          createExplosion(e.x, e.y, '#FF3366');
          projectiles.splice(j, 1);
          break;
        }
      }

      if (hitProjectile) {
        enemies.splice(i, 1);
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.x += p.vx * safeDt;
      p.y += p.vy * safeDt;
      p.life -= safeDt * 1.5;
      if (p.life <= 0) particles.splice(i, 1);
    }
  };

  const draw = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    
    const { ship, projectiles, particles, keys, enemies, lives, gameOver } = gameState.current;

    // Help Text
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 20px 'Space Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("¡Alerta de Intrusión! MODO ASTEROIDS", width / 2, 80);
    ctx.font = "14px 'Space Mono', monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillText("Mover: Flechas / WASD  |  Disparar: ESPACIO  |  Salir: ESC", width / 2, 110);

    // Draw Ship
    if (!gameOver) {
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle);
      
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-10, -10);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-10, 10);
      ctx.closePath();
      ctx.strokeStyle = '#00F2FE';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.fill();
      
      if (keys.ArrowUp || keys.w) {
        ctx.beginPath();
        ctx.moveTo(-6, 0);
        ctx.lineTo(-18, (Math.random() - 0.5) * 8);
        ctx.lineTo(-6, (Math.random() - 0.5) * 8);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.restore();
    }

    // Draw Enemies (Made them larger)
    for (let e of enemies) {
      const angle = Math.atan2(ship.y - e.y, ship.x - e.x);
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(angle);
      
      ctx.beginPath();
      ctx.moveTo(18, 0);
      ctx.lineTo(-12, -15);
      ctx.lineTo(-12, 15);
      ctx.closePath();
      ctx.strokeStyle = '#FF3366';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = 'rgba(255, 51, 102, 0.3)';
      ctx.fill();
      ctx.restore();
    }

    // Draw Projectiles
    ctx.fillStyle = '#FFD700';
    for (let p of projectiles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Particles
    for (let p of particles) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2 + p.life * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw Lives (Hearts) on the left
    ctx.font = "28px Arial";
    ctx.fillStyle = "#FF3366";
    ctx.textAlign = "left";
    let hearts = "";
    for (let i = 0; i < lives; i++) hearts += "♥ ";
    ctx.fillText(hearts, 30, height - 30);

    // Draw Game Over
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#FF3366";
      ctx.font = "bold 60px 'Space Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", width / 2, height / 2);
      ctx.fillStyle = "white";
      ctx.font = "20px 'Space Mono', monospace";
      ctx.fillText("Regresando a la página principal...", width / 2, height / 2 + 50);
    }
  };

  if (!isActive) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      zIndex: 999999, pointerEvents: 'none', background: 'transparent'
    }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  );
};

export default AsteroidsGame;
