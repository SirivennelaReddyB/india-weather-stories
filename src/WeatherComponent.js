import React, { useState, useEffect } from 'react';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hyderabad coordinates
  const HYDERABAD_LAT = 17.3850;
  const HYDERABAD_LON = 78.4867;

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get API key from environment variable or use a demo key for development
      const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY || 'demo';
      
      if (apiKey === 'demo') {
        // Demo data for Hyderabad when no API key is provided
        setTimeout(() => {
          setWeatherData({
            name: 'Hyderabad',
            main: {
              temp: 32,
              feels_like: 35,
              humidity: 65,
              pressure: 1013
            },
            weather: [{
              main: 'Clear',
              description: 'clear sky',
              icon: '01d'
            }],
            wind: {
              speed: 3.5
            }
          });
          setLoading(false);
        }, 1000);
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${HYDERABAD_LAT}&lon=${HYDERABAD_LON}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather data fetch failed: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="loading">Loading weather data for Hyderabad...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error loading weather data</h3>
        <p>{error}</p>
        <p>
          <strong>Note:</strong> To use live weather data, please set up your OpenWeatherMap API key 
          in a .env file as REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
        </p>
        <button onClick={fetchWeatherData} style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#0984e3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Retry
        </button>
      </div>
    );
  }

  if (!weatherData) {
    return <div className="error">No weather data available</div>;
  }

  return (
    <div className="weather-card">
      <h2 className="city-name">{weatherData.name}</h2>
      <div className="temperature">
        {Math.round(weatherData.main.temp)}°C
      </div>
      <div className="weather-description">
        {weatherData.weather[0].description}
      </div>
      
      <div className="weather-details">
        <div className="weather-detail">
          <div className="weather-detail-label">Feels like</div>
          <div className="weather-detail-value">{Math.round(weatherData.main.feels_like)}°C</div>
        </div>
        <div className="weather-detail">
          <div className="weather-detail-label">Humidity</div>
          <div className="weather-detail-value">{weatherData.main.humidity}%</div>
        </div>
        <div className="weather-detail">
          <div className="weather-detail-label">Wind</div>
          <div className="weather-detail-value">{weatherData.wind.speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;