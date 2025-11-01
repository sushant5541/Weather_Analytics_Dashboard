import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WeatherCard from './WeatherCard';
import EmptyState from '../UI/EmptyState';
import LoadingSpinner from '../UI/LoadingSpinner';
import { fetchCurrentWeather } from '../../redux/actions/weatherActions';
import { addFavorite, removeFavorite, setSelectedCity } from '../../redux/actions/weatherActions';
import { DEFAULT_CITIES } from '../../utils/constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { weatherData, favorites, loading } = useSelector((state) => state.weather);

  useEffect(() => {
    // Load initial cities
    const citiesToLoad = favorites.length > 0 
      ? favorites 
      : DEFAULT_CITIES;

    citiesToLoad.forEach((city) => {
      if (!weatherData[city.name]) {
        dispatch(fetchCurrentWeather(city.name));
      }
    });

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      Object.keys(weatherData).forEach((cityName) => {
        dispatch(fetchCurrentWeather(cityName));
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

  if (loading && weatherCards.length === 0) {
    return <LoadingSpinner message="Loading weather data..." />;
  }

  if (weatherCards.length === 0) {
    return (
      <EmptyState
        title="No cities added yet"
        description="Search for a city to get started!"
      />
    );
  }

  return (
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
  );
};

export default Dashboard;