# India Weather Stories

A React application that displays current weather information for Hyderabad using the OpenWeatherMap API.

## Features

- 🌦️ Real-time weather data for Hyderabad
- 🌡️ Temperature display in Celsius
- 💨 Wind speed and humidity information
- 📱 Responsive design
- 🎨 Beautiful gradient background with weather cards

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SirivennelaReddyB/india-weather-stories.git
cd india-weather-stories
```

2. Install dependencies:
```bash
npm install
```

3. Set up your OpenWeatherMap API key:
   - Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your actual API key:
   ```bash
   cp .env.example .env
   # Edit .env and add your API key
   ```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Demo Mode

The app includes demo data that will be shown if no API key is configured. This allows you to test the interface without setting up an API key immediately.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Information

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch current weather data for Hyderabad, India.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.