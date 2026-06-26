import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import { Smartphone, Globe, Cpu, Sparkles, Check, ChevronRight, ChevronLeft, Calendar, DollarSign, Activity } from 'lucide-react';
import Faq from './Faq';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact = () => {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('web');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [projectScale, setProjectScale] = useState('growth');
  const revealRef = useScrollReveal();

  // User input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const projectTypes = [
    { id: 'web', label: 'Plataforma Web', icon: <Globe size={20} />, desc: 'SaaS, Sitios & Portales' },
    { id: 'mobile', label: 'App Móvil', icon: <Smartphone size={20} />, desc: 'iOS & Android Nativas' },
    { id: 'custom', label: 'Sistemas a Medida', icon: <Cpu size={20} />, desc: 'Bases de Datos & ERP' },
    { id: 'ai', label: 'Agentes & IA', icon: <Sparkles size={20} />, desc: 'Chatbots & Automatización' }
  ];

  const featuresMap = {
    web: [
      'Panel de Administración',
      'Autenticación de Usuarios',
      'Pasarela de Pagos (Stripe/PayPal)',
      'Diseño Responsivo Premium',
      'Optimización SEO Avanzada',
      'CMS para blogs/noticias'
    ],
    mobile: [
      'Diseño UX/UI Personalizado',
      'Notificaciones Push',
      'Sincronización Offline',
      'Publicación en Tiendas (App Store/Play Store)',
      'Integración con APIs Externas',
      'Geolocalización / Mapas'
    ],
    custom: [
      'Modelado de Base de Datos',
      'Generación de Reportes / PDF',
      'Panel de Control (Dashboard)',
      'Migración de Datos Históricos',
      'API Rest / GraphQL Personalizada',
      'Integración con ERP/CRM existente'
    ],
    ai: [
      'Chatbot IA 24/7 Autónomo',
      'Automatización de Workflows',
      'Integración de LLM (GPT/Claude/Gemini)',
      'Análisis Predictivo de Datos',
      'Extracción Inteligente de Documentos',
      'Búsqueda Semántica Vectorizada'
    ]
  };

  const scaleMap = {
    startup: { label: 'MVP / Startup', desc: 'Validar idea rápido, menor costo y alcance esencial.', multiplier: 1.0, time: '4 - 8 semanas' },
    growth: { label: 'Crecimiento / Corporativo', desc: 'Solución escalable, diseño a medida e integraciones clave.', multiplier: 1.1, time: '4 - 8 semanas' },
    enterprise: { label: 'Empresarial / Alta Escala', desc: 'Seguridad robusta, alta disponibilidad, y soporte premium.', multiplier: 1.2, time: '4 - 8 semanas' }
  };

  const handleTypeSelect = (typeId) => {
    setProjectType(typeId);
    setSelectedFeatures([]); // Clear features on type change
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Dynamic calculation logic
  const calculateBudget = () => {
    const basePrices = {
      web: 5000,
      mobile: 5500,
      custom: 6000,
      ai: 6500
    };

    const basePrice = basePrices[projectType] || 5000;
    const featuresCost = selectedFeatures.length * 500;
    const subtotal = basePrice + featuresCost;
    
    const scaleMultiplier = scaleMap[projectScale].multiplier;
    let totalMin = Math.round((subtotal * scaleMultiplier) / 500) * 500;
    let totalMax = Math.round((subtotal * scaleMultiplier * 1.25) / 500) * 500;

    // Cap at 10000
    if (totalMax > 10000) {
      totalMax = 10000;
    }
    if (totalMin >= totalMax) {
      totalMin = totalMax - 1000;
    }

    return {
      min: totalMin,
      max: totalMax,
      time: '4 - 8 semanas'
    };
  };

  const { min, max, time } = calculateBudget();

  // === EASTER EGG: Hacker Terminal ===
  const [hackerMode, setHackerMode] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const terminalRef = useRef(null);

  const hackerScript = [
    '> Iniciando protocolo de intrusión...',
    '> Escaneando puertos abiertos... 22, 80, 443, 3000',
    '> Saltando firewall de capa 7...',
    '> Inyectando payload SQL... SELECT * FROM secretos',
    '> Descifrando hash SHA-256...',
    '> Accediendo a la base de datos principal...',
    '> ██████████████████████ 100%',
    '> ⚠ ACCESO CONCEDIDO AL SISTEMA DELPER ⚠',
    '',
    '  ╔══════════════════════════════════════╗',
    '  ║  🥚 ¡HAS ENCONTRADO UN EASTER EGG! ║',
    '  ║                                      ║',
    '  ║  Código secreto: HACKER-10           ║',
    '  ║  Menciona este código para un 10%    ║',
    '  ║  de descuento en tu primer proyecto  ║',
    '  ╚══════════════════════════════════════╝',
    '',
    '> Presiona ESC o haz clic para cerrar...'
  ];

  useEffect(() => {
    if (!hackerMode) {
      setTerminalLines([]);
      return;
    }
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < hackerScript.length) {
        setTerminalLines(prev => [...prev, hackerScript[lineIndex]]);
        lineIndex++;
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 400);

    const handleEscape = (e) => {
      if (e.key === 'Escape') setHackerMode(false);
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [hackerMode]);

  return (
    <div ref={revealRef} className="container animate-fade-in">
      {/* Hacker Terminal Overlay */}
      {hackerMode && (
        <div 
          className="hacker-overlay" 
          onClick={() => setHackerMode(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0, 0, 0, 0.95)', zIndex: 999999, display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}
        >
          <div 
            ref={terminalRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0a0a0a', border: '1px solid #0F0', borderRadius: '8px',
              padding: '24px', maxWidth: '600px', width: '90%', maxHeight: '70vh',
              overflow: 'auto', fontFamily: "'Courier New', monospace", fontSize: '14px',
              color: '#0F0', boxShadow: '0 0 40px rgba(0, 255, 0, 0.2)'
            }}
          >
            <div style={{ marginBottom: '12px', color: '#555' }}>DELPER-TERMINAL v3.7.1</div>
            {terminalLines.map((line, i) => (
              <div key={i} style={{ 
                marginBottom: '4px', 
                opacity: 1,
                whiteSpace: 'pre'
              }}>
                {line}
              </div>
            ))}
            <span style={{ animation: 'blink 1s step-end infinite' }}>█</span>
          </div>
        </div>
      )}

      <div className="contact-wrapper glass-panel">
        <div className="contact-info">
          <h2 className="section-title" style={{ textAlign: 'left', marginTop: 0, marginBottom: '1.5rem' }}>
            Inicia tu <span className="text-gradient">Proyecto</span>
          </h2>
          <p className="contact-desc">
            Transformamos tus ideas en código de producción. Utiliza nuestro planificador interactivo para diseñar la solución ideal y recibir una estimación instantánea.
          </p>
          
          {/* Reactive Budget and Timeline Card */}
          <div className="estimation-card glass-panel highlight-border">
            <h4 className="estimation-title">
              <Activity size={18} className="pulse-icon" /> Estimación en Tiempo Real
            </h4>
            <div className="estimation-metric-row">
              <div className="estimation-metric">
                <span className="metric-label"><DollarSign size={14} /> Inversión Estimada</span>
                <span className="metric-value text-gradient">${min.toLocaleString()} - ${max.toLocaleString()} MXN</span>
              </div>
              <div className="estimation-metric">
                <span className="metric-label"><Calendar size={14} /> Tiempo Estimado</span>
                <span className="metric-value">{time}</span>
              </div>
            </div>
            <p className="estimation-note">
              *Esta es una estimación preliminar basada en tu selección actual.
            </p>
          </div>

          <div className="contact-features-list">
            <div className="contact-feature-item">
              <span className="feature-number text-gradient">01</span>
              <div className="feature-content">
                <h4>Diagnóstico Técnico</h4>
                <p>Estudio de factibilidad y arquitectura de software gratuito.</p>
              </div>
            </div>
            <div className="contact-feature-item">
              <span className="feature-number text-gradient">02</span>
              <div className="feature-content">
                <h4>Hitos de Entrega</h4>
                <p>Monitorea el avance de tu desarrollo en tiempo real.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {/* Progress Bar */}
          <div className="planner-progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Tipo</div>
            <div className={`progress-step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Requisitos</div>
            <div className={`progress-step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Datos</div>
          </div>

          <form action="https://formsubmit.co/lexisfri23@gmail.com" method="POST" className="contact-form">
            {/* FormSubmit Config */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nueva Cotización Interactiva - Delper Solutions" />
            
            {/* Hidden Fields for FormSubmit */}
            <input type="hidden" name="Tipo_Proyecto" value={projectTypes.find(t => t.id === projectType)?.label || ''} />
            <input type="hidden" name="Funcionalidades_Requeridas" value={selectedFeatures.join(', ') || 'Ninguna seleccionada'} />
            <input type="hidden" name="Escala_Proyecto" value={scaleMap[projectScale].label} />
            <input type="hidden" name="Estimado_Inversion" value={`$${min} - $${max} MXN`} />
            <input type="hidden" name="Estimado_Tiempo" value={time} />

            {/* Step 1: Solution Type */}
            {step === 1 && (
              <div className="planner-step-content animate-slide-up">
                <span className="step-label">1. ¿Qué tipo de solución buscas?</span>
                <div className="project-type-grid">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`planner-card ${projectType === type.id ? 'active' : ''}`}
                      onClick={() => handleTypeSelect(type.id)}
                    >
                      <div className="planner-card-icon">{type.icon}</div>
                      <div className="planner-card-text">
                        <span className="planner-card-title">{type.label}</span>
                        <span className="planner-card-desc">{type.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="planner-nav-buttons">
                  <button type="button" className="btn btn-primary next-step-btn" onClick={() => setStep(2)}>
                    Siguiente Paso <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Features and Scale */}
            {step === 2 && (
              <div className="planner-step-content animate-slide-up">
                <span className="step-label">2. Elige las funcionalidades clave</span>
                <div className="features-checklist-grid">
                  {featuresMap[projectType].map((feature, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`feature-checkbox-card ${selectedFeatures.includes(feature) ? 'active' : ''}`}
                      onClick={() => handleFeatureToggle(feature)}
                    >
                      <div className="checkbox-indicator">
                        {selectedFeatures.includes(feature) && <Check size={12} />}
                      </div>
                      <span className="feature-text">{feature}</span>
                    </button>
                  ))}
                </div>

                <span className="step-label" style={{ marginTop: '1.5rem' }}>3. Escala y alcance del desarrollo</span>
                <div className="scale-selector-grid">
                  {Object.entries(scaleMap).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      className={`scale-card ${projectScale === key ? 'active' : ''}`}
                      onClick={() => setProjectScale(key)}
                    >
                      <span className="scale-title">{value.label}</span>
                      <span className="scale-desc">{value.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="planner-nav-buttons">
                  <button type="button" className="btn btn-secondary back-step-btn" onClick={() => setStep(1)}>
                    <ChevronLeft size={18} /> Atrás
                  </button>
                  <button type="button" className="btn btn-primary next-step-btn" onClick={() => setStep(3)}>
                    Datos de Contacto <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            {step === 3 && (
              <div className="planner-step-content animate-slide-up">
                <span className="step-label">4. ¿A dónde enviamos tu propuesta técnica?</span>
                <div className="inputs-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="Nombre"
                      className="input-field"
                      placeholder="Nombre completo"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      name="Email"
                      className="input-field"
                      placeholder="Correo corporativo"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width-input">
                    <input
                      type="text"
                      id="company"
                      name="Empresa"
                      className="input-field"
                      placeholder="Nombre de tu empresa"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width-input">
                    <textarea
                      id="message"
                      name="Mensaje"
                      className="input-field textarea"
                      rows="3"
                      placeholder="Cuéntanos brevemente sobre tu proyecto o necesidades especiales..."
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                <div className="planner-nav-buttons">
                  <button type="button" className="btn btn-secondary back-step-btn" onClick={() => setStep(2)}>
                    <ChevronLeft size={18} /> Atrás
                  </button>
                  <button type="submit" className="btn btn-primary submit-planner-btn">
                    Enviar Propuesta
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Secret Hacker Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          type="button"
          onClick={() => setHackerMode(true)}
          style={{
            background: 'transparent', border: '1px solid rgba(255, 51, 102, 0.3)',
            color: 'rgba(255, 51, 102, 0.5)', padding: '6px 14px', borderRadius: '4px',
            fontSize: '0.7rem', cursor: 'pointer', fontFamily: 'monospace',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = '#FF3366'; e.target.style.color = '#FF3366'; e.target.style.boxShadow = '0 0 10px rgba(255, 51, 102, 0.3)'; }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255, 51, 102, 0.3)'; e.target.style.color = 'rgba(255, 51, 102, 0.5)'; e.target.style.boxShadow = 'none'; }}
        >
          [ Área Restringida: No Presionar ]
        </button>
      </div>

      {/* FAQ Accordion Section */}
      <Faq />
    </div>
  );
};

export default Contact;
