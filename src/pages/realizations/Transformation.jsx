import React from 'react';
import Navbar from '@/components/landing/Navbar';
import ContactSection from '@/components/landing/ContactSection';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Transformation = () => {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <Link to="/#realisations" className="inline-flex items-center text-[#BFA76A] mb-8 hover:underline">
          <ArrowLeft size={16} className="mr-2" /> Retour aux réalisations
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
          Pilotage d'un programme de <span className="text-[#3A7BFF]">transformation digitale</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-12">
          <span className="px-3 py-1 border border-[#BFA76A] text-[#BFA76A] text-xs uppercase tracking-widest rounded">Industrie</span>
          <span className="px-3 py-1 border border-[#333] text-gray-400 text-xs uppercase tracking-widest rounded">12 Pays</span>
          <span className="px-3 py-1 border border-[#333] text-gray-400 text-xs uppercase tracking-widest rounded">18 Mois</span>
        </div>

        <div className="prose prose-invert max-w-none mb-16">
          <h3 className="text-2xl font-medium text-white mb-4">Le Défi</h3>
          <p className="text-[#C8C8C8] leading-relaxed mb-8">
            Suite à une acquisition majeure, notre client, un leader industriel européen, devait unifier ses systèmes d'information et ses processus opérationnels à travers 12 pays. Le défi principal résidait dans la gestion de la résistance au changement et l'alignement des calendriers techniques disparates.
          </p>

          <h3 className="text-2xl font-medium text-white mb-4">Notre Approche</h3>
          <ul className="space-y-4 mb-8">
            {[
              "Mise en place d'une gouvernance centralisée avec des relais locaux.",
              "Création d'un Master Plan unique intégrant les contraintes légales de chaque pays.",
              "Déploiement d'outils de pilotage Power BI pour suivre l'avancement en temps réel.",
              "Programme d'accompagnement au changement pour 2500 collaborateurs."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#C8C8C8]">
                <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 border-y border-[#333] py-8">
            <div className="text-center">
              <div className="text-4xl font-light text-white mb-2">-15%</div>
              <div className="text-xs uppercase text-gray-500">Coûts Opérationnels</div>
            </div>
            <div className="text-center border-l border-[#333]">
              <div className="text-4xl font-light text-white mb-2">100%</div>
              <div className="text-xs uppercase text-gray-500">Adoption SI</div>
            </div>
            <div className="text-center border-l border-[#333]">
              <div className="text-4xl font-light text-white mb-2">0</div>
              <div className="text-xs uppercase text-gray-500">Rupture de Service</div>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default Transformation;