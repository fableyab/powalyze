import React from 'react';
import Navbar from '@/components/landing/Navbar';
import ContactSection from '@/components/landing/ContactSection';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Infrastructure = () => {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <Link to="/#realisations" className="inline-flex items-center text-[#BFA76A] mb-8 hover:underline">
          <ArrowLeft size={16} className="mr-2" /> Retour aux réalisations
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
          Déploiement multi-sites <br/><span className="text-[#3A7BFF]">d'infrastructures critiques</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-12">
          <span className="px-3 py-1 border border-[#BFA76A] text-[#BFA76A] text-xs uppercase tracking-widest rounded">Infrastructures</span>
          <span className="px-3 py-1 border border-[#333] text-gray-400 text-xs uppercase tracking-widest rounded">50+ Sites</span>
          <span className="px-3 py-1 border border-[#333] text-gray-400 text-xs uppercase tracking-widest rounded">Critique</span>
        </div>

        <div className="prose prose-invert max-w-none mb-16">
          <h3 className="text-2xl font-medium text-white mb-4">Le Contexte</h3>
          <p className="text-[#C8C8C8] leading-relaxed mb-8">
            Dans un contexte réglementaire durci, cette banque de détail devait mettre à niveau ses infrastructures réseau et sécurité sur plus de 50 sites régionaux sans impacter la continuité de service client.
          </p>

          <h3 className="text-2xl font-medium text-white mb-4">La Solution Powalyze</h3>
          <ul className="space-y-4 mb-8">
            {[
              "Ordonnancement logistique précis à la minute près pour les interventions week-end.",
              "Mise en place d'une 'War Room' virtuelle pilotée par nos consultants.",
              "Automatisation des tests de validation post-déploiement.",
              "Reporting exécutif temps réel pour le COMEX sur l'état d'avancement site par site."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#C8C8C8]">
                <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 border-y border-[#333] py-8">
            <div className="text-center">
              <div className="text-4xl font-light text-white mb-2">50+</div>
              <div className="text-xs uppercase text-gray-500">Sites Migrés</div>
            </div>
            <div className="text-center border-l border-[#333]">
              <div className="text-4xl font-light text-white mb-2">100%</div>
              <div className="text-xs uppercase text-gray-500">Conformité</div>
            </div>
            <div className="text-center border-l border-[#333]">
              <div className="text-4xl font-light text-white mb-2">99.9%</div>
              <div className="text-xs uppercase text-gray-500">Disponibilité</div>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default Infrastructure;