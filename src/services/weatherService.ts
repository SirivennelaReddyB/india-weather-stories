import { WeatherData, CityWeatherInfo, WeatherCondition } from '../types/weather';
import { getMockWeatherData } from './mockData';

// Indian metro cities with their coordinates
export const INDIAN_CITIES: Omit<CityWeatherInfo, 'weatherData' | 'isLoading' | 'error'>[] = [
  { name: 'Delhi', coordinates: { lat: 28.6139, lon: 77.2090 } },
  { name: 'Mumbai', coordinates: { lat: 19.0760, lon: 72.8777 } },
  { name: 'Bangalore', coordinates: { lat: 12.9716, lon: 77.5946 } },
  { name: 'Chennai', coordinates: { lat: 13.0827, lon: 80.2707 } },
  { name: 'Kolkata', coordinates: { lat: 22.5726, lon: 88.3639 } },
  { name: 'Hyderabad', coordinates: { lat: 17.3850, lon: 78.4867 } },
];

// OpenWeatherMap API configuration
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'demo';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  getInitialCities(): CityWeatherInfo[] {
    return INDIAN_CITIES.map(city => ({
      ...city,
      isLoading: true,
    }));
  }

  async fetchWeatherData(lat: number, lon: number): Promise<WeatherData> {
    // Use mock data if demo API key is being used
    if (API_KEY === 'demo') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const cityName = INDIAN_CITIES.find(city => 
        Math.abs(city.coordinates.lat - lat) < 0.1 && 
        Math.abs(city.coordinates.lon - lon) < 0.1
      )?.name || 'Unknown';
      return getMockWeatherData(cityName);
    }

    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    return response.json();
  }

  async fetchAllCitiesWeather(): Promise<CityWeatherInfo[]> {
    const promises = INDIAN_CITIES.map(async (city) => {
      try {
        const weatherData = await this.fetchWeatherData(
          city.coordinates.lat,
          city.coordinates.lon
        );
        return {
          ...city,
          weatherData,
          isLoading: false,
        };
      } catch (error) {
        return {
          ...city,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    return Promise.all(promises);
  }

  getWeatherCondition(weatherMain: string, isNight: boolean = false): WeatherCondition {
    const condition = weatherMain.toLowerCase();
    
    if (condition.includes('clear')) {
      return isNight ? 'sunrise' : 'clear';
    }
    
    if (condition.includes('cloud')) {
      return 'cloudy';
    }
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
      return 'rain';
    }
    
    return 'clear';
  }

  getBackgroundColor(condition: WeatherCondition): string {
    switch (condition) {
      case 'clear':
        return 'bg-weather-clear';
      case 'cloudy':
        return 'bg-weather-cloudy';
      case 'rain':
        return 'bg-weather-rain';
      case 'sunrise':
        return 'bg-weather-sunrise';
      default:
        return 'bg-weather-clear';
    }
  }
}

export const weatherService = new WeatherService();