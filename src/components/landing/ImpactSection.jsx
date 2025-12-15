import React from 'react';
import { motion } from 'framer-motion';

const ImpactSection = () => {
  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-[#1C1C1C] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#BFA76A]/5 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.3em] mb-6 block">
            Notre Signature
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-light text-white mb-8 tracking-tight">
            Silence. Précision. Impact.
          </h2>
          <div className="w-24 h-1 bg-[#BFA76A] mx-auto mb-10"></div>
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            Nous n'ajoutons pas de bruit. Nous apportons la clarté. <br/>
            Dans un monde de complexité technique, <span className="text-white font-medium">Powalyze</span> est la force tranquille qui transforme le chaos en architecture pérenne.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;