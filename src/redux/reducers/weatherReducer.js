import { WEATHER_ACTIONS } from '../types';
import { STORAGE_KEYS, TEMPERATURE_UNITS } from '../../utils/constants';

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialState = {
  weatherData: {},
  forecastData: {},
  favorites: loadFromLocalStorage(STORAGE_KEYS.FAVORITES, []),
  temperatureUnit: loadFromLocalStorage(STORAGE_KEYS.UNIT, TEMPERATURE_UNITS.METRIC),
  searchResults: [],
  selectedCity: null,
  loading: false,
  error: null,
  cache: {},
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case WEATHER_ACTIONS.SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: { ...state.weatherData, ...action.payload },
        error: null,
      };

    case WEATHER_ACTIONS.SET_FORECAST_DATA:
      return {
        ...state,
        forecastData: { ...state.forecastData, ...action.payload },
        error: null,
      };

    case WEATHER_ACTIONS.CLEAR_WEATHER_DATA:
      return {
        ...state,
        weatherData: {},
        forecastData: {},
      };

    case WEATHER_ACTIONS.ADD_FAVORITE: {
      const newFavorites = [...state.favorites, action.payload];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
      return {
        ...state,
        favorites: newFavorites,
      };
    }

    case WEATHER_ACTIONS.REMOVE_FAVORITE: {
      const filteredFavorites = state.favorites.filter(
        fav => fav.id !== action.payload
      );
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filteredFavorites));
      return {
        ...state,
        favorites: filteredFavorites,
      };
    }

    case WEATHER_ACTIONS.SET_FAVORITES:
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(action.payload));
      return {
        ...state,
        favorites: action.payload,
      };

    case WEATHER_ACTIONS.SET_TEMPERATURE_UNIT:
      localStorage.setItem(STORAGE_KEYS.UNIT, action.payload);
      return {
        ...state,
        temperatureUnit: action.payload,
      };

    case WEATHER_ACTIONS.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
      };

    case WEATHER_ACTIONS.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };

    case WEATHER_ACTIONS.SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload,
      };

    case WEATHER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case WEATHER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case WEATHER_ACTIONS.SET_CACHE:
      return {
        ...state,
        cache: { ...state.cache, ...action.payload },
      };

    case WEATHER_ACTIONS.CLEAR_CACHE:
      return {
        ...state,
        cache: {},
      };

    default:
      return state;
  }
};

export default weatherReducer;