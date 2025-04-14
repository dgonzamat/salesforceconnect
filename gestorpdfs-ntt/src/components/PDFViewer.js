import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const loadPdf = () => {
      setLoading(true);
      
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const foundPdf = storedPdfs.find(item => item.id === id);
        
        if (foundPdf) {
          setPdf(foundPdf);
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
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  
  const changePage = (offset) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };
  
  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);
  
  const deletePdf = () => {
    if (window.confirm('¿Está seguro de que desea eliminar este PDF?')) {
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const updatedPdfs = storedPdfs.filter(item => item.id !== id);
        localStorage.setItem('pdfs', JSON.stringify(updatedPdfs));
        
        // Navigate back to home after deletion
        navigate('/');
      } catch (err) {
        console.error('Error deleting PDF:', err);
        setError('Error al eliminar el PDF. Inténtelo de nuevo.');
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Cargando PDF...</div>;
  }
  
  if (error) {
    return <div className="error-container">{error}</div>;
  }
  
  return (
    <div className="pdf-viewer-container">
      <div className="pdf-header">
        <h2>{pdf.name}</h2>
        <p className="pdf-category">Categoría: {pdf.category}</p>
        <p className="pdf-case">Caso de uso: {pdf.useCase || "General"}</p>
      </div>
      
      <div className="pdf-document-container">
        <Document
          file={pdf.url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => setError('Error al cargar el PDF. El archivo puede estar dañado.')}
          loading={<div className="loading">Cargando PDF...</div>}
          className="pdf-document"
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page"
            width={600}
          />
        </Document>
      </div>
      
      {numPages && (
        <div className="pdf-controls">
          <button 
            onClick={previousPage} 
            disabled={pageNumber <= 1}
            className="page-button"
          >
            Anterior
          </button>
          <p className="page-info">
            Página {pageNumber} de {numPages}
          </p>
          <button 
            onClick={nextPage} 
            disabled={pageNumber >= numPages}
            className="page-button"
          >
            Siguiente
          </button>
        </div>
      )}
      
      <div className="pdf-actions">
        <Link to={`/qr/${id}`} className="action-link qr-link">
          Generar QR
        </Link>
        <a href={pdf.url} download={pdf.name} className="action-link download-link">
          Descargar
        </a>
        <button onClick={deletePdf} className="action-link delete-link">
          Eliminar
        </button>
        <Link to="/" className="action-link back-link">
          Volver
        </Link>
      </div>
    </div>
  );
}

export default PDFViewer;