import { API_CONFIG } from '../../utils/constants';

class CacheService {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = API_CONFIG.CACHE_DURATION;
  }

  set(key, value) {
    this.cache.set(key, {
      data: value,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    
    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.timestamp > this.cacheDuration;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    const isExpired = Date.now() - cached.timestamp > this.cacheDuration;
    if (isExpired) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  remove(key) {
    this.cache.delete(key);
  }
}

export const cacheService = new CacheService();