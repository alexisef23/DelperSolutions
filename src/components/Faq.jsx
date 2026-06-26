import React, { useState } from 'react';
import './Faq.css';
import { ChevronDown, HelpCircle } from 'lucide-react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cómo funciona el proceso de cotización y diagnóstico?",
      answer: "El proceso es 100% gratuito. Agenda una llamada, analizamos tus necesidades y nuestro equipo de ingenieros diseñará una propuesta técnica con arquitectura sugerida y estimación de inversión y tiempos cerrados."
    },
    {
      question: "¿El código y la propiedad intelectual son de mi empresa?",
      answer: "Totalmente. Al finalizar el proyecto y liquidar los hitos correspondientes, la propiedad intelectual y todo el código fuente del repositorio se transfieren formalmente a tu nombre."
    },
    {
      question: "¿Qué tipo de soporte ofrecen después del lanzamiento?",
      answer: "Incluimos una garantía técnica post-lanzamiento para corregir cualquier anomalía de forma gratuita. Posteriormente, ofrecemos planes opcionales de soporte preventivo, correctivo y escalado evolutivo."
    },
    {
      question: "¿Cómo puedo ver los avances diarios de mi desarrollo?",
      answer: "Trabajamos con metodologías ágiles. Te brindamos acceso al repositorio de desarrollo y desplegamos versiones de prueba (staging) semanalmente para que puedas testear el avance en tiempo real."
    },
    {
      question: "¿Cómo aseguran la calidad y seguridad del software?",
      answer: "Implementamos pruebas automatizadas (QA), auditorías de código internas, manejo seguro de credenciales con variables de entorno en la nube (AWS/Railway), y cifrado SSL de bases de datos."
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="faq-section glass-panel">
      <div className="faq-header">
        <h3 className="faq-title">Preguntas <span className="text-gradient">Frecuentes</span></h3>
        <p className="faq-subtitle">Todo lo que necesitas saber antes de iniciar tu desarrollo.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div 
              key={idx} 
              className={`faq-item ${isOpen ? 'open' : ''}`}
              onClick={() => handleToggle(idx)}
            >
              <button className="faq-question-btn" type="button">
                <span className="faq-question-text">
                  <HelpCircle size={18} className="faq-help-icon" />
                  {faq.question}
                </span>
                <ChevronDown size={18} className="faq-chevron" />
              </button>
              
              <div className="faq-answer-wrapper">
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
