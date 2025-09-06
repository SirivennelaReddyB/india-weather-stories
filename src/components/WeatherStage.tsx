import React from 'react';
import { motion } from 'framer-motion';
import { TimeStage } from '../types/weather';
import { Clouds, Rain, Flowers } from './WeatherEffects';
import './WeatherStage.css';

interface WeatherStageProps {
  stage: TimeStage;
  isActive: boolean;
}

export const WeatherStage: React.FC<WeatherStageProps> = ({ stage, isActive }) => {
  if (!stage) return null;
  
  const getSunPosition = () => {
    switch (stage.timeOfDay) {
      case 'sunrise':
        return { left: '10%', top: '70%' };
      case 'morning':
        return { left: '30%', top: '20%' };
      case 'afternoon':
        return { left: '50%', top: '10%' };
      case 'evening':
        return { left: '70%', top: '30%' };
      case 'sunset':
        return { left: '90%', top: '80%' };
      default:
        return { left: '50%', top: '20%' };
    }
  };

  const sunPosition = getSunPosition();
  const showSun = stage.weather.type !== 'rainy' || stage.weather.intensity < 0.5;

  return (
    <motion.div
      className="weather-stage"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        background: `linear-gradient(to bottom, ${stage.colors.sky.join(', ')})`
      }}
      transition={{ duration: 1 }}
      style={{
        background: `linear-gradient(to bottom, ${stage.colors.sky.join(', ')})`
      }}
    >
      {/* Sun/Moon */}
      {showSun && (
        <motion.div
          className="sun"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isActive ? 1 : 0,
            opacity: isActive ? 1 : 0,
            ...sunPosition
          }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {stage.timeOfDay === 'sunset' || stage.timeOfDay === 'sunrise' ? '🌅' : '☀️'}
        </motion.div>
      )}

      {/* Weather Effects */}
      {isActive && (
        <>
          {(stage.weather.type === 'cloudy' || stage.weather.type === 'partly-cloudy') && (
            <Clouds intensity={stage.weather.intensity} windSpeed={stage.weather.windSpeed} />
          )}
          
          {stage.weather.type === 'rainy' && (
            <Rain intensity={stage.weather.intensity} />
          )}
          
          <Flowers 
            weatherType={stage.weather.type}
            intensity={stage.weather.intensity}
            windSpeed={stage.weather.windSpeed}
          />
        </>
      )}

      {/* Ground */}
      <motion.div
        className="ground"
        initial={{ y: 100 }}
        animate={{ y: isActive ? 0 : 100 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ backgroundColor: stage.colors.ground }}
      />

      {/* Stage Info */}
      <motion.div
        className="stage-info"
        initial={{ y: 50, opacity: 0 }}
        animate={{ 
          y: isActive ? 0 : 50,
          opacity: isActive ? 1 : 0
        }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <h2>{stage.name}</h2>
        <div className="weather-details">
          <span className="temperature">{stage.weather.temperature}°C</span>
          <span className="weather-type">{stage.weather.type.replace('-', ' ')}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};