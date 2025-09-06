import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather story header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Weather Story for Mumbai, India/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders weather stages', () => {
  render(<App />);
  const stageIndicators = screen.getAllByText(/Sunrise/i);
  const stageIndicators2 = screen.getAllByText(/Morning/i);
  expect(stageIndicators.length).toBeGreaterThan(0);
  expect(stageIndicators2.length).toBeGreaterThan(0);
});
