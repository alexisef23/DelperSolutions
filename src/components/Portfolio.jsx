import React, { useState } from 'react';
import './Portfolio.css';
import { ArrowUpRight, X } from 'lucide-react';

const CardMockup = ({ type }) => {
  switch (type) {
    case "engineering-charts":
      return (
        <div className="card-mockup browser-mockup">
          <div className="browser-header">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <div className="browser-url">zyklus.zf.engineering</div>
          </div>
          <div className="browser-body mockup-engineering">
            <div className="grid-bg-overlay"></div>
            <div className="glowing-wave-container">
              <svg viewBox="0 0 100 40" className="glowing-chart">
                <path d="M0,30 Q15,5 30,25 T60,10 T90,20 L100,20" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                <path d="M0,35 Q20,15 40,30 T70,5 T100,15" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" strokeDasharray="3" />
                <circle cx="30" cy="25" r="3" fill="var(--accent-cyan)" className="pulse-node" />
                <circle cx="70" cy="5" r="3" fill="var(--accent-purple)" className="pulse-node" />
              </svg>
            </div>
            <div className="mockup-stats">
              <div className="mock-stat-bar" style={{ width: '60%' }}></div>
              <div className="mock-stat-bar" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      );
    case "lead-kanban":
      return (
        <div className="card-mockup browser-mockup">
          <div className="browser-header">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <div className="browser-url">inttec.leads.internal</div>
          </div>
          <div className="browser-body mockup-kanban">
            <div className="kanban-col">
              <div className="kanban-header-bar">Nuevos</div>
              <div className="kanban-card-item">
                <div className="kb-title">Lead Calificado</div>
                <div className="kb-badge">Alta Prioridad</div>
              </div>
            </div>
            <div className="kanban-col">
              <div className="kanban-header-bar">Asignado</div>
              <div className="kanban-card-item active">
                <div className="kb-title">Integrar API</div>
                <div className="kb-tag">En progreso</div>
              </div>
            </div>
          </div>
        </div>
      );
    case "logistics-map":
      return (
        <div className="card-mockup mobile-mockup">
          <div className="mobile-screen mockup-map">
            <div className="map-grid"></div>
            <div className="map-route">
              <svg viewBox="0 0 100 100" className="route-svg">
                <path d="M20,80 Q40,30 50,50 T80,20" fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
                <circle cx="20" cy="80" r="4" fill="var(--accent-blue)" />
                <circle cx="80" cy="20" r="4" fill="var(--accent-cyan)" className="pulse-node" />
                <path d="M50,50 L65,70" stroke="var(--accent-purple)" strokeWidth="1.5" strokeDasharray="2" />
              </svg>
            </div>
            <div className="mobile-overlay-card">
              <span className="route-title">WeberTrack - En Ruta</span>
              <div className="route-bar-outer"><div className="route-bar-inner"></div></div>
            </div>
          </div>
        </div>
      );
    case "pos-scanner":
      return (
        <div className="card-mockup browser-mockup mockup-oxxogo">
          <div className="browser-header">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <div className="browser-url">admin.oxxogo.com</div>
          </div>
          <div className="browser-body oxxogo-admin-body">
            {/* Blue Header Bar */}
            <div className="oxxogo-mock-header">
              <span className="oxxogo-mock-logo">⚡ OXXO GO Admin</span>
              <span className="oxxogo-mock-logout">⎋</span>
            </div>

            {/* Main Area */}
            <div className="oxxogo-mock-content">
              {/* Title row */}
              <div className="oxxogo-title-row">
                <div>
                  <span className="oxxogo-main-title">Panel de Control Principal</span>
                  <span className="oxxogo-subtitle">Vista general de operaciones en tiempo real</span>
                </div>
                <div className="oxxogo-date-badge">
                  <span>19 Nov 2025</span>
                  <span className="oxxogo-status-active">● Activo</span>
                </div>
              </div>

              {/* KPI cards grid */}
              <div className="oxxogo-kpi-grid">
                <div className="oxxogo-kpi-card border-blue">
                  <div className="kpi-header">
                    <span>Puntualidad</span>
                    <span>⏱️</span>
                  </div>
                  <span className="kpi-value">94.5%</span>
                  <span className="kpi-trend text-green">↑ 2.3%</span>
                </div>
                <div className="oxxogo-kpi-card border-green">
                  <div className="kpi-header">
                    <span>Servicios Hoy</span>
                    <span>🚌</span>
                  </div>
                  <span className="kpi-value">48 <span className="kpi-sub">/ 52</span></span>
                  <span className="kpi-trend text-blue">4 en curso</span>
                </div>
                <div className="oxxogo-kpi-card border-orange">
                  <div className="kpi-header">
                    <span>Costo Mes</span>
                    <span>$</span>
                  </div>
                  <span className="kpi-value">$124K</span>
                  <span className="kpi-trend text-green">↓ 5.2%</span>
                </div>
                <div className="oxxogo-kpi-card border-purple">
                  <div className="kpi-header">
                    <span>NPS</span>
                    <span>👍</span>
                  </div>
                  <span className="kpi-value">87 <span className="kpi-sub">/ 100</span></span>
                  <span className="kpi-trend text-purple">Excelente</span>
                </div>
              </div>

              {/* Charts area */}
              <div className="oxxogo-charts-row">
                <div className="oxxogo-chart-box">
                  <span className="chart-title">Evolución de Puntualidad</span>
                  <div className="mock-line-chart">
                    <svg viewBox="0 0 100 30" className="svg-line-chart">
                      <path d="M0,20 Q20,25 40,15 T80,10 T100,5" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                      <circle cx="40" cy="15" r="1.5" fill="var(--accent-cyan)" />
                      <circle cx="80" cy="10" r="1.5" fill="var(--accent-cyan)" />
                    </svg>
                  </div>
                </div>
                <div className="oxxogo-chart-box">
                  <span className="chart-title">Servicios por Día</span>
                  <div className="mock-bar-chart">
                    <div className="mock-bar" style={{ height: '70%' }}></div>
                    <div className="mock-bar" style={{ height: '80%' }}></div>
                    <div className="mock-bar" style={{ height: '95%' }}></div>
                    <div className="mock-bar" style={{ height: '85%' }}></div>
                    <div className="mock-bar" style={{ height: '90%' }}></div>
                    <div className="mock-bar" style={{ height: '50%' }}></div>
                    <div className="mock-bar" style={{ height: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab navigation footer */}
            <div className="oxxogo-mock-footer">
              <span className="footer-tab active">Panel</span>
              <span className="footer-tab">Gestión</span>
              <span className="footer-tab">Finanzas</span>
              <span className="footer-tab">Reportes</span>
            </div>
          </div>
        </div>
      );
    case "booking-calendar":
      return (
        <div className="card-mockup mobile-mockup mockup-novo-sushi">
          <div className="mobile-screen novo-sushi-screen">
            {/* Header */}
            <div className="sushi-mobile-header">
              <img src="/assets/Empresa satisfechas/icono_novo.png" alt="Novo Sushi Logo" className="sushi-mobile-logo" />
              <div className="sushi-mobile-icons">
                <span className="sushi-icon-cart">🛒</span>
                <span className="sushi-icon-menu">☰</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="sushi-mobile-body">
              {/* Badge */}
              <div className="sushi-mobile-badge">
                <span className="badge-pulse-dot"></span>
                <span>Gastronomía Japonesa Auténtica • Parral</span>
              </div>

              {/* Title */}
              <h4 className="sushi-mobile-subtitle">El Arte del</h4>
              <h3 className="sushi-mobile-title">Sushi Auténtico</h3>

              {/* Description */}
              <p className="sushi-mobile-desc">
                Rolls, sashimi y sabores únicos preparados con ingredientes frescos de primera calidad.
              </p>

              {/* Actions */}
              <div className="sushi-mobile-actions">
                <div className="sushi-btn-solid">
                  <span>Ver Menú Completo</span>
                </div>
                <div className="sushi-btn-outline">
                  <span>Hacer Reservación</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="sushi-mobile-stats">
                <div className="sushi-stat-item">
                  <span className="sushi-stat-num">+50</span>
                  <span className="sushi-stat-label">Platillos</span>
                </div>
                <div className="sushi-stat-item">
                  <span className="sushi-stat-num">5★</span>
                  <span className="sushi-stat-label">Calificación</span>
                </div>
                <div className="sushi-stat-item">
                  <span className="sushi-stat-num">8+</span>
                  <span className="sushi-stat-label">Años Exp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "chat-bot":
      return (
        <div className="card-mockup mobile-mockup">
          <div className="mobile-screen mockup-chat">
            <div className="chat-header">Asistente Virtual</div>
            <div className="chat-bubbles">
              <div className="chat-bubble received">¿Deseas agendar para hoy?</div>
              <div className="chat-bubble sent">Sí, a las 5 PM</div>
              <div className="chat-bubble received highlight">Cita Confirmada ✨</div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const Portfolio = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const cases = [
    {
      title: "Zyklus Halo",
      client: "Proyecto ZF Engineering",
      image: "/assets/Empresa satisfechas/ZF_logo_STD_Blue_3CC.svg.png",
      problem: "Flujos complejos de ingeniería y falta de optimización en arquitectura de datos.",
      solution: "Plataforma industrial avanzada con backend robusto y una UI/UX impecable.",
      impact: "Ganador del Primer Lugar en el Innovation Meetup 2026. Optimización masiva de procesos.",
      type: "engineering-charts"
    },
    {
      title: "Clasificación de Leads y Ticketing",
      client: "Desarrollo para Inttec",
      image: null,
      problem: "Saturación en flujos comerciales y atención al cliente manual.",
      solution: "Solución de automatización inteligente con calificación automatizada en tiempo real.",
      impact: "Canalización de flujos comerciales eficiente e integración nativa con sistema de tickets.",
      type: "lead-kanban"
    },
    {
      title: "WeberTrack",
      client: "Reto Weber's Bread",
      image: "/assets/Empresa satisfechas/webers-logo-300x179.png",
      problem: "Falta de analítica avanzada y control predictivo de ventas.",
      solution: "Aplicación logística Full-Stack y sistema dinámico predictivo.",
      impact: "Reducción drástica de mermas y desperdicios en cadenas de suministro.",
      type: "logistics-map"
    },
    {
      title: "Plataforma OxxoGo",
      client: "OxxoGo",
      image: "/assets/Empresa satisfechas/Oxxo_Logo.svg.png",
      problem: "Complejidad en la solicitud, coordinación y control de transporte privado y preestablecido para los empleados de Uber.",
      solution: "Desarrollo de un panel de control administrativo Full-Stack en tiempo real para gestionar rutas, costos diarios, puntualidad y métricas operativas de traslados.",
      impact: "Optimización del índice de puntualidad al 94.5% y control financiero riguroso de la operación de transporte.",
      type: "pos-scanner"
    },
    {
      title: "Sistema de Reservas",
      client: "Novo Sushi",
      image: "/assets/Empresa satisfechas/icono_novo.png",
      problem: "Gestión de reservaciones manual y falta de presencia digital unificada.",
      solution: "Plataforma digital integral (menú JSON, reservaciones en tiempo real).",
      impact: "Integración nativa de pasarelas de pago seguro y aumento en conversiones.",
      type: "booking-calendar"
    },
    {
      title: "Asistente Virtual Inteligente",
      client: "Redken",
      image: "/assets/Empresa satisfechas/redken.jpg",
      problem: "Pérdida de citas de salón fuera de horario y consultas repetitivas sobre tratamientos capilares.",
      solution: "Desarrollo e integración de un chatbot inteligente 24/7 para asesoría personalizada y agendamiento.",
      impact: "Agendamiento automatizado de citas premium y atención inmediata al cliente.",
      type: "chat-bot"
    }
  ];

  return (
    <div className="container">
      <h2 className="section-title">Casos de <span className="text-gradient">Éxito</span></h2>
      <p className="section-subtitle">El corazón de nuestra ingeniería: soluciones probadas con impacto real.</p>
      
      <div className="portfolio-grid">
        {cases.map((item, index) => (
          <div key={index} className="portfolio-card glass-panel" onClick={() => setSelectedCase(item)}>
            <div className="portfolio-visual-container">
              <CardMockup type={item.type} />
            </div>
            
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

      {/* Detailed Modal Pop-up */}
      {selectedCase && (
        <div className="portfolio-modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="portfolio-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedCase(null)} 
              aria-label="Cerrar modal"
              type="button"
            >
              <X size={20} />
            </button>
            
            <div className="modal-inner-layout">
              {/* Left Column: Visual Mockup (larger) */}
              <div className="modal-visual-col">
                <CardMockup type={selectedCase.type} />
              </div>
              
              {/* Right Column: Text Details */}
              <div className="modal-info-col">
                <div className="modal-header-info">
                  <div className="portfolio-client-logo">
                    {selectedCase.image ? (
                      <img src={selectedCase.image} alt={selectedCase.client} className="client-img" />
                    ) : (
                      <div className="client-placeholder">{selectedCase.client.charAt(0)}</div>
                    )}
                  </div>
                  <div className="portfolio-title-wrapper">
                    <h3 className="modal-case-title">{selectedCase.title}</h3>
                    <span className="portfolio-client">{selectedCase.client}</span>
                  </div>
                </div>
                
                <div className="modal-stats-list">
                  <div className="portfolio-stat">
                    <span className="stat-label">Desafío / Problema</span>
                    <p className="stat-value">{selectedCase.problem}</p>
                  </div>
                  <div className="portfolio-stat">
                    <span className="stat-label">Ingeniería Aplicada</span>
                    <p className="stat-value">{selectedCase.solution}</p>
                  </div>
                  <div className="portfolio-stat impact">
                    <span className="stat-label text-gradient">Resultados Obtenidos</span>
                    <p className="stat-value highlight">{selectedCase.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
