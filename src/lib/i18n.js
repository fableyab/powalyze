import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations avec gestion d'erreurs
let frCommon, enCommon, deCommon, noCommon;

try {
  frCommon = require('@/locales/fr/common.json');
  enCommon = require('@/locales/en/common.json');
  deCommon = require('@/locales/de/common.json');
  noCommon = require('@/locales/no/common.json');
} catch (err) {
  console.error('❌ Erreur chargement traductions:', err);
  // Fallback minimal pour éviter le crash
  frCommon = { app: { title: 'Powalyze' } };
  enCommon = { app: { title: 'Powalyze' } };
  deCommon = { app: { title: 'Powalyze' } };
  noCommon = { app: { title: 'Powalyze' } };
}

const resources = {
  fr: { common: frCommon },
  en: { common: enCommon },
  de: { common: deCommon },
  no: { common: noCommon }
};

// ✅ INITIALISATION AVEC PROTECTION
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    lng: 'fr', // Force French par défaut au lieu de undefined
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'de', 'no'],
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    // Valeurs par défaut si traduction manquante
    returnNull: false,
    returnEmptyString: false,
    returnObjects: false,
    parseMissingKeyHandler: (key) => {
      if (import.meta.env.DEV) {
        console.warn(`⚠️ Traduction manquante: ${key}`);
      }
      return key;
    }
  })
  .catch((err) => {
    console.error('❌ Erreur critique i18n.init():', err);
  });

export default i18n;

