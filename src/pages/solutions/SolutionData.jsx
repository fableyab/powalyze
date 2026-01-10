
import React from 'react';
import { motion } from 'framer-motion';
import { Database, BarChart, Layers, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SolutionData = ({ language }) => {
  const { toast } = useToast();
  
  const content = {
    fr: {
      title: "Data & Power BI",
      subtitle: "Unifiez vos données dispersées.",
      desc: "Tableaux de bord sur-mesure, KPIs temps réel, analyses prédictives. Culture data-driven, décisions accélérées, opportunités révélées.",
      benefits: [
        { title: "Écosystème Unifié", desc: "Connectez SAP, Jira, Salesforce et Excel en une seule source de vérité.", icon: Database },
        { title: "Dashboards Intuitifs", desc: "Design UX premium pour une adoption immédiate par le COMEX.", icon: BarChart },
        { title: "Analyses Prédictives", desc: "Anticipez les tendances avant qu'elles ne deviennent des problèmes.", icon: Search },
        { title: "Visibilité Multi-niveaux", desc: "Du niveau portefeuille global jusqu'au ticket individuel.", icon: Layers }
      ]
    },
    en: {
      title: "Data & Power BI",
      subtitle: "Unify your scattered data.",
      desc: "Custom dashboards, real-time KPIs, predictive analytics. Data-driven culture, accelerated decisions, revealed opportunities.",
      benefits: [
        { title: "Unified Ecosystem", desc: "Connect SAP, Jira, Salesforce, and Excel into a single source of truth.", icon: Database },
        { title: "Intuitive Dashboards", desc: "Premium UX design for immediate executive adoption.", icon: BarChart },
        { title: "Predictive Analytics", desc: "Anticipate trends before they become problems.", icon: Search },
        { title: "Multi-level Visibility", desc: "From global portfolio level down to individual tickets.", icon: Layers }
      ]
    }
  }[language];

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[Cinzel]">{content.title}</motion.h1>
        <p className="text-2xl text-[#D4A574] font-light mb-8">{content.subtitle}</p>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">{content.desc}</p>
        <Button className="bg-[#1E3A8A] hover:bg-[#152744] text-white font-bold text-lg px-8 py-6 rounded-full">
          Live Demo
        </Button>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.benefits.map((b, i) => (
             <div key={i} className="bg-[#151515] p-6 rounded-xl border border-slate-800 hover:border-[#D4A574] transition-colors">
               <b.icon className="w-8 h-8 text-[#D4A574] mb-4" />
               <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
               <p className="text-slate-400 text-sm">{b.desc}</p>
             </div>
          ))}
        </div>
      </section>
      
      {/* Power BI Mockup */}
      <section className="py-20 px-4">
         <div className="container mx-auto max-w-5xl">
            <div className="bg-[#0F0F0F] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
               <div className="bg-[#1A1A1A] px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"/>
                  <div className="w-3 h-3 rounded-full bg-amber-500"/>
                  <div className="w-3 h-3 rounded-full bg-green-500"/>
                  <span className="ml-4 text-xs text-slate-500 font-mono">Financial_Overview_Q1_2026.pbix</span>
               </div>
               <div className="p-8 grid grid-cols-3 gap-6">
                  {/* Mock Charts */}
                  <div className="col-span-2 h-64 bg-slate-800/20 rounded-lg flex items-end justify-around p-4">
                      {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                          <div key={i} className="w-8 bg-[#D4A574] rounded-t-sm opacity-80" style={{height: `${h}%`}} />
                      ))}
                  </div>
                  <div className="col-span-1 h-64 bg-slate-800/20 rounded-lg flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-[#1E3A8A] border-t-[#D4A574]" />
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default SolutionData;
