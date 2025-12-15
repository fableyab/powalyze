
/**
 * Performance Monitoring Service
 * Measures Web Vitals and custom metrics
 */

export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export const measurePerformance = (metricName) => {
  const start = performance.now();
  return {
    end: () => {
      const duration = performance.now() - start;
      // Send to analytics
      console.log(`[Performance] ${metricName}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  };
};
