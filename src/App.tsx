import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import { weatherService } from './services/weatherService';
import { CityWeatherInfo, WeatherCondition } from './types/weather';

function App() {
  const [cities, setCities] = useState<CityWeatherInfo[]>([]);
  const [backgroundCondition, setBackgroundCondition] = useState<WeatherCondition>('clear');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      try {
        // Initialize cities with loading state
        const initialCities = weatherService.getInitialCities();
        setCities(initialCities);

        // Fetch weather data for all cities
        const weatherData = await weatherService.fetchAllCitiesWeather();
        setCities(weatherData);

        // Set background based on first city's weather condition
        if (weatherData.length > 0 && weatherData[0].weatherData) {
          const firstCityWeather = weatherData[0].weatherData.list[0];
          const currentHour = new Date().getHours();
          const isNight = currentHour < 6 || currentHour > 19;
          const condition = weatherService.getWeatherCondition(
            firstCityWeather.weather[0].main,
            isNight
          );
          setBackgroundCondition(condition);
        }
      } catch (error) {
        console.error('Failed to load weather data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, []);

  const backgroundClass = weatherService.getBackgroundColor(backgroundCondition);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${backgroundClass}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
            Vibe Weather
          </h1>
          <p className="text-white/80 text-lg">
            5-day weather forecast for Indian metro cities
          </p>
        </header>

        {/* Weather Cards Grid */}
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white/80 mt-4">Loading weather data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {cities.map((city) => (
              <WeatherCard key={city.name} cityWeather={city} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16">
          <p className="text-white/60 text-sm">
            Weather data provided by OpenWeatherMap
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
