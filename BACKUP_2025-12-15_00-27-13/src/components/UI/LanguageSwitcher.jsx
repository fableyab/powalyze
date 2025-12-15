import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    if (language === 'fr') changeLanguage('en');
    else if (language === 'en') changeLanguage('de');
    else changeLanguage('fr');
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
    >
      {language}
    </Button>
  );
};

export default LanguageSwitcher;