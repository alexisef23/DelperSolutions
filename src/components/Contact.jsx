import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contacto" className="container">
      <div className="contact-wrapper glass-panel">
        <div className="contact-info">
          <h2 className="section-title" style={{textAlign: 'left'}}>
            Inicia tu <span className="text-gradient">Proyecto</span>
          </h2>
          <p className="contact-desc">
            Transformamos tu visión en código. Cuéntanos sobre tus necesidades y nuestro equipo de ingeniería se pondrá en contacto contigo para una asesoría especializada.
          </p>
        </div>
        
        <div className="contact-form-container">
          <form action="https://formsubmit.co/lexisfri23@gmail.com" method="POST" className="contact-form">
            {/* Opciones de configuración para FormSubmit */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Nuevo Lead - Delper Solutions Landing Page" />
            
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="Nombre" className="input-field" placeholder="Tu nombre completo" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="Email" className="input-field" placeholder="tucorreo@empresa.com" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <input type="text" id="company" name="Empresa" className="input-field" placeholder="Nombre de tu empresa" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Cuéntanos sobre tu proyecto</label>
              <textarea id="message" name="Mensaje" className="input-field textarea" rows="4" placeholder="Detalles, alcance, requerimientos..." required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary full-width">
              Enviar Propuesta
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
