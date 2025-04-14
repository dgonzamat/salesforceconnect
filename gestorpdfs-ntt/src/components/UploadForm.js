import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './UploadForm.css';

function UploadForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [useCase, setUseCase] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Por favor, seleccione un archivo PDF válido.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Por favor, ingrese un nombre para el PDF.');
      return;
    }
    
    if (!category) {
      setError('Por favor, seleccione una categoría.');
      return;
    }
    
    if (!file) {
      setError('Por favor, seleccione un archivo PDF.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Convert the file to a data URL
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const pdfDataUrl = event.target.result;
        
        // Create a new PDF object
        const newPdf = {
          id: uuidv4(),
          name,
          category,
          useCase: useCase || "General",
          url: pdfDataUrl,
          size: file.size,
          uploadDate: new Date().toISOString()
        };
        
        // Save to localStorage
        const storedPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        localStorage.setItem('pdfs', JSON.stringify([...storedPdfs, newPdf]));
        
        // Navigate to the PDF viewer
        navigate(`/view/${newPdf.id}`);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error al subir el PDF. Inténtelo de nuevo.');
      setLoading(false);
    }
  };
  
  return (
    <div className="upload-form-container">
      <h2>Subir un nuevo PDF</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="name">Nombre del documento:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese un nombre descriptivo"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="">Seleccione una categoría</option>
            <option value="Salud">Salud</option>
            <option value="Banca">Banca</option>
            <option value="Telco">Telecomunicaciones</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="useCase">Caso de Uso:</label>
          <input
            type="text"
            id="useCase"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            placeholder="Ej: Configuración, Primeros Pasos, etc."
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="file">Archivo PDF:</label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Subiendo...' : 'Subir PDF'}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;