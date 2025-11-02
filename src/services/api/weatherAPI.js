import axios from 'axios';
import { API_CONFIG } from '../../utils/constants';
import { cacheService } from '../cache/cacheService';
import { mockWeatherData, mockSearchResults } from './mockData';

// Toggle this to switch between mock and real API
const USE_MOCK_DATA = true; // Set to false when you have a valid API key

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
});

export const weatherAPI = {
  async getCurrentWeather(city) {
    // Use mock data
    if (USE_MOCK_DATA) {
      console.log(`📦 Using mock data for ${city}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return mockWeatherData[city] || mockWeatherData['London'];
    }

    const cacheKey = `current_${city}`;
    
    const cached = cacheService.get(cacheKey);
    if (cached) {
      console.log(`✓ Cache hit for ${city}`);
      return cached;
    }

    try {
      console.log(`🌐 Fetching real weather for: ${city}`);
      
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
      console.error('❌ API Error:', error.response?.status, error.message);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('Invalid API key. Please get a new key from weatherapi.com');
      }
      
      throw new Error('Failed to fetch current weather');
    }
  },

  async getForecast(city, days = 7) {
    // Use mock data
    if (USE_MOCK_DATA) {
      console.log(`📦 Using mock forecast for ${city}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockWeatherData[city] || mockWeatherData['London'];
    }

    const cacheKey = `forecast_${city}_${days}`;
    
    const cached = cacheService.get(cacheKey);
    if (cached) {
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
      console.error('Forecast Error:', error);
      throw new Error('Failed to fetch forecast');
    }
  },

  async searchCities(query) {
    if (!query || query.length < 2) {
      return [];
    }

    // Use mock data
    if (USE_MOCK_DATA) {
      console.log(`📦 Using mock search for "${query}"`);
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSearchResults.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase())
      );
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
      console.error('Search Error:', error);
      return [];
    }
  },
};