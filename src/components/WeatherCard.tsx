import React from 'react';
import { CityWeatherInfo } from '../types/weather';

interface WeatherCardProps {
  cityWeather: CityWeatherInfo;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ cityWeather }) => {
  const { name, weatherData, isLoading, error } = cityWeather;

  if (isLoading) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">{name}</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-white/30 rounded mb-2"></div>
          <div className="h-4 bg-white/30 rounded mb-2"></div>
          <div className="h-4 bg-white/30 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">{name}</h3>
        <p className="text-red-200">Error: {error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  // Get today's weather and next 4 days
  const today = weatherData.list[0];
  const forecast = weatherData.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">{name}</h3>
      
      {/* Current Weather */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80">Now</span>
          <span className="text-2xl font-bold text-white">
            {formatTemp(today.main.temp)}
          </span>
        </div>
        <p className="text-white/70 capitalize">{today.weather[0].description}</p>
        <p className="text-white/60 text-sm">
          Feels like {formatTemp(today.main.feels_like)} • Humidity {today.main.humidity}%
        </p>
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h4 className="text-white/80 text-sm font-semibold mb-3">5-Day Forecast</h4>
        <div className="space-y-2">
          {forecast.map((item, index) => (
            <div key={item.dt} className="flex items-center justify-between text-sm">
              <span className="text-white/70 w-16">
                {index === 0 ? 'Today' : formatDate(item.dt_txt).split(',')[0]}
              </span>
              <div className="flex items-center space-x-2 flex-1 justify-center">
                <span className="text-white/60 capitalize text-xs">
                  {item.weather[0].main}
                </span>
              </div>
              <div className="text-right">
                <span className="text-white font-medium">
                  {formatTemp(item.main.temp_max)}
                </span>
                <span className="text-white/60 ml-1">
                  {formatTemp(item.main.temp_min)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;