
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { servicesData } from '@/data/servicesData';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { 
  ServiceHero, ServiceOverview, ServiceContext, 
  ServiceMethodology, ServiceBenefits, ServiceFAQ, ServiceCTA 
} from '@/components/Service/ServiceComponents';
import Breadcrumb from '@/components/Breadcrumb';

const ServicePageTemplate = ({ serviceId }) => {
  const { language } = useLanguage();
  const service = servicesData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) return <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">Service not found</div>;

  const t = (obj) => obj[language] || obj['fr']; // Helper for translation

  const breadcrumbs = [
    { label: language === 'fr' ? 'Services' : 'Services', path: '/services' },
    { label: t(service.title), path: null }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO 
        title={`${t(service.title)} | Powalyze`}
        description={t(service.subtitle)}
        image={service.heroImage}
      />
      <Navbar />

      <main>
        <div className="pt-24 px-6 container mx-auto">
           <Breadcrumb items={breadcrumbs} />
        </div>

        <ServiceHero 
          title={t(service.title)}
          subtitle={t(service.subtitle)}
          image={service.heroImage}
          cta={language === 'fr' ? 'Demander une consultation' : 'Request Consultation'}
        />

        <ServiceOverview 
          title={t(service.overview.title)}
          content={t(service.overview.content)}
          benefits={service.overview.benefits.map(b => t(b))}
        />

        <ServiceContext 
          title={t(service.context.title)}
          content={t(service.context.content)}
        />

        <ServiceMethodology 
          framework={service.methodology.framework}
          steps={service.methodology.steps.map(s => ({ title: t(s.title), desc: t(s.desc) }))}
        />

        <ServiceBenefits 
          list={service.benefitsSection.list.map(b => ({ title: t(b.title), value: b.value }))}
        />

        <ServiceFAQ />

        <ServiceCTA />
      </main>

      <FooterSection />
    </div>
  );
};

export default ServicePageTemplate;
