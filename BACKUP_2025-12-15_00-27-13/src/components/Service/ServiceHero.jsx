
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const ServiceHero = ({ title, subtitle, cta, breadcrumbs, backgroundImage }) => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#050505]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] via-[#050505] to-[#050505] z-0"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BFA76A]/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mt-8"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-10 max-w-2xl border-l-4 border-[#BFA76A] pl-6">
            {subtitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button className="bg-[#BFA76A] text-black hover:bg-white px-8 py-6 text-lg rounded-full font-bold shadow-[0_0_20px_rgba(191,167,106,0.2)]">
                {cta}
              </Button>
            </Link>
            <Link to="/contact">
               <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg rounded-full">
                  Contactez un expert
               </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;
