
import React, { useState } from 'react';
import { pmoSolutionData } from '@/data/pmoSolutionData';
import { useLanguage } from '@/context/LanguageContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const PMOTestimonials = () => {
  const { language } = useLanguage();
  const testimonials = pmoSolutionData.testimonials;
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute top-0 left-0 text-[#BFA76A]/10 transform -translate-x-1/2 -translate-y-1/2">
        <Quote size={120} />
      </div>

      <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-[#BFA76A] fill-[#BFA76A]" />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-white font-light italic mb-8 leading-relaxed">
              "{testimonials[current].quote[language]}"
            </p>
            
            <div>
              <h4 className="font-bold text-white text-lg">{testimonials[current].name}</h4>
              <p className="text-[#BFA76A] text-sm">{testimonials[current].role} @ {testimonials[current].company}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="icon" onClick={prev} className="rounded-full border-white/10 hover:bg-white/10 hover:text-[#BFA76A]">
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" size="icon" onClick={next} className="rounded-full border-white/10 hover:bg-white/10 hover:text-[#BFA76A]">
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PMOTestimonials;
