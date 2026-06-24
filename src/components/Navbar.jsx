import React from 'react';
import './Navbar.css';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, activeSection, onNavClick }) => {
  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Alcance' },
    { id: 'quienes-somos', label: 'Nosotros' },
    { id: 'portafolio', label: 'Casos de Éxito' },
    { id: 'stack', label: 'Arsenal Técnico' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    onNavClick(sectionId);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a
          href="#inicio"
          className="navbar-brand"
          onClick={(e) => handleClick(e, 'inicio')}
        >
          <img 
            src={theme === 'dark' ? '/assets/logo_claro.png' : '/logo.png'} 
            alt="Delper Solutions" 
            className="navbar-logo" 
          />
          <span className="navbar-title">Delper Solutions</span>
        </a>
        
        <div className="navbar-menu">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`navbar-link${activeSection === link.id ? ' active' : ''}`}
              onClick={(e) => handleClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn" 
          aria-label="Cambiar tema"
          type="button"
        >
          <div className={`theme-toggle-slider ${theme}`}>
            <Sun className="icon-sun" size={14} />
            <Moon className="icon-moon" size={14} />
            <div className="toggle-thumb"></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
