import { useRef, useEffect, useState } from 'react';
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

    const size = Math.random() * (isExplosion ? 8 : 5) + 3;
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
    
    const duration = isExplosion ? 1.0 : 1.2;
    particle.style.transition = `transform ${duration}s cubic-bezier(0.1, 1, 0.2, 1), opacity ${duration}s ease-out`;

    const angle = Math.random() * Math.PI * 2;
    const distance = isExplosion ? (Math.pow(Math.random(), 2) * 160 + 50) : (Math.random() * 25 + 10);
    const tx = Math.cos(angle) * distance;
    const ty = isExplosion ? (Math.sin(angle) * distance) : -(Math.random() * 40 + 15);

    requestAnimationFrame(() => {
      particle.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(0)`;
      particle.style.opacity = '0';
    });

    setTimeout(() => {
      if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, duration * 1000);
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current || isExploded) return;
    clearInterval(hoverIntervalRef.current);
    hoverIntervalRef.current = setInterval(() => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      createParticle(x, y, false);
    }, 90);
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
      
      for (let i = 0; i < 40; i++) {
        createParticle(centerX, centerY, true);
      }
    }
    
    if (onClick) onClick(e);

    if (to) {
      e.preventDefault();
      setTimeout(() => {
        navigate(to);
        setIsExploded(false);
      }, 400);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(hoverIntervalRef.current);
      setIsExploded(false);
    };
  }, [to]);

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
