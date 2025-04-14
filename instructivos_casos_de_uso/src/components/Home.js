import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h2>Bienvenido a Instructivos Casos de Uso</h2>
      <p>Seleccione uno de los siguientes casos de uso:</p>
      
      <div className="use-cases-grid">
        <Link to="/caso1" className="use-case-card">
          <h3>Caso de Uso 1</h3>
          <p>Descripción breve del primer caso de uso</p>
        </Link>
        
        <Link to="/caso2" className="use-case-card">
          <h3>Caso de Uso 2</h3>
          <p>Descripción breve del segundo caso de uso</p>
        </Link>
        
        <Link to="/caso3" className="use-case-card">
          <h3>Caso de Uso 3: Mantenimiento Preventivo</h3>
          <p>Instrucciones detalladas para realizar mantenimiento preventivo de equipos</p>
        </Link>
      </div>
      
      <div className="admin-section">
        <Link to="/qr-generator" className="admin-link">Generar Códigos QR</Link>
      </div>
    </div>
  );
}

export default Home;