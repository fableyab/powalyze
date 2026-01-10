
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CookieBanner = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const translations = {
    fr: {
      message: 'Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.',
      accept: 'Accepter',
      decline: 'Refuser'
    },
    en: {
      message: 'We use cookies to improve your experience. By continuing, you accept our privacy policy.',
      accept: 'Accept',
      decline: 'Decline'
    }
  };

  const t = translations[language];

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50'
        >
          <div className='bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl'>
            <div className='flex items-start gap-4 mb-4'>
              <div className='w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shrink-0'>
                <Cookie className='w-5 h-5 text-white' />
              </div>
              <div className='flex-1'>
                <p className='text-sm text-slate-300 leading-relaxed'>{t.message}</p>
              </div>
            </div>
            <div className='flex gap-3'>
              <Button
                onClick={handleAccept}
                className='flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white'
              >
                {t.accept}
              </Button>
              <Button
                onClick={handleDecline}
                variant='outline'
                className='flex-1 border-slate-600 text-slate-300 hover:bg-slate-700'
              >
                {t.decline}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
