
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import App from '@/App';
import '@/index.css';

// Error boundary global
window.addEventListener('error', (event) => {
  console.error('🔴 ERREUR GLOBALE:', event.error);
  document.body.style.backgroundColor = '#000';
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    root.innerHTML = `
      <div style="min-height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #ef4444; font-family: system-ui; padding: 20px; text-align: center;">
        <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 16px;">Erreur de chargement</h1>
        <p style="color: #94a3b8; margin-bottom: 8px;">${event.error?.message || 'Erreur inconnue'}</p>
        <button onclick="location.reload()" style="margin-top: 24px; padding: 12px 24px; background: #D4AF37; color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Recharger la page</button>
      </div>
    `;
  }
});

// Ensure FR as default language before i18n initialization
const ensureDefaultLanguage = () => {
  try {
    // localStorage flags used by i18next and app
    if (!localStorage.getItem('i18nextLng')) {
      localStorage.setItem('i18nextLng', 'fr');
    }
    if (!localStorage.getItem('powalyze-locale')) {
      localStorage.setItem('powalyze-locale', 'fr');
    }

    // Minimal cookie helper
    const getCookie = (name) =>
      document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith(name + '='));

    // Align cookie used by i18next detector
    if (!getCookie('lang')) {
      const oneYear = 60 * 60 * 24 * 365;
      document.cookie = `lang=fr; Max-Age=${oneYear}; Path=/; SameSite=Lax`;
    }
  } catch (err) {
    console.warn('Lang init: storage/cookie non disponible:', err);
  }
};

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

// Bootstrap application ensuring language defaults before i18n init
(async () => {
  try {
    ensureDefaultLanguage();
    // Dynamically import i18n AFTER language defaults are in place
    await import('@/lib/i18n');

    const root = document.getElementById('root');
    if (!root) {
      throw new Error('Element #root introuvable dans le DOM');
    }

    console.log('✅ Montage de React...');
    ReactDOM.createRoot(root).render(
      <>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </>
    );
    console.log('✅ React monté avec succès');
  } catch (err) {
    console.error('🔴 ERREUR CRITIQUE lors du montage de React:', err);
    document.body.innerHTML = `
      <div style="min-height: 100vh; background: #000; display: flex; align-items: center; justify-content: center; flex-direction: column; color: #ef4444; font-family: system-ui; padding: 20px; text-align: center;">
        <h1 style="color: #D4AF37; font-size: 24px; margin-bottom: 16px;">Erreur critique</h1>
        <p style="color: #94a3b8; margin-bottom: 8px;">${'message' in err ? err.message : String(err)}</p>
        <pre style="color: #64748b; font-size: 12px; margin-top: 16px; text-align: left; max-width: 600px; overflow: auto;">${err?.stack || ''}</pre>
        <button onclick="location.reload()" style="margin-top: 24px; padding: 12px 24px; background: #D4AF37; color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Recharger la page</button>
      </div>
    `;
  }
})();
