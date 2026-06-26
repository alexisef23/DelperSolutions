import React, { useState } from 'react';
import './ProcessTimeline.css';
import { Search, PenTool, Code2, ShieldAlert, Rocket } from 'lucide-react';

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Diagnóstico Técnico",
      icon: <Search size={22} />,
      desc: "Analizamos tus requerimientos de negocio y técnicos. Diseñamos la arquitectura óptima y entregamos un diagnóstico y estimación de presupuesto gratuito.",
      deliverable: "Documento de Arquitectura y Presupuesto"
    },
    {
      title: "Diseño UX/UI",
      icon: <PenTool size={22} />,
      desc: "Creamos mockups y prototipos interactivos en Figma. Validamos los flujos de usuario y el diseño gráfico antes de comenzar a escribir la primera línea de código.",
      deliverable: "Prototipo Interactivo de Alta Fidelidad"
    },
    {
      title: "Desarrollo Ágil",
      icon: <Code2 size={22} />,
      desc: "Implementamos tu solución utilizando metodologías ágiles en sprints de 1 a 2 semanas. Obtienes acceso a un servidor de pruebas para ver el avance en tiempo real.",
      deliverable: "Código de Producción en Repositorio Privado"
    },
    {
      title: "Control de Calidad (QA)",
      icon: <ShieldAlert size={22} />,
      desc: "Sometemos el software a pruebas rigurosas de seguridad, rendimiento en la nube y usabilidad en múltiples navegadores y dispositivos.",
      deliverable: "Reporte de Calidad y Suite de Pruebas"
    },
    {
      title: "Lanzamiento y Soporte",
      icon: <Rocket size={22} />,
      desc: "Desplegamos tu aplicación de forma segura con CI/CD. Proveemos acompañamiento post-lanzamiento, analíticas de uso y soporte técnico dedicado.",
      deliverable: "App en Producción y Soporte 24/7"
    }
  ];

  return (
    <div className="process-timeline-section glass-panel">
      <div className="process-header">
        <h3 className="process-section-title">Nuestra <span className="text-gradient">Metodología</span></h3>
        <p className="process-section-subtitle">Cómo llevamos tu idea desde el plano de diseño hasta el código de producción.</p>
      </div>

      <div className="timeline-interactive-container">
        {/* Navigation Tabs */}
        <div className="timeline-tabs">
          {steps.map((step, idx) => (
            <button
              key={idx}
              className={`timeline-tab-btn ${activeStep === idx ? 'active' : ''}`}
              onClick={() => setActiveStep(idx)}
              type="button"
            >
              <span className={`tab-icon-wrapper ${activeStep === idx ? 'active' : ''}`}>
                {step.icon}
              </span>
              <span className="tab-text-title">{step.title}</span>
              <span className="tab-step-num">0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Display Active Step Details */}
        <div className="timeline-content-card glass-panel highlight-border">
          <div className="step-badge">Paso 0{activeStep + 1}</div>
          <h4 className="step-content-title">{steps[activeStep].title}</h4>
          <p className="step-content-desc">{steps[activeStep].desc}</p>
          <div className="step-deliverable-container">
            <span className="deliverable-label">Entregable Clave:</span>
            <span className="deliverable-value text-gradient">{steps[activeStep].deliverable}</span>
          </div>
          
          {/* Progress bar inside card */}
          <div className="step-progress-track">
            <div 
              className="step-progress-fill" 
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
