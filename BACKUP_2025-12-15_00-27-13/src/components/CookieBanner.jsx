import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { X, Cookie, Settings, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const CookieBanner = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true, preferences: true };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected = { essential: true, analytics: false, marketing: false, preferences: false };
    setPreferences(allRejected);
    saveConsent(allRejected);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowPreferences(false);
  };

  const saveConsent = (prefs) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setIsVisible(false);
    // Here you would trigger your analytics/marketing scripts based on prefs
    if (prefs.analytics) {
      console.log('Analytics cookies enabled');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
          >
            <div className="max-w-6xl mx-auto bg-[#111] border border-[#BFA76A]/30 rounded-xl shadow-2xl p-6 md:flex items-center justify-between gap-6">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#BFA76A]/10 rounded-full text-[#BFA76A]">
                    <Cookie size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t('cookies.banner.title')}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('cookies.banner.description')}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => setShowPreferences(true)} className="border-white/10 text-gray-300 hover:text-white">
                  <Settings size={14} className="mr-2" /> {t('cookies.banner.customize')}
                </Button>
                <Button variant="outline" onClick={handleRejectAll} className="border-white/10 text-gray-300 hover:text-white">
                  {t('cookies.banner.reject')}
                </Button>
                <Button onClick={handleAcceptAll} className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                  {t('cookies.banner.accept')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="bg-[#111] border border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Cookie className="text-[#BFA76A]" /> {t('cookies.banner.customize')}
            </DialogTitle>
            <DialogDescription>
              {t('cookies.banner.description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-white/5">
              <div>
                <h4 className="font-bold text-white flex items-center gap-2">
                  {t('cookies.banner.categories.essential.title')}
                  <span className="text-[10px] bg-[#BFA76A]/20 text-[#BFA76A] px-2 py-0.5 rounded uppercase">Required</span>
                </h4>
                <p className="text-sm text-gray-400 mt-1">{t('cookies.banner.categories.essential.desc')}</p>
              </div>
              <Switch checked={true} disabled />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-white/5">
              <div>
                <h4 className="font-bold text-white">{t('cookies.banner.categories.analytics.title')}</h4>
                <p className="text-sm text-gray-400 mt-1">{t('cookies.banner.categories.analytics.desc')}</p>
              </div>
              <Switch 
                checked={preferences.analytics} 
                onCheckedChange={(c) => setPreferences({...preferences, analytics: c})} 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] rounded-lg border border-white/5">
              <div>
                <h4 className="font-bold text-white">{t('cookies.banner.categories.marketing.title')}</h4>
                <p className="text-sm text-gray-400 mt-1">{t('cookies.banner.categories.marketing.desc')}</p>
              </div>
              <Switch 
                checked={preferences.marketing} 
                onCheckedChange={(c) => setPreferences({...preferences, marketing: c})} 
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowPreferences(false)} className="text-gray-400 hover:text-white">
              Cancel
            </Button>
            <Button onClick={handleSavePreferences} className="bg-[#BFA76A] text-black hover:bg-white">
              <Check size={16} className="mr-2" /> {t('cookies.banner.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;