
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const TableOfContents = () => {
  const { t } = useLanguage();
  // In a real app, this would parse the content or accept headings as props
  // For demo structure, we'll assume standard sections or mock them based on the article content structure
  // Here we mock a static structure that matches the long form articles
  
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 sticky top-32">
      <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
        {t('blog.toc', 'Sommaire')}
      </h4>
      <nav className="space-y-2">
        <a href="#intro" className="block text-sm text-gray-400 hover:text-[#BFA76A] transition-colors pl-0">
          Introduction
        </a>
        <a href="#section-1" className="block text-sm text-gray-400 hover:text-[#BFA76A] transition-colors pl-0">
          1. Contexte & Enjeux
        </a>
        <a href="#section-2" className="block text-sm text-gray-400 hover:text-[#BFA76A] transition-colors pl-0">
          2. Méthodologie
        </a>
        <a href="#section-3" className="block text-sm text-gray-400 hover:text-[#BFA76A] transition-colors pl-4 border-l border-white/10 hover:border-[#BFA76A]">
          3.1. Analyse
        </a>
        <a href="#section-4" className="block text-sm text-gray-400 hover:text-[#BFA76A] transition-colors pl-4 border-l border-white/10 hover:border-[#BFA76A]">
          3.2. Implémentation
        </a>
        <a href="#conclusion" className="block text-sm text-gray-400 hover:text-[#BFA76A] transition-colors pl-0">
          Conclusion
        </a>
      </nav>
    </div>
  );
};

export default TableOfContents;
