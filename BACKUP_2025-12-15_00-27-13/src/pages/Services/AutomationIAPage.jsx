
import React from 'react';
import ServiceLayout from '@/components/Service/ServiceLayout';
import { useLanguage } from '@/context/LanguageContext';
import { serviceContent } from '@/lib/serviceContent';
import SEO from '@/components/SEO';

const AutomationIAPage = () => {
  const { language } = useLanguage();
  const content = serviceContent[language]?.automationIA || serviceContent.fr.automationIA;

  const breadcrumbs = [
    { label: 'Services', path: '/services' },
    { label: 'Automatisation & IA', path: null }
  ];

  return (
    <>
      <SEO 
        title="Automatisation & IA | Powalyze"
        description="Optimisez vos processus métiers grâce au RPA et à l'Intelligence Artificielle."
      />
      <ServiceLayout content={content} breadcrumbs={breadcrumbs} />
    </>
  );
};

export default AutomationIAPage;
