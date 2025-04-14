import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './QRGenerator.css';

function QRGenerator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qrValue, setQrValue] = useState('');
  
  useEffect(() => {
    const loadPdf = () => {
      setLoading(true);
      
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const foundPdf = storedPdfs.find(item => item.id === id);
        
        if (foundPdf) {
          setPdf(foundPdf);
          
          // Create QR code URL (in a real app, this would be a public URL)
          // For this demo, we'll use the local URL with hash routing
          const baseUrl = window.location.origin;
          const qrUrl = `${baseUrl}/#/view/${id}`;
          setQrValue(qrUrl);
          
          setError('');
        } else {
          setError('PDF no encontrado. Es posible que haya sido eliminado o que el enlace sea incorrecto.');
        }
      } catch (err) {
        setError('Error al cargar el PDF. Inténtelo de nuevo.');
      } finally {
        setLoading(false);
      }
    };
    
    loadPdf();
  }, [id]);
  
  const downloadQRCode = () => {
    // SVG elements don't have toDataURL, so we need a different approach
    const svgElement = document.getElementById('qr-code');
    if (!svgElement) return;
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Create an image from the SVG
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      
      // Get data URL and trigger download
      const pngUrl = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-code-${pdf.name}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };
  
  const deletePdf = () => {
    if (window.confirm('¿Está seguro de que desea eliminar este PDF?')) {
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const updatedPdfs = storedPdfs.filter(item => item.id !== id);
        localStorage.setItem('pdfs', JSON.stringify(updatedPdfs));
        
        // Navigate back to home after deletion
        navigate('/');
      } catch (err) {
        setError('Error al eliminar el PDF. Inténtelo de nuevo.');
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Generando código QR...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="qr-generator-container">
      <h2>Código QR para "{pdf.name}"</h2>
      
      <div className="qr-info">
        <p>Escanee este código QR para acceder directamente al PDF.</p>
        <p className="qr-url">URL: <a href={qrValue} target="_blank" rel="noopener noreferrer">{qrValue}</a></p>
      </div>
      
      <div className="qr-code-container">
        <QRCodeSVG
          id="qr-code"
          value={qrValue} 
          size={250}
          level="H"
          includeMargin={true}
          className="qr-code"
        />
      </div>
      
      <div className="qr-actions">
        <button onClick={downloadQRCode} className="download-qr-button">
          Descargar Código QR
        </button>
        <Link to={`/view/${id}`} className="view-pdf-button">
          Ver PDF
        </Link>
        <button onClick={deletePdf} className="delete-button">
          Eliminar PDF
        </button>
        <Link to="/" className="back-button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default QRGenerator;