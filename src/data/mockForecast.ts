import { ForecastData } from '../types/weather';

export const mockForecastData: ForecastData = {
  location: "Mumbai, India",
  date: new Date().toISOString().split('T')[0],
  stages: [
    {
      id: 'sunrise',
      name: 'Sunrise',
      timeOfDay: 'sunrise',
      duration: 3000,
      weather: {
        type: 'partly-cloudy',
        intensity: 0.3,
        temperature: 24,
        windSpeed: 5
      },
      colors: {
        sky: ['#FF6B35', '#F7931E', '#FFD23F'],
        ground: '#8B4513'
      }
    },
    {
      id: 'morning',
      name: 'Morning',
      timeOfDay: 'morning',
      duration: 4000,
      weather: {
        type: 'sunny',
        intensity: 0.8,
        temperature: 28,
        windSpeed: 8
      },
      colors: {
        sky: ['#87CEEB', '#E0F6FF', '#FFD700'],
        ground: '#90EE90'
      }
    },
    {
      id: 'afternoon',
      name: 'Afternoon',
      timeOfDay: 'afternoon',
      duration: 4000,
      weather: {
        type: 'rainy',
        intensity: 0.7,
        temperature: 26,
        windSpeed: 12
      },
      colors: {
        sky: ['#696969', '#A9A9A9', '#D3D3D3'],
        ground: '#228B22'
      }
    },
    {
      id: 'evening',
      name: 'Evening',
      timeOfDay: 'evening',
      duration: 3500,
      weather: {
        type: 'cloudy',
        intensity: 0.6,
        temperature: 25,
        windSpeed: 6
      },
      colors: {
        sky: ['#FF7F50', '#FF6347', '#FFA07A'],
        ground: '#556B2F'
      }
    },
    {
      id: 'sunset',
      name: 'Sunset',
      timeOfDay: 'sunset',
      duration: 3000,
      weather: {
        type: 'partly-cloudy',
        intensity: 0.4,
        temperature: 23,
        windSpeed: 4
      },
      colors: {
        sky: ['#8B008B', '#FF1493', '#FF69B4'],
        ground: '#654321'
      }
    }
  ]
};