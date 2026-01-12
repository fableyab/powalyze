import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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

// FORCE FRENCH - NO LANGUAGE DETECTION
i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    lng: 'fr', // HARDCODED FRENCH
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'de', 'no'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

