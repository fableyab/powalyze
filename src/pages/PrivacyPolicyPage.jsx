import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          <div className="space-y-6 text-gray-300">
             <section>
                <h2 className="text-xl font-bold text-white mb-2">1. Collecte des Données</h2>
                <p>Nous collectons les informations que vous nous fournissez lors de l'inscription et des demandes de consultation (Nom, Email, Téléphone, Entreprise).</p>
             </section>
             <section>
                <h2 className="text-xl font-bold text-white mb-2">2. Utilisation des Données</h2>
                <p>Vos données sont utilisées uniquement pour vous fournir nos services et communiquer avec vous. Elles ne sont jamais vendues à des tiers.</p>
             </section>
             <section>
                <h2 className="text-xl font-bold text-white mb-2">3. Sécurité</h2>
                <p>Nous utilisons des protocoles de sécurité avancés pour protéger vos informations.</p>
             </section>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default PrivacyPolicyPage;