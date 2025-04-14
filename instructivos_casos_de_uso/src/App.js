import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UseCase1 from './components/UseCase1';
import UseCase2 from './components/UseCase2';
import UseCase3 from './components/UseCase3';
import QRCodeGenerator from './components/QRCodeGenerator';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <h1>Instructivos Casos de Uso</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/caso1" element={<UseCase1 />} />
            <Route path="/caso2" element={<UseCase2 />} />
            <Route path="/caso3" element={<UseCase3 />} />
            <Route path="/qr-generator" element={<QRCodeGenerator />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
