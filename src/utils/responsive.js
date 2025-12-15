
import { useState, useEffect } from 'react';

// Breakpoints consistent with Tailwind default config
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
  largeDesktop: 1536,
};

export const QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet + 1}px)`,
};

/**
 * Hook to detect if screen matches a specific query
 * @param {string} query - CSS media query string
 * @returns {boolean} matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

/**
 * Hook to get current device type
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export const useDeviceType = () => {
  const isMobile = useMediaQuery(QUERIES.mobile);
  const isTablet = useMediaQuery(QUERIES.tablet);

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
};

export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};
