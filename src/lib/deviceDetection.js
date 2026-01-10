/**
 * Device detection utilities for Powalyze
 * Auto-redirect mobile/tablet users to optimized experiences
 */

export const getDeviceType = () => {
  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Check for mobile devices
  const isMobileUA = /iphone|ipod|android|blackberry|mini|windows ce|palm|mobile/i.test(userAgent);
  const isTabletUA = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
  
  // Viewport-based detection (more reliable)
  if (width < 768) {
    return 'mobile'; // < 768px = mobile
  } else if (width >= 768 && width < 1024) {
    return 'tablet'; // 768-1023px = tablet
  } else {
    return 'desktop'; // >= 1024px = desktop
  }
};

export const shouldRedirectToMobile = (currentPath) => {
  const deviceType = getDeviceType();
  
  // Already on mobile/tablet routes
  if (currentPath.startsWith('/mobile') || currentPath.startsWith('/tablet')) {
    return null;
  }
  
  // On public pages, don't redirect
  if (currentPath === '/' || 
      currentPath.startsWith('/login') || 
      currentPath.startsWith('/signup') ||
      currentPath.startsWith('/blog') ||
      currentPath.startsWith('/contact')) {
    return null;
  }
  
  // Redirect authenticated app routes
  if (currentPath.startsWith('/app')) {
    if (deviceType === 'mobile') {
      return '/mobile/cockpit';
    } else if (deviceType === 'tablet') {
      return '/tablet/cockpit';
    }
  }
  
  return null;
};

export const getOptimalRouteForDevice = () => {
  const deviceType = getDeviceType();
  
  if (deviceType === 'mobile') {
    return '/mobile/cockpit';
  } else if (deviceType === 'tablet') {
    return '/tablet/cockpit';
  } else {
    return '/app/dashboard';
  }
};
