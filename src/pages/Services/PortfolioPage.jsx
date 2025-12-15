
import React from 'react';
import ServiceLayout from '@/components/Service/ServiceLayout';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';
import SEO from '@/components/SEO';

const PortfolioPage = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.portfolio || serviceContent.fr.portfolio;

  const breadcrumbs = [
    { label: 'Services', path: '/services' },
    { label: 'Portefeuilles & Priorisation', path: null }
  ];

  return (
    <>
      <SEO 
        title="Gestion de Portefeuille & Priorisation | Powalyze"
        description="Arbitrez et priorisez vos investissements projets pour maximiser la valeur."
      />
      <ServiceLayout content={content} breadcrumbs={breadcrumbs} />
    </>
  );
};

export default PortfolioPage;
