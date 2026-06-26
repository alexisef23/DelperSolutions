import React, { useState } from 'react';
import './Navbar.css';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useMagnetic(0.25);

  const navLinks = [
    { id: 'inicio', path: '/', label: 'Inicio' },
    { id: 'servicios', path: '/servicios', label: 'Alcance' },
    { id: 'quienes-somos', path: '/quienes-somos', label: 'Nosotros' },
    { id: 'portafolio', path: '/portafolio', label: 'Casos de Éxito' },
    { id: 'stack', path: '/stack', label: 'Arsenal Técnico' },
    { id: 'contacto', path: '/contacto', label: 'Contacto' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
          onClick={() => setIsMenuOpen(false)}
        >
          <img 
            src={theme === 'dark' ? '/assets/logo_claro.png' : '/logo.png'} 
            alt="Delper Solutions" 
            className="navbar-logo" 
          />
          <span className="navbar-title">Delper Solutions</span>
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        
        <div className="navbar-actions">
          <button 
            ref={toggleRef}
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

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="mobile-menu-toggle" 
            aria-label="Alternar menú"
            type="button"
          >
            {isMenuOpen ? <X className="mobile-menu-icon" size={24} /> : <Menu className="mobile-menu-icon" size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
