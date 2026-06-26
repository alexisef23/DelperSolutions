import React, { useState } from 'react';
import './Services.css';
import { Smartphone, Server, Globe, ArrowRight, Sparkles } from 'lucide-react';
import ContactModal from './ContactModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import FloatingHint from './FloatingHint';

const ServiceCard = ({ service, onClick }) => {
  const [style, setStyle] = useState({});
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    const rx = -(dy / yc) * 10; // tilt max 10 degrees
    const ry = (dx / xc) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`,
      transition: 'transform 0.08s ease, box-shadow 0.08s ease',
      boxShadow: '0 20px 40px rgba(0, 242, 254, 0.12), 0 0 30px rgba(178, 36, 239, 0.06)'
    });

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setShineStyle({
      background: `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: '',
      transition: 'transform 0.5s ease, box-shadow 0.5s ease'
    });
    setShineStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease'
    });
  };

  return (
    <div 
      className="service-card glass-panel relative-card"
      onClick={(e) => { handleMouseLeave(); onClick(e); }}
      style={{ cursor: 'pointer', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="shine-overlay" style={shineStyle} />
      <div className="icon-wrapper">
        {service.icon}
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
      <div className="service-cta">
        <span>Cotizar proyecto</span>
        <ArrowRight size={16} className="cta-arrow" />
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const revealRef = useScrollReveal();

  const services = [
    {
      icon: <Smartphone size={40} className="service-icon text-cyan" />,
      title: "Apps Móviles Nativas (iOS & Android)",
      description: "Desarrollo personalizado de aplicaciones fluidas a disposición y personalización del cliente, listas para publicar en la App Store y Google Play Store, aprovechando hardware nativo (notificaciones, GPS, biométricos).",
      type: "mobile"
    },
    {
      icon: <Server size={40} className="service-icon text-blue" />,
      title: "Sistemas y Plataformas Full-Stack",
      description: "Arquitectura robusta completa desde los cimientos, bases de datos seguras, paneles de administración y automatización de procesos internos para empresas medianas y grandes.",
      type: "custom"
    },
    {
      icon: <Globe size={40} className="service-icon text-purple" />,
      title: "Sitios Web Comerciales de Alto Rendimiento",
      description: "Páginas web ultrarrápidas optimizadas para retener visitas, mostrar catálogos o menús interactivos, y convertir leads en ventas mediante SEO avanzado.",
      type: "web"
    },
    {
      icon: <Sparkles size={40} className="service-icon text-cyan" />,
      title: "Agentes y Automatizaciones con IA",
      description: "Integración de modelos generativos de lenguaje y agentes inteligentes de IA para automatizar flujos de trabajo internos, clasificar leads y eficientar la atención de tus clientes 24/7.",
      type: "ai"
    }
  ];

  return (
    <div ref={revealRef} className="container">
      <h2 className="section-title">Nuestro <span className="text-gradient">Alcance</span></h2>
      <p className="section-subtitle">Soluciones de ingeniería a la medida de tu modelo de negocio.</p>
      <FloatingHint message='Deja el ratón quieto por 4 segundos para activar el modo secreto 🚀' />
      
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            service={service}
            onClick={() => setSelectedService(service.type)}
          />
        ))}
      </div>

      {selectedService && (
        <ContactModal 
          initialType={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
};

export default Services;
