import React, { useState, useEffect, useRef } from 'react';
import './TechStack.css';
import { Layout, Smartphone, Sparkles, Building2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import FloatingHint from './FloatingHint';

const TechStack = () => {
  const [activeProfile, setActiveProfile] = useState(null);
  const revealRef = useScrollReveal();

  const profiles = [
    {
      id: 'saas',
      name: 'SaaS Web',
      icon: <Layout size={18} />,
      desc: 'Plataformas web modernas, escalables y orientadas a la nube.',
      techs: ["React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Supabase", "Railway"]
    },
    {
      id: 'mobile',
      name: 'App Móvil',
      icon: <Smartphone size={18} />,
      desc: 'Aplicaciones nativas e híbridas de alta performance para Android e iOS.',
      techs: ["Flutter", "React Native", "Swift", "Kotlin", "Node.js", "Supabase", "PostgreSQL"]
    },
    {
      id: 'ai',
      name: 'Agentes IA',
      icon: <Sparkles size={18} />,
      desc: 'Modelos de lenguaje, automatización de procesos y agentes cognitivos.',
      techs: ["Python", "Node.js", "Supabase", "Railway", "React", "PostgreSQL"]
    },
    {
      id: 'enterprise',
      name: 'Sistemas Corporativos',
      icon: <Building2 size={18} />,
      desc: 'Bases de datos masivas, arquitecturas distribuidas y seguridad nivel bancario.',
      techs: ["Next.js", "Node.js", "Python", "PostgreSQL", "AWS"]
    }
  ];

  const categories = [
    {
      name: "Frontend",
      techs: [
        { name: "React", img: "/assets/logos/React-icon.svg.png" },
        { name: "Next.js", img: "/assets/logos/nextjs-icon-dark-background.png" },
        { name: "Tailwind CSS", img: "/assets/logos/Tailwind_CSS_Logo.svg.png" }
      ]
    },
    {
      name: "Backend & APIs",
      techs: [
        { name: "Node.js", img: "/assets/logos/Node.js_logo.svg.png" },
        { name: "Python", img: "/assets/logos/Python-logo-notext.svg.png" }
      ]
    },
    {
      name: "Cloud & DB",
      techs: [
        { name: "PostgreSQL", img: "/assets/logos/Postgresql_elephant.svg.png" },
        { name: "Supabase", img: "/assets/logos/supabase.png" },
        { name: "AWS", img: "/assets/logos/Amazon_Web_Services_Logo.svg.png" },
        { name: "Railway", img: "/assets/logos/railway.jfif" }
      ]
    },
    {
      name: "Mobile",
      techs: [
        { name: "Flutter", img: "/assets/logos/Google-flutter-logo.svg.png" },
        { name: "React Native", img: "/assets/logos/react-native-1.png" },
        { name: "Swift", img: "/assets/logos/swift.png" },
        { name: "Kotlin", img: "/assets/logos/kotlin.jfif" }
      ]
    }
  ];

  const handleProfileClick = (profileId) => {
    setActiveProfile(prev => prev === profileId ? null : profileId);
  };

  const [isMatrix, setIsMatrix] = useState(false);
  const matrixCanvasRef = useRef(null);
  const keySequence = useRef('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key && e.key.length === 1) {
        keySequence.current += e.key.toLowerCase();
        if (keySequence.current.length > 6) {
          keySequence.current = keySequence.current.slice(-6);
        }
        if (keySequence.current === 'matrix') {
          setIsMatrix(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isMatrix) return;
    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    let interval;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    
    interval = setInterval(draw, 33);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, [isMatrix]);

  const isTechHighlighted = (techName) => {
    if (!activeProfile) return true; // Default: highlight all
    const profile = profiles.find(p => p.id === activeProfile);
    return profile?.techs.includes(techName);
  };

  return (
    <div ref={revealRef} className={`container relative ${isMatrix ? 'matrix-mode' : ''}`}>
      {isMatrix && (
        <canvas 
          ref={matrixCanvasRef} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, opacity: 0.3, pointerEvents: 'none' }}
        />
      )}
      <h2 className="section-title">Nuestro <span className="text-gradient">Arsenal Técnico</span></h2>
      <p className="section-subtitle">
        Tecnologías de vanguardia para arquitecturas escalables.
      </p>
      <FloatingHint message="Teclea la palabra 'matrix' en tu teclado para ver la verdad" />
      
      {/* Architectures Recommender Profiles Selector */}
      <div className="tech-recommender-section glass-panel">
        <h4 className="recommender-title">
          <Sparkles size={16} className="recommender-sparkles" /> Recomendador de Arquitecturas
        </h4>
        <p className="recommender-desc">
          Selecciona una arquitectura para ver la combinación ideal de tecnologías recomendada por nuestro equipo de ingeniería.
        </p>
        
        <div className="profile-selector-grid">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              className={`profile-selector-btn ${activeProfile === profile.id ? 'active' : ''}`}
              onClick={() => handleProfileClick(profile.id)}
              type="button"
            >
              <div className="profile-btn-header">
                <span className="profile-icon">{profile.icon}</span>
                <span className="profile-name">{profile.name}</span>
              </div>
              <span className="profile-btn-desc">{profile.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tech-stack-container">
        {categories.map((category, idx) => (
          <div key={idx} className="tech-category glass-panel">
            <h3 className="category-title">{category.name}</h3>
            <div className="tech-grid">
              {category.techs.map((tech, tIdx) => {
                const highlighted = isTechHighlighted(tech.name);
                return (
                  <div 
                    key={tIdx} 
                    className={`tech-item ${highlighted ? 'highlight' : 'dimmed'}`}
                  >
                    {tech.img ? (
                      <div className="tech-img-wrapper">
                        <img src={tech.img} alt={tech.name} className="tech-img" />
                      </div>
                    ) : (
                      <div className="tech-placeholder"></div>
                    )}
                    <span className="tech-name">{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
