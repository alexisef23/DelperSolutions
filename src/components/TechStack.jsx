import React from 'react';
import './TechStack.css';

const TechStack = () => {
  const categories = [
    {
      name: "Frontend",
      techs: [
        { name: "React", img: null },
        { name: "Next.js", img: "/assets/logos/nextjs-icon-dark-background.png" },
        { name: "Tailwind CSS", img: "/assets/logos/Tailwind_CSS_Logo.svg.png" }
      ]
    },
    {
      name: "Backend & APIs",
      techs: [
        { name: "Node.js", img: "/assets/logos/Node.js_logo.svg.png" },
        { name: "Python", img: "/assets/logos/Python-logo-notext.svg.png" }
      ]
    },
    {
      name: "Cloud & DB",
      techs: [
        { name: "PostgreSQL", img: "/assets/logos/Postgresql_elephant.svg.png" },
        { name: "Supabase", img: "/assets/logos/supabase.png" },
        { name: "AWS", img: "/assets/logos/Amazon_Web_Services_Logo.svg.png" },
        { name: "Railway", img: null }
      ]
    },
    {
      name: "Mobile",
      techs: [
        { name: "Flutter", img: "/assets/logos/Google-flutter-logo.svg.png" },
        { name: "React Native", img: "/assets/logos/react-native-1.png" },
        { name: "Swift", img: null },
        { name: "Kotlin", img: null }
      ]
    }
  ];

  return (
    <section id="stack" className="container">
      <h2 className="section-title">Nuestro <span className="text-gradient">Arsenal Técnico</span></h2>
      <p className="section-subtitle">Tecnologías de vanguardia para arquitecturas escalables.</p>
      
      <div className="tech-stack-container">
        {categories.map((category, idx) => (
          <div key={idx} className="tech-category glass-panel">
            <h3 className="category-title">{category.name}</h3>
            <div className="tech-grid">
              {category.techs.map((tech, tIdx) => (
                <div key={tIdx} className="tech-item">
                  {tech.img ? (
                    <img src={tech.img} alt={tech.name} className="tech-img" />
                  ) : (
                    <div className="tech-placeholder"></div>
                  )}
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
