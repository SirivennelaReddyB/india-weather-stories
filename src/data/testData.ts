import { ForecastData } from '../types/weather';

export const testRainyData: ForecastData = {
  location: "Mumbai, India",
  date: new Date().toISOString().split('T')[0],
  stages: [
    {
      id: 'afternoon-rain',
      name: 'Rainy Afternoon',
      timeOfDay: 'afternoon',
      duration: 8000, // Longer duration to observe rain
      weather: {
        type: 'rainy',
        intensity: 0.9,
        temperature: 22,
        windSpeed: 15
      },
      colors: {
        sky: ['#696969', '#A9A9A9', '#D3D3D3'],
        ground: '#228B22'
      }
    }
  ]
};