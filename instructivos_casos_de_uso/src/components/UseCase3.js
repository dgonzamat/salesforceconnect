import React from 'react';
import { Link } from 'react-router-dom';
import './UseCase.css';

function UseCase3() {
  return (
    <div className="use-case-container">
      <h2>Caso de Uso 3: Mantenimiento Preventivo</h2>
      
      <div className="content-section">
        <h3>Instrucciones para Mantenimiento Preventivo</h3>
        
        <div className="instruction-step">
          <h4>Paso 1: Verificación Inicial</h4>
          <p>Antes de comenzar cualquier procedimiento de mantenimiento, asegúrese de que el equipo esté completamente apagado y desconectado de la fuente de energía.</p>
        </div>
        
        <div className="instruction-step">
          <h4>Paso 2: Inspección Visual</h4>
          <p>Realice una inspección visual completa del equipo, buscando signos de desgaste, daños o componentes sueltos.</p>
          <ul>
            <li>Verifique todas las conexiones eléctricas</li>
            <li>Inspeccione las piezas móviles en busca de desgaste</li>
            <li>Compruebe que no haya fugas de fluidos</li>
          </ul>
        </div>
        
        <div className="instruction-step">
          <h4>Paso 3: Limpieza</h4>
          <p>Limpie cuidadosamente todos los componentes según las especificaciones del fabricante. Preste especial atención a las áreas donde se acumula polvo o residuos.</p>
        </div>
        
        <div className="instruction-step">
          <h4>Paso 4: Lubricación</h4>
          <p>Aplique lubricante a todas las piezas móviles según lo especificado en el manual de mantenimiento. Utilice únicamente los lubricantes recomendados por el fabricante.</p>
        </div>
        
        <div className="instruction-step">
          <h4>Paso 5: Pruebas Finales</h4>
          <p>Una vez completados todos los pasos anteriores, reconecte el equipo y realice pruebas de funcionamiento para asegurar que todo opera correctamente.</p>
        </div>
      </div>
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-button">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default UseCase3;