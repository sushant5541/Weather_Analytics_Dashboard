import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from './WeatherCard';
import PopularCities from './PopularCities';
import EmptyState from '../UI/EmptyState';
import LoadingSpinner from '../UI/LoadingSpinner';
import { fetchCurrentWeather } from '../../redux/actions/weatherActions';
import { addFavorite, removeFavorite, setSelectedCity } from '../../redux/actions/weatherActions';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { weatherData, favorites, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    // Only load favorites on startup (if any exist)
    if (favorites.length > 0) {
      console.log('Loading favorite cities:', favorites);
      favorites.forEach((city) => {
        dispatch(fetchCurrentWeather(city.name))
          .catch(err => console.error(`Failed to load ${city.name}:`, err));
      });
    }

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      Object.keys(weatherData).forEach((cityName) => {
        dispatch(fetchCurrentWeather(cityName));
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleAddCity = async (cityName) => {
    console.log(`Adding city: ${cityName}`);
    try {
      await dispatch(fetchCurrentWeather(cityName));
    } catch (err) {
      console.error(`Failed to add ${cityName}:`, err);
      alert(`Failed to load weather for ${cityName}`);
    }
  };

  const handleToggleFavorite = (cityName) => {
    const favorite = favorites.find((fav) => fav.name === cityName);
    
    if (favorite) {
      dispatch(removeFavorite(favorite.id));
    } else {
      dispatch(addFavorite({ name: cityName }));
    }
  };

  const handleCityClick = (cityName) => {
    dispatch(setSelectedCity(cityName));
  };

  const weatherCards = Object.entries(weatherData);

  // Show loading only on initial load
  if (loading && weatherCards.length === 0) {
    return (
      <div>
        <PopularCities onCityClick={handleAddCity} />
        <LoadingSpinner message="Loading weather data..." />
      </div>
    );
  }

  // Show error message
  if (error && weatherCards.length === 0) {
    return (
      <div>
        <PopularCities onCityClick={handleAddCity} />
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="w-24 h-24 text-red-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Weather</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state with popular cities
  if (weatherCards.length === 0) {
    return (
      <div>
        <PopularCities onCityClick={handleAddCity} />
        <EmptyState
          title="Your Dashboard is Empty"
          description="Click on any popular city above or search for a city to get started!"
        />
      </div>
    );
  }

  // Dashboard with weather cards
  return (
    <div>
      {/* Show popular cities only if less than 3 cities are added */}
      {weatherCards.length < 3 && (
        <PopularCities onCityClick={handleAddCity} />
      )}
      
      {/* Weather Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherCards.map(([cityName, data]) => (
          <WeatherCard
            key={cityName}
            city={cityName}
            data={data}
            isFavorite={favorites.some((fav) => fav.name === cityName)}
            onToggleFavorite={() => handleToggleFavorite(cityName)}
            onClick={() => handleCityClick(cityName)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;