
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const FAQ = () => {
  const { language } = useLanguage();
  // Robust fallback: Try current language, fallback to English
  const content = translations[language]?.faq || translations['en'].faq;

  // Safety check to prevent crashes if items are missing
  if (!content || !content.items) return null;

  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-white mb-12 text-center font-cinzel">{content.title}</h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {content.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-[#333] rounded-lg px-6 bg-[#1A1A1A] data-[state=open]:border-[#4A9EFF] transition-colors">
              <AccordionTrigger className="text-white hover:text-[#4A9EFF] hover:no-underline text-left py-6 font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 pb-6 leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
