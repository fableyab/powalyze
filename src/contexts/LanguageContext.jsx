
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Compatibility wrapper for components still using the old useLanguage() hook.
 * This provides the same API as before but uses react-i18next internally.
 * 
 * @deprecated Use useTranslation() from 'react-i18next' directly instead.
 */
export const LanguageProvider = ({ children }) => {
  // Just pass through children - i18next provider is set up in main.jsx
  return children;
};

/**
 * Compatibility hook that wraps react-i18next's useTranslation.
 * Provides the same API as the old custom hook.
 * 
 * @deprecated Use useTranslation() from 'react-i18next' directly instead.
 */
export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  
  return {
    language: i18n.language,
    t,
    switchLanguage: (lang) => i18n.changeLanguage(lang)
  };
};
