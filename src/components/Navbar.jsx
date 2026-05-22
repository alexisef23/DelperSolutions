import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#" className="navbar-brand">
          <img src="/logo.png" alt="Delper Solutions" className="navbar-logo" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
