const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ WARNING: REACT_APP_WEATHER_API_KEY is not set in .env file!');
}

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1',
  API_KEY: API_KEY,
  CACHE_DURATION: parseInt(process.env.REACT_APP_CACHE_DURATION) || 60000,
};

// Popular Indian cities
export const POPULAR_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', emoji: '🌆' },
  { name: 'Delhi', state: 'Delhi', emoji: '🏛️' },
  { name: 'Bangalore', state: 'Karnataka', emoji: '💻' },
  { name: 'Hyderabad', state: 'Telangana', emoji: '🏰' },
  { name: 'Chennai', state: 'Tamil Nadu', emoji: '🏖️' },
  { name: 'Kolkata', state: 'West Bengal', emoji: '🎭' },
  { name: 'Pune', state: 'Maharashtra', emoji: '🎓' },
  { name: 'Ahmedabad', state: 'Gujarat', emoji: '🕌' },
  { name: 'Jaipur', state: 'Rajasthan', emoji: '🏰' },
  { name: 'Surat', state: 'Gujarat', emoji: '💎' },
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