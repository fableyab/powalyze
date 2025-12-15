import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Shield, Lock, Eye, FileText, Server, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  const breadcrumbs = [
    { label: 'Legal', path: null },
    { label: t('legal.privacy.title'), path: null }
  ];

  const sections = [
    {
      icon: Shield,
      title: "1. Introduction",
      content: "Powalyze (" + t('footer.company') + ") s'engage à protéger votre vie privée. Cette politique détaille nos pratiques de collecte, d'utilisation et de protection de vos données personnelles, en conformité avec la Loi fédérale sur la protection des données (LPD) et le Règlement général sur la protection des données (RGPD)."
    },
    {
      icon: Eye,
      title: "2. " + t('legal.privacy.collection.title'),
      content: t('legal.privacy.collection.text') + " Informations d'identité (nom, prénom), coordonnées (email, téléphone), données professionnelles (entreprise, poste), et données techniques (adresse IP, logs de connexion)."
    },
    {
      icon: FileText,
      title: "3. " + t('legal.privacy.usage.title'),
      content: t('legal.privacy.usage.text') + " Nous traitons vos données sur la base de l'exécution du contrat, de votre consentement, ou de notre intérêt légitime à améliorer nos services."
    },
    {
      icon: Server,
      title: "4. Partage et Transfert",
      content: "Vos données sont hébergées en Suisse ou dans l'UE. Nous ne vendons jamais vos données. Nous pouvons les partager avec des sous-traitants de confiance (hébergeurs, outils d'analyse) qui respectent des normes de sécurité strictes."
    },
    {
      icon: Lock,
      title: "5. Sécurité et Rétention",
      content: "Nous appliquons des mesures de sécurité techniques et organisationnelles avancées (chiffrement, contrôles d'accès). Nous conservons vos données aussi longtemps que nécessaire pour les finalités poursuivies ou pour respecter nos obligations légales."
    },
    {
      icon: UserCheck,
      title: "6. " + t('legal.privacy.rights.title'),
      content: t('legal.privacy.rights.text') + " Vous pouvez exercer ces droits en contactant notre DPO à l'adresse : privacy@powalyze.ch."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFA76A] selection:text-black">
      <SEO 
        title={`${t('legal.privacy.title')} | Powalyze`} 
        description="Politique de confidentialité et protection des données de Powalyze."
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Breadcrumbs items={breadcrumbs} className="mb-8" />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                {t('legal.privacy.title')}
              </h1>
              <p className="text-xl text-gray-400">
                {t('legal.privacy.intro')}
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#BFA76A]/30 transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-[#1A1A1A] rounded-lg text-[#BFA76A]">
                      <section.icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                      <p className="text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-[#BFA76A]/10 border border-[#BFA76A]/20 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-4">{t('legal.privacy.contact.title')}</h3>
              <p className="text-gray-300 mb-6">{t('legal.privacy.contact.text')}</p>
              <a href="mailto:privacy@powalyze.ch" className="inline-flex items-center justify-center px-6 py-3 bg-[#BFA76A] text-black font-bold rounded-lg hover:bg-white transition-colors">
                privacy@powalyze.ch
              </a>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;