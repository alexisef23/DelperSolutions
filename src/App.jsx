import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Stats from './components/Stats';
import About from './components/About';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Initialize theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const [activeSection, setActiveSection] = useState('inicio');
  const scrollContainerRef = useRef(null);

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

  // Track which section is currently visible via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['inicio', 'servicios', 'quienes-somos', 'portafolio', 'stack', 'contacto'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.4,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle nav clicks — smooth scroll to target section
  const handleNavClick = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="app-container" ref={scrollContainerRef}>
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

      <section id="inicio" className="snap-section">
        <Hero theme={theme} />
      </section>

      <section id="servicios" className="snap-section section-servicios">
        <Services />
      </section>

      <section id="quienes-somos" className="snap-section section-about">
        <Stats />
        <About />
      </section>

      <section id="portafolio" className="snap-section section-portafolio">
        <Portfolio />
      </section>

      <section id="stack" className="snap-section section-stack">
        <TechStack />
      </section>

      <section id="contacto" className="snap-section section-contacto">
        <Contact />
        <Footer />
      </section>
    </div>
  );
}

export default App;
