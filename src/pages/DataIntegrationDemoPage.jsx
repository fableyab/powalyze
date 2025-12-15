
import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Database, FileSpreadsheet, Cloud, Globe, Server, 
  Settings, Activity, RefreshCw, AlertTriangle, CheckCircle, 
  Play, Lock, Zap, ArrowRight, ShieldCheck, ChevronRight,
  TrendingUp, Users, BarChart3, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import SEO from '@/components/SEO';

// Initial Demo Data
const initialIntegrations = [
  { 
    id: 'sql', 
    name: 'SQL Server', 
    type: 'Database',
    icon: Database, 
    status: 'connected', 
    lastSync: '2m ago', 
    message: 'Success',
    color: 'text-blue-500',
    gradient: 'from-blue-500/20 to-transparent',
    borderColor: 'group-hover:border-blue-500/50'
  },
  { 
    id: 'sharepoint', 
    name: 'SharePoint', 
    type: 'Document Store',
    icon: FileSpreadsheet, 
    status: 'connected', 
    lastSync: '10m ago', 
    message: 'Success',
    color: 'text-emerald-500',
    gradient: 'from-emerald-500/20 to-transparent',
    borderColor: 'group-hover:border-emerald-500/50'
  },
  { 
    id: 'salesforce', 
    name: 'Salesforce', 
    type: 'CRM',
    icon: Cloud, 
    status: 'syncing', 
    lastSync: 'Syncing...', 
    message: 'In Progress',
    color: 'text-orange-500',
    gradient: 'from-orange-500/20 to-transparent',
    borderColor: 'group-hover:border-orange-500/50'
  },
  { 
    id: 'rest', 
    name: 'REST API', 
    type: 'Custom API',
    icon: Globe, 
    status: 'disconnected', 
    lastSync: '-', 
    message: 'Not Connected',
    color: 'text-gray-500',
    gradient: 'from-gray-500/20 to-transparent',
    borderColor: 'group-hover:border-gray-500/50'
  },
  { 
    id: 'excel', 
    name: 'Excel / CSV', 
    type: 'File Upload',
    icon: FileSpreadsheet, 
    status: 'connected', 
    lastSync: '1h ago', 
    message: 'Success',
    action: 'Analyser',
    color: 'text-teal-500',
    gradient: 'from-teal-500/20 to-transparent',
    borderColor: 'group-hover:border-teal-500/50'
  },
  { 
    id: 'sap', 
    name: 'SAP ERP', 
    type: 'ERP System',
    icon: Server, 
    status: 'error', 
    lastSync: 'Failed', 
    message: 'Error: Connection timeout',
    color: 'text-red-500',
    gradient: 'from-red-500/20 to-transparent',
    borderColor: 'group-hover:border-red-500/50'
  }
];

const StatusBadge = ({ status }) => {
  const styles = {
    connected: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    syncing: "bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
    disconnected: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
  };

  const icons = {
    connected: <CheckCircle size={12} className="mr-1.5" />,
    syncing: <RefreshCw size={12} className="mr-1.5 animate-spin" />,
    disconnected: <Activity size={12} className="mr-1.5" />,
    error: <AlertTriangle size={12} className="mr-1.5" />
  };

  return (
    <div className={`flex items-center px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest transition-colors duration-300 ${styles[status]}`}>
      {icons[status]}
      {status}
    </div>
  );
};

const DataIntegrationDemoPage = () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('idle'); // idle, analyzing, complete
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAction = (integration) => {
    setSelectedIntegration(integration);
    if (integration.action === 'Analyser') {
      setAnalysisStep('idle');
      setIsAnalysisOpen(true);
    } else {
      setIsConfigOpen(true);
    }
  };

  const handleSaveConfig = () => {
    toast({
      title: t('toast.configurationSaved', 'Configuration Saved'),
      description: `Connection parameters for ${selectedIntegration.name} updated.`,
      className: "bg-[#111] border-white/10 text-white"
    });
    
    // Update status to syncing then connected
    setIntegrations(prev => prev.map(i => 
      i.id === selectedIntegration.id 
        ? { ...i, status: 'syncing', lastSync: 'Just now', message: 'Verifying credentials...' } 
        : i
    ));

    setTimeout(() => {
      setIntegrations(prev => prev.map(i => 
        i.id === selectedIntegration.id 
          ? { ...i, status: 'connected', message: 'Success' } 
          : i
      ));
      toast({
        title: t('toast.connectionEstablished', 'Connection Established'),
        description: `Successfully connected to ${selectedIntegration.name}.`,
        className: "bg-green-900 border-green-800 text-white"
      });
    }, 2000);

    setIsConfigOpen(false);
  };

  const handleRunAnalysis = () => {
    setAnalysisStep('analyzing');
    setTimeout(() => {
      setAnalysisStep('complete');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFA76A] selection:text-black">
      <SEO title="Intégration de Données | Powalyze" description="Démo interactive des connecteurs de données Powalyze." />
      <Navbar />

      <main className="pt-32 pb-20 relative">
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#BFA76A]/5 to-transparent pointer-events-none"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA76A]/10 text-[#BFA76A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#BFA76A]/20">
                <Zap size={14} /> Live Integration Environment
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                Intégration de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BFA76A] to-[#E3D5A5]">Données</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl font-light">
                Connectez vos écosystèmes en quelques clics. Centralisez, analysez et agissez sur vos données critiques en temps réel avec notre plateforme unifiée.
              </p>
              
              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <CheckCircle size={16} className="text-emerald-500" />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Actifs</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-500">
                    {integrations.filter(i => i.status === 'connected').length}/6
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <BarChart3 size={16} className="text-blue-500" />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Données</span>
                  </div>
                  <div className="text-2xl font-bold text-white">2.8M</div>
                  <div className="text-xs text-gray-500 mt-1">lignes traitées</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-[#BFA76A]/10">
                      <TrendingUp size={16} className="text-[#BFA76A]" />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Uptime</span>
                  </div>
                  <div className="text-2xl font-bold text-[#BFA76A]">99.98%</div>
                  <div className="text-xs text-gray-500 mt-1">ce mois</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Clock size={16} className="text-purple-500" />
                    </div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Latence</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-500">127ms</div>
                  <div className="text-xs text-gray-500 mt-1">moyenne</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-4 bg-[#111]/80 backdrop-blur-md p-2 pr-6 rounded-full border border-white/10 shadow-2xl"
            >
              <div className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${isDemoMode ? 'bg-[#BFA76A] text-black shadow-lg shadow-[#BFA76A]/20' : 'text-gray-500'}`}>
                Demo Mode
              </div>
              <Switch 
                checked={!isDemoMode}
                onCheckedChange={(checked) => setIsDemoMode(!checked)}
                className="data-[state=checked]:bg-[#3A7BFF] data-[state=unchecked]:bg-[#333]"
              />
              <div className={`text-xs font-bold transition-all duration-300 ${!isDemoMode ? 'text-[#3A7BFF]' : 'text-gray-500'}`}>
                Real Data
              </div>
            </motion.div>
          </div>

          {!isDemoMode && (
             <motion.div 
               initial={{ opacity: 0, height: 0, y: -20 }} 
               animate={{ opacity: 1, height: 'auto', y: 0 }}
               className="mb-12 bg-[#1e293b]/40 border border-blue-500/20 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 backdrop-blur-sm"
             >
                <div className="bg-blue-500/20 p-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                   <Lock size={24} className="text-blue-400" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white mb-1">Mode Production Verrouillé</h3>
                   <p className="text-sm text-blue-200/70 max-w-2xl">
                     L'accès aux connecteurs de production nécessite une authentification forte et des permissions administratives. Veuillez vous connecter pour accéder à vos données réelles.
                   </p>
                </div>
                <Button className="ml-auto bg-blue-600 hover:bg-blue-500 text-white border-none shadow-lg shadow-blue-500/20 px-6">
                   {t('dataIntegration.secureLogin', 'Connexion Sécurisée')}
                </Button>
             </motion.div>
          )}

          {/* Key Features Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-[#BFA76A]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#BFA76A]/10 flex items-center justify-center mb-4">
                <Database size={24} className="text-[#BFA76A]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Connexion Instantanée</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Connectez-vous à plus de 100+ sources de données en quelques clics. Configuration simplifiée avec détection automatique.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <RefreshCw size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Synchronisation Temps Réel</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Vos données sont toujours à jour grâce à notre système de synchronisation bidirectionnelle en temps réel.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#111] to-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sécurité Renforcée</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Chiffrement de bout en bout, authentification multi-facteurs et conformité RGPD garantis.
              </p>
            </div>
          </motion.div>

          {/* Integration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-[#BFA76A]/30 transition-all duration-500 overflow-hidden ${!isDemoMode ? 'opacity-40 pointer-events-none grayscale' : ''} shadow-lg hover:shadow-2xl`}
                >
                  {/* Subtle Gradient Background */}
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${integration.gradient} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[#1A1A1A] border border-white/5 group-hover:scale-110 transition-transform duration-500 ${integration.color} shadow-inner`}>
                      <integration.icon size={28} strokeWidth={1.5} />
                    </div>
                    <StatusBadge status={integration.status} />
                  </div>

                  <div className="mb-8 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#BFA76A] transition-colors">{integration.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">{integration.type}</p>
                  </div>

                  <div className="space-y-3 mb-8 bg-[#050505]/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-500 flex items-center gap-2 text-xs font-medium uppercase tracking-wide"><Activity size={10}/> Last Sync</span>
                      <span className="text-gray-300 font-mono text-xs">{integration.lastSync}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-500 flex items-center gap-2 text-xs font-medium uppercase tracking-wide"><ShieldCheck size={10}/> Status</span>
                      <span className={`font-medium text-xs ${integration.status === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                        {integration.message}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleAction(integration)}
                    className="w-full bg-white/5 hover:bg-[#BFA76A] hover:text-black text-white border border-white/10 hover:border-transparent transition-all font-bold uppercase tracking-widest text-xs h-12 rounded-lg"
                  >
                    {integration.action === 'Analyser' ? (
                       <><Activity size={14} className="mr-2" /> Analyser</>
                    ) : (
                       <><Settings size={14} className="mr-2" /> Configurer</>
                    )}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Live Activity Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Activité en Temps Réel</h2>
                <p className="text-sm text-gray-400">Flux de synchronisation des dernières 24 heures</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                LIVE
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-3">
              {[
                { time: 'Il y a 2 min', source: 'SQL Server', action: 'Synchronisation réussie', records: '1,247 lignes', status: 'success' },
                { time: 'Il y a 5 min', source: 'SharePoint', action: 'Document mis à jour', records: '3 fichiers', status: 'success' },
                { time: 'Il y a 12 min', source: 'Salesforce', action: 'Import contacts', records: '89 contacts', status: 'success' },
                { time: 'Il y a 18 min', source: 'REST API', action: 'Webhook reçu', records: 'Payload 2.4KB', status: 'success' },
                { time: 'Il y a 34 min', source: 'SAP ERP', action: 'Échec de connexion', records: 'Timeout', status: 'error' },
                { time: 'Il y a 1 h', source: 'MySQL', action: 'Synchronisation complète', records: '12,458 lignes', status: 'success' },
              ].map((activity, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="flex items-center justify-between py-3 px-4 bg-[#0A0A0A] rounded-xl border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                    <div>
                      <div className="text-sm text-white font-medium">{activity.source} • {activity.action}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{activity.records} • {activity.time}</div>
                    </div>
                  </div>
                  <CheckCircle size={16} className={activity.status === 'success' ? 'text-emerald-500' : 'text-red-500'} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>

      {/* Configuration Modal */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="bg-[#111] border border-white/10 text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <Settings size={20} className="text-[#BFA76A]" /> 
              Configurer {selectedIntegration?.name}
            </DialogTitle>
            <DialogDescription>
              Modifiez les paramètres de connexion sécurisée pour ce connecteur.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-6">
            <div className="grid gap-2">
              <Label htmlFor="host" className="text-gray-400 text-xs uppercase font-bold tracking-wider">Host / Endpoint</Label>
              <Input id="host" defaultValue="https://api.gateway.internal/v1" className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#BFA76A] font-mono text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-gray-400 text-xs uppercase font-bold tracking-wider">Username</Label>
                <Input id="username" defaultValue="admin_svc" className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#BFA76A] font-mono text-sm" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-400 text-xs uppercase font-bold tracking-wider">API Key / Token</Label>
                <Input id="password" type="password" placeholder="••••••••••••" className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#BFA76A] font-mono text-sm" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="frequency" className="text-gray-400 text-xs uppercase font-bold tracking-wider">Fréquence de Sync</Label>
              <select className="flex h-10 w-full rounded-md border border-white/10 bg-[#0A0A0A] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFA76A]">
                <option>Temps Réel (Webhooks)</option>
                <option>Toutes les 15 minutes</option>
                <option>Toutes les heures</option>
                <option>Quotidien (Minuit)</option>
              </select>
            </div>
          </div>

          <DialogFooter className="gap-2 border-t border-white/5 pt-4">
            <Button variant="ghost" onClick={() => setIsConfigOpen(false)} className="text-gray-400 hover:text-white">Annuler</Button>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">Test Connection</Button>
            <Button onClick={handleSaveConfig} className="bg-[#BFA76A] text-black hover:bg-white font-bold shadow-lg shadow-[#BFA76A]/20">Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Analysis Modal */}
      <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
        <DialogContent className="bg-[#111] border border-white/10 text-white sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-display">
              <Activity size={20} className="text-[#BFA76A]" /> 
              Analyser Excel / CSV
            </DialogTitle>
            <DialogDescription>
              Analyse automatisée de la qualité et de la structure des données.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
             {analysisStep === 'idle' && (
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center hover:bg-white/5 hover:border-[#BFA76A]/50 transition-all cursor-pointer group">
                   <div className="w-20 h-20 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl">
                      <FileSpreadsheet size={36} className="text-[#BFA76A]" />
                   </div>
                   <h3 className="font-bold text-white mb-2 text-lg">Q3_Financial_Data.csv</h3>
                   <p className="text-sm text-gray-500 mb-8">4.8 MB • Uploaded 2h ago</p>
                   <Button onClick={handleRunAnalysis} className="bg-[#BFA76A] text-black hover:bg-white font-bold shadow-lg shadow-[#BFA76A]/20 h-12 px-8">
                      <Play size={16} className="mr-2" /> Lancer l'Analyse IA
                   </Button>
                </div>
             )}

             {analysisStep === 'analyzing' && (
                <div className="text-center py-12">
                   <div className="relative w-24 h-24 mx-auto mb-8">
                      <div className="absolute inset-0 rounded-full border-4 border-[#BFA76A]/10"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-[#BFA76A] border-t-transparent animate-spin"></div>
                      <RefreshCw size={32} className="absolute inset-0 m-auto text-[#BFA76A]" />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2 animate-pulse">Traitement en cours...</h3>
                   <p className="text-gray-400">Parsing des colonnes et détection d'anomalies.</p>
                </div>
             )}

             {analysisStep === 'complete' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex items-center gap-4">
                      <div className="bg-emerald-500 rounded-full p-2 text-black shadow-lg shadow-emerald-500/20"><CheckCircle size={24} /></div>
                      <div>
                         <h4 className="font-bold text-emerald-500 text-lg">Analyse Complète</h4>
                         <p className="text-sm text-emerald-200/80">Fichier valide et prêt pour l'intégration.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-4">
                      <div className="bg-[#1A1A1A] p-5 rounded-xl text-center border border-white/5">
                         <div className="text-3xl font-bold text-white mb-1">28.5k</div>
                         <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Lignes</div>
                      </div>
                      <div className="bg-[#1A1A1A] p-5 rounded-xl text-center border border-white/5">
                         <div className="text-3xl font-bold text-[#BFA76A] mb-1">98.5%</div>
                         <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Qualité</div>
                      </div>
                      <div className="bg-[#1A1A1A] p-5 rounded-xl text-center border border-white/5">
                         <div className="text-3xl font-bold text-blue-500 mb-1">16</div>
                         <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Colonnes</div>
                      </div>
                   </div>

                   <div className="bg-[#1A1A1A] rounded-xl p-5 border border-white/5">
                      <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2"><Database size={14} className="text-[#BFA76A]"/> Aperçu des Insights</h4>
                      <div className="space-y-3">
                         <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                         <div className="h-2 bg-white/10 rounded-full w-full"></div>
                         <div className="h-2 bg-white/10 rounded-full w-5/6"></div>
                      </div>
                   </div>
                </div>
             )}
          </div>
          
          <DialogFooter className="border-t border-white/5 pt-4">
             {analysisStep === 'complete' ? (
                <Button onClick={() => setIsAnalysisOpen(false)} className="w-full bg-[#BFA76A] text-black font-bold hover:bg-white h-12">
                   Voir le Rapport Détaillé <ArrowRight size={16} className="ml-2" />
                </Button>
             ) : (
                <Button variant="ghost" onClick={() => setIsAnalysisOpen(false)}>Fermer</Button>
             )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <FooterSection />
    </div>
  );
};

export default DataIntegrationDemoPage;
