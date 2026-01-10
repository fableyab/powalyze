
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

/**
 * ⭐ Premium Language Switcher - Swiss-grade design
 * Version minimaliste, élégante, orientée SaaS premium
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'fr';

  const languages = [
    { code: 'fr', name: 'Français', label: 'FR' },
    { code: 'en', name: 'English', label: 'EN' },
    { code: 'de', name: 'Deutsch', label: 'DE' },
    { code: 'no', name: 'Norsk', label: 'NO' },
  ];

  const currentLang = languages.find(l => l.code === currentLanguage) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1.5 px-3 py-1.5 h-auto text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 rounded-md border border-white/10 hover:border-white/20"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            {currentLang.label}
          </span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-[#000000]/95 backdrop-blur-xl border-white/10 shadow-2xl min-w-[140px] p-1"
      >
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)}
            className={`
              cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-150
              ${currentLanguage === lang.code 
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' 
                : 'text-white/70 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <span className="flex items-center justify-between w-full">
              <span className="text-xs font-medium tracking-wide uppercase">{lang.label}</span>
              <span className="text-xs opacity-60 ml-2">{lang.name}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;

