import React from 'react';
import { MapPin, Plus, TrendingUp } from 'lucide-react';
import { POPULAR_CITIES } from '../../utils/constants';

const PopularCities = ({ onCityClick }) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg mb-8 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Indian Cities</h2>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>Popular</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-5">
        🇮🇳 Click on any city to view real-time weather data from across India
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {POPULAR_CITIES.map((city, index) => (
          <button
            key={index}
            onClick={() => onCityClick(city.name)}
            className="group relative bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 rounded-xl p-4 transition-all hover:shadow-lg hover:scale-105 border-2 border-gray-100 hover:border-blue-300"
          >
            <div className="text-3xl mb-2">{city.emoji}</div>
            <div className="font-bold text-gray-900 text-sm mb-1">
              {city.name}
            </div>
            <div className="text-xs text-gray-500">{city.state}</div>
            
            {/* Hover effect icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 rounded-full p-1">
              <Plus className="w-3 h-3 text-white" />
            </div>
            
            {/* Bottom gradient line on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-t border-blue-100">
        <p className="text-xs text-gray-600 text-center">
          💡 <strong>Pro Tip:</strong> Can't find your city? Use the search bar above to find any city in India or worldwide!
        </p>
      </div>
    </div>
  );
};

export default PopularCities;