import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Home from './components/Home';
import PDFViewer from './components/PDFViewer';
import PDFUploader from './components/PDFUploader';
import QRGenerator from './components/QRGenerator';
import CategoryView from './components/CategoryView';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<PDFUploader />} />
            <Route path="/view/:id" element={<PDFViewer />} />
            <Route path="/qr/:id" element={<QRGenerator />} />
            <Route path="/category/:category" element={<CategoryView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
