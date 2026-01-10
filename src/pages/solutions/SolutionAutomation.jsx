
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Repeat, ShieldCheck, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionAutomation = ({ language }) => {
  const content = {
    fr: {
      title: "Automation & IA",
      desc: "Automatisez les processus chronophages. Solutions intelligentes qui apprennent et s'adaptent.",
      benefits: [
        { title: "Automatisation Intelligente", desc: "Workflows auto-exécutables pour le reporting et la consolidation.", icon: Cpu },
        { title: "Optimisation Continue", desc: "L'IA apprend de vos projets passés pour affiner les estimations futures.", icon: TrendingUp },
        { title: "Réduction Erreurs", desc: "Éliminez les erreurs manuelles de saisie et de calcul.", icon: ShieldCheck },
        { title: "Scalabilité", desc: "Gérez 10 ou 1000 projets avec la même équipe PMO.", icon: Repeat }
      ]
    },
    en: {
      title: "Automation & AI",
      desc: "Automate time-consuming processes. Intelligent solutions that learn and adapt.",
      benefits: [
        { title: "Intelligent Automation", desc: "Self-executing workflows for reporting and consolidation.", icon: Cpu },
        { title: "Continuous Optimization", desc: "AI learns from past projects to refine future estimates.", icon: TrendingUp },
        { title: "Error Reduction", desc: "Eliminate manual entry and calculation errors.", icon: ShieldCheck },
        { title: "Scalability", desc: "Manage 10 or 1000 projects with the same PMO team.", icon: Repeat }
      ]
    }
  }[language];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[Cinzel]">{content.title}</motion.h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">{content.desc}</p>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-6 rounded-full">
          Explore AI Suite
        </Button>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          {content.benefits.map((b, i) => (
             <div key={i} className="bg-[#151515] p-8 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-colors">
               <div className="flex items-center gap-4 mb-4">
                   <div className="p-3 bg-emerald-900/20 rounded-lg text-emerald-500">
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

export default SolutionAutomation;
