import { useState, useEffect } from 'react';
import { defaultLocale } from './config';
import enDict from './dictionaries/en.json';
import frDict from './dictionaries/fr.json';
import deDict from './dictionaries/de.json';
import noDict from './dictionaries/no.json';

const dictionaries = {
  en: enDict,
  fr: frDict,
  de: deDict,
  no: noDict
};

export function useDictionary() {
  // FORCE FRENCH BY DEFAULT - NO DETECTION
  const [locale, setLocaleState] = useState(() => {
    const stored = localStorage.getItem('powalyze-locale');
    // Si pas de locale stockée, forcer français
    if (!stored) {
      localStorage.setItem('powalyze-locale', 'fr');
      return 'fr';
    }
    return stored;
  });
  
  const [dict, setDict] = useState(() => dictionaries[locale] || dictionaries.fr);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newDict = dictionaries[locale] || dictionaries.fr;
    setDict(newDict);
  }, [locale]);

  const setLocale = (newLocale) => {
    localStorage.setItem('powalyze-locale', newLocale);
    setLocaleState(newLocale);
  };

  return { dict, locale, setLocale, loading };
}
