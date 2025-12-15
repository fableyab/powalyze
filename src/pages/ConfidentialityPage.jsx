
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const ConfidentialityPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO title="Politique de Confidentialité | Powalyze" description="Engagements de confidentialité de Powalyze envers ses clients." />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Légal', path: null }, { label: 'Confidentialité', path: null }]} />

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Politique de Confidentialité</h1>
        
        <div className="space-y-10 text-gray-300 leading-relaxed">
           <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Engagement</h2>
              <p>Powalyze s'engage à maintenir la plus stricte confidentialité concernant les informations partagées par ses clients dans le cadre des missions de conseil. Nous signons systématiquement des accords de non-divulgation (NDA) avant tout début de mission.</p>
           </section>

           <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Données Sensibles</h2>
              <p>Nous traitons vos données stratégiques, financières et opérationnelles avec le plus haut niveau de sécurité. L'accès à ces données est strictement limité aux consultants directement impliqués dans la mission.</p>
           </section>

           <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Protection des Livrables</h2>
              <p>Tous les rapports, tableaux de bord et analyses produits pour le client restent sa propriété exclusive. Powalyze ne réutilise pas les données spécifiques d'un client pour d'autres missions.</p>
           </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default ConfidentialityPage;
