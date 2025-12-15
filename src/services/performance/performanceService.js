import { cacheService } from '../cache/cacheService';

export const performanceService = {
  // Simulate heavy calculation with caching
  expensiveCalculation: async (key, calcFunction) => {
    const cached = cacheService.getCache(key);
    if (cached) return cached;

    console.time(`Calc: ${key}`);
    const result = await calcFunction();
    console.timeEnd(`Calc: ${key}`);
    
    cacheService.setCache(key, result, 300); // Cache for 5 mins
    return result;
  },

  // Image preloader
  preloadImages: (imageUrls) => {
    if (!Array.isArray(imageUrls)) return;
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  },
  
  // Lazy loader helper (conceptual)
  lazyLoad: (importFunc) => {
     return importFunc(); // In React this is wrapped in lazy()
  }
};