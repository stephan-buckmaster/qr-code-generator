import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders QR Code Generator header', () => {
  render(<App />);
  const headerElement = screen.getByText(/QR Code Generator/i);
  expect(headerElement).toBeInTheDocument();
});

test('generates QR code on button click', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter text to encode/i);
  const buttonElement = screen.getByText(/Create QR Code/i);

  fireEvent.change(inputElement, { target: { value: 'https://example.com' } });
  fireEvent.click(buttonElement);

  const qrCodeElement = screen.getByText(/BMI/i);
  expect(qrCodeElement).toBeInTheDocument();
});
