import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ForecastData } from '../types/weather';
import { WeatherStage } from './WeatherStage';
import './WeatherIntro.css';

interface WeatherIntroProps {
  forecastData: ForecastData;
  onComplete?: () => void;
}

export const WeatherIntro: React.FC<WeatherIntroProps> = ({ forecastData, onComplete }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const currentStage = forecastData.stages[currentStageIndex];
    if (!currentStage) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      if (currentStageIndex < forecastData.stages.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
        setTimeout(() => onComplete?.(), 1000);
      }
    }, currentStage.duration);

    return () => clearTimeout(timer);
  }, [currentStageIndex, isPlaying, forecastData.stages, onComplete]);

  const handleReplay = () => {
    setCurrentStageIndex(0);
    setIsPlaying(true);
  };

  const handleSkip = () => {
    setIsPlaying(false);
    onComplete?.();
  };

  const progress = ((currentStageIndex + 1) / forecastData.stages.length) * 100;

  return (
    <div className="weather-intro">
      {/* Header */}
      <motion.div
        className="intro-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Weather Story for {forecastData.location}</h1>
        <p>{forecastData.date}</p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="progress-container"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="stage-indicators">
          {forecastData.stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className={`stage-indicator ${index <= currentStageIndex ? 'active' : ''}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {stage.name}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weather Stages */}
      <div className="stages-container">
        <AnimatePresence mode="wait">
          <WeatherStage
            key={forecastData.stages[currentStageIndex]?.id}
            stage={forecastData.stages[currentStageIndex]}
            isActive={true}
          />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <motion.div
        className="intro-controls"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <button onClick={handleReplay} className="control-button replay">
          🔄 Replay
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          className="control-button play-pause"
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={handleSkip} className="control-button skip">
          ⏭️ Skip
        </button>
      </motion.div>
    </div>
  );
};