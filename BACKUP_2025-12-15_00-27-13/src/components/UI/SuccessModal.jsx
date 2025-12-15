import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Calendar, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessModal = ({ isOpen, onClose, translations, details, email }) => {
  
  // Auto-close effect
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5 seconds auto-close
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0E0E0E] border border-[#BFA76A] rounded-xl shadow-[0_0_50px_-10px_rgba(191,167,106,0.3)] p-6 md:p-8 overflow-hidden"
          >
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#BFA76A] blur-[20px]" />

            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#BFA76A]/10 flex items-center justify-center mb-6 border border-[#BFA76A]/20">
                <CheckCircle2 className="w-8 h-8 text-[#BFA76A]" />
              </div>

              <h2 className="text-2xl font-display font-medium text-white mb-2">
                {translations.title}
              </h2>
              <p className="text-[#BFA76A] font-medium text-lg mb-6">
                {translations.message}
              </p>

              {/* Confirmation Details Card */}
              <div className="w-full bg-white/5 rounded-lg p-4 border border-white/10 mb-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-2"><Hash size={14}/> {translations.confirmation}</span>
                  <span className="text-white font-mono text-xs md:text-sm">{details.confirmationNumber}</span>
                </div>
                {details.details?.date && (
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-gray-400 flex items-center gap-2"><Calendar size={14}/> Date</span>
                     <span className="text-white">{details.details.date}</span>
                  </div>
                )}
                {details.details?.time && (
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-gray-400 flex items-center gap-2"><Clock size={14}/> Time</span>
                     <span className="text-white">{details.details.time}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-400 text-sm mb-6">
                {translations.checkEmail} <br/>
                <span className="text-white">{email}</span>
              </p>

              <Button 
                onClick={onClose}
                variant="outline"
                className="w-full border-[#BFA76A]/30 text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black transition-colors"
              >
                {translations.close}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;