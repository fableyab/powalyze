/**
 * Simple in-memory cache service with expiry.
 */

const cacheStore = new Map();

export const cacheService = {
  setCache: (key, value, ttlSeconds = 60) => {
    const expiry = Date.now() + ttlSeconds * 1000;
    cacheStore.set(key, { value, expiry });
  },

  getCache: (key) => {
    const item = cacheStore.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      cacheStore.delete(key);
      return null;
    }
    
    return item.value;
  },

  deleteCache: (key) => {
    cacheStore.delete(key);
  },

  clearCache: () => {
    cacheStore.clear();
  },

  getCacheSize: () => cacheStore.size
};