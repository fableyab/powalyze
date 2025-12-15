
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Powalyze",
  "url": "https://powalyze.ch",
  "logo": "https://powalyze.ch/images/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/powalyze",
    "https://twitter.com/powalyze"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Genève, Lausanne, Valais, Canton de Vaud, Suisse Alémanique",
    "addressLocality": "Genève",
    "postalCode": "1204",
    "addressCountry": "CH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33(0) 6 15 76 70 67",
    "contactType": "customer service",
    "email": "contact@powalyze.ch",
    "areaServed": ["CH", "FR", "DE"],
    "availableLanguage": ["French", "English", "German"]
  }
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.label,
    "item": item.path ? `https://powalyze.ch${item.path}` : undefined
  }))
});

export const generateArticleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://powalyze.ch/blog/${article.slug}`
  },
  "headline": article.title,
  "image": [article.image],
  "datePublished": article.date,
  "dateModified": article.date,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Powalyze",
    "logo": {
      "@type": "ImageObject",
      "url": "https://powalyze.ch/images/logo.png"
    }
  },
  "description": article.excerpt
});

export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.title,
  "provider": {
    "@type": "Organization",
    "name": "Powalyze"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "description": service.description,
  "offers": {
    "@type": "Offer",
    "priceCurrency": "CHF",
    "price": "Call for price"
  }
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
