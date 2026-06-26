import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import About from './components/About';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Loader from './components/Loader';
import MouseParticles from './components/MouseParticles';
import AsteroidsGame from './components/AsteroidsGame';

// Scroll manager to scroll back to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// App content wrapper inside the Router context
function AppContent({ theme, toggleTheme }) {
  const location = useLocation();

  // Map path to activeSection state
  const getActiveSection = (path) => {
    switch (path) {
      case '/':
      case '/inicio':
        return 'inicio';
      case '/servicios':
        return 'servicios';
      case '/quienes-somos':
        return 'quienes-somos';
      case '/portafolio':
        return 'portafolio';
      case '/stack':
        return 'stack';
      case '/contacto':
        return 'contacto';
      default:
        return 'inicio';
    }
  };

  const activeSection = getActiveSection(location.pathname);

  // Router handles links, so onNavClick can be a dummy
  const handleNavClick = () => {};

  return (
    <div className="app-container">
      <Loader theme={theme} />
      <ScrollToTop />
      <MouseParticles theme={theme} />

      {/* Dynamic Background Glowing Orbs for Depth */}
      <div className="glowing-orbs-container">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      
      {/* Tech Grid Background decoration overlay */}
      <div className="tech-grid-bg"></div>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<div className="page-container"><Hero theme={theme} /></div>} />
          <Route path="/inicio" element={<div className="page-container"><Hero theme={theme} /></div>} />
          <Route path="/servicios" element={
            <div className="section-servicios page-container">
              <Services />
              <AsteroidsGame />
            </div>
          } />
          <Route path="/quienes-somos" element={
            <div className="section-about page-container">
              <div className="quienes-somos-page">
                <Stats />
                <About />
              </div>
            </div>
          } />
          <Route path="/portafolio" element={
            <div className="section-portafolio page-container">
              <Portfolio />
            </div>
          } />
          <Route path="/stack" element={
            <div className="section-stack page-container">
              <TechStack />
            </div>
          } />
          <Route path="/contacto" element={
            <div className="section-contacto page-container">
              <Contact />
            </div>
          } />
          <Route path="*" element={<div className="page-container"><Hero theme={theme} /></div>} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
