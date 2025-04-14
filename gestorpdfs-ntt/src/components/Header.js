import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header className="app-header">
      <div className="logo-container">
        <div className="logo-placeholder">NTT DATA</div>
        <h1>Casos de Uso Taller Agentforce</h1>
      </div>
      
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="menu-icon"></span>
      </button>
      
      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Inicio</Link>
          </li>
          <li className={location.pathname === '/upload' ? 'active' : ''}>
            <Link to="/upload">Subir PDF</Link>
          </li>
          <li className={location.pathname === '/category/salud' ? 'active' : ''}>
            <Link to="/category/salud">Salud</Link>
          </li>
          <li className={location.pathname === '/category/banca' ? 'active' : ''}>
            <Link to="/category/banca">Banca</Link>
          </li>
          <li className={location.pathname === '/category/telco' ? 'active' : ''}>
            <Link to="/category/telco">Telecomunicaciones</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;