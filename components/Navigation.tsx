'use client';

import { useState } from 'react';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-container">
        <a href="#home" className="logo">TYPOGRAPHIC</a>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`} id="navMenu">
          <li><a href="#home" className="nav-link" onClick={handleLinkClick}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={handleLinkClick}>About</a></li>
          <li><a href="#portfolio" className="nav-link" onClick={handleLinkClick}>Portfolio</a></li>
          <li><a href="#services" className="nav-link" onClick={handleLinkClick}>Services</a></li>
          <li><a href="#gallery" className="nav-link" onClick={handleLinkClick}>Gallery</a></li>
          <li><a href="#team" className="nav-link" onClick={handleLinkClick}>Team</a></li>
          <li><a href="#contact" className="nav-link" onClick={handleLinkClick}>Contact</a></li>
        </ul>
        <div className="menu-toggle" id="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
