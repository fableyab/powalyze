import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, PieChart, Users, ArrowRight, CheckCircle2, 
  Activity, BarChart, Sliders
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const PMODemoPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans">
      <SEO title="PMO 360 Demo | Powalyze" />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
               <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                  PMO 360 <span className="text-[#BFA76A]">Demo</span>
               </h1>
               <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Une suite complète pour la gestion de portefeuille projets, intégrant gouvernance, ressources et performance financière.
               </p>
            </div>

            {/* Dashboard Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
               {/* Executive Dashboard */}
               <Link to="/executive-dashboard">
                  <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all group cursor-pointer h-full flex flex-col">
                     <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-lg flex items-center justify-center text-[#BFA76A] mb-4 group-hover:bg-[#BFA76A] group-hover:text-black transition-colors">
                        <LayoutDashboard size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Executive Dashboard</h3>
                     <p className="text-gray-400 text-sm mb-4 flex-grow">
                        Tableau de bord exécutif consolidant tous les projets, budgets et statuts en temps réel.
                     </p>
                     <div className="flex items-center text-[#BFA76A] text-sm font-bold mt-auto">
                        Explorer <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                     </div>
                  </Card>
               </Link>

               {/* Financial Report */}
               <Link to="/financial-report">
                  <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all group cursor-pointer h-full flex flex-col">
                     <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <BarChart size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Rapport Financier</h3>
                     <p className="text-gray-400 text-sm mb-4 flex-grow">
                        Analyse détaillée P&L, Cash Flow et variance budgétaire pour le CFO.
                     </p>
                     <div className="flex items-center text-blue-500 text-sm font-bold mt-auto">
                        Explorer <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                     </div>
                  </Card>
               </Link>

               {/* Interactive Preview */}
               <Link to="/interactive-preview">
                  <Card className="bg-[#111] border-white/10 p-6 hover:border-[#BFA76A]/50 transition-all group cursor-pointer h-full flex flex-col">
                     <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        <Sliders size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">Interactive Preview</h3>
                     <p className="text-gray-400 text-sm mb-4 flex-grow">
                        Simulez des scénarios et testez l'interactivité de nos rapports Power BI.
                     </p>
                     <div className="flex items-center text-red-500 text-sm font-bold mt-auto">
                        Explorer <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                     </div>
                  </Card>
               </Link>
            </div>

            {/* Feature Deep Dive */}
            <div className="bg-[#111] rounded-2xl border border-white/10 p-8 md:p-12 mb-20">
               <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2">
                     <h2 className="text-3xl font-bold text-white mb-6">Pilotage Financier Avancé</h2>
                     <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                           <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" />
                           <span className="text-gray-300">Suivi budgétaire multi-devises (CHF, EUR, USD)</span>
                        </li>
                        <li className="flex items-start gap-3">
                           <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" />
                           <span className="text-gray-300">Intégration SAP / ERP pour les coûts réels</span>
                        </li>
                        <li className="flex items-start gap-3">
                           <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" />
                           <span className="text-gray-300">Prévisions (Forecast) et Reste à Faire (ETC)</span>
                        </li>
                        <li className="flex items-start gap-3">
                           <CheckCircle2 className="text-[#BFA76A] mt-1 shrink-0" />
                           <span className="text-gray-300">Calcul automatique du ROI et de la marge</span>
                        </li>
                     </ul>
                     <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Link to="/financial-report">
                           <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-6 w-full sm:w-auto transition-all shadow-lg shadow-[#BFA76A]/10">
                              Voir le Rapport Financier
                           </Button>
                        </Link>
                        <Link to="/contact">
                           <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold h-12 px-6 w-full sm:w-auto transition-all shadow-lg shadow-[#BFA76A]/10">
                              Réserver une Présentation
                           </Button>
                        </Link>
                     </div>
                  </div>
                  <div className="lg:w-1/2">
                     <div className="bg-black/50 rounded-xl p-4 border border-white/10 h-[300px] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#BFA76A]/10 via-transparent to-transparent"></div>
                        <Activity className="text-gray-600 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
                        <span className="absolute bottom-4 text-gray-500 text-sm font-mono">Real-time Financial Core</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default PMODemoPage;