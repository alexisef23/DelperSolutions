import React, { useState } from 'react';
import './Stats.css';
import { Award, CheckCircle, Code, ShieldCheck } from 'lucide-react';
import FloatingHint from './FloatingHint';

const Stats = () => {
  const [eatenStats, setEatenStats] = useState({});

  const handleDoubleClick = (index) => {
    if (eatenStats[index]) return;
    setEatenStats(prev => ({ ...prev, [index]: true }));
    // Revert after 4 seconds
    setTimeout(() => {
      setEatenStats(prev => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }, 4000);
  };

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
    <div className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsList.map((stat, index) => (
            <div 
              key={index} 
              className="stat-item-card glass-panel"
              onDoubleClick={() => handleDoubleClick(index)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div className="stat-icon-wrapper">
                {stat.icon}
              </div>
              <div className="stat-number-wrapper">
                <span 
                  className={`stat-num text-gradient ${eatenStats[index] ? 'stat-eaten' : ''}`}
                  style={{
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    display: 'inline-block'
                  }}
                >
                  {eatenStats[index] ? '999% 😎' : stat.number}
                </span>
              </div>
              <h4 className="stat-title">{stat.label}</h4>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
        <FloatingHint message='Haz doble clic en cualquier número de las estadísticas si tienes hambre de éxito' />
      </div>
    </div>
  );
};

export default Stats;
