import React, { useState } from 'react';
import { WeatherIntro } from './components/WeatherIntro';
import { mockForecastData } from './data/mockForecast';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    console.log('Weather intro completed!');
    setShowIntro(false);
  };

  const handleRestart = () => {
    setShowIntro(true);
  };

  return (
    <div className="App">
      {showIntro ? (
        <WeatherIntro 
          forecastData={mockForecastData} 
          onComplete={handleIntroComplete}
        />
      ) : (
        <div className="main-content">
          <h1>Welcome to India Weather Stories</h1>
          <button onClick={handleRestart} className="restart-button">
            🌦️ View Weather Intro Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
