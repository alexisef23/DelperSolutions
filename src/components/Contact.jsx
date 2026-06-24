import React, { useState } from 'react';
import './Contact.css';
import { Smartphone, Globe, Cpu, Sparkles } from 'lucide-react';

const Contact = () => {
  const [projectType, setProjectType] = useState('web');

  const projectTypes = [
    { id: 'web', label: 'Plataforma Web', icon: <Globe size={20} />, desc: 'SaaS, Sitios & Portales' },
    { id: 'mobile', label: 'App Móvil', icon: <Smartphone size={20} />, desc: 'iOS & Android Nativas' },
    { id: 'custom', label: 'Sistemas a Medida', icon: <Cpu size={20} />, desc: 'Bases de Datos & ERP' },
    { id: 'ai', label: 'Agentes & IA', icon: <Sparkles size={20} />, desc: 'Chatbots & Automatización' }
  ];

  // Map state to label names for hidden submission fields
  const selectedTypeLabel = projectTypes.find(t => t.id === projectType)?.label || '';

  return (
    <section id="contacto" className="container animate-fade-in">
      <div className="contact-wrapper glass-panel">
        <div className="contact-info">
          <h2 className="section-title" style={{ textAlign: 'left', marginTop: 0, marginBottom: '1.5rem' }}>
            Inicia tu <span className="text-gradient">Proyecto</span>
          </h2>
          <p className="contact-desc">
            Transformamos tus ideas en código de producción. Selecciona el tipo de solución que buscas y nuestro equipo de ingenieros diseñará la arquitectura ideal para ti.
          </p>
          
          <div className="contact-features-list">
            <div className="contact-feature-item">
              <span className="feature-number text-gradient">01</span>
              <div className="feature-content">
                <h4>Diagnóstico Técnico</h4>
                <p>Estudio de factibilidad y arquitectura gratuito.</p>
              </div>
            </div>
            <div className="contact-feature-item">
              <span className="feature-number text-gradient">02</span>
              <div className="feature-content">
                <h4>Hitos de Entrega</h4>
                <p>Monitorea el avance de tu desarrollo en tiempo real.</p>
              </div>
            </div>
            <div className="contact-feature-item">
              <span className="feature-number text-gradient">03</span>
              <div className="feature-content">
                <h4>Soporte y Escalamiento</h4>
                <p>Acompañamiento post-lanzamiento y optimización continua.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form action="https://formsubmit.co/lexisfri23@gmail.com" method="POST" className="contact-form">
            {/* Opciones FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nuevo Lead - Delper Solutions Landing Page" />
            
            {/* Campos dinámicos del planificador interactivo */}
            <input type="hidden" name="Tipo_Proyecto" value={selectedTypeLabel} />

            {/* Paso 1: Tipo de Proyecto */}
            <div className="planner-step">
              <span className="step-label">1. ¿Qué tipo de solución buscas?</span>
              <div className="project-type-grid">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`planner-card ${projectType === type.id ? 'active' : ''}`}
                    onClick={() => setProjectType(type.id)}
                  >
                    <div className="planner-card-icon">{type.icon}</div>
                    <div className="planner-card-text">
                      <span className="planner-card-title">{type.label}</span>
                      <span className="planner-card-desc">{type.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Campos de datos */}
            <div className="planner-step">
              <span className="step-label">2. Datos de contacto</span>
              <div className="inputs-grid">
                <div className="form-group">
                  <input type="text" id="name" name="Nombre" className="input-field" placeholder="Nombre completo" required />
                </div>
                <div className="form-group">
                  <input type="email" id="email" name="Email" className="input-field" placeholder="Correo corporativo" required />
                </div>
                <div className="form-group full-width-input">
                  <input type="text" id="company" name="Empresa" className="input-field" placeholder="Nombre de tu empresa" required />
                </div>
                <div className="form-group full-width-input">
                  <textarea id="message" name="Mensaje" className="input-field textarea" rows="3" placeholder="Cuéntanos brevemente sobre tu proyecto o necesidades especiales..." required></textarea>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-planner-btn">
              Enviar Propuesta
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
