import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const RoadmapVisualization = () => {
  const tiers = [
    {
      id: 1,
      title: "Tier 1: Démo Intégrée",
      status: "completed",
      features: ["Rapport dans workspace", "Embed sécurisé", "Cas d'usage client"],
      desc: "POC Rapide"
    },
    {
      id: 2,
      title: "Tier 2: Prototype",
      status: "current",
      features: ["App-owns-data", "Mini backend", "Tenant fictif RLS"],
      desc: "MVP Fonctionnel"
    },
    {
      id: 3,
      title: "Tier 3: Multi-tenant",
      status: "upcoming",
      features: ["Modèle logique", "Comptes clients", "Politiques RLS"],
      desc: "Scalabilité Logique"
    },
    {
      id: 4,
      title: "Tier 4: SaaS Industriel",
      status: "planned",
      features: ["Azure AD B2C", "PBI Embedded Capacity", "Production"],
      desc: "Commercialisation"
    }
  ];

  return (
    <div className="relative py-10">
       {/* Connecting Line */}
       <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block" />
       
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {tiers.map((tier, index) => (
             <motion.div 
               key={tier.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.2 }}
               className={`p-6 rounded-xl border-2 flex flex-col h-full bg-[#111] transition-all
                  ${tier.status === 'completed' ? 'border-green-500/50' : 
                    tier.status === 'current' ? 'border-[#BFA76A] shadow-[0_0_20px_rgba(191,167,106,0.15)]' : 
                    'border-white/10 opacity-60'}`}
             >
                <div className="mb-4">
                   {tier.status === 'completed' ? <CheckCircle className="text-green-500" size={24} /> :
                    tier.status === 'current' ? <div className="w-6 h-6 rounded-full border-4 border-[#BFA76A]" /> :
                    <Circle className="text-gray-500" size={24} />}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{tier.title}</h3>
                <span className="text-xs uppercase tracking-wider text-gray-500 mb-4 font-bold">{tier.desc}</span>
                
                <ul className="space-y-2 mt-auto">
                   {tier.features.map((f, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-white/20" /> {f}
                      </li>
                   ))}
                </ul>
             </motion.div>
          ))}
       </div>
    </div>
  );
};

export default RoadmapVisualization;