
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CaseStudy = ({ study, language }) => {
  const { title, industry, challenge, solution, results, metrics, image, id } = study;

  return (
    <motion.div 
      className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full hover:border-[#BFA76A]/30 transition-colors"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title[language]} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/60 group-hover:bg-[#0A0A0A]/40 transition-colors"></div>
        <div className="absolute top-4 left-4 bg-[#BFA76A] text-black text-xs font-bold px-3 py-1 rounded uppercase tracking-wider flex items-center gap-2">
          <Building2 size={12} /> {industry}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#BFA76A] transition-colors">
          {title[language]}
        </h3>
        
        <div className="space-y-4 mb-6 flex-1">
          <div>
            <span className="text-xs text-gray-500 uppercase font-bold">Challenge</span>
            <p className="text-sm text-gray-300 mt-1">{challenge[language]}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase font-bold">Solution</span>
            <p className="text-sm text-gray-300 mt-1">{solution[language]}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {metrics.map((m, i) => (
            <span key={i} className="text-xs font-bold text-[#BFA76A] bg-[#BFA76A]/10 px-2 py-1 rounded">
              {m}
            </span>
          ))}
        </div>

        <Link 
          to={`/portfolio/case-study-${id}`} 
          className="inline-flex items-center text-sm font-bold text-white hover:text-[#BFA76A] transition-colors mt-auto"
        >
          Lire l'étude de cas <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CaseStudy;
