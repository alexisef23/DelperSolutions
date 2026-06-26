import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ParticleButton = ({ to, className, children, onClick }) => {
  const buttonRef = useRef(null);
  const hoverIntervalRef = useRef(null);
  const navigate = useNavigate();
  const [isExploded, setIsExploded] = useState(false);

  const colors = ['#00F2FE', '#4FACFE', '#B224EF', '#ffffff', '#FFD700'];

  const createParticle = (x, y, isExplosion) => {
    const particle = document.createElement('div');
    document.body.appendChild(particle);

    // Partículas más grandes
    const size = Math.random() * (isExplosion ? 10 : 6) + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '99999';
    particle.style.opacity = '1';
    
    const duration = isExplosion ? 1.2 : 1.5;
    particle.style.transition = `transform ${duration}s cubic-bezier(0.1, 1, 0.2, 1), opacity ${duration}s ease-out`;

    void particle.offsetWidth;

    const angle = Math.random() * Math.PI * 2;
    // Distancia exponencial (algunas muy lejos, otras cerca)
    const distance = isExplosion ? (Math.pow(Math.random(), 2) * 200 + 60) : (Math.random() * 30 + 15);
    
    const tx = Math.cos(angle) * distance;
    const ty = isExplosion ? (Math.sin(angle) * distance) : -(Math.random() * 50 + 20);

    particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
    particle.style.opacity = '0';

    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, duration * 1000);
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current || isExploded) return;
    hoverIntervalRef.current = setInterval(() => {
      const rect = buttonRef.current.getBoundingClientRect();
      for (let i = 0; i < 3; i++) {
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        createParticle(x, y, false);
      }
    }, 60);
  };

  const handleMouseLeave = () => {
    clearInterval(hoverIntervalRef.current);
  };

  const handleClick = (e) => {
    if (isExploded) {
      e.preventDefault();
      return;
    }
    
    setIsExploded(true);
    clearInterval(hoverIntervalRef.current);

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Más partículas para la explosión
      for (let i = 0; i < 80; i++) {
        createParticle(centerX, centerY, true);
      }
    }
    
    if (onClick) onClick(e);

    if (to) {
      e.preventDefault();
      setTimeout(() => {
        navigate(to);
      }, 500); // 500ms delay para ver la explosión
    }
  };

  useEffect(() => {
    return () => clearInterval(hoverIntervalRef.current);
  }, []);

  const commonProps = {
    ref: buttonRef,
    className,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    style: {
      opacity: isExploded ? 0 : 1,
      transform: isExploded ? 'scale(0.8)' : 'scale(1)',
      pointerEvents: isExploded ? 'none' : 'auto',
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out'
    }
  };

  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {children}
      </Link>
    );
  }

  return (
    <button {...commonProps}>
      {children}
    </button>
  );
};

export default ParticleButton;
