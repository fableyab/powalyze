import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Mail, Share2, Megaphone, Users, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TemplateCard = ({ icon: Icon, title, description, format }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 hover:border-[#BFA76A]/30 transition-all"
  >
    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-[#BFA76A] mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 mb-6 h-20">{description}</p>
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-xs text-gray-500 font-mono">{format}</span>
      <Button size="sm" variant="ghost" className="text-[#BFA76A] hover:text-[#D4AF37] hover:bg-transparent p-0">
        Télécharger <Download size={14} className="ml-2" />
      </Button>
    </div>
  </motion.div>
);

const MarketingPrep = () => {
  return (
    <div className="bg-[#050505] min-h-screen">
      <SEO 
        title="Marketing Preparation - Powalyze"
        description="Outils et templates pour votre stratégie marketing de lancement."
      />
      <Navbar />

      <div className="pt-32 pb-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            Marketing Kit
          </span>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-6">
            Préparation <span className="text-[#BFA76A]">Go-to-Market</span>
          </h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Ne laissez rien au hasard. Utilisez nos templates validés par l'industrie pour orchestrer votre communication de lancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <TemplateCard 
            icon={Share2}
            title="Calendrier Social Media"
            description="30 jours de contenu pré-planifié pour LinkedIn et Twitter. Structure, hooks et formats optimisés."
            format="Google Sheets / Excel"
          />
          <TemplateCard 
            icon={Mail}
            title="Séquence Email de Lancement"
            description="5 templates d'emails : Teasing, J-1, Annonce de Lancement, Follow-up et Offre Spéciale."
            format="DOCX / PDF"
          />
          <TemplateCard 
            icon={Megaphone}
            title="Kit Presse"
            description="Template de communiqué de presse officiel et dossier de présentation pour les médias."
            format="Pack ZIP"
          />
          <TemplateCard 
            icon={Users}
            title="Influencer Outreach"
            description="Scripts de contact pour les influenceurs B2B et liste de tracking des partenariats."
            format="Excel"
          />
          <TemplateCard 
            icon={FileText}
            title="Launch Announcement"
            description="Articles de blog pré-rédigés pour annoncer votre nouvelle plateforme."
            format="DOCX"
          />
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default MarketingPrep;