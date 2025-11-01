export const WEATHER_ACTIONS = {
  // Weather Data
  SET_WEATHER_DATA: 'weather/setWeatherData',
  SET_FORECAST_DATA: 'weather/setForecastData',
  CLEAR_WEATHER_DATA: 'weather/clearWeatherData',
  
  // Favorites
  ADD_FAVORITE: 'weather/addFavorite',
  REMOVE_FAVORITE: 'weather/removeFavorite',
  SET_FAVORITES: 'weather/setFavorites',
  
  // Settings
  SET_TEMPERATURE_UNIT: 'weather/setTemperatureUnit',
  
  // Search
  SET_SEARCH_RESULTS: 'weather/setSearchResults',
  CLEAR_SEARCH_RESULTS: 'weather/clearSearchResults',
  
  // UI State
  SET_SELECTED_CITY: 'weather/setSelectedCity',
  SET_LOADING: 'weather/setLoading',
  SET_ERROR: 'weather/setError',
  
  // Cache
  SET_CACHE: 'weather/setCache',
  CLEAR_CACHE: 'weather/clearCache',
};