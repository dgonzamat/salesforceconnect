import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

describe('Home Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  test('renders welcome message', () => {
    const welcomeElement = screen.getByText(/Bienvenido a Instructivos Casos de Uso/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders all three use case links', () => {
    const useCase1Link = screen.getByText(/Caso de Uso 1/i);
    const useCase2Link = screen.getByText(/Caso de Uso 2/i);
    const useCase3Link = screen.getByText(/Caso de Uso 3/i);
    
    expect(useCase1Link).toBeInTheDocument();
    expect(useCase2Link).toBeInTheDocument();
    expect(useCase3Link).toBeInTheDocument();
  });

  test('renders QR generator link', () => {
    const qrGeneratorLink = screen.getByText(/Generar Códigos QR/i);
    expect(qrGeneratorLink).toBeInTheDocument();
  });
});