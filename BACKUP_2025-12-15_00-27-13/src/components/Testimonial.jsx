
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonial = ({ data, language }) => {
  const { quote, author, role, company, rating } = data;

  return (
    <div className="bg-[#111] border border-white/10 p-8 rounded-xl relative">
      <Quote className="absolute top-6 right-6 text-[#BFA76A]/20 w-8 h-8" />
      
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < rating ? 'text-[#BFA76A] fill-[#BFA76A]' : 'text-gray-700'}`} 
          />
        ))}
      </div>

      <p className="text-gray-300 italic mb-6 leading-relaxed">
        "{quote[language]}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#222] rounded-full flex items-center justify-center text-[#BFA76A] font-bold">
          {author.charAt(0)}
        </div>
        <div>
          <div className="text-white font-bold text-sm">{author}</div>
          <div className="text-gray-500 text-xs">{role} @ {company}</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
