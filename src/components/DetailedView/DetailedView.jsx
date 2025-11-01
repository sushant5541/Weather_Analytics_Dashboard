import React, { useEffect, useState } from 'react';
import { X, Thermometer, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecast, setSelectedCity } from '../../redux/actions/weatherActions';
import { getWeatherIcon, getWeatherBackground } from '../../utils/weatherIcons';
import { getUVLevel } from '../../utils/formatters';
import LoadingSpinner from '../UI/LoadingSpinner';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import WeatherCharts from './WeatherCharts';

const DetailedView = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector((state) => state.weather.selectedCity);
  const forecastData = useSelector((state) => state.weather.forecastData[selectedCity]);
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCity && !forecastData) {
      setLoading(true);
      dispatch(fetchForecast(selectedCity, 7))
        .finally(() => setLoading(false));
    }
  }, [selectedCity, forecastData, dispatch]);

  const handleClose = () => {
    dispatch(setSelectedCity(null));
  };

  if (!selectedCity) {
    return null;
  }

  if (loading || !forecastData) {
    return (
      <div className="fixed inset-0 bg-white z-50">
        <LoadingSpinner message="Loading detailed forecast..." />
      </div>
    );
  }

  const currentTemp = temperatureUnit === 'metric' 
    ? forecastData.current.temp_c 
    : forecastData.current.temp_f;
  const feelsLike = temperatureUnit === 'metric' 
    ? forecastData.current.feelslike_c 
    : forecastData.current.feelslike_f;
  const bgGradient = getWeatherBackground(forecastData.current.condition);

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {forecastData.location.name}, {forecastData.location.country}
          </h1>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Current Weather Overview */}
        <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-6 md:p-8 text-white mb-6 shadow-xl`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {Math.round(currentTemp)}°
              </div>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                {forecastData.current.condition.text}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5" />
                  <div>
                    <div className="text-sm opacity-80">Feels Like</div>
                    <div className="text-lg font-semibold">{Math.round(feelsLike)}°</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  <div>
                    <div className="text-sm opacity-80">Humidity</div>
                    <div className="text-lg font-semibold">{forecastData.current.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  <div>
                    <div className="text-sm opacity-80">Wind</div>
                    <div className="text-lg font-semibold">{forecastData.current.wind_kph} km/h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  <div>
                    <div className="text-sm opacity-80">UV Index</div>
                    <div className="text-lg font-semibold">
                      {forecastData.current.uv} ({getUVLevel(forecastData.current.uv)})
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              {getWeatherIcon(forecastData.current.condition, 'w-24 h-24')}
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="mb-6">
          <HourlyForecast 
            hourlyData={forecastData.forecast.forecastday[0].hour}
            temperatureUnit={temperatureUnit}
          />
        </div>

        {/* 7-Day Forecast */}
        <div className="mb-6">
          <DailyForecast 
            forecastDays={forecastData.forecast.forecastday}
            temperatureUnit={temperatureUnit}
          />
        </div>

        {/* Weather Charts */}
        <WeatherCharts hourlyData={forecastData.forecast.forecastday[0].hour} />
      </div>
    </div>
  );
};

export default DetailedView;