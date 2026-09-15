import { useState, useRef } from 'react';
import './Services.css';
import { Smartphone, Server, Globe, ArrowRight, Sparkles } from 'lucide-react';
import ContactModal from './ContactModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

const ServiceCard = ({ service, onClick }) => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const animFrameRef = useRef(null);
  const stateRef = useRef({
    targetRx: 0, targetRy: 0, targetTy: 0, targetShineX: 50, targetShineY: 50, targetShineOpacity: 0,
    currentRx: 0, currentRy: 0, currentTy: 0, currentShineX: 50, currentShineY: 50, currentShineOpacity: 0,
    isHovered: false
  });

  const updateCardPhysics = () => {
    const s = stateRef.current;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    s.currentRx = lerp(s.currentRx, s.targetRx, 0.12);
    s.currentRy = lerp(s.currentRy, s.targetRy, 0.12);
    s.currentTy = lerp(s.currentTy, s.targetTy, 0.12);
    s.currentShineX = lerp(s.currentShineX, s.targetShineX, 0.15);
    s.currentShineY = lerp(s.currentShineY, s.targetShineY, 0.15);
    s.currentShineOpacity = lerp(s.currentShineOpacity, s.targetShineOpacity, 0.12);

    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(${s.currentRx.toFixed(2)}deg) rotateY(${s.currentRy.toFixed(2)}deg) translateY(${s.currentTy.toFixed(2)}px)`;
      cardRef.current.style.boxShadow = s.isHovered
        ? '0 20px 45px rgba(0, 242, 254, 0.14), 0 0 35px rgba(178, 36, 239, 0.08)'
        : '';
    }

    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${s.currentShineX.toFixed(1)}% ${s.currentShineY.toFixed(1)}%, rgba(255, 255, 255, 0.09) 0%, transparent 60%)`;
      shineRef.current.style.opacity = s.currentShineOpacity.toFixed(3);
    }

    if (s.isHovered || Math.abs(s.currentRx - s.targetRx) > 0.01 || Math.abs(s.currentRy - s.targetRy) > 0.01 || Math.abs(s.currentShineOpacity - s.targetShineOpacity) > 0.01) {
      animFrameRef.current = requestAnimationFrame(updateCardPhysics);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const s = stateRef.current;
    s.targetRx = -((y - yc) / yc) * 8.5;
    s.targetRy = ((x - xc) / xc) * 8.5;
    s.targetTy = -8;
    s.targetShineX = (x / rect.width) * 100;
    s.targetShineY = (y / rect.height) * 100;
    s.targetShineOpacity = 1;

    if (!s.isHovered) {
      s.isHovered = true;
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(updateCardPhysics);
    }
  };

  const handleMouseLeave = () => {
    const s = stateRef.current;
    s.isHovered = false;
    s.targetRx = 0;
    s.targetRy = 0;
    s.targetTy = 0;
    s.targetShineOpacity = 0;
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(updateCardPhysics);
  };

  return (
    <div 
      ref={cardRef}
      className="service-card glass-panel relative-card"
      onClick={(e) => { handleMouseLeave(); onClick(e); }}
      style={{ cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={shineRef} className="shine-overlay" style={{ opacity: 0 }} />
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
