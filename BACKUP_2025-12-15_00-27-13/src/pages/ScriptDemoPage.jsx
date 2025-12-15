import React from 'react';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import PowerQuerySection from '@/components/landing/PowerQuerySection';
import { useLanguage } from '@/context/LanguageContext';

const ScriptDemoPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO 
        title={t('scriptDemo.title')}
        description={t('scriptDemo.subtitle')}
      />
      <Navbar />
      <main className="pt-24">
        <PowerQuerySection />
      </main>
      <FooterSection />
    </div>
  );
};

export default ScriptDemoPage;