
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import App from '@/App';
import '@/index.css';
import '@/lib/i18n'; // Import i18n configuration

// Force French as default language if none is set
if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'fr');
}
if (!localStorage.getItem('powalyze-locale')) {
  localStorage.setItem('powalyze-locale', 'fr');
}

// Capacitor plugins
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

// Configure Capacitor for mobile
const initCapacitor = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      // Configure status bar
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#000000' });
      
      // Hide splash screen after app loads
      await SplashScreen.hide();
    } catch (err) {
      console.error('Capacitor initialization error:', err);
    }
  }
};

initCapacitor();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>
);
