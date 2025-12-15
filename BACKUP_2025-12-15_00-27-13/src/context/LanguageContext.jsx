
import React, { createContext, useState, useEffect } from 'react';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import { translations as legacyTranslations } from '@/lib/translations';

export const LanguageContext = createContext();

const locales = { fr, en, de };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check localStorage or browser language
    const stored = localStorage.getItem('powalyze_language');
    if (stored && locales[stored]) return stored;
    
    const browserLang = navigator.language.split('-')[0];
    return locales[browserLang] ? browserLang : 'fr';
  });

  useEffect(() => {
    localStorage.setItem('powalyze_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (lang) => {
    if (locales[lang]) {
      setLanguage(lang);
    }
  };

  const t = (key) => {
    // 1. Try new JSON structure
    const keys = key.split('.');
    let value = locales[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    if (value) return value;

    // 2. Fallback to Legacy Translations.js
    const legacyValue = legacyTranslations[language] ? legacyTranslations[language][key] : null;
    if (legacyValue) return legacyValue;

    // 3. Fallback key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
