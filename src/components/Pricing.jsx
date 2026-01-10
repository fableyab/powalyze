
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

const Pricing = () => {
  const { language } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(true);
  
  // Robust fallback to English if translation is missing for current language
  const content = translations[language]?.pricing || translations['en'].pricing;

  if (!content) return null; // Safety guard

  return (
    <section className="py-24 px-4 bg-[#000000] relative overflow-hidden">
      {/* Blue glow instead of Gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4A9EFF]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cinzel">{content.title}</h2>
          <p className="text-xl text-slate-400 mb-8">{content.subtitle}</p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>{content.monthly}</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-[#4A9EFF]" />
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-slate-500'}`}>{content.annual}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {content.tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${tier.popular ? 'border-[#FFD700] bg-[#1A1A1A]' : 'border-[#333] bg-black'} flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{tier.desc}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">
                  {tier.price !== 'Custom' && tier.price !== 'Sur Devis' && tier.price !== 'Nach Angebot' && tier.price !== 'Su Preventivo' && tier.price !== 'På forespørsel' ? 'CHF ' : ''}{tier.price}
                </span>
                {tier.price !== 'Custom' && tier.price !== 'Sur Devis' && tier.price !== 'Nach Angebot' && tier.price !== 'Su Preventivo' && tier.price !== 'På forespørsel' && (
                  <span className="text-slate-500 text-sm">/mo</span>
                )}
              </div>

              <Button className={`w-full mb-8 font-bold ${tier.popular ? 'bg-[#FFD700] hover:bg-[#E5C100] text-black' : 'bg-[#1A1A1A] border border-[#333] hover:bg-[#333] text-white'}`}>
                {tier.price.includes('Custom') || tier.price.includes('Devis') || tier.price.includes('Angebot') || tier.price.includes('Preventivo') || tier.price.includes('forespørsel') ? 'Contact Sales' : 'Start Trial'}
              </Button>

              <div className="space-y-4 flex-1">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[#4A9EFF] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
