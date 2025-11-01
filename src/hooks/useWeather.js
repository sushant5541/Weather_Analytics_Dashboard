import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather, fetchForecast } from '../redux/actions/weatherActions';

export const useWeather = (city) => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.weatherData[city]);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (city && !weatherData) {
      dispatch(fetchCurrentWeather(city));
    }
  }, [city, weatherData, dispatch]);

  const refresh = () => {
    if (city) {
      dispatch(fetchCurrentWeather(city));
    }
  };

  return { weatherData, loading, error, refresh };
};

export const useForecast = (city, days = 7) => {
  const dispatch = useDispatch();
  const forecastData = useSelector((state) => state.weather.forecastData[city]);

  useEffect(() => {
    if (city && !forecastData) {
      dispatch(fetchForecast(city, days));
    }
  }, [city, forecastData, days, dispatch]);

  return { forecastData };
};