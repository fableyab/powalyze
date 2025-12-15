
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = ({ title, subtitle, ctaPrimary, ctaSecondary, bgImage, overlayOpacity = 0.6, size = 'large' }) => {
  const isCompact = size === 'compact';
  const titleClass = isCompact ? 'text-3xl md:text-5xl' : 'text-5xl md:text-7xl';
  const subtitleClass = isCompact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl';
  const minHeight = isCompact ? 'min-h-[50vh]' : 'min-h-[80vh]';

  return (
    <section className={`relative ${minHeight} flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A]`}>
      {/* Background */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1 className={`${titleClass} font-display font-bold text-white leading-tight mb-4 drop-shadow-xl`}>
            {title}
          </h1>
          
          <p className={`${subtitleClass} text-gray-200 mb-8 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md`}>
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {ctaPrimary && (
              <Link to={ctaPrimary.link}>
                <Button className="h-14 px-8 bg-[#BFA76A] text-black hover:bg-white text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-[#BFA76A]/20">
                  {ctaPrimary.text} <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            )}
            {ctaSecondary && (
              <Link to={ctaSecondary.link}>
                <Button variant="outline" className="h-14 px-8 border-white/30 text-white hover:bg-white/10 text-lg rounded-full backdrop-blur-sm">
                  {ctaSecondary.text}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
