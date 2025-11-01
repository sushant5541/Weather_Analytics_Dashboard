export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1',
  API_KEY: process.env.REACT_APP_WEATHER_API_KEY || '9c12733474244a11963142550251101',
  CACHE_DURATION: parseInt(process.env.REACT_APP_CACHE_DURATION) || 60000, // 60 seconds
};

export const DEFAULT_CITIES = [
  { name: 'London', id: 1 },
  { name: 'New York', id: 2 },
  { name: 'Tokyo', id: 3 },
];

export const TEMPERATURE_UNITS = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
};

export const WEATHER_CODES = {
  SUNNY: 1000,
  PARTLY_CLOUDY: 1003,
  CLOUDY: 1006,
  OVERCAST: 1009,
  MIST: 1030,
  RAIN: [1063, 1180, 1183, 1186, 1189, 1192, 1195],
  SNOW: [1066, 1210, 1213, 1216, 1219, 1222, 1225],
  THUNDER: [1087, 1273, 1276],
};

export const STORAGE_KEYS = {
  FAVORITES: 'weatherFavorites',
  UNIT: 'weatherUnit',
  LAST_UPDATE: 'weatherLastUpdate',
};