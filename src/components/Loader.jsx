import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ theme }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500); // 1.5 seconds loading screen
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="global-loader-screen">
      <div className="loader-logo-container">
        <img 
          src={theme === 'dark' ? '/assets/logo_claro.png' : '/logo.png'} 
          alt="Delper Solutions" 
          className="loader-logo-pulse" 
        />
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
