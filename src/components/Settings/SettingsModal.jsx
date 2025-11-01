import React, { useState } from 'react';
import { X, Thermometer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperatureUnit } from '../../redux/actions/weatherActions';
import { TEMPERATURE_UNITS } from '../../utils/constants';

const SettingsModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const currentUnit = useSelector((state) => state.weather.temperatureUnit);

  const handleUnitChange = (unit) => {
    dispatch(setTemperatureUnit(unit));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl fade-in">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Temperature Unit</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleUnitChange(TEMPERATURE_UNITS.METRIC)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  currentUnit === TEMPERATURE_UNITS.METRIC
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">°C</div>
                <div className="text-sm">Celsius</div>
              </button>
              <button
                onClick={() => handleUnitChange(TEMPERATURE_UNITS.IMPERIAL)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                  currentUnit === TEMPERATURE_UNITS.IMPERIAL
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">°F</div>
                <div className="text-sm">Fahrenheit</div>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-sm text-gray-600">
              Weather data provided by WeatherAPI.com
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Data refreshes automatically every 60 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;