import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '@/lib/analytics';

const AnalyticsListener = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize once on mount; safe if already initialized
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsListener;
