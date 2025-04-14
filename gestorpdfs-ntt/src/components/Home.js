import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [recentPdfs, setRecentPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadPdfs = () => {
      setLoading(true);
      
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        // Sort by upload date (newest first)
        const sortedPdfs = storedPdfs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        setRecentPdfs(sortedPdfs.slice(0, 6)); // Get the 6 most recent PDFs
      } catch (err) {
        console.error('Error loading PDFs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPdfs();
  }, []);

  const deletePdf = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este PDF?')) {
      try {
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        const updatedPdfs = storedPdfs.filter(pdf => pdf.id !== id);
        localStorage.setItem('pdfs', JSON.stringify(updatedPdfs));
        
        // Update the state to reflect the changes
        setRecentPdfs(prevPdfs => prevPdfs.filter(pdf => pdf.id !== id));
      } catch (err) {
        console.error('Error deleting PDF:', err);
        alert('Error al eliminar el PDF. Inténtelo de nuevo.');
      }
    }
  };
  
  return (
    <div className="home-container">
      <section className="hero-section">
        <h2>Bienvenido al Gestor de PDFs de NTT DATA</h2>
        <p>Gestione, visualice y comparta sus documentos PDF de manera sencilla</p>
        <Link to="/upload" className="cta-button">Subir un PDF</Link>
      </section>
      
      <section className="categories-section">
        <h3>Categorías</h3>
        <div className="category-cards">
          <Link to="/category/salud" className="category-card">
            <div className="category-icon">🏥</div>
            <h4>Salud</h4>
            <p>Documentos relacionados con el sector salud</p>
          </Link>
          
          <Link to="/category/banca" className="category-card">
            <div className="category-icon">🏦</div>
            <h4>Banca</h4>
            <p>Documentos relacionados con el sector bancario</p>
          </Link>
          
          <Link to="/category/telco" className="category-card">
            <div className="category-icon">📡</div>
            <h4>Telecomunicaciones</h4>
            <p>Documentos relacionados con telecomunicaciones</p>
          </Link>
        </div>
      </section>
      
      {recentPdfs.length > 0 && (
        <section className="recent-section">
          <h3>Documentos Recientes</h3>
          <div className="pdf-list">
            {recentPdfs.map(pdf => (
              <div key={pdf.id} className="pdf-item">
                <div className="pdf-icon">📄</div>
                <div className="pdf-details">
                  <h4>{pdf.name}</h4>
                  <p>Categoría: {pdf.category}</p>
                  <p>Caso de uso: {pdf.useCase || "General"}</p>
                  <p>Añadido: {new Date(pdf.uploadDate).toLocaleDateString()}</p>
                </div>
                <div className="pdf-actions">
                  <Link to={`/view/${pdf.id}`} className="action-button view-button">
                    Ver
                  </Link>
                  <Link to={`/qr/${pdf.id}`} className="action-button qr-button">
                    QR
                  </Link>
                  <button 
                    onClick={() => deletePdf(pdf.id)} 
                    className="action-button delete-button">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;