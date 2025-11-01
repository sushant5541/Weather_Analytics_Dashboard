import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  CloudFog 
} from 'lucide-react';
import { WEATHER_CODES } from './constants';

export const getWeatherIcon = (condition, size = 'w-12 h-12') => {
  const code = condition?.code || 1000;
  
  if (code === WEATHER_CODES.SUNNY) {
    return <Sun className={`${size} text-yellow-400`} />;
  }
  
  if ([WEATHER_CODES.PARTLY_CLOUDY, WEATHER_CODES.CLOUDY, WEATHER_CODES.OVERCAST].includes(code)) {
    return <Cloud className={`${size} text-gray-400`} />;
  }
  
  if (WEATHER_CODES.RAIN.includes(code)) {
    return <CloudRain className={`${size} text-blue-400`} />;
  }
  
  if (WEATHER_CODES.SNOW.includes(code)) {
    return <CloudSnow className={`${size} text-blue-200`} />;
  }
  
  if (WEATHER_CODES.THUNDER.includes(code)) {
    return <Zap className={`${size} text-yellow-500`} />;
  }
  
  if (code === WEATHER_CODES.MIST) {
    return <CloudFog className={`${size} text-gray-300`} />;
  }
  
  return <Cloud className={`${size} text-gray-400`} />;
};

export const getWeatherBackground = (condition) => {
  const code = condition?.code || 1000;
  
  if (code === WEATHER_CODES.SUNNY) {
    return 'from-yellow-400 to-orange-500';
  }
  
  if (WEATHER_CODES.RAIN.includes(code)) {
    return 'from-blue-400 to-blue-600';
  }
  
  if (WEATHER_CODES.SNOW.includes(code)) {
    return 'from-blue-200 to-blue-400';
  }
  
  if (WEATHER_CODES.THUNDER.includes(code)) {
    return 'from-gray-700 to-gray-900';
  }
  
  return 'from-blue-500 to-purple-600';
};