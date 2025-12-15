
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { generateOrganizationSchema, generateBreadcrumbSchema } from '@/utils/structuredData';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website', 
  breadcrumbs = [],
  schema = null 
}) => {
  const { pathname } = useLocation();
  const context = useLanguage();
  const language = context?.language || 'fr';

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://powalyze.ch';
  const fullURL = `${siteUrl}${pathname}`;
  
  const defaultTitle = "Powalyze — L'art du pilotage stratégique";
  const defaultDescription = "Cabinet de conseil suisse spécialisé en pilotage stratégique, PMO et Business Intelligence. Nous transformons la complexité en clarté.";
  const defaultImage = `${siteUrl}/images/og-home.jpg`;

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;
  const metaKeywords = keywords || "PMO, Consulting, Suisse, Data, Power BI";

  // Base Structured Data
  const organizationSchema = generateOrganizationSchema();
  const breadcrumbSchema = breadcrumbs.length > 0 ? generateBreadcrumbSchema(breadcrumbs) : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={fullURL} />

      {/* Language Alternates */}
      <link rel="alternate" hreflang="fr" href={`${siteUrl}/fr${pathname}`} />
      <link rel="alternate" hreflang="en" href={`${siteUrl}/en${pathname}`} />
      <link rel="alternate" hreflang="de" href={`${siteUrl}/de${pathname}`} />
      <link rel="alternate" hreflang="x-default" href={`${siteUrl}${pathname}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullURL} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:locale" content={language} />
      <meta property="og:site_name" content="Powalyze" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullURL} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
