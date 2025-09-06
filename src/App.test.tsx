import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vibe Weather title', () => {
  render(<App />);
  const titleElement = screen.getByText(/vibe weather/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders weather forecast subtitle', () => {
  render(<App />);
  const subtitleElement = screen.getByText(/5-day weather forecast for indian metro cities/i);
  expect(subtitleElement).toBeInTheDocument();
});

test('shows loading state initially', () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading weather data/i);
  expect(loadingElement).toBeInTheDocument();
});
