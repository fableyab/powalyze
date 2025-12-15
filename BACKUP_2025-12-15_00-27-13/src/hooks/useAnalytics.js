import React from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';

export const useAnalyticsHook = () => {
  return useAnalytics();
};

export const useTrackOnMount = (eventName, props = {}) => {
  const { trackEvent } = useAnalytics();
  
  React.useEffect(() => {
    trackEvent(eventName, props);
  }, []);
};