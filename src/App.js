import React from 'react';
import WeatherComponent from './WeatherComponent';

function App() {
  return (
    <div className="App">
      <h1 className="title">India Weather Stories</h1>
      <p className="subtitle">Current Weather in Hyderabad</p>
      <WeatherComponent />
    </div>
  );
}

export default App;