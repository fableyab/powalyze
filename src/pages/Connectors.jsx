
import React, { useState } from 'react';
import { 
  Database, Cloud, Server, Share2, RefreshCw, CheckCircle2, XCircle, 
  Settings, Link as LinkIcon, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Connectors = () => {
  // Full list as requested
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Salesforce', category: 'CRM', status: 'connected', lastSync: '5 mins ago', logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
    { id: 2, name: 'SAP S/4HANA', category: 'ERP', status: 'connected', lastSync: '1 hour ago', logo: 'https://cdn.worldvectorlogo.com/logos/sap-3.svg' },
    { id: 3, name: 'Microsoft Azure', category: 'Cloud', status: 'connected', lastSync: 'Real-time', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-azure-3.svg' },
    { id: 4, name: 'Google Workspace', category: 'Productivity', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/google-workspace-1.svg' },
    { id: 5, name: 'Slack', category: 'Communication', status: 'connected', lastSync: 'Real-time', logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
    { id: 6, name: 'Microsoft Teams', category: 'Communication', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-teams-1.svg' },
    { id: 7, name: 'Jira Software', category: 'Project Mgmt', status: 'connected', lastSync: '10 mins ago', logo: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg' },
    { id: 8, name: 'Asana', category: 'Project Mgmt', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/asana-1.svg' },
    { id: 9, name: 'Monday.com', category: 'Project Mgmt', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/monday-1.svg' },
    { id: 10, name: 'Tableau', category: 'BI', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg' },
    { id: 11, name: 'Looker', category: 'BI', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/looker-1.svg' },
    { id: 12, name: 'Snowflake', category: 'Data Warehouse', status: 'connected', lastSync: '2 hours ago', logo: 'https://cdn.worldvectorlogo.com/logos/snowflake-22.svg' },
    { id: 13, name: 'AWS', category: 'Cloud', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' },
    { id: 14, name: 'Google Cloud Platform', category: 'Cloud', status: 'disconnected', lastSync: '-', logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
  ]);

  return (
    <div className="bg-black text-white min-h-screen">
       <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-cinzel text-[#FFD700]">Connecteurs & Intégrations</h1>
            <p className="text-slate-400">Gérez vos flux de données et connexions API.</p>
          </div>
          <Button className="bg-[#4A9EFF] hover:bg-[#0052cc]">
             <Plus className="w-4 h-4 mr-2" /> Ajouter Connecteur
          </Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {integrations.map((item) => (
             <div key={item.id} className="bg-[#1A1A1A] rounded-xl border border-[#333] p-6 hover:border-[#4A9EFF] transition-all group">
                <div className="flex justify-between items-start mb-6">
                   <div className="w-12 h-12 bg-white rounded-lg p-2 flex items-center justify-center">
                      <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                   </div>
                   <Badge variant="outline" className={`
                      ${item.status === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}
                   `}>
                      {item.status === 'connected' ? 'Actif' : 'Inactif'}
                   </Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 mb-6">{item.category}</p>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                   <RefreshCw className={`w-3 h-3 ${item.status === 'connected' ? 'animate-spin' : ''}`} />
                   Last sync: {item.lastSync}
                </div>

                <div className="flex gap-2">
                   {item.status === 'connected' ? (
                      <>
                         <Button size="sm" variant="outline" className="flex-1 border-[#333] text-white hover:bg-[#252525]">
                            <Settings className="w-4 h-4" />
                         </Button>
                         <Button size="sm" variant="destructive" className="flex-1">
                            Déconnecter
                         </Button>
                      </>
                   ) : (
                      <Button size="sm" className="w-full bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
                         <LinkIcon className="w-4 h-4 mr-2" /> Connecter
                      </Button>
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default Connectors;
