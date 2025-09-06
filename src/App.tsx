import React, { useState } from 'react';
import { WeatherIntro } from './components/WeatherIntro';
import { mockForecastData } from './data/mockForecast';
import { testRainyData } from './data/testData';
import './App.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [useRainTest, setUseRainTest] = useState(false);

  const handleIntroComplete = () => {
    console.log('Weather intro completed!');
    // You can add logic here to navigate to the main app or show other content
  };

  const handleRestart = () => {
    setShowIntro(false);
    setTimeout(() => setShowIntro(true), 100);
  };

  const toggleRainTest = () => {
    setUseRainTest(!useRainTest);
    setShowIntro(false);
    setTimeout(() => setShowIntro(true), 100);
  };

  return (
    <div className="App">
      {showIntro ? (
        <WeatherIntro 
          forecastData={useRainTest ? testRainyData : mockForecastData} 
          onComplete={handleIntroComplete}
        />
      ) : (
        <div className="main-content">
          <h1>Welcome to India Weather Stories</h1>
          <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <button onClick={handleRestart} className="restart-button">
              🌦️ View Weather Intro Again
            </button>
            <button onClick={toggleRainTest} className="restart-button">
              {useRainTest ? '🌈 Switch to Full Story' : '🌧️ Test Rain Animation'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
