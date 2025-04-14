import React from 'react';
import { Link } from 'react-router-dom';

function UseCase1() {
  return (
    <div className="use-case-container">
      <h2>Caso de Uso 1</h2>
      
      <div className="content-section">
        {/* El contenido específico se agregará cuando lo proporciones */}
        <p>Contenido del instructivo para el caso de uso 1...</p>
      </div>
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-button">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default UseCase1;