
import React from 'react';
import { motion } from 'framer-motion';

const ValueProposition = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-[#111] p-6 rounded-xl border border-white/10 hover:border-[#BFA76A]/50 transition-all group"
    >
      <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-[#BFA76A] mb-4 group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ValueProposition;
