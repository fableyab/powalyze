
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO title="Conditions Générales | Powalyze" description="Conditions générales d'utilisation des services Powalyze." />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Légal', path: null }, { label: 'CGU', path: null }]} />

        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">Conditions Générales d'Utilisation</h1>
        <p className="text-gray-400 mb-12">En vigueur au 01/01/2025</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
           <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Objet</h2>
              <p>Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site web Powalyze.ch et des services associés. En accédant au site, vous acceptez sans réserve ces conditions.</p>
           </section>

           <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
              <p>Powalyze fournit des prestations de conseil en gestion de projet (PMO), analyse de données et gouvernance IT. Les détails spécifiques des missions sont définis dans des contrats de service séparés.</p>
           </section>

           <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Propriété Intellectuelle</h2>
              <p>Tous les éléments du site (textes, images, logos, code) sont la propriété exclusive de Powalyze SA ou de ses partenaires. Toute reproduction totale ou partielle est interdite sans autorisation écrite.</p>
           </section>

           <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Responsabilité</h2>
              <p>Powalyze s'efforce de fournir des informations exactes mais ne saurait être tenu responsable des erreurs ou omissions. L'utilisation des informations présentes sur le site se fait sous la seule responsabilité de l'utilisateur.</p>
           </section>

           <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Droit Applicable</h2>
              <p>Les présentes CGU sont soumises au droit suisse. Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux compétents du canton de Genève.</p>
           </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default TermsPage;
