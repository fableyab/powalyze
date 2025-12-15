import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { slides } from '@/lib/pitchDeckData';
import Contact from '@/components/Contact';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const currentData = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <>
      <Helmet>
        <title>Powalyze — Pitch Deck</title>
        <meta name="description" content="Interactive Pitch Deck for Powalyze. Our vision, strategy, and value proposition." />
      </Helmet>

      <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden relative">
        {/* Top Navigation */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50 backdrop-blur-md z-50 fixed w-full top-0 left-0">
          <div className="flex items-center gap-4">
             <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium uppercase tracking-widest">
               <ArrowLeft size={16} /> Retour
             </Link>
          </div>
          <div className="text-brand-gold-premium font-display tracking-widest uppercase text-sm">
            Powalyze Pitch Deck
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
             Slide {currentSlide + 1} / {slides.length}
          </div>
        </header>

        {/* Main Slide Content */}
        <main className="flex-grow flex items-center justify-center relative pt-16 pb-20">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full max-w-5xl px-6 md:px-12 py-8 absolute"
            >
               {/* Slide Card */}
               <div className="bg-brand-card border border-brand-gold-light/10 p-8 md:p-16 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] min-h-[60vh] flex flex-col justify-center relative overflow-hidden">
                 
                 {/* Abstract Background Decor */}
                 <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-gold-premium/5 rounded-full blur-3xl" />
                 <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-ctaBlue/5 rounded-full blur-3xl" />

                 <div className="relative z-10">
                    <h3 className="text-brand-gold-premium font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-4 opacity-80">
                       {currentData.id < 10 ? `0${currentData.id}` : currentData.id} — {currentData.title}
                    </h3>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-8 leading-tight">
                      {currentData.subtitle}
                    </h1>
                    
                    <div className="w-20 h-1 bg-brand-gold-premium mb-10" />
                    
                    <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mb-6">
                      {currentData.content}
                    </p>
                    
                    <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl">
                      {currentData.details}
                    </p>

                    <div className="mt-12 inline-block border border-brand-gold-premium/30 px-6 py-3 rounded-full">
                       <span className="text-brand-gold-champagne text-sm uppercase tracking-widest font-bold">
                         {currentData.highlight}
                       </span>
                    </div>
                 </div>
               </div>

            </motion.div>
          </AnimatePresence>
          
          {/* If it's the last slide, show contact form below or overlay */}
          {isLastSlide && (
             <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center overflow-y-auto">
                <div className="w-full max-w-5xl py-20">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl text-brand-gold-premium font-display mb-4">Merci de votre attention</h2>
                    <Button onClick={() => setCurrentSlide(0)} variant="outline" className="mb-12 border-gray-700 text-gray-400 hover:text-white">Recommencer la présentation</Button>
                  </div>
                  <Contact />
                </div>
             </div>
          )}
        </main>

        {/* Controls */}
        <div className="fixed bottom-0 left-0 w-full p-6 flex items-center justify-between bg-gradient-to-t from-black to-transparent z-40 pointer-events-none">
           <Button 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              variant="ghost" 
              className="pointer-events-auto text-gray-400 hover:text-white hover:bg-white/5 rounded-full w-12 h-12 p-0 flex items-center justify-center"
           >
              <ChevronLeft size={32} strokeWidth={1} />
           </Button>

           <div className="flex gap-2 pointer-events-auto">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-brand-gold-premium' : 'w-2 bg-gray-700 hover:bg-gray-500'}`}
                />
              ))}
           </div>

           <Button 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1}
              variant="ghost" 
              className="pointer-events-auto text-brand-gold-premium hover:text-white hover:bg-brand-gold-premium/10 rounded-full w-12 h-12 p-0 flex items-center justify-center"
           >
              <ChevronRight size={32} strokeWidth={1} />
           </Button>
        </div>
      </div>
    </>
  );
};

export default PitchDeck;