import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Shield, Server, Layout, Users } from 'lucide-react';

const FeatureList = ({ features }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'frontend': return <Layout size={18} />;
      case 'backend': return <Server size={18} />;
      case 'security': return <Shield size={18} />;
      case 'data': return <Database size={18} />;
      default: return <Code size={18} />;
    }
  };

  return (
    <div className="space-y-4">
      {features.map((feature, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-[#1A1A1A] p-4 rounded-lg border border-white/5 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-[#252525] flex items-center justify-center text-[#BFA76A] shrink-0">
            {getIcon(feature.type)}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{feature.title}</h4>
            <p className="text-gray-400 text-xs mt-1">{feature.desc}</p>
            <div className="flex gap-2 mt-2">
              {feature.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-black px-2 py-0.5 rounded text-gray-500 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeatureList;