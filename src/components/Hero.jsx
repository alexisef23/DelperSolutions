import React, { useState, useEffect } from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';
import ParticleButton from './ParticleButton';

const PHRASES = [
  "Código de Producción",
  "Sistemas Robustos",
  "Plataformas Web",
  "Agentes con IA",
  "Aplicaciones Nativas"
];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

const DecryptText = () => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    let active = true;
    const targetWord = PHRASES[phraseIdx];
    let iteration = 0;
    let interval;

    interval = setInterval(() => {
      if (!active) return;
      
      setDisplayText(() => {
        return targetWord
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return targetWord[index];
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      if (iteration >= targetWord.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (active) {
            setPhraseIdx(prev => (prev + 1) % PHRASES.length);
          }
        }, 3000);
      }
      iteration += 1 / 3;
    }, 25);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [phraseIdx]);

  return <span className="decrypt-span">{displayText}</span>;
};

const HeroEcosystem = ({ theme }) => (
  <div className="hero-ecosystem">
    {/* Orbit ring */}
    <div className="eco-orbit eco-orbit-1" />
    <div className="eco-orbit eco-orbit-2" />

    {/* Center Hub */}
    <div className="eco-center-hub">
      <div className="eco-hub-inner">
        <img 
          src={theme === 'dark' ? '/icono-claro.png' : '/icono.png'} 
          alt="Delper Solutions" 
          className="eco-hub-logo" 
        />
      </div>
      <div className="eco-hub-pulse" />
    </div>

    {/* Floating Cards */}
    {/* Browser Window - Web App */}
    <div className="eco-card eco-card-1 glass-panel">
      <div className="eco-card-bar">
        <span className="eco-dot eco-dot-r" />
        <span className="eco-dot eco-dot-y" />
        <span className="eco-dot eco-dot-g" />
        <span className="eco-card-url">web-platform.app</span>
      </div>
      <div className="eco-card-body">
        <div className="eco-line long cyan" />
        <div className="eco-line medium" />
        <div className="eco-blocks-row">
          <div className="eco-block cyan" />
          <div className="eco-block purple" />
          <div className="eco-block blue" />
        </div>
        <div className="eco-mini-chart">
          <svg viewBox="0 0 60 20">
            <path d="M0,15 Q10,5 20,10 T40,3 T60,8" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
    </div>

    {/* Mobile App - iOS */}
    <div className="eco-card eco-card-2 glass-panel eco-mobile">
      <div className="eco-mobile-notch" />
      <div className="eco-card-body eco-mobile-body">
        <div className="eco-app-icon-row">
          <div className="eco-app-icon cyan" />
          <div className="eco-app-icon purple" />
          <div className="eco-app-icon blue" />
        </div>
        <div className="eco-line medium cyan" />
        <div className="eco-line short" />
        <div className="eco-mobile-btn cyan" />
      </div>
      <div className="eco-mobile-bar" />
    </div>

    {/* Dashboard Panel */}
    <div className="eco-card eco-card-3 glass-panel">
      <div className="eco-card-bar">
        <span className="eco-dot eco-dot-r" />
        <span className="eco-dot eco-dot-y" />
        <span className="eco-dot eco-dot-g" />
        <span className="eco-card-url">admin.dashboard.io</span>
      </div>
      <div className="eco-card-body">
        <div className="eco-kpi-row">
          <div className="eco-kpi purple"><span>98%</span></div>
          <div className="eco-kpi cyan"><span>+50</span></div>
        </div>
        <div className="eco-bar-chart">
          <div className="eco-bar" style={{height:'60%'}} />
          <div className="eco-bar" style={{height:'90%'}} />
          <div className="eco-bar" style={{height:'45%'}} />
          <div className="eco-bar" style={{height:'75%'}} />
          <div className="eco-bar" style={{height:'100%'}} />
        </div>
      </div>
    </div>

    {/* Code Editor */}
    <div className="eco-card eco-card-4 glass-panel eco-code">
      <div className="eco-card-bar eco-code-bar">
        <span className="eco-code-title">api.service.ts</span>
      </div>
      <div className="eco-card-body eco-code-body">
        <div className="eco-code-line"><span className="cl-purple">async</span> <span className="cl-blue">fetchData</span><span className="cl-white">()</span></div>
        <div className="eco-code-line"><span className="cl-cyan">  return</span> <span className="cl-white">await</span></div>
        <div className="eco-code-line"><span className="cl-white">    fetch</span><span className="cl-yellow">(url)</span></div>
        <div className="eco-code-line"><span className="cl-green">  // OK 200</span></div>
        <div className="eco-cursor" />
      </div>
    </div>

    {/* Mobile App 2 - Android */}
    <div className="eco-card eco-card-5 glass-panel eco-mobile">
      <div className="eco-mobile-notch" />
      <div className="eco-card-body eco-mobile-body">
        <div className="eco-line long purple" />
        <div className="eco-chat-bubbles">
          <div className="eco-bubble received" />
          <div className="eco-bubble sent cyan" />
          <div className="eco-bubble received small" />
        </div>
        <div className="eco-mobile-btn purple" />
      </div>
      <div className="eco-mobile-bar" />
    </div>

    {/* API Status Card */}
    <div className="eco-card eco-card-6 glass-panel eco-status">
      <div className="eco-status-title">Services</div>
      <div className="eco-status-row"><span className="eco-status-dot green"/>API Gateway</div>
      <div className="eco-status-row"><span className="eco-status-dot green"/>Database</div>
      <div className="eco-status-row"><span className="eco-status-dot cyan anim"/>Auth Service</div>
    </div>

    {/* Connection lines via SVG */}
    <svg className="eco-connections" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
      <line x1="250" y1="250" x2="100" y2="100" className="eco-conn-line" />
      <line x1="250" y1="250" x2="400" y2="100" className="eco-conn-line" />
      <line x1="250" y1="250" x2="80" y2="320" className="eco-conn-line" />
      <line x1="250" y1="250" x2="420" y2="310" className="eco-conn-line" />
      <line x1="250" y1="250" x2="150" y2="420" className="eco-conn-line" />
      <line x1="250" y1="250" x2="360" y2="420" className="eco-conn-line" />
      {/* Moving data particles */}
      <circle r="3" fill="var(--accent-cyan)" opacity="0.9">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M250,250 L100,100" />
      </circle>
      <circle r="3" fill="var(--accent-purple)" opacity="0.9">
        <animateMotion dur="3s" repeatCount="indefinite" path="M250,250 L400,100" />
      </circle>
      <circle r="3" fill="var(--accent-blue)" opacity="0.9">
        <animateMotion dur="2s" repeatCount="indefinite" path="M250,250 L80,320" />
      </circle>
      <circle r="3" fill="var(--accent-cyan)" opacity="0.9">
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M250,250 L420,310" />
      </circle>
      <circle r="3" fill="var(--accent-purple)" opacity="0.9">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M250,250 L150,420" />
      </circle>
      <circle r="3" fill="var(--accent-blue)" opacity="0.9">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M250,250 L360,420" />
      </circle>
    </svg>
  </div>
);

const Hero = ({ theme }) => {
  const btnPrimaryRef = useMagnetic(0.2);
  const btnSecondaryRef = useMagnetic(0.2);

  return (
    <div className="hero container animate-fade-in">
      <div className="hero-content">
        
        <h1 className="hero-title">
          Transformamos tus ideas en <br />
          <span className="text-gradient-wrapper">
            <DecryptText />
          </span>
        </h1>
        
        <p className="hero-subtitle">
          Ingeniería de software a medida, optimizada para iOS, Android y entornos web. Diseñamos soluciones personalizadas que automatizan tus procesos internos e incrementan tus ventas.
        </p>
        
        <div className="hero-actions">
          <div ref={btnPrimaryRef}>
            <ParticleButton to="/contacto" className="btn btn-primary">
              Iniciar mi proyecto <ArrowRight className="ml-2" size={18} />
            </ParticleButton>
          </div>
          <div ref={btnSecondaryRef}>
            <ParticleButton to="/portafolio" className="btn btn-secondary">
              Ver Casos de Éxito
            </ParticleButton>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="hero-visual-inner">
          <div className="hero-glow-back"></div>
          <HeroEcosystem theme={theme} />
          <div className="hero-floating-badge badge-1">
            <span className="badge-dot"></span> Sistemas Web
          </div>
          <div className="hero-floating-badge badge-2">
            <span className="badge-dot purple"></span> Apps iOS &amp; Android
          </div>
          <div className="hero-floating-badge badge-3">
            <span className="badge-dot cyan"></span> Agentes IA
          </div>
          <div className="hero-floating-badge badge-4">
            <span className="badge-dot purple"></span> Automatización
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
