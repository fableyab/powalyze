import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, Cloud, Globe, LayoutGrid, Server, Settings, RefreshCw, AlertTriangle, CheckCircle, Activity, Play, Upload } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const IntegrationCard = ({ source, onConfig }) => {
  const statusColors = {
     connected: "text-green-500 bg-green-500/10 border-green-500/20",
     syncing: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
     disconnected: "text-gray-500 bg-gray-500/10 border-gray-500/20",
     error: "text-red-500 bg-red-500/10 border-red-500/20"
  };

  const statusIcons = {
     connected: <CheckCircle size={14} />,
     syncing: <RefreshCw size={14} className="animate-spin" />,
     disconnected: <Activity size={14} />,
     error: <AlertTriangle size={14} />
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[#111] border border-white/5 p-6 rounded-xl hover:border-[#BFA76A]/30 transition-all group"
    >
       <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-[#BFA76A] group-hover:text-white group-hover:bg-[#BFA76A] transition-colors">
             {source.icon}
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold border ${statusColors[source.status]}`}>
             {statusIcons[source.status]}
             <span className="capitalize">{source.status}</span>
          </div>
       </div>

       <h3 className="text-xl font-bold text-white mb-2">{source.title}</h3>
       <div className="text-xs text-gray-500 mb-6 flex flex-col gap-1">
          <span>Last Sync: {source.lastSync}</span>
          <span>Status: <span className={source.status === 'error' ? 'text-red-500' : 'text-gray-300'}>{source.syncStatus}</span></span>
       </div>

       <Button 
         onClick={() => onConfig(source)}
         variant="outline" 
         className="w-full border-white/10 hover:bg-[#BFA76A] hover:text-black hover:border-transparent transition-all"
       >
         {source.isUpload ? <Upload size={16} className="mr-2"/> : <Settings size={16} className="mr-2"/>}
         {source.isUpload ? "Analyser" : "Configurer"}
       </Button>
    </motion.div>
  );
};

const DataIntegrationsSection = () => {
  const { t } = useLanguage();
  const [selectedSource, setSelectedSource] = useState(null);
  const [configOpen, setConfigOpen] = useState(false);

  const sources = [
    { 
       id: 'sql', icon: <Database size={24} />, title: "SQL Server", status: "connected", lastSync: "2m ago", syncStatus: "Success"
    },
    { 
       id: 'sharepoint', icon: <FileText size={24} />, title: "SharePoint", status: "connected", lastSync: "10m ago", syncStatus: "Success"
    },
    { 
       id: 'salesforce', icon: <Cloud size={24} />, title: "Salesforce", status: "syncing", lastSync: "Syncing...", syncStatus: "In Progress"
    },
    { 
       id: 'rest', icon: <Globe size={24} />, title: "REST API", status: "disconnected", lastSync: "-", syncStatus: "Not Connected"
    },
    { 
       id: 'excel', icon: <LayoutGrid size={24} />, title: "Excel / CSV", status: "connected", lastSync: "1h ago", syncStatus: "Success", isUpload: true
    },
    { 
       id: 'sap', icon: <Server size={24} />, title: "SAP ERP", status: "error", lastSync: "Failed", syncStatus: "Error: Connection timeout"
    }
  ];

  const handleConfig = (source) => {
     setSelectedSource(source);
     setConfigOpen(true);
  };

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {t('home.datasources.title')}
           </h2>
           <p className="text-gray-400">
              {t('home.datasources.subtitle')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {sources.map(s => (
              <IntegrationCard key={s.id} source={s} onConfig={handleConfig} />
           ))}
        </div>

        {/* Configuration Modal - Moved outside map loop for proper state control */}
        <Dialog open={configOpen} onOpenChange={setConfigOpen}>
           <DialogContent className="bg-[#111] border border-white/10 text-white sm:max-w-md">
              <DialogHeader>
                 <DialogTitle className="flex items-center gap-2">
                    {selectedSource?.icon} {selectedSource?.title} Configuration
                 </DialogTitle>
                 <DialogDescription>
                    Configure connection settings and sync frequency.
                 </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                 {selectedSource?.isUpload ? (
                    <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:bg-white/5 transition-colors cursor-pointer">
                       <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                       <p className="text-sm text-gray-400">Drag & drop your file here or click to browse</p>
                    </div>
                 ) : (
                    <>
                       <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-gray-500">Connection String / URL</label>
                          <input type="text" className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2 text-sm text-white focus:border-[#BFA76A] outline-none" placeholder="Enter connection details..." />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs uppercase font-bold text-gray-500">Sync Frequency</label>
                          <select className="w-full bg-[#0A0A0A] border border-white/10 rounded p-2 text-sm text-white focus:border-[#BFA76A] outline-none">
                             <option>Every 15 minutes</option>
                             <option>Hourly</option>
                             <option>Daily</option>
                          </select>
                       </div>
                    </>
                 )}
              </div>

              <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
                 <Button variant="ghost" onClick={() => setConfigOpen(false)} className="text-gray-400 hover:text-white">Cancel</Button>
                 <Button className="bg-[#BFA76A] text-black hover:bg-white" onClick={() => setConfigOpen(false)}>
                    {selectedSource?.isUpload ? "Upload & Analyze" : "Save & Test Connection"}
                 </Button>
              </div>
           </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DataIntegrationsSection;