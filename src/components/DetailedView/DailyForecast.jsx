import React from 'react';
import { getWeatherIcon } from '../../utils/weatherIcons';
import { formatDate } from '../../utils/formatters';

const DailyForecast = ({ forecastDays, temperatureUnit }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">7-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {forecastDays.map((day, idx) => {
          const maxTemp = temperatureUnit === 'metric' 
            ? day.day.maxtemp_c 
            : day.day.maxtemp_f;
          const minTemp = temperatureUnit === 'metric' 
            ? day.day.mintemp_c 
            : day.day.mintemp_f;

          return (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="font-semibold text-gray-900 mb-2 text-sm">
                {formatDate(day.date)}
              </div>
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.day.condition, 'w-10 h-10')}
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-gray-900">
                  {Math.round(maxTemp)}°
                </div>
                <div className="text-sm text-gray-600">
                  {Math.round(minTemp)}°
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                💧 {day.day.daily_chance_of_rain}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;