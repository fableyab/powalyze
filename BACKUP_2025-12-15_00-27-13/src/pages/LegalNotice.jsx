import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const LegalNotice = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbs = [
    { label: 'Legal', path: null },
    { label: t('legal.mentions.title'), path: null }
  ];

  return (
    <>
      <SEO 
        title={`${t('legal.mentions.title')} | Powalyze`}
        description="Informations légales, hébergement et propriété intellectuelle."
      />
      
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <Breadcrumbs items={breadcrumbs} className="mb-8" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 border-b border-[#BFA76A]/10 pb-8"
            >
              <h1 className="text-4xl font-display font-bold text-white mb-4">
                {t('legal.mentions.title')}
              </h1>
              <p className="text-gray-400">
                En vigueur au 01/12/2025
              </p>
            </motion.div>

            <div className="space-y-12 text-gray-300 leading-relaxed font-light">
              <section>
                <h2 className="text-2xl text-white font-bold mb-4">{t('legal.mentions.company')}</h2>
                <p className="mb-4">
                  Powalyze SA<br />
                  Société Anonyme de droit suisse<br />
                  Siège social : Genève, Suisse<br />
                  IDE : CHE-123.456.789<br />
                  Capital social : 100,000 CHF
                </p>
                <p>
                  Directeur de la publication : Fabrice Fays<br />
                  Contact : {t('footer.email')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl text-white font-bold mb-4">{t('legal.mentions.hosting')}</h2>
                <p>
                  Ce site est hébergé par Vercel Inc.<br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789<br />
                  USA
                </p>
              </section>

              <section>
                <h2 className="text-2xl text-white font-bold mb-4">{t('legal.mentions.ip')}</h2>
                <p>
                  L'ensemble de ce site relève de la législation suisse et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
              </section>

              <section>
                <h2 className="text-2xl text-white font-bold mb-4">{t('legal.mentions.liability')}</h2>
                <p>
                  Les informations fournies sur le site Powalyze le sont à titre informatif. 
                  Powalyze ne saurait garantir l'exactitude, la complétude, l'actualité des informations diffusées sur le site.
                </p>
              </section>
            </div>
          </div>
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default LegalNotice;