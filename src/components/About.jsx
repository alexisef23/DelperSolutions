import React, { useState } from 'react';
import './About.css';
import { Target, Rocket, Award, Lightbulb, Shuffle, Shield, Eye, Users, ChevronDown } from 'lucide-react';

const About = () => {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      title: "Innovación",
      icon: <Lightbulb size={20} className="value-icon text-cyan" />,
      desc: "Buscamos constantemente nuevas formas de aplicar la tecnología para dar soluciones creativas y eficientes a problemas complejos."
    },
    {
      title: "Adaptabilidad",
      icon: <Shuffle size={20} className="value-icon text-blue" />,
      desc: "Nos moldeamos a las necesidades de cada industria, tipo de negocio y evolución del mercado para entregar siempre la solución precisa."
    },
    {
      title: "Integridad",
      icon: <Shield size={20} className="value-icon text-purple" />,
      desc: "Actuamos con rectitud, honestidad y respeto en cada proyecto que desarrollamos y en cada decisión que tomamos."
    },
    {
      title: "Transparencia",
      icon: <Eye size={20} className="value-icon text-cyan" />,
      desc: "Mantenemos una comunicación clara, abierta y sin letras chiquitas con nuestros clientes durante todo el proceso de desarrollo."
    },
    {
      title: "Orientación al Cliente",
      icon: <Users size={20} className="value-icon text-blue" />,
      desc: "El éxito de nuestros clientes es el nuestro; diseñamos tecnología pensando siempre en su crecimiento y en facilitar su día a día."
    }
  ];

  return (
    <section id="quienes-somos" className="container">
      {/* Intro Block - Full Width */}
      <div className="about-intro-block">
        <h2 className="section-title text-center-align">Quiénes <span className="text-gradient">Somos</span></h2>
        <p className="about-lead-paragraph">
          En <strong>Delper Solutions</strong>, somos una firma de desarrollo tecnológico fundada por ingenieros y desarrolladores apasionados por resolver los desafíos reales del mundo empresarial. Nos especializamos en transformar problemas y dificultades del día a día en soluciones digitales eficientes. Con una amplia trayectoria en diversos tipos de proyectos, combinamos la frescura de la innovación tecnológica con una sólida capacidad técnica para ayudar a los negocios a expandir sus horizontes, optimizar sus procesos e incrementar sus ganancias. No solo creamos software; construimos el motor tecnológico que impulsa el crecimiento de tu empresa.
        </p>
      </div>

      {/* Grid Block - 3 Columns (Misión, Visión, Valores) */}
      <div className="about-pillars-grid">
        {/* Misión Column */}
        <div className="about-grid-card glass-panel">
          <div className="card-icon-header">
            <div className="about-icon-wrapper mission-bg">
              <Target size={28} className="text-cyan" />
            </div>
            <h3 className="about-card-title">Nuestra <span className="text-gradient">Misión</span></h3>
          </div>
          <p className="about-card-text">
            Facilitar el crecimiento y la evolución de todo tipo de negocios a través de soluciones tecnológicas estratégicas. Nos dedicamos a resolver los retos cotidianos de las empresas mediante sistemas a la medida, permitiéndoles ampliar sus horizontes, optimizar su operación y maximizar su rentabilidad con total simplicidad.
          </p>
        </div>

        {/* Visión Column */}
        <div className="about-grid-card glass-panel">
          <div className="card-icon-header">
            <div className="about-icon-wrapper vision-bg">
              <Rocket size={28} className="text-purple" />
            </div>
            <h3 className="about-card-title">Nuestra <span className="text-gradient">Visión</span></h3>
          </div>
          <p className="about-card-text">
            Consolidarnos como el referente tecnológico y el pilar de apoyo definitivo para las empresas en su camino hacia la digitalización. Nos proyectamos como el socio estratégico de confianza, reconocido por transformar los negocios a través del desarrollo de sistemas innovadores y de alto impacto.
          </p>
        </div>

        {/* Valores Column (Accordion Style) */}
        <div className="about-grid-card glass-panel valores-card">
          <div className="card-icon-header">
            <div className="about-icon-wrapper values-bg">
              <Award size={28} className="text-blue" />
            </div>
            <h3 className="about-card-title">Nuestros <span className="text-gradient">Valores</span></h3>
          </div>
          
          <div className="about-values-accordion">
            {values.map((item, index) => {
              const isOpen = activeValue === index;
              return (
                <div 
                  key={index} 
                  className={`accordion-item ${isOpen ? 'active' : ''}`}
                  onClick={() => setActiveValue(isOpen ? -1 : index)}
                >
                  <button className="accordion-header" type="button">
                    <span className="accordion-icon-title">
                      {item.icon}
                      <span className="accordion-title-text">{item.title}</span>
                    </span>
                    <ChevronDown size={16} className="accordion-chevron" />
                  </button>
                  <div className="accordion-content-wrapper">
                    <div className="accordion-content">
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
