# India Weather Stories

A modern, minimal weather application that tells beautiful weather stories from across Indian cities.

## Features

- 🌤️ **Beautiful Weather Stories**: Poetic narratives for each weather condition
- 🏙️ **Indian Cities**: Comprehensive dropdown with major Indian cities
- 📱 **Responsive Design**: Optimized for both mobile and desktop
- 🎨 **Modern UI**: Clean, minimal design with smooth animations
- ⚡ **Fast Loading**: Lightweight and optimized for performance
- 🌙 **Dark Mode**: Automatic dark mode support
- 📱 **PWA Ready**: Progressive Web App capabilities

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with Grid and Flexbox
- **Fonts**: Inter font family from Google Fonts
- **Deployment**: Ready for Vercel and Netlify

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/SirivennelaReddyB/india-weather-stories.git
   cd india-weather-stories
   ```

2. Open `index.html` in your browser or serve with a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Visit `http://localhost:8000` in your browser

## Deployment

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SirivennelaReddyB/india-weather-stories)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/SirivennelaReddyB/india-weather-stories)

### Manual Deployment
The project is a static site and can be deployed to any static hosting service:
- Copy all files to your hosting provider
- Ensure `index.html` is served as the default page

## API Integration

To use real weather data:

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the demo API key in `script.js`:
   ```javascript
   this.apiKey = 'YOUR_API_KEY_HERE';
   ```
3. Uncomment the real API call in the `fetchWeather` method

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.