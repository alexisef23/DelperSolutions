import React from 'react';
import './Portfolio.css';
import { ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
  const cases = [
    {
      title: "Zyklus Halo",
      client: "Proyecto ZF Engineering",
      image: "/assets/Empresa satisfechas/ZF_logo_STD_Blue_3CC.svg.png",
      problem: "Flujos complejos de ingeniería y falta de optimización en arquitectura de datos.",
      solution: "Plataforma industrial avanzada con backend robusto y una UI/UX impecable.",
      impact: "Ganador del Primer Lugar en el Innovation Meetup 2026. Optimización masiva de procesos."
    },
    {
      title: "Clasificación de Leads y Ticketing",
      client: "Desarrollo para Inttec",
      image: null,
      problem: "Saturación en flujos comerciales y atención al cliente manual.",
      solution: "Solución de automatización inteligente con calificación automatizada en tiempo real.",
      impact: "Canalización de flujos comerciales eficiente e integración nativa con sistema de tickets."
    },
    {
      title: "WeberTrack",
      client: "Reto Weber's Bread",
      image: "/assets/Empresa satisfechas/webers-logo-300x179.png",
      problem: "Falta de analítica avanzada y control predictivo de ventas.",
      solution: "Aplicación logística Full-Stack y sistema dinámico predictivo.",
      impact: "Reducción drástica de mermas y desperdicios en cadenas de suministro."
    },
    {
      title: "Plataforma OxxoGo",
      client: "Servicios de consumo",
      image: "/assets/Empresa satisfechas/Oxxo_Logo.svg.png",
      problem: "Necesidad de optimización en servicios de consumo masivo con alta concurrencia.",
      solution: "Sistema innovador de automatización de flujos con bases de datos en tiempo real.",
      impact: "Experiencia de usuario ágil y operaciones comerciales optimizadas a gran escala."
    },
    {
      title: "Sistema de Reservas",
      client: "Novo Sushi",
      image: "/assets/Empresa satisfechas/icono_novo.png",
      problem: "Gestión de reservaciones manual y falta de presencia digital unificada.",
      solution: "Plataforma digital integral (menú JSON, reservaciones en tiempo real).",
      impact: "Integración nativa de pasarelas de pago seguro y aumento en conversiones."
    },
    {
      title: "Asistente Virtual Inteligente",
      client: "Salón de Uñas",
      image: null,
      problem: "Pérdida de citas fuera de horario de oficina.",
      solution: "Desarrollo e integración de un chatbot automatizado 24/7.",
      impact: "Gestión automática de citas y optimización completa de la agenda diaria."
    }
  ];

  return (
    <section id="portafolio" className="container">
      <h2 className="section-title">Casos de <span className="text-gradient">Éxito</span></h2>
      <p className="section-subtitle">El corazón de nuestra ingeniería: soluciones probadas con impacto real.</p>
      
      <div className="portfolio-grid">
        {cases.map((item, index) => (
          <div key={index} className="portfolio-card glass-panel">
            <div className="portfolio-header">
              <div className="portfolio-client-logo">
                {item.image ? (
                  <img src={item.image} alt={item.client} className="client-img" />
                ) : (
                  <div className="client-placeholder">{item.client.charAt(0)}</div>
                )}
              </div>
              <div className="portfolio-title-wrapper">
                <h3 className="portfolio-title">{item.title}</h3>
                <span className="portfolio-client">{item.client}</span>
              </div>
              <ArrowUpRight className="portfolio-link-icon" />
            </div>
            
            <div className="portfolio-content">
              <div className="portfolio-stat">
                <span className="stat-label">Problema</span>
                <p className="stat-value">{item.problem}</p>
              </div>
              <div className="portfolio-stat">
                <span className="stat-label">Solución</span>
                <p className="stat-value">{item.solution}</p>
              </div>
              <div className="portfolio-stat impact">
                <span className="stat-label text-gradient">Impacto</span>
                <p className="stat-value highlight">{item.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
