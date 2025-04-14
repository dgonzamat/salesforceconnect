import React from 'react';
import { Link } from 'react-router-dom';

function UseCase2() {
  return (
    <div className="use-case-container">
      <h2>Caso de Uso 2</h2>
      
      <div className="content-section">
        <p>Contenido del instructivo para el caso de uso 2...</p>
      </div>
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-button">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default UseCase2;