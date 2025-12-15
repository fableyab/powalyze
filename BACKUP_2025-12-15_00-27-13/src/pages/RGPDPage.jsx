
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, Lock, FileText, UserCheck, Server, Globe } from 'lucide-react';

const RGPDPage = () => {
  const { language } = useLanguage();
  
  // Basic translations for the shell, content is static for this example but structued for i18n
  const t = {
    title: "Politique de Confidentialité & RGPD",
    lastUpdate: "Dernière mise à jour : 15 Décembre 2025"
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans print:bg-white print:text-black">
      <SEO title="RGPD & Confidentialité | Powalyze" description="Politique de protection des données et conformité RGPD de Powalyze." />
      <div className="print:hidden"><Navbar /></div>

      <main className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
        <div className="print:hidden mb-8">
           <Breadcrumbs items={[{ label: 'Légal', path: null }, { label: 'RGPD', path: null }]} />
        </div>

        <div className="border-b border-white/10 pb-8 mb-12">
           <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{t.title}</h1>
           <p className="text-gray-400 font-mono text-sm">{t.lastUpdate}</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-[#BFA76A] prose-strong:text-white">
           
           <section className="mb-12">
              <h2 className="flex items-center gap-3"><Shield className="text-[#BFA76A]" /> 1. Introduction</h2>
              <p>
                 Powalyze SA ("nous", "notre") accorde une importance capitale à la protection de votre vie privée. Cette politique de confidentialité détaille la manière dont nous collectons, utilisons et protégeons vos données personnelles, conformément à la Loi fédérale sur la protection des données (LPD) en Suisse et au Règlement général sur la protection des données (RGPD) de l'Union Européenne.
              </p>
           </section>

           <section className="mb-12">
              <h2 className="flex items-center gap-3"><FileText className="text-[#BFA76A]" /> 2. Données Collectées</h2>
              <p>Nous collectons les types de données suivants :</p>
              <ul>
                 <li><strong>Données d'identité :</strong> Nom, prénom, fonction, entreprise.</li>
                 <li><strong>Données de contact :</strong> Adresse email professionnelle, numéro de téléphone.</li>
                 <li><strong>Données techniques :</strong> Adresse IP, logs de connexion, type de navigateur (via cookies).</li>
                 <li><strong>Données d'utilisation :</strong> Interactions avec notre plateforme, téléchargements de ressources.</li>
              </ul>
           </section>

           <section className="mb-12">
              <h2 className="flex items-center gap-3"><Lock className="text-[#BFA76A]" /> 3. Finalités et Base Légale</h2>
              <p>Vos données sont traitées pour les finalités suivantes :</p>
              <ul>
                 <li>Fourniture de nos services de conseil et accès à l'espace client (Exécution du contrat).</li>
                 <li>Envoi de newsletters et communications marketing (Consentement).</li>
                 <li>Amélioration de notre site web et sécurité (Intérêt légitime).</li>
                 <li>Conformité aux obligations légales (Obligation légale).</li>
              </ul>
           </section>

           <section className="mb-12">
              <h2 className="flex items-center gap-3"><Server className="text-[#BFA76A]" /> 4. Hébergement et Sécurité</h2>
              <p>
                 Toutes les données sensibles sont stockées sur des serveurs sécurisés situés en <strong>Suisse</strong> ou dans l'<strong>Union Européenne</strong>. 
                 Nous mettons en œuvre des mesures de sécurité techniques (chiffrement SSL/TLS, 2FA) et organisationnelles pour protéger vos données contre tout accès non autorisé.
              </p>
           </section>

           <section className="mb-12">
              <h2 className="flex items-center gap-3"><Globe className="text-[#BFA76A]" /> 5. Transferts Internationaux</h2>
              <p>
                 En cas de transfert de données hors de la Suisse ou de l'UE, nous nous assurons que le pays destinataire offre un niveau de protection adéquat ou que des clauses contractuelles types (CCT) sont mises en place.
              </p>
           </section>

           <section className="mb-12">
              <h2 className="flex items-center gap-3"><UserCheck className="text-[#BFA76A]" /> 6. Vos Droits</h2>
              <p>Vous disposez des droits suivants :</p>
              <ul>
                 <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données.</li>
                 <li><strong>Droit de rectification :</strong> Corriger des données inexactes.</li>
                 <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données ("Droit à l'oubli").</li>
                 <li><strong>Droit à la limitation :</strong> Geler l'utilisation de vos données.</li>
                 <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré.</li>
              </ul>
              <p>Pour exercer ces droits, contactez notre Délégué à la Protection des Données (DPO) à : <a href="mailto:privacy@powalyze.ch">privacy@powalyze.ch</a>.</p>
           </section>

        </div>
      </main>

      <div className="print:hidden"><FooterSection /></div>
    </div>
  );
};

export default RGPDPage;
