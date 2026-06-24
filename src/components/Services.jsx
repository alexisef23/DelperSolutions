import React from 'react';
import './Services.css';
import { Smartphone, Server, Globe } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Smartphone size={40} className="service-icon text-cyan" />,
      title: "Apps Móviles Nativas (iOS & Android)",
      description: "Desarrollo personalizado de aplicaciones fluidas a disposición y personalización del cliente, listas para publicar en la App Store y Google Play Store, aprovechando hardware nativo (notificaciones, GPS, biométricos)."
    },
    {
      icon: <Server size={40} className="service-icon text-blue" />,
      title: "Sistemas y Plataformas Full-Stack",
      description: "Arquitectura robusta completa desde los cimientos, bases de datos seguras, paneles de administración y automatización de procesos internos para empresas medianas y grandes."
    },
    {
      icon: <Globe size={40} className="service-icon text-purple" />,
      title: "Sitios Web Comerciales de Alto Rendimiento",
      description: "Páginas web ultrarrápidas optimizadas para retener visitas, mostrar catálogos o menús interactivos, y convertir leads en ventas mediante SEO avanzado."
    }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Nuestro <span className="text-gradient">Alcance</span></h2>
      <p className="section-subtitle">Soluciones de ingeniería a la medida de tu modelo de negocio.</p>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card glass-panel">
            <div className="icon-wrapper">
              {service.icon}
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
