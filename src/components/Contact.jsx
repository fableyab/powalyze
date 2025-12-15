import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-brand-black border-t border-brand-gold-premium/20 relative overflow-hidden">
      {/* Fine Line Decor */}
      <div className="absolute left-0 top-1/2 w-full h-[1px] bg-brand-gold-premium/10" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-display text-brand-gold-premium mb-8 tracking-tight">
            Ready to Start?
          </h2>
          <p className="text-gray-400 text-lg font-light mb-12">
            Parlons de vos projets, de vos données et de votre futur.
          </p>
          
          <a 
            href="mailto:contact@powalyze.com" 
            className="inline-flex items-center gap-4 text-2xl md:text-3xl text-white border-b border-brand-gold-premium pb-2 hover:text-brand-gold-premium transition-colors duration-300"
          >
            <Mail className="w-6 h-6" />
            contact@powalyze.com
          </a>
          
          <div className="mt-20 opacity-40">
            <img 
              alt="Elegant fine gold line art" 
              className="w-full max-w-xs mx-auto h-auto"
             src="https://images.unsplash.com/photo-1636008266866-c8c8c3e00bb8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;