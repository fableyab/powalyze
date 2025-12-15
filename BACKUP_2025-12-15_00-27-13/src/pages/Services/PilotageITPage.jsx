
import React from 'react';
import ServiceLayout from '@/components/Service/ServiceLayout';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';
import SEO from '@/components/SEO';

const PilotageITPage = () => {
  const { language } = useLanguage();
  // Fallback to 'fr' if current language content is missing in serviceContent
  const content = serviceContent[language]?.pilotageIT || serviceContent.fr.pilotageIT;

  const breadcrumbs = [
    { label: 'Services', path: '/services' },
    { label: 'Pilotage IT', path: null }
  ];

  return (
    <>
      <SEO 
        title="Pilotage IT & Gouvernance | Powalyze"
        description="Transformez votre DSI en partenaire stratégique. Audit, gouvernance et alignement business."
      />
      <ServiceLayout content={content} breadcrumbs={breadcrumbs} />
    </>
  );
};

export default PilotageITPage;
