import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import frCommon from '@/locales/fr/common.json';
import enCommon from '@/locales/en/common.json';
import deCommon from '@/locales/de/common.json';
import noCommon from '@/locales/no/common.json';

const resources = {
  fr: { common: frCommon },
  en: { common: enCommon },
  de: { common: deCommon },
  no: { common: noCommon }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    lng: 'fr',
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'de', 'no'],
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
