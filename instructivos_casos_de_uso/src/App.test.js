import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the header with correct title', () => {
  render(<App />);
  const headerElement = screen.getByText(/Instructivos Casos de Uso/i);
  expect(headerElement).toBeInTheDocument();
});
