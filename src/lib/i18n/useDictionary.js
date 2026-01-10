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
  const [locale, setLocaleState] = useState(
    () => localStorage.getItem('powalyze-locale') || defaultLocale
  );
  const [dict, setDict] = useState(() => dictionaries[locale] || dictionaries[defaultLocale]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newDict = dictionaries[locale] || dictionaries[defaultLocale];
    setDict(newDict);
  }, [locale]);

  const setLocale = (newLocale) => {
    localStorage.setItem('powalyze-locale', newLocale);
    setLocaleState(newLocale);
  };

  return { dict, locale, setLocale, loading };
}
