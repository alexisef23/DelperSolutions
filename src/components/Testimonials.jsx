import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);

  const testimonials = [
    {
      name: "Ing. Carlos Mendoza",
      role: "Director de Operaciones",
      company: "ZF Engineering",
      avatar: "👨‍💻",
      quote: "El sistema de control industrial a medida que desarrolló Delper optimizó nuestra línea operativa reduciendo tiempos de inactividad. Su diagnóstico técnico dio en el clavo desde el día uno.",
      rating: 5
    },
    {
      name: "Lic. Sofía Reyes",
      role: "Product Manager",
      company: "OXXO Go",
      avatar: "👩‍💼",
      quote: "La app móvil multiplataforma superó todos nuestros requerimientos de rendimiento y estabilidad. El equipo de Delper resolvió integraciones complejas con total transparencia.",
      rating: 5
    },
    {
      name: "Arq. Andrés Garza",
      role: "Gerente de Logística",
      company: "Weber's Bread",
      avatar: "👨‍💼",
      quote: "Gracias a su dashboard de monitoreo en tiempo real, logramos reducir un 18% las pérdidas de material en la cadena de distribución. Su servicio post-lanzamiento es excelente.",
      rating: 5
    },
    {
      name: "Dra. Mariana Salinas",
      role: "CEO & Fundadora",
      company: "Novo Sushi",
      avatar: "👩‍⚕️",
      quote: "El sitio comercial y el motor de pedidos online manejan miles de compras semanales con fluidez total. El diseño visual con glassmorphism realmente cautivó a nuestros clientes.",
      rating: 5
    }
  ];

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handlePrev = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    startAutoplay();
  };

  const handleDotClick = (index) => {
    stopAutoplay();
    setActiveIndex(index);
    startAutoplay();
  };

  return (
    <div className="testimonials-section glass-panel physics-body">
      <div className="testimonials-header">
        <h3 className="testimonials-title">Opiniones de <span className="text-gradient">Nuestros Clientes</span></h3>
        <p className="testimonials-subtitle">Lo que dicen las empresas que confían en nuestro arsenal técnico.</p>
      </div>

      <div className="testimonials-carousel-container">
        {/* Quote Icon Background Decor */}
        <Quote className="testimonial-quote-icon-decor" />

        {/* Carousel Tracks */}
        <div className="testimonials-slider">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className={`testimonial-slide ${idx === activeIndex ? 'active' : ''}`}
            >
              {idx === activeIndex && (
                <div className="testimonial-card-content animate-fade-in">
                  <div className="testimonial-rating">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} className="star-icon" fill="currentColor" />
                    ))}
                  </div>
                  
                  <p className="testimonial-quote">"{t.quote}"</p>
                  
                  <div className="testimonial-profile">
                    <span className="testimonial-avatar">{t.avatar}</span>
                    <div className="testimonial-profile-info">
                      <span className="profile-name">{t.name}</span>
                      <span className="profile-role">{t.role} en <strong className="text-gradient">{t.company}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Controls */}
        <button 
          className="carousel-control-btn prev" 
          onClick={handlePrev}
          aria-label="Testimonio anterior"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          className="carousel-control-btn next" 
          onClick={handleNext}
          aria-label="Siguiente testimonio"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="testimonials-dots">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`dot-indicator ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Ir a testimonio ${idx + 1}`}
            type="button"
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
