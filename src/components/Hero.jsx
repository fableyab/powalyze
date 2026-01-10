
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      overline: 'Excellence Suisse',
      title: 'Excellence en pilotage stratégique',
      subtitle: 'Transformez vos données en décisions. Optimisez la performance.',
      cta1: 'Découvrir',
      cta2: 'Nous contacter'
    },
    en: {
      overline: 'Swiss Excellence',
      title: 'Strategic steering excellence',
      subtitle: 'Transform data into decisions. Optimize performance.',
      cta1: 'Discover',
      cta2: 'Contact us'
    },
    de: {
      overline: 'Schweizer Exzellenz',
      title: 'Exzellenz in der strategischen Steuerung',
      subtitle: 'Verwandeln Sie Daten in Entscheidungen. Optimieren Sie die Leistung.',
      cta1: 'Entdecken',
      cta2: 'Kontaktiere uns'
    },
    it: {
      overline: 'Eccellenza Svizzera',
      title: 'Eccellenza nel pilotaggio strategico',
      subtitle: 'Trasforma i dati in decisioni. Ottimizza le prestazioni.',
      cta1: 'Scoprire',
      cta2: 'Contattaci'
    },
    no: {
      overline: 'Sveitsisk fortreffelighet',
      title: 'Strategisk styring i verdensklasse',
      subtitle: 'Gjør data om til beslutninger. Optimaliser ytelsen.',
      cta1: 'Oppdag',
      cta2: 'Kontakt oss'
    }
  };

  const t = translations[language] || translations.fr;

  return (
    <section className='relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4'>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-60"
        >
            <source src="/videos/demo-governance-ia.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className='container mx-auto max-w-6xl relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center space-y-8'
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='inline-block'
          >
            <span className='text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 rounded-full backdrop-blur-sm'>
              {t.overline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight font-[Cinzel]'
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{t.title.split(' ')[0]}</span>
            <br />
            {t.title.split(' ').slice(1).join(' ')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='text-xl md:text-2xl text-slate-200 font-light max-w-3xl mx-auto drop-shadow-lg'
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='flex flex-col sm:flex-row gap-6 justify-center items-center pt-8'
          >
            <Button
              size='lg'
              className='bg-[#4A9EFF] hover:bg-[#0052cc] text-white font-bold text-lg px-8 py-7 rounded-none transition-all hover:scale-105 shadow-lg shadow-blue-900/50'
            >
              <span className="flex items-center gap-2">
                {t.cta1} <ArrowRight className='w-5 h-5' />
              </span>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black text-lg px-8 py-7 rounded-none transition-all hover:scale-105 backdrop-blur-sm'
            >
              <span>
                {t.cta2}
              </span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className='absolute bottom-[-100px] left-1/2 -translate-x-1/2 text-center'
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className='w-8 h-8 text-[#D4AF37] mx-auto opacity-50' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
