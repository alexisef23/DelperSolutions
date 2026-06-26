import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FloatingHint = ({ message, delaySeconds = 10 }) => {
  const [phase, setPhase] = useState('hidden');

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase('visible');
    }, delaySeconds * 1000);
    return () => clearTimeout(showTimer);
  }, [delaySeconds]);

  useEffect(() => {
    if (phase === 'visible') {
      const fadeTimer = setTimeout(() => setPhase('fading'), 2500);
      return () => clearTimeout(fadeTimer);
    }
    if (phase === 'fading') {
      const removeTimer = setTimeout(() => setPhase('done'), 600);
      return () => clearTimeout(removeTimer);
    }
  }, [phase]);

  if (phase === 'hidden' || phase === 'done') return null;

  const overlay = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999998,
      pointerEvents: 'none',
      opacity: phase === 'fading' ? 0 : 1,
      transform: phase === 'fading' ? 'scale(0.9)' : 'scale(1)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      animation: phase === 'visible' ? 'hintAppear 0.6s ease' : undefined
    }}>
      <div style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 242, 254, 0.4)',
        borderRadius: '16px',
        padding: '2rem 3rem',
        maxWidth: '600px',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(0, 242, 254, 0.2)'
      }}>
        <p style={{
          color: '#fff',
          fontSize: '1.4rem',
          fontWeight: 600,
          margin: 0,
          lineHeight: 1.5,
          textShadow: '0 0 20px rgba(0, 242, 254, 0.5)'
        }}>
          🥚 {message}
        </p>
      </div>

      <style>{`
        @keyframes hintAppear {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );

  return createPortal(overlay, document.body);
};

export default FloatingHint;
