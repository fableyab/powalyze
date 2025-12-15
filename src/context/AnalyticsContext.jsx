import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '@/services/analytics/analyticsService';
import { useAuth } from '@/context/AuthContext';

const AnalyticsContext = createContext(null);

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Auto-track page views
  useEffect(() => {
    analyticsService.pageView(location.pathname, {
      search: location.search
    }, user);
  }, [location, user]);

  const trackEvent = (eventName, props = {}) => {
    analyticsService.event(eventName, props, user);
  };

  const trackError = (errorName, message) => {
    analyticsService.error(errorName, message, user);
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackError }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};