import React from 'react';
import { motion } from 'framer-motion';

const TargetAudience = () => {
  const segments = [
    "Directeurs de Programme",
    "DSI / CIOs",
    "Chefs de Projet Senior",
    "Comités de Direction",
    "Investisseurs & Auditeurs"
  ];

  return (
    <section className="py-32 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="order-2 md:order-1 flex justify-center"
          >
             <div className="w-full max-w-md aspect-square rounded-full overflow-hidden border border-brand-gold-premium/20 relative">
               <img 
                 alt="Golden circular abstract art representing unity and scope" 
                 className="w-full h-full object-cover opacity-80"
                src="https://images.unsplash.com/photo-1560804632-7aa1925eaedd" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-display text-white mb-12">
              Pour Qui ?
            </h2>
            
            <div className="space-y-6">
              {segments.map((segment, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-6 group cursor-default"
                >
                  <div className="w-12 h-[1px] bg-gray-700 group-hover:bg-brand-gold-premium transition-colors duration-500" />
                  <span className="text-2xl text-gray-400 font-light group-hover:text-white transition-colors duration-300">
                    {segment}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;