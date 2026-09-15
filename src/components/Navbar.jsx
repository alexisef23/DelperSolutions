import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useMagnetic } from '../hooks/useMagnetic';

const Navbar = ({ theme, toggleTheme, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useMagnetic(0.25);
  const navRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { id: 'inicio', path: '/', label: 'Inicio' },
    { id: 'servicios', path: '/servicios', label: 'Alcance' },
    { id: 'quienes-somos', path: '/quienes-somos', label: 'Nosotros' },
    { id: 'portafolio', path: '/portafolio', label: 'Casos de Éxito' },
    { id: 'stack', path: '/stack', label: 'Arsenal Técnico' },
    { id: 'contacto', path: '/contacto', label: 'Contacto' },
  ];

  // Close mobile menu on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const isLinkActive = (link) => {
    if (activeSection) {
      return activeSection === link.id;
    }
    if (link.id === 'inicio') {
      return location.pathname === '/' || location.pathname === '/inicio';
    }
    return location.pathname === link.path;
  };

  return (
    <nav ref={navRef} className="navbar">
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
          {navLinks.map((link) => {
            const active = isLinkActive(link);
            return (
              <NavLink
                key={link.id}
                to={link.path}
                className={`navbar-link${active ? ' active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            );
          })}
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
