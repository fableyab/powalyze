
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';

const SEO = ({ title, description, path = "" }) => {
  const { language, t } = useLanguage();
  
  const siteTitle = title || t('meta.title');
  const siteDesc = description || t('meta.description');
  const baseUrl = "https://powalyze.ch";
  const currentUrl = `${baseUrl}/${language}${path}`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:locale" content={language === 'fr' ? 'fr_CH' : 'en_US'} />
      <meta property="og:site_name" content="Powalyze" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />

      {/* Multilingual / Canonical */}
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" href={`${baseUrl}/fr${path}`} hreflang="fr-CH" />
      <link rel="alternate" href={`${baseUrl}/en${path}`} hreflang="en-US" />
      <link rel="alternate" href={`${baseUrl}/fr${path}`} hreflang="x-default" />
    </Helmet>
  );
};

export default SEO;
