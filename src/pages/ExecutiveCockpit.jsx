
import React, { useState } from 'react';
import { 
  TrendingUp, AlertTriangle, Target, Briefcase, Wallet, BrainCircuit, 
  Presentation, CheckCircle2, Clock, MoreHorizontal, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const ExecutiveCockpit = () => {
  const [activeView, setActiveView] = useState('heatmap'); // heatmap, list, grid

  const projects = [
    { name: 'Migration Cloud Azure', status: 'at-risk', budget: 120000, spend: 95000, progress: 65, owner: 'Marc Weber' },
    { name: 'Digital Sales V2', status: 'on-track', budget: 450000, spend: 120000, progress: 25, owner: 'Elena Rossi' },
    { name: 'Compliance GDPR', status: 'on-track', budget: 80000, spend: 75000, progress: 90, owner: 'Fabrice Fays' },
    { name: 'Marketing Automation', status: 'off-track', budget: 200000, spend: 180000, progress: 40, owner: 'Sarah Jenkins' },
    { name: 'ERP Upgrade Phase 1', status: 'on-track', budget: 900000, spend: 300000, progress: 33, owner: 'Marc Weber' },
    { name: 'Cybersecurity Audit', status: 'on-track', budget: 50000, spend: 10000, progress: 15, owner: 'External' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-track': return 'bg-emerald-500';
      case 'at-risk': return 'bg-[#FFD700]'; // Gold for warning
      case 'off-track': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="space-y-8 bg-black text-white p-2">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-cinzel text-[#FFD700]">Cockpit Exécutif</h1>
          <p className="text-slate-400">Vue stratégique globale • Q1 2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#333] text-white hover:bg-[#1A1A1A]">
            <Clock className="w-4 h-4 mr-2" /> Historique
          </Button>
          <Button className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white border-0">
            <Presentation className="w-4 h-4 mr-2" /> Mode Présentation
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Santé Portefeuille" value="82/100" trend="+4pts" color="emerald" icon={Target} />
        <KpiCard title="Budget Engagé" value="42%" trend="-5% vs Plan" color="blue" icon={Wallet} />
        <KpiCard title="Projets Critiques" value="2" trend="+1 New" color="red" icon={AlertTriangle} />
        <KpiCard title="Time-to-Market" value="4.5 mois" trend="-10%" color="gold" icon={TrendingUp} />
      </div>

      {/* Strategic Heatmap Redesigned */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#333] p-6 shadow-2xl">
         <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
               <Briefcase className="w-5 h-5 text-[#4A9EFF]" /> 
               Carte Stratégique des Projets
            </h3>
            <div className="flex gap-4 text-sm">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"/> On Track</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FFD700]"/> At Risk</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"/> Off Track</div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-black rounded-lg p-5 border border-[#333] hover:border-[#4A9EFF] transition-all group relative overflow-hidden">
                 {/* Progress Bar Background */}
                 <div className="absolute bottom-0 left-0 h-1 bg-[#333] w-full">
                    <div 
                      className={`h-full ${getStatusColor(project.status)}`} 
                      style={{ width: `${project.progress}%` }}
                    />
                 </div>

                 <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className={`${getStatusColor(project.status)} bg-opacity-10 text-white border-0`}>
                       {project.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-white"><MoreHorizontal className="w-4 h-4"/></Button>
                 </div>
                 
                 <h4 className="font-bold text-lg text-white mb-1 group-hover:text-[#4A9EFF] transition-colors">{project.name}</h4>
                 <p className="text-xs text-slate-500 mb-6">Owner: {project.owner}</p>

                 <div className="flex justify-between items-end">
                    <div>
                       <div className="text-xs text-slate-400">Budget Consommé</div>
                       <div className="text-sm font-mono text-white">
                          <span className={project.spend > project.budget * (project.progress/100) ? 'text-red-500' : 'text-emerald-500'}>
                             {Math.round((project.spend / project.budget) * 100)}%
                          </span>
                          <span className="text-slate-600 mx-1">/</span>
                          CHF {project.budget.toLocaleString()}
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs text-slate-400">Progression</div>
                       <div className="text-xl font-bold text-white">{project.progress}%</div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const KpiCard = ({ title, value, trend, color, icon: Icon }) => {
   const colors = {
      emerald: "text-emerald-500",
      blue: "text-[#4A9EFF]",
      red: "text-red-500",
      gold: "text-[#FFD700]"
   };
   
   return (
      <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333] hover:border-slate-600 transition-colors">
         <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg bg-black ${colors[color]}`}>
               <Icon className="w-6 h-6" />
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded bg-black ${colors[color]}`}>{trend}</span>
         </div>
         <div className="text-3xl font-bold text-white mb-1">{value}</div>
         <div className="text-sm text-slate-400">{title}</div>
      </div>
   );
};

export default ExecutiveCockpit;
