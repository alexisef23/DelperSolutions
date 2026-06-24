import React from 'react';
import './Navbar.css';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand">
          <img 
            src={theme === 'dark' ? '/assets/logo_claro.png' : '/logo.png'} 
            alt="Delper Solutions" 
            className="navbar-logo" 
          />
          <span className="navbar-title">Delper Solutions</span>
        </a>
        
        <div className="navbar-menu">
          <a href="#servicios" className="navbar-link">Alcance</a>
          <a href="#quienes-somos" className="navbar-link">Nosotros</a>
          <a href="#portafolio" className="navbar-link">Casos de Éxito</a>
          <a href="#stack" className="navbar-link">Arsenal Técnico</a>
          <a href="#contacto" className="navbar-link">Contacto</a>
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
