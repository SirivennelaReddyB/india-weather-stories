// Weather Stories Application
class WeatherApp {
    constructor() {
        this.apiKey = 'demo'; // Using demo API key for development
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.citySelect = document.getElementById('city-select');
        this.weatherDisplay = document.getElementById('weather-display');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('error-message');
        this.currentCity = null;
        
        this.init();
    }

    init() {
        this.citySelect.addEventListener('change', (e) => {
            if (e.target.value) {
                this.fetchWeather(e.target.value);
            }
        });
    }

    async fetchWeather(city) {
        try {
            this.showLoading();
            
            // For demo purposes, we'll use mock data since we don't have a real API key
            // In production, you would use: 
            // const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock weather data for demonstration
            const mockData = this.generateMockWeatherData(city);
            
            this.displayWeather(mockData);
            this.currentCity = city;
            
        } catch (error) {
            this.showError('Failed to fetch weather data. Please try again.');
            console.error('Weather fetch error:', error);
        }
    }

    generateMockWeatherData(cityQuery) {
        const cityName = cityQuery.split(',')[0];
        const weatherConditions = [
            { main: 'Clear', description: 'clear sky', icon: '☀️' },
            { main: 'Clouds', description: 'scattered clouds', icon: '⛅' },
            { main: 'Rain', description: 'light rain', icon: '🌧️' },
            { main: 'Thunderstorm', description: 'thunderstorm', icon: '⛈️' },
            { main: 'Mist', description: 'mist', icon: '🌫️' },
            { main: 'Haze', description: 'haze', icon: '🌫️' }
        ];

        const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const baseTemp = Math.floor(Math.random() * 20) + 15; // 15-35°C
        
        return {
            name: cityName,
            main: {
                temp: baseTemp + Math.floor(Math.random() * 10),
                feels_like: baseTemp + Math.floor(Math.random() * 5),
                humidity: Math.floor(Math.random() * 40) + 40,
                pressure: Math.floor(Math.random() * 100) + 1000
            },
            weather: [randomCondition],
            wind: {
                speed: Math.floor(Math.random() * 15) + 2,
                deg: Math.floor(Math.random() * 360)
            },
            visibility: Math.floor(Math.random() * 5000) + 5000,
            clouds: {
                all: Math.floor(Math.random() * 100)
            },
            dt: Date.now() / 1000
        };
    }

    displayWeather(data) {
        const weatherStory = this.generateWeatherStory(data);
        
        const weatherHTML = `
            <div class="weather-card">
                <div class="weather-header">
                    <div class="city-info">
                        <h2>${data.name}</h2>
                        <div class="date">${new Date().toLocaleDateString('en-IN', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</div>
                    </div>
                    <div class="weather-icon">${data.weather[0].icon}</div>
                </div>
                
                <div class="weather-main">
                    <div class="temperature-section">
                        <div class="temperature">${Math.round(data.main.temp)}°C</div>
                        <div class="feels-like">Feels like ${Math.round(data.main.feels_like)}°C</div>
                        <div class="weather-desc">${data.weather[0].description}</div>
                    </div>
                    
                    <div class="weather-details">
                        <div class="detail-item">
                            <div class="detail-value">${data.main.humidity}%</div>
                            <div class="detail-label">Humidity</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${Math.round(data.wind.speed)} km/h</div>
                            <div class="detail-label">Wind Speed</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${data.main.pressure} hPa</div>
                            <div class="detail-label">Pressure</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-value">${Math.round(data.visibility / 1000)} km</div>
                            <div class="detail-label">Visibility</div>
                        </div>
                    </div>
                </div>
                
                <div class="weather-story">
                    <h3>Today's Weather Story</h3>
                    <p class="story-text">${weatherStory}</p>
                </div>
            </div>
        `;
        
        this.weatherDisplay.innerHTML = weatherHTML;
        this.hideLoading();
        this.hideError();
    }

    generateWeatherStory(data) {
        const stories = {
            'Clear': [
                `The sun graces ${data.name} with its golden embrace today, painting the sky in brilliant azure. At ${Math.round(data.main.temp)}°C, it's a perfect day to explore the city's vibrant streets and feel the gentle warmth on your skin.`,
                `${data.name} awakens to a crystal-clear morning where the sun dances across the horizon. The air feels crisp and refreshing at ${Math.round(data.main.temp)}°C, promising a day filled with endless possibilities.`,
                `A blanket of sunshine has settled over ${data.name}, creating the perfect backdrop for outdoor adventures. With temperatures at a comfortable ${Math.round(data.main.temp)}°C, nature invites you to step outside and embrace the day.`
            ],
            'Clouds': [
                `Soft, cotton-like clouds drift lazily across ${data.name}'s sky, creating a natural artwork of shadows and light. At ${Math.round(data.main.temp)}°C, the gentle breeze carries whispers of stories from distant lands.`,
                `The sky over ${data.name} wears a dress of scattered clouds today, offering a perfect balance between sun and shade. The temperature of ${Math.round(data.main.temp)}°C makes it ideal for a peaceful stroll through the city.`,
                `Clouds play hide and seek with the sun over ${data.name}, creating a mesmerizing dance of light and shadow. The mild temperature of ${Math.round(data.main.temp)}°C adds to the city's serene atmosphere.`
            ],
            'Rain': [
                `The monsoon spirits have blessed ${data.name} with their life-giving gift. Gentle raindrops tap a rhythmic melody on rooftops while the air, cooled to ${Math.round(data.main.temp)}°C, carries the earthy fragrance of petrichor.`,
                `${data.name} is wrapped in a soft embrace of rain today, as nature refreshes the earth. The temperature has dropped to a pleasant ${Math.round(data.main.temp)}°C, perfect for sipping tea by the window and watching the world get washed clean.`,
                `Rain paints ${data.name} in shades of gray and green, as droplets create tiny rivers along the streets. At ${Math.round(data.main.temp)}°C, the city takes on a mystical quality that speaks to the soul.`
            ],
            'Thunderstorm': [
                `The sky over ${data.name} rumbles with dramatic energy as thunder clouds gather their strength. At ${Math.round(data.main.temp)}°C, the air crackles with electricity, promising a spectacular display of nature's power.`,
                `${data.name} experiences nature's grand theater today, with lightning illuminating the sky and thunder providing the soundtrack. The temperature of ${Math.round(data.main.temp)}°C adds to the dramatic atmosphere of this natural spectacle.`,
                `A majestic thunderstorm graces ${data.name}, transforming the ordinary into the extraordinary. The air, charged at ${Math.round(data.main.temp)}°C, carries the promise of renewal and fresh beginnings.`
            ],
            'Mist': [
                `A ethereal veil of mist embraces ${data.name} this morning, creating a dreamlike landscape where reality and fantasy merge. At ${Math.round(data.main.temp)}°C, the city moves through this gentle shroud like a scene from a poem.`,
                `${data.name} awakens wrapped in a soft blanket of mist, transforming familiar sights into mysterious silhouettes. The cool temperature of ${Math.round(data.main.temp)}°C adds to the mystical ambiance of this foggy morning.`,
                `Whispers of mist dance through ${data.name}'s streets, creating an enchanting atmosphere where every corner holds a secret. At ${Math.round(data.main.temp)}°C, the city becomes a canvas painted in shades of gray and silver.`
            ],
            'Haze': [
                `A gentle haze softens the edges of ${data.name} today, creating a impressionist painting where colors blend seamlessly. The temperature of ${Math.round(data.main.temp)}°C adds warmth to this dreamy, filtered light.`,
                `${data.name} is bathed in a golden haze that gives the city an almost magical quality. At ${Math.round(data.main.temp)}°C, the warm air shimmers with possibility and adventure.`,
                `The sun filters through a delicate haze over ${data.name}, creating a soft, romantic glow across the cityscape. With temperatures at ${Math.round(data.main.temp)}°C, it's a perfect day for quiet contemplation and gentle exploration.`
            ]
        };

        const weatherType = data.weather[0].main;
        const storyArray = stories[weatherType] || stories['Clear'];
        return storyArray[Math.floor(Math.random() * storyArray.length)];
    }

    showLoading() {
        this.weatherDisplay.style.display = 'none';
        this.loading.style.display = 'flex';
        this.errorMessage.style.display = 'none';
    }

    hideLoading() {
        this.loading.style.display = 'none';
        this.weatherDisplay.style.display = 'block';
    }

    showError(message) {
        this.errorMessage.style.display = 'flex';
        document.getElementById('error-text').textContent = message;
        this.weatherDisplay.style.display = 'none';
        this.hideLoading();
    }

    hideError() {
        this.errorMessage.style.display = 'none';
    }
}

// Retry function for error state
function retryWeatherFetch() {
    if (window.weatherApp && window.weatherApp.currentCity) {
        window.weatherApp.fetchWeather(window.weatherApp.currentCity);
    } else {
        // Reset to welcome state
        const weatherDisplay = document.getElementById('weather-display');
        weatherDisplay.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">🌤️</div>
                <h2>Welcome to India Weather Stories</h2>
                <p>Select a city to discover its current weather story and atmospheric narrative.</p>
            </div>
        `;
        weatherDisplay.style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});

// Service Worker registration for PWA capabilities (optional)
// Uncomment and create sw.js file if you want PWA functionality
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('SW registered: ', registration);
//             })
//             .catch(registrationError => {
//                 console.log('SW registration failed: ', registrationError);
//             });
//     });
// }