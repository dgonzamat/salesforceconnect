import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';

// Mock the QRCodeSVG component
jest.mock('qrcode.react', () => ({
  QRCodeSVG: () => <div data-testid="qr-code" />
}));

describe('QRCodeGenerator Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <QRCodeGenerator />
      </BrowserRouter>
    );
  });

  test('renders the title', () => {
    const titleElement = screen.getByText(/Generador de Códigos QR/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the dropdown with three options', () => {
    const selectElement = screen.getByLabelText(/Seleccione el caso de uso:/i);
    expect(selectElement).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(3);
  });

  test('renders the QR code', () => {
    const qrCode = screen.getByTestId('qr-code');
    expect(qrCode).toBeInTheDocument();
  });

  test('changes selected case when dropdown changes', () => {
    const selectElement = screen.getByLabelText(/Seleccione el caso de uso:/i);
    
    // Initially it should show caso1
    expect(screen.getByText(/URL:/i).textContent).toContain('caso1');
    
    // Change to caso2
    fireEvent.change(selectElement, { target: { value: 'caso2' } });
    expect(screen.getByText(/URL:/i).textContent).toContain('caso2');
    
    // Change to caso3
    fireEvent.change(selectElement, { target: { value: 'caso3' } });
    expect(screen.getByText(/URL:/i).textContent).toContain('caso3');
  });

  test('renders download button', () => {
    const downloadButton = screen.getByText(/Descargar Código QR/i);
    expect(downloadButton).toBeInTheDocument();
  });
});