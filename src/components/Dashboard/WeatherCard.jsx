import React from 'react';
import { MapPin, Heart, Droplets, Wind, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getWeatherIcon, getWeatherBackground } from '../../utils/weatherIcons';
import { formatTemperature } from '../../utils/formatters';

const WeatherCard = ({ city, data, isFavorite, onToggleFavorite, onClick }) => {
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit);
  
  if (!data || !data.current) {
    return null;
  }

  const temp = temperatureUnit === 'metric' ? data.current.temp_c : data.current.temp_f;
  const bgGradient = getWeatherBackground(data.current.condition);

  return (
    <div 
      className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 fade-in`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <h3 className="text-xl font-bold">{data.location.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-5xl font-bold mb-2">
            {formatTemperature(temp, temperatureUnit)}
          </div>
          <p className="text-white opacity-90">{data.current.condition.text}</p>
          <p className="text-sm text-white opacity-75 mt-1">
            {data.location.region}, {data.location.country}
          </p>
        </div>
        {getWeatherIcon(data.current.condition)}
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white border-opacity-30">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          <div>
            <div className="text-xs opacity-75">Humidity</div>
            <div className="text-sm font-semibold">{data.current.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <div>
            <div className="text-xs opacity-75">Wind</div>
            <div className="text-sm font-semibold">{data.current.wind_kph} km/h</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <div>
            <div className="text-xs opacity-75">Visibility</div>
            <div className="text-sm font-semibold">{data.current.vis_km} km</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-white opacity-60 mt-4 text-right">
        Last updated: {new Date(data.current.last_updated).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default WeatherCard;