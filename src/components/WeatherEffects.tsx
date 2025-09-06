import React from 'react';
import { motion } from 'framer-motion';
import './WeatherEffects.css';

interface CloudsProps {
  intensity: number;
  windSpeed: number;
}

export const Clouds: React.FC<CloudsProps> = ({ intensity, windSpeed }) => {
  const cloudCount = Math.ceil(intensity * 5);
  const clouds = Array.from({ length: cloudCount }, (_, i) => i);

  return (
    <div className="clouds-container">
      {clouds.map((_, index) => (
        <motion.div
          key={index}
          className="cloud"
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: window.innerWidth + 100,
            opacity: intensity
          }}
          transition={{
            duration: 20 - windSpeed,
            repeat: Infinity,
            delay: index * 2,
            ease: "linear"
          }}
          style={{
            top: `${10 + index * 15}%`,
            fontSize: `${1 + intensity}rem`
          }}
        >
          ☁️
        </motion.div>
      ))}
    </div>
  );
};

interface RainProps {
  intensity: number;
}

export const Rain: React.FC<RainProps> = ({ intensity }) => {
  const dropCount = Math.ceil(intensity * 50);
  const raindrops = Array.from({ length: dropCount }, (_, i) => i);

  return (
    <div className="rain-container">
      {raindrops.map((_, index) => (
        <motion.div
          key={index}
          className="raindrop"
          initial={{ y: -10, opacity: 0 }}
          animate={{ 
            y: window.innerHeight,
            opacity: intensity
          }}
          transition={{
            duration: 1 + Math.random() * 0.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${0.5 + intensity * 0.5}rem`
          }}
        >
          💧
        </motion.div>
      ))}
    </div>
  );
};

interface FlowersProps {
  weatherType: string;
  intensity: number;
  windSpeed: number;
}

export const Flowers: React.FC<FlowersProps> = ({ weatherType, intensity, windSpeed }) => {
  const flowerCount = 8;
  const flowers = Array.from({ length: flowerCount }, (_, i) => i);
  
  const getFlowerState = () => {
    if (weatherType === 'rainy' && intensity > 0.5) return 'wilting';
    if (weatherType === 'sunny') return 'blooming';
    return 'normal';
  };

  const flowerState = getFlowerState();

  return (
    <div className="flowers-container">
      {flowers.map((_, index) => (
        <motion.div
          key={index}
          className={`flower ${flowerState}`}
          initial={{ scale: 0.5, rotate: 0 }}
          animate={{ 
            scale: flowerState === 'blooming' ? 1.2 : flowerState === 'wilting' ? 0.8 : 1,
            rotate: windSpeed > 10 ? [-5, 5, -5] : 0,
            y: flowerState === 'wilting' ? 10 : 0
          }}
          transition={{
            duration: 2,
            repeat: windSpeed > 10 ? Infinity : 0,
            repeatType: "reverse"
          }}
          style={{
            left: `${10 + index * 10}%`,
            bottom: '10px'
          }}
        >
          🌸
        </motion.div>
      ))}
      
      {/* Petals affected by weather */}
      {(windSpeed > 8 || (weatherType === 'rainy' && intensity > 0.5)) && (
        <div className="petals-container">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="petal"
              initial={{ x: `${20 + i * 15}%`, y: '100%', rotate: 0, opacity: 1 }}
              animate={{
                x: `${80 + Math.random() * 20}%`,
                y: '20%',
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              🌺
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};