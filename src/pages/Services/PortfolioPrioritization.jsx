
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PortfolioPrioritization = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-5xl font-display font-bold mb-6 text-white">Portefeuilles & Priorisation</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl">
          Maximisez la valeur de votre portefeuille projet grâce à des méthodes de priorisation basées sur la donnée.
        </p>
        <Link to="/contact">
          <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold px-8">
            {t('home.hero.cta')}
          </Button>
        </Link>
      </div>
      <FooterSection />
    </div>
  );
};

export default PortfolioPrioritization;
