
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, desc, link }) => {
  return (
    <Link to={link} className="group h-full block">
      <div className="bg-[#111] rounded-xl border border-white/10 p-8 h-full flex flex-col hover:border-[#BFA76A]/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
           <Icon size={100} />
        </div>
        
        <div className="w-14 h-14 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-[#BFA76A] mb-6 border border-white/5 shadow-lg group-hover:bg-[#BFA76A] group-hover:text-black transition-colors relative z-10">
           <Icon size={28} />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#BFA76A] transition-colors relative z-10">
           {title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow relative z-10">
           {desc}
        </p>
        
        <div className="flex items-center text-[#BFA76A] font-bold text-xs uppercase tracking-wider gap-2 relative z-10">
           Découvrir <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
