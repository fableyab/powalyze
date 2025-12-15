
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const TeamMember = ({ member, language }) => {
  const { name, title, bio, photo, socials, expertise } = member;

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-[#111] border border-white/10 rounded-xl overflow-hidden group transition-all duration-300 hover:border-[#BFA76A]/50"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={photo} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-[#BFA76A] text-sm font-medium uppercase tracking-wider">{title[language]}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-400 text-sm mb-6 leading-relaxed min-h-[60px]">
          {bio[language]}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {expertise.map((skill, index) => (
            <span key={index} className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/10">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4 border-t border-white/10 pt-4">
          {socials.linkedin && (
            <a href={socials.linkedin} className="text-gray-500 hover:text-[#0077b5] transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} className="text-gray-500 hover:text-[#1DA1F2] transition-colors">
              <Twitter size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
