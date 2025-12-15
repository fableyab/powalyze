import React from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { RefreshCw, CheckCircle, AlertCircle, Bot } from 'lucide-react';

const AutomatedReporting = () => {
  return (
    <div>
      <PageHeader 
        title="Reporting Automatisé" 
        subtitle="Flux de Données & IA"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Timeline Stream */}
        <Card className="lg:col-span-1 h-[600px] overflow-y-auto">
           <div className="flex items-center gap-3 mb-6">
             <RefreshCw className="animate-spin text-[#BFA76A]" size={20} />
             <h3 className="text-lg font-light text-white">Flux d'Activité</h3>
           </div>
           
           <div className="relative border-l border-[#333] ml-3 space-y-8 pb-4">
             {[
               { time: "10:42", msg: "Synchronisation JIRA terminée", status: "success" },
               { time: "10:30", msg: "Mise à jour KPI Financiers", status: "success" },
               { time: "09:15", msg: "Alerte: Donnée manquante SAP", status: "error" },
               { time: "08:00", msg: "Rapport Hebdo généré", status: "success" },
               { time: "Hier", msg: "Backup complet effectué", status: "neutral" },
             ].map((item, i) => (
               <div key={i} className="pl-6 relative">
                 <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
                   item.status === 'success' ? 'bg-green-500' : item.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                 }`} />
                 <p className="text-xs text-gray-500 mb-1">{item.time}</p>
                 <p className="text-sm text-gray-300">{item.msg}</p>
               </div>
             ))}
           </div>
        </Card>

        {/* Flux & AI Section */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* AI Alerts */}
           <Card className="bg-gradient-to-br from-[#1C1C1C] to-[#151515] border border-[#BFA76A]/20">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="text-[#BFA76A]" />
                <h3 className="text-lg font-medium text-white">Insights IA</h3>
              </div>
              <div className="p-4 bg-[#0A0A0A]/50 rounded border border-[#BFA76A]/10 mb-2">
                 <p className="text-gray-300 text-sm leading-relaxed">
                   <span className="text-[#BFA76A] font-bold">Analyse Prédictive :</span> 
                   Le projet "Alpha Web" présente une probabilité de retard de 85% due à la vélocité actuelle des développements backend. Recommandation : Augmenter la capacité de 2 ETP.
                 </p>
              </div>
           </Card>

           {/* Data Flux Diagram Visual */}
           <Card className="h-[400px] flex flex-col relative">
             <h3 className="text-lg font-light text-white mb-6">État des Flux de Données</h3>
             
             <div className="flex-1 flex items-center justify-between px-10 relative">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-20 right-20 h-1 bg-[#1C1C1C] -z-10"></div>
                
                {/* Nodes */}
                {['Sources', 'Ingestion', 'Data Lake', 'Power BI'].map((node, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 bg-[#1C1C1C] p-4 rounded-xl border border-gray-800 z-10 w-32">
                     <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                     <span className="text-sm font-medium text-white">{node}</span>
                     <span className="text-[10px] text-gray-500 uppercase tracking-wider">Actif</span>
                  </div>
                ))}
             </div>
             
             <div className="mt-auto flex gap-4">
                <div className="flex-1 p-3 bg-green-500/10 rounded border border-green-500/20 flex items-center justify-center gap-2">
                   <CheckCircle size={16} className="text-green-500" />
                   <span className="text-xs text-green-500 font-medium">Système Sain</span>
                </div>
                <div className="flex-1 p-3 bg-[#1C1C1C] rounded border border-gray-800 flex items-center justify-center gap-2">
                   <span className="text-xs text-gray-500">Latence: 45ms</span>
                </div>
             </div>
           </Card>
        </div>

      </div>
    </div>
  );
};

export default AutomatedReporting;