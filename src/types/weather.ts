export interface WeatherCondition {
  type: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'partly-cloudy';
  intensity: number; // 0-1 scale for rain intensity, cloud density, etc.
  temperature: number;
  windSpeed: number;
}

export interface TimeStage {
  id: string;
  name: string;
  timeOfDay: 'sunrise' | 'morning' | 'afternoon' | 'evening' | 'sunset';
  duration: number; // in milliseconds
  weather: WeatherCondition;
  colors: {
    sky: string[];
    ground: string;
  };
}

export interface ForecastData {
  stages: TimeStage[];
  location: string;
  date: string;
}