import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
          <div className="space-y-6 text-gray-300">
             <section>
                <h2 className="text-xl font-bold text-white mb-2">1. Introduction</h2>
                <p>Bienvenue sur Powalyze. En utilisant nos services, vous acceptez les présentes conditions.</p>
             </section>
             <section>
                <h2 className="text-xl font-bold text-white mb-2">2. Services</h2>
                <p>Powalyze fournit des services de conseil en PMO et Data Analytics. Les résultats dépendent de la collaboration du client.</p>
             </section>
             <section>
                <h2 className="text-xl font-bold text-white mb-2">3. Propriété Intellectuelle</h2>
                <p>Tout le contenu de ce site est la propriété exclusive de Powalyze SA.</p>
             </section>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default TermsAndConditionsPage;