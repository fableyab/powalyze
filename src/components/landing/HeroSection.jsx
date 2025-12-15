import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A]">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
         <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-60"
            src="https://assets.zyrosite.com/YrD4bMaM3ls0bZeJ/8348320-uhd_3840_2160_25fps-KIcWt84jQ0ju6ziH.mp4"
         />
         {/* Gradient Overlays for readability */}
         <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#BFA76A]/40 bg-black/50 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#BFA76A] animate-pulse shadow-[0_0_10px_#BFA76A]"></span>
            <span className="text-[#BFA76A] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">{t('homePmo.hero.tagline')}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-2xl">
            {t('homePmo.hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            {t('homePmo.hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services/pmo-strategique">
              <Button className="h-12 px-8 bg-[#BFA76A] text-black hover:bg-white text-base font-bold rounded-sm transition-all shadow-[0_0_30px_rgba(191,167,106,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
                {t('homePmo.hero.cta')} <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
               <Button variant="outline" className="h-12 px-8 border-white/30 text-white bg-white/5 hover:bg-white/20 backdrop-blur-sm text-base rounded-sm hover:border-white">
                 {t('common.contactUs')}
               </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#BFA76A] to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;