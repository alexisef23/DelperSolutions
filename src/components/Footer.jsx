import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Delper Solutions. Todos los derechos reservados.
        </p>
        <p className="tagline">
          Diseñado con arquitectura limpia y código a medida
        </p>
      </div>
    </footer>
  );
};

export default Footer;
