import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFolder, FaFilePdf, FaSearch } from 'react-icons/fa';
import './CategoryView.css';

function CategoryView() {
  const { category } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const loadPdfs = () => {
      setLoading(true);
      
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const filteredPdfs = storedPdfs.filter(pdf => pdf.category.toLowerCase() === category.toLowerCase());
        setPdfs(filteredPdfs);
      } catch (err) {
        console.error('Error loading PDFs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPdfs();
  }, [category]);
  
  const getCategoryIcon = () => {
    switch(category.toLowerCase()) {
      case 'salud':
        return <FaFolder className="category-icon" style={{ color: '#28a745' }} />;
      case 'banca':
        return <FaFolder className="category-icon" style={{ color: '#ffc107' }} />;
      case 'telco':
        return <FaFolder className="category-icon" style={{ color: '#dc3545' }} />;
      default:
        return <FaFolder className="category-icon" />;
    }
  };
  
  const getCategoryTitle = () => {
    switch(category.toLowerCase()) {
      case 'salud':
        return 'Salud';
      case 'banca':
        return 'Banca';
      case 'telco':
        return 'Telecomunicaciones';
      default:
        return category;
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredPdfs = pdfs.filter(pdf => 
    pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const deletePdf = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este PDF?')) {
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const updatedPdfs = storedPdfs.filter(pdf => pdf.id !== id);
        localStorage.setItem('pdfs', JSON.stringify(updatedPdfs));
        
        // Update the state to reflect the changes
        setPdfs(prevPdfs => prevPdfs.filter(pdf => pdf.id !== id));
      } catch (err) {
        console.error('Error deleting PDF:', err);
        alert('Error al eliminar el PDF. Inténtelo de nuevo.');
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Cargando PDFs...</div>;
  }
  
  return (
    <div className="category-view-container">
      <div className="category-header">
        <div className="category-title">
          {getCategoryIcon()}
          <h2>{getCategoryTitle()}</h2>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar PDFs..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      {filteredPdfs.length === 0 ? (
        <div className="no-pdfs">
          <p>No hay PDFs en esta categoría.</p>
          <Link to="/upload" className="upload-link">Subir un PDF</Link>
        </div>
      ) : (
        <div className="pdf-grid">
          {filteredPdfs.map(pdf => (
            <div key={pdf.id} className="pdf-card">
              <div className="pdf-card-icon">
                <FaFilePdf style={{ color: '#dc3545' }} />
              </div>
              <div className="pdf-card-content">
                <h3 className="pdf-card-title">{pdf.name}</h3>
                <p className="pdf-card-case">Caso de uso: {pdf.useCase || "General"}</p>
                <p className="pdf-card-date">Subido: {new Date(pdf.uploadDate).toLocaleDateString()}</p>
                <p className="pdf-card-size">Tamaño: {(pdf.size / 1024).toFixed(2)} KB</p>
              </div>
              <div className="pdf-card-actions">
                <Link to={`/view/${pdf.id}`} className="pdf-action-button view-button">
                  Ver
                </Link>
                <Link to={`/qr/${pdf.id}`} className="pdf-action-button qr-button">
                  QR
                </Link>
                <button 
                  onClick={() => deletePdf(pdf.id)} 
                  className="pdf-action-button delete-button">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="category-actions">
        <Link to="/upload" className="category-action-button upload-button">
          Subir PDF
        </Link>
        <Link to="/" className="category-action-button home-button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default CategoryView;