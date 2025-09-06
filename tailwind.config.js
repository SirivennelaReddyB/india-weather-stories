/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'weather-clear': '#3B82F6',
        'weather-cloudy': '#6B7280',
        'weather-rain': '#1E3A8A',
        'weather-sunrise': '#F59E0B',
      },
    },
  },
  plugins: [],
}