import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';
import { cacheService } from '../cache/cacheService';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

export const weatherAPI = {
  async getCurrentWeather(city) {
    const cacheKey = `current_${city}`;
    
    // Check cache first
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log(`Cache hit for ${city}`);
      return cached;
    }

    try {
      const response = await apiClient.get('/current.json', {
        params: {
          key: API_CONFIG.API_KEY,
          q: city,
          aqi: 'yes',
        },
      });

      const data = response.data;
      cacheService.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather');
    }
  },

  async getForecast(city, days = 7) {
    const cacheKey = `forecast_${city}_${days}`;
    
    // Check cache first
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log(`Cache hit for forecast ${city}`);
      return cached;
    }

    try {
      const response = await apiClient.get('/forecast.json', {
        params: {
          key: API_CONFIG.API_KEY,
          q: city,
          days: days,
          aqi: 'yes',
          alerts: 'yes',
        },
      });

      const data = response.data;
      cacheService.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw new Error('Failed to fetch forecast');
    }
  },

  async searchCities(query) {
    if (!query || query.length < 2) {
      return [];
    }

    try {
      const response = await apiClient.get('/search.json', {
        params: {
          key: API_CONFIG.API_KEY,
          q: query,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  },
};