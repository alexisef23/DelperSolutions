import React from 'react';
import './Stats.css';
import { Award, CheckCircle, Code, ShieldCheck } from 'lucide-react';

const Stats = () => {
  const statsList = [
    {
      icon: <CheckCircle className="stat-icon text-cyan" size={32} />,
      number: "+20",
      label: "Proyectos Exitosos",
      desc: "Plataformas web y apps móviles publicadas"
    },
    {
      icon: <Code className="stat-icon text-blue" size={32} />,
      number: "+3 Años",
      label: "Experiencia en Ingeniería",
      desc: "Diseñando arquitecturas robustas y escalables"
    },
    {
      icon: <ShieldCheck className="stat-icon text-purple" size={32} />,
      number: "99.9%",
      label: "Disponibilidad (SLA)",
      desc: "Sistemas estables con tolerancia a fallos"
    },
    {
      icon: <Award className="stat-icon text-cyan" size={32} />,
      number: "100%",
      label: "Clientes Satisfechos",
      desc: "Casos de éxito con impacto real en ventas"
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsList.map((stat, index) => (
            <div key={index} className="stat-item-card glass-panel">
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-number-wrapper">
                <span className="stat-num text-gradient">{stat.number}</span>
              </div>
              <h4 className="stat-title">{stat.label}</h4>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
