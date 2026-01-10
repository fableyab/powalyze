
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileText, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionGovernance = ({ language }) => {
  const content = {
    fr: {
      title: "Gouvernance IT",
      desc: "Gouvernance souple qui protège sans rigidifier. Conformité, gestion des risques, innovation.",
      benefits: [
        { title: "Gouvernance Agile", desc: "Cadres adaptatifs qui s'ajustent à la taille et au risque du projet.", icon: Briefcase },
        { title: "Conformité FINMA", desc: "Traçabilité complète et audit logs prêts pour les régulateurs.", icon: Shield },
        { title: "Gestion Risques", desc: "Matrices de risques dynamiques et plans d'atténuation suivis.", icon: Lock },
        { title: "Partenariat IT-Business", desc: "Langage commun et objectifs partagés entre DSI et Métiers.", icon: FileText }
      ]
    },
    en: {
      title: "IT Governance",
      desc: "Flexible governance that protects without rigidifying. Compliance, risk management, innovation.",
      benefits: [
        { title: "Agile Governance", desc: "Adaptive frameworks that adjust to project size and risk.", icon: Briefcase },
        { title: "FINMA Compliance", desc: "Full traceability and audit logs ready for regulators.", icon: Shield },
        { title: "Risk Management", desc: "Dynamic risk matrices and tracked mitigation plans.", icon: Lock },
        { title: "IT-Business Partnership", desc: "Common language and shared objectives between IT and Business.", icon: FileText }
      ]
    }
  }[language];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[Cinzel]">{content.title}</motion.h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">{content.desc}</p>
        <Button className="bg-[#D4A574] hover:bg-[#B58554] text-black font-bold text-lg px-8 py-6 rounded-full">
           Start Compliance Check
        </Button>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {content.benefits.map((b, i) => (
             <div key={i} className="bg-[#151515] p-8 rounded-xl border border-slate-800 hover:border-[#D4A574]/50 transition-colors">
               <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-[#D4A574]/10 rounded-lg text-[#D4A574]">
                       <b.icon className="w-6 h-6" />
                   </div>
                   <h3 className="text-2xl font-bold text-white">{b.title}</h3>
               </div>
               <p className="text-slate-400">{b.desc}</p>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SolutionGovernance;
