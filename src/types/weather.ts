// Weather API types
export interface WeatherData {
  list: WeatherItem[];
  city: CityInfo;
}

export interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Weather[];
  dt_txt: string;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CityInfo {
  id: number;
  name: string;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface CityWeatherInfo {
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  weatherData?: WeatherData;
  isLoading: boolean;
  error?: string;
}

export type WeatherCondition = 'clear' | 'cloudy' | 'rain' | 'sunrise';