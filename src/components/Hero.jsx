import React from 'react';
import './Hero.css';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero container animate-fade-in">
      <div className="hero-content">
        
        <h1 className="hero-title">
          Transformamos tus ideas en <span className="text-gradient">Sistemas Robustos</span>, Plataformas Full-Stack y Apps Nativas
        </h1>
        
        <p className="hero-subtitle">
          Ingeniería de software a medida, optimizada para iOS, Android y entornos web. Diseñamos soluciones personalizadas que automatizan tus procesos internos e incrementan tus ventas.
        </p>
        
        <div className="hero-actions">
          <a href="#contacto" className="btn btn-primary">
            Iniciar mi proyecto <ArrowRight className="ml-2" size={18} />
          </a>
          <a href="#portafolio" className="btn btn-secondary">
            Ver Casos de Éxito
          </a>
        </div>
      </div>
      
      <div className="hero-visual">
         <img src="/icono.png" alt="Delper Solutions Icon" className="hero-image glass-panel" />
      </div>
    </section>
  );
};

export default Hero;
