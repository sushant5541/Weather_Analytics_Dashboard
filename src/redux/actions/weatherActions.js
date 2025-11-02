import { WEATHER_ACTIONS } from '../types';
import { weatherAPI } from '../../services/api/weatherAPI';

export const fetchCurrentWeather = (city) => async (dispatch) => {
  try {
    dispatch({ type: WEATHER_ACTIONS.SET_LOADING, payload: true });
    
    console.log(`Action: Fetching weather for ${city}`);
    const data = await weatherAPI.getCurrentWeather(city);
    console.log(`Action: Received data for ${city}`, data);
    
    dispatch({
      type: WEATHER_ACTIONS.SET_WEATHER_DATA,
      payload: { [city]: data },
    });
    
    dispatch({ type: WEATHER_ACTIONS.SET_LOADING, payload: false });
    return data;
  } catch (error) {
    console.error(`Action: Error fetching ${city}:`, error);
    dispatch({
      type: WEATHER_ACTIONS.SET_ERROR,
      payload: error.message,
    });
    dispatch({ type: WEATHER_ACTIONS.SET_LOADING, payload: false });
    throw error;
  }
};

export const fetchForecast = (city, days = 7) => async (dispatch) => {
  try {
    console.log(`Action: Fetching forecast for ${city}`);
    const data = await weatherAPI.getForecast(city, days);
    
    dispatch({
      type: WEATHER_ACTIONS.SET_FORECAST_DATA,
      payload: { [city]: data },
    });
    
    return data;
  } catch (error) {
    console.error(`Action: Error fetching forecast for ${city}:`, error);
    dispatch({
      type: WEATHER_ACTIONS.SET_ERROR,
      payload: error.message,
    });
    throw error;
  }
};

export const searchCities = (query) => async (dispatch) => {
  try {
    if (!query || query.length < 2) {
      dispatch({ type: WEATHER_ACTIONS.CLEAR_SEARCH_RESULTS });
      return [];
    }
    
    console.log(`Action: Searching for "${query}"`);
    const results = await weatherAPI.searchCities(query);
    console.log(`Action: Found ${results.length} results`);
    
    dispatch({
      type: WEATHER_ACTIONS.SET_SEARCH_RESULTS,
      payload: results,
    });
    
    return results;
  } catch (error) {
    console.error('Action: Search error:', error);
    return [];
  }
};

export const addFavorite = (city) => ({
  type: WEATHER_ACTIONS.ADD_FAVORITE,
  payload: { ...city, id: Date.now() },
});

export const removeFavorite = (cityId) => ({
  type: WEATHER_ACTIONS.REMOVE_FAVORITE,
  payload: cityId,
});

export const setTemperatureUnit = (unit) => ({
  type: WEATHER_ACTIONS.SET_TEMPERATURE_UNIT,
  payload: unit,
});

export const setSelectedCity = (city) => ({
  type: WEATHER_ACTIONS.SET_SELECTED_CITY,
  payload: city,
});

export const clearSearchResults = () => ({
  type: WEATHER_ACTIONS.CLEAR_SEARCH_RESULTS,
});
