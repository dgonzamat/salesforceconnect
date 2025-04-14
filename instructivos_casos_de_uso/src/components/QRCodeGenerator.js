import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import './QRCodeGenerator.css';

function QRCodeGenerator() {
  const baseUrl = window.location.origin + window.location.pathname;
  const [selectedCase, setSelectedCase] = useState('caso1');
  
  const qrUrl = `${baseUrl}#/${selectedCase}`;
  
  const handleCaseChange = (e) => {
    setSelectedCase(e.target.value);
  };
  
  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-${selectedCase}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };
  
  return (
    <div className="qr-generator-container">
      <h2>Generador de Códigos QR</h2>
      
      <div className="qr-controls">
        <label htmlFor="case-select">Seleccione el caso de uso:</label>
        <select 
          id="case-select" 
          value={selectedCase} 
          onChange={handleCaseChange}
        >
          <option value="caso1">Caso de Uso 1</option>
          <option value="caso2">Caso de Uso 2</option>
          <option value="caso3">Caso de Uso 3</option>
        </select>
      </div>
      
      <div className="qr-display">
        <p>URL: {qrUrl}</p>
        <div className="qr-code-wrapper">
          <QRCodeSVG 
            id="qr-code"
            value={qrUrl} 
            size={256}
            includeMargin={true}
          />
        </div>
        <button onClick={downloadQRCode} className="download-button">
          Descargar Código QR
        </button>
      </div>
      
      <div className="navigation-buttons" style={{ marginTop: '30px' }}>
        <Link to="/" className="nav-button">Volver al Inicio</Link>
      </div>
    </div>
  );
}

export default QRCodeGenerator;