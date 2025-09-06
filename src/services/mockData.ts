import { WeatherData } from '../types/weather';

// Mock weather data for demonstration when API key is "demo"
export const getMockWeatherData = (cityName: string): WeatherData => {
  const baseTemp = Math.random() * 15 + 20; // 20-35°C
  const weatherConditions = ['Clear', 'Clouds', 'Rain', 'Drizzle'];
  const weatherMain = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
  // Generate 5 days of forecast data (8 entries per day, 3-hour intervals)
  const forecastList = Array.from({ length: 40 }, (_, index) => {
    const date = new Date();
    date.setHours(date.getHours() + index * 3);
    
    return {
      dt: Math.floor(date.getTime() / 1000),
      main: {
        temp: baseTemp + (Math.random() - 0.5) * 10,
        feels_like: baseTemp + (Math.random() - 0.5) * 8,
        temp_min: baseTemp - Math.random() * 5,
        temp_max: baseTemp + Math.random() * 8,
        humidity: Math.floor(Math.random() * 40) + 40,
      },
      weather: [
        {
          id: 800,
          main: index % 8 === 0 ? weatherMain : weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
          description: weatherMain.toLowerCase(),
          icon: '01d',
        },
      ],
      dt_txt: date.toISOString().replace('T', ' ').slice(0, 19),
    };
  });

  return {
    list: forecastList,
    city: {
      id: Math.floor(Math.random() * 1000000),
      name: cityName,
      country: 'IN',
      population: Math.floor(Math.random() * 10000000),
      timezone: 19800, // IST
      sunrise: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
      sunset: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
    },
  };
};