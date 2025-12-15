import ReactGA from 'react-ga4';
import { supabase } from '@/lib/supabaseClient';

// Initialize Google Analytics
export const initGA = () => {
  const TRACKING_ID = import.meta.env.VITE_GA_ID;
  if (!TRACKING_ID) return false;
  ReactGA.initialize(TRACKING_ID);
  return true;
};

// Track Page View
export const trackPageView = (path) => {
  try {
    ReactGA.send({ hitType: 'pageview', page: path });
  } catch (_) {}
};

// Track Custom Event
export const trackEvent = async (category, action, label = null, value = null) => {
  // GA Tracking
  try {
    ReactGA.event({ category, action, label, value });
  } catch (_) {}

  // Supabase Tracking (optional/fallback)
  const payload = {
    event_type: `${category}_${action}`,
    metadata: { label, value },
    url: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  try {
    if (supabase) {
      // Just a fire-and-forget, don't await blocking
      supabase.from('conversions').insert([payload]).then(() => {});
    }
  } catch (e) {
    // Ignore analytics errors
  }
};

// A/B Testing (Mock)
export const getVariant = (testId) => {
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  const key = `ab_test_${testId}`;
  let stored = sessionStorage.getItem(key);
  
  if (!stored) {
    sessionStorage.setItem(key, variant);
    stored = variant;
    trackEvent('AB_Test', 'Assignment', `${testId}_${stored}`);
  }
  
  return stored;
};

// Hotjar Init (Mock)
export const initHotjar = () => {
    // Hotjar script injection logic would go here
    console.log("Hotjar initialized");
};