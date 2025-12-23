import { useState, useEffect } from 'react';

/**
 * Hook pour détecter le breakpoint actuel et fournir des helpers responsive
 */
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoints = {
    xs: windowSize.width >= 375,
    sm: windowSize.width >= 640,
    md: windowSize.width >= 768,
    lg: windowSize.width >= 1024,
    xl: windowSize.width >= 1280,
    '2xl': windowSize.width >= 1536,
  };

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

  return {
    width: windowSize.width,
    height: windowSize.height,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    deviceType,
  };
}

export default useResponsive;
