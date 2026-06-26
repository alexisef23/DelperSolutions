import React, { useState } from 'react';
import './ContactModal.css';
import { Smartphone, Globe, Cpu, X, Sparkles } from 'lucide-react';

const ContactModal = ({ initialType = 'web', onClose }) => {
  const [projectType, setProjectType] = useState(initialType);

  const projectTypes = [
    { id: 'web', label: 'Plataforma Web', icon: <Globe size={18} /> },
    { id: 'mobile', label: 'App Móvil', icon: <Smartphone size={18} /> },
    { id: 'custom', label: 'Sistemas a Medida', icon: <Cpu size={18} /> },
    { id: 'ai', label: 'Agentes & IA', icon: <Sparkles size={18} /> }
  ];

  const selectedTypeLabel = projectTypes.find(t => t.id === projectType)?.label || '';

  // Evita que los clics dentro del modal cierren la ventana al propagarse al fondo
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleContainerClick}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal" type="button">
          <X size={20} />
        </button>

        <div className="modal-content-wrapper">
          <h3 className="modal-title">Iniciar <span className="text-gradient">Cotización</span></h3>
          <p className="modal-subtitle">Cuéntanos un poco sobre tu idea y diseñaremos la arquitectura de software a tu medida.</p>

          <form action="https://formsubmit.co/lexisfri23@gmail.com" method="POST" className="modal-form">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nuevo Lead (Modal Servicios) - Delper Solutions" />
            <input type="hidden" name="Tipo_Proyecto" value={selectedTypeLabel} />

            <div className="modal-step">
              <span className="modal-step-label">1. Tipo de Solución</span>
              <div className="modal-type-selector">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`modal-type-option ${projectType === type.id ? 'active' : ''}`}
                    onClick={() => setProjectType(type.id)}
                  >
                    <span className="modal-type-option-icon">{type.icon}</span>
                    <span className="modal-type-option-label">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-step">
              <span className="modal-step-label">2. Datos de Contacto</span>
              <div className="modal-inputs-grid">
                <div className="modal-form-group">
                  <input type="text" name="Nombre" className="modal-input" placeholder="Nombre completo" required />
                </div>
                <div className="modal-form-group">
                  <input type="email" name="Email" className="modal-input" placeholder="Correo corporativo" required />
                </div>
                <div className="modal-form-group full-width">
                  <input type="text" name="Empresa" className="modal-input" placeholder="Nombre de tu empresa" required />
                </div>
                <div className="modal-form-group full-width">
                  <textarea name="Mensaje" className="modal-input textarea" rows="3" placeholder="Describe brevemente tus requerimientos o idea de proyecto..." required></textarea>
                </div>
              </div>
            </div>

            <button type="submit" className="modal-submit-btn">
              Enviar Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
