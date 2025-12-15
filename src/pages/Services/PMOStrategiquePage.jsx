
import React from 'react';
import ServiceLayout from '@/components/Service/ServiceLayout';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';
import SEO from '@/components/SEO';

const PMOStrategiquePage = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.pmoStrategique || serviceContent.fr.pmoStrategique;

  const breadcrumbs = [
    { label: 'Services', path: '/services' },
    { label: 'PMO Stratégique', path: null }
  ];

  return (
    <>
      <SEO 
        title="PMO Stratégique | Powalyze"
        description="Structurez votre gestion de portefeuille projets. Méthodologie, outils et performance."
      />
      <ServiceLayout content={content} breadcrumbs={breadcrumbs} />
    </>
  );
};

export default PMOStrategiquePage;
