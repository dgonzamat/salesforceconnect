import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UseCase3 from './UseCase3';

describe('UseCase3 Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <UseCase3 />
      </BrowserRouter>
    );
  });

  test('renders the correct title', () => {
    const titleElement = screen.getByText(/Caso de Uso 3: Mantenimiento Preventivo/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all five steps', () => {
    const step1 = screen.getByText(/Paso 1: Verificación Inicial/i);
    const step2 = screen.getByText(/Paso 2: Inspección Visual/i);
    const step3 = screen.getByText(/Paso 3: Limpieza/i);
    const step4 = screen.getByText(/Paso 4: Lubricación/i);
    const step5 = screen.getByText(/Paso 5: Pruebas Finales/i);
    
    expect(step1).toBeInTheDocument();
    expect(step2).toBeInTheDocument();
    expect(step3).toBeInTheDocument();
    expect(step4).toBeInTheDocument();
    expect(step5).toBeInTheDocument();
  });

  test('renders back to home link', () => {
    const backLink = screen.getByText(/Volver al Inicio/i);
    expect(backLink).toBeInTheDocument();
  });
});