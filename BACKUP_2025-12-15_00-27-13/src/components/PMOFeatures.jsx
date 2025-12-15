
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { pmoSolutionData } from '@/data/pmoSolutionData';

const PMOFeatures = () => {
  const { language } = useLanguage();
  const features = pmoSolutionData.features;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#111] border border-white/10 p-6 rounded-xl hover:border-[#BFA76A]/50 transition-all duration-300 group hover:bg-[#161616]"
        >
          <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-[#BFA76A] mb-4 group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
            <feature.icon size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{feature.title[language]}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{feature.desc[language]}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default PMOFeatures;
