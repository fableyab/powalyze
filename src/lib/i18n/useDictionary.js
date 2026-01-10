import { useState, useEffect } from 'react';
import { defaultLocale } from './config';

export function useDictionary() {
  const [locale, setLocaleState] = useState(
    () => localStorage.getItem('powalyze-locale') || defaultLocale
  );
  const [dict, setDict] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDictionary() {
      setLoading(true);
      try {
        const dictionary = await import(`./dictionaries/${locale}.json`);
        setDict(dictionary.default);
      } catch (error) {
        console.error(`Failed to load dictionary for ${locale}`, error);
        const fallback = await import(`./dictionaries/${defaultLocale}.json`);
        setDict(fallback.default);
      } finally {
        setLoading(false);
      }
    }
    loadDictionary();
  }, [locale]);

  const setLocale = (newLocale) => {
    localStorage.setItem('powalyze-locale', newLocale);
    setLocaleState(newLocale);
  };

  return { dict, locale, setLocale, loading };
}
