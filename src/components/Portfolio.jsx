import { useRef } from 'react';
import './Portfolio.css';
import Testimonials from './Testimonials';
import { useScrollReveal } from '../hooks/useScrollReveal';

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
                  <div className="oxxogo-mock-title">Panel de Transporte</div>
                  <div className="oxxogo-mock-subtitle">Resumen diario operativo</div>
                </div>
                <div className="oxxogo-mock-btn">Nueva Ruta</div>
              </div>

              {/* Stats widgets */}
              <div className="oxxogo-stats-grid">
                <div className="oxxogo-stat-card">
                  <span className="oxxogo-card-lbl">Rutas Activas</span>
                  <span className="oxxogo-card-val text-blue">42</span>
                </div>
                <div className="oxxogo-stat-card">
                  <span className="oxxogo-card-lbl">Puntualidad</span>
                  <span className="oxxogo-card-val text-green">94.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "booking-calendar":
      return (
        <div className="card-mockup browser-mockup mockup-novosushi">
          <div className="browser-header sushi-header">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <div className="browser-url">novosushi.com/reservas</div>
          </div>
          <div className="browser-body novosushi-body">
            {/* Floating Card UI layout mock */}
            <div className="sushi-screen">
              {/* Top Header */}
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

const PortfolioCard = ({ item, className }) => {
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
        ? '0 22px 50px rgba(0, 242, 254, 0.14), 0 0 35px rgba(178, 36, 239, 0.08)'
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
    s.targetRx = -((y - yc) / yc) * 7.5;
    s.targetRy = ((x - xc) / xc) * 7.5;
    s.targetTy = -6;
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
      className={`portfolio-card glass-panel relative-card ${className || ''}`} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={shineRef} className="shine-overlay" style={{ opacity: 0 }} />
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
  );
};

const Portfolio = () => {
  const revealRef = useScrollReveal();

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
      image: "/assets/Empresa satisfechas/inttec.jpeg",
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
    <div ref={revealRef} className="container animate-fade-in">
      <h2 className="section-title">
        Casos de <span className="text-gradient">Éxito</span>
      </h2>
      <p className="section-subtitle">
        El corazón de nuestra ingeniería: soluciones probadas con impacto real.
      </p>
      
      <div className="portfolio-grid">
        {cases.map((item, index) => (
          <PortfolioCard 
            key={index} 
            item={item} 
          />
        ))}
      </div>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default Portfolio;
