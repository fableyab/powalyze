import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, BarChart, Database, Zap, 
  Activity, PieChart, Layout 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LiveDemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
         {/* Hero Header */}
         <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
               Live <span className="text-[#BFA76A]">Demo</span> Experience
            </h1>
            <p className="text-xl text-gray-400 mb-8">
               Plongez au cœur de nos solutions Power BI interactives. 
               Pas d'inscription requise, testez directement la puissance de Powalyze.
            </p>
            <div className="flex justify-center gap-4">
               <Link to="/contact">
                  <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-8">
                     Demander un accès complet
                  </Button>
               </Link>
               <Link to="/pmo-demo">
                  <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                     Voir la Solution PMO
                  </Button>
               </Link>
            </div>
         </div>

         {/* Demo Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Card 1: Executive Dashboard */}
            <Link to="/executive-dashboard" className="group">
               <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#BFA76A] transition-all duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 bg-[#BFA76A]/10 rounded-xl flex items-center justify-center text-[#BFA76A] mb-6 group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
                     <Layout size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Executive Dashboard</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                     Vue stratégique consolidée pour le COMEX. KPIs financiers, avancement global et alertes critiques.
                  </p>
                  <div className="flex items-center text-[#BFA76A] font-bold mt-auto">
                     Lancer la démo <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform"/>
                  </div>
               </div>
            </Link>

            {/* Card 2: Financial Report */}
            <Link to="/financial-report" className="group">
               <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#3A7BFF] transition-all duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 bg-[#3A7BFF]/10 rounded-xl flex items-center justify-center text-[#3A7BFF] mb-6 group-hover:bg-[#3A7BFF] group-hover:text-white transition-colors">
                     <BarChart size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Rapport Financier</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                     Analyse P&L détaillée, suivi des coûts réels vs budget et projections de trésorerie.
                  </p>
                  <div className="flex items-center text-[#3A7BFF] font-bold mt-auto">
                     Lancer la démo <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform"/>
                  </div>
               </div>
            </Link>

            {/* Card 3: Interactive Preview */}
            <Link to="/interactive-preview" className="group">
               <div className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-[#EF4444] transition-all duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 bg-[#EF4444]/10 rounded-xl flex items-center justify-center text-[#EF4444] mb-6 group-hover:bg-[#EF4444] group-hover:text-white transition-colors">
                     <Activity size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Interactive Preview</h3>
                  <p className="text-gray-400 mb-6 flex-grow">
                     Simulateur interactif pour tester la réactivité des données et les scénarios What-If.
                  </p>
                  <div className="flex items-center text-[#EF4444] font-bold mt-auto">
                     Lancer la démo <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform"/>
                  </div>
               </div>
            </Link>
         </div>

         {/* Technical Features Section */}
         <div className="bg-[#161616] rounded-3xl p-12 border border-white/5">
            <h2 className="text-3xl font-bold mb-10 text-center">Pourquoi choisir nos dashboards ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 text-[#BFA76A]">
                     <Database size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Multi-Sources</h4>
                  <p className="text-gray-400 text-sm">Connecteurs natifs pour SAP, Salesforce, Excel et +50 autres sources.</p>
               </div>
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 text-[#BFA76A]">
                     <Zap size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">Temps Réel</h4>
                  <p className="text-gray-400 text-sm">Rafraîchissement automatique des données pour une prise de décision instantanée.</p>
               </div>
               <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 text-[#BFA76A]">
                     <PieChart size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-3">100% Personnalisable</h4>
                  <p className="text-gray-400 text-sm">Design sur mesure adapté à votre charte graphique et vos KPIs spécifiques.</p>
               </div>
            </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default LiveDemoPage;