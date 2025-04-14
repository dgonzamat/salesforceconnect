import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PDFUploader.css';

function PDFUploader() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('salud');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setName(selectedFile.name.replace('.pdf', ''));
      setError('');
    } else {
      setFile(null);
      setError('Por favor, seleccione un archivo PDF válido.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor, seleccione un archivo PDF.');
      return;
    }
    
    if (!name.trim()) {
      setError('Por favor, ingrese un nombre para el documento.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Read the file as data URL
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const pdfData = event.target.result;
        
        // Generate a unique ID
        const id = `pdf_${Date.now()}`;
        
        // Create PDF object
        const pdfObject = {
          id,
          name,
          category,
          data: pdfData,
          dateAdded: new Date().toISOString(),
          size: (file.size / 1024).toFixed(2) + ' KB'
        };
        
        // Save to localStorage
        const existingPdfs = JSON.parse(localStorage.getItem('pdfs') || '[]');
        localStorage.setItem('pdfs', JSON.stringify([...existingPdfs, pdfObject]));
        
        setIsUploading(false);
        navigate(`/view/${id}`);
      };
      
      reader.onerror = () => {
        setError('Error al leer el archivo. Inténtelo de nuevo.');
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
      
    } catch (err) {
      setError('Error al subir el archivo. Inténtelo de nuevo.');
      setIsUploading(false);
    }
  };
  
  return (
    <div className="uploader-container">
      <h2>Subir Nuevo PDF</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="file-upload" className="file-upload-label">
            {file ? file.name : 'Seleccionar archivo PDF'}
          </label>
          <input 
            type="file" 
            id="file-upload" 
            accept="application/pdf" 
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Nombre del documento:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese un nombre descriptivo"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="salud">Salud</option>
            <option value="banca">Banca</option>
            <option value="telco">Telecomunicaciones</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={isUploading}
        >
          {isUploading ? 'Subiendo...' : 'Subir PDF'}
        </button>
      </form>
    </div>
  );
}

export default PDFUploader;