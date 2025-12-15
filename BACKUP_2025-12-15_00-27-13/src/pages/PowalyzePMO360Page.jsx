import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleDataService } from '@/services/powerbi/sampleDataService';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import ExecutiveDashboard from '@/components/PowalyzePMO360/ExecutiveDashboard';
import PortfolioPMO from '@/components/PowalyzePMO360/PortfolioPMO';
import RisksGovernance from '@/components/PowalyzePMO360/RisksGovernance';
import WhatIfScenarios from '@/components/PowalyzePMO360/WhatIfScenarios';
import SaaSTeaserSection from '@/components/PowalyzePMO360/SaaSTeaserSection';
import { LayoutDashboard, Briefcase, BarChart2, Shield, Sliders, Code } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const PowalyzePMO360Page = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Loading Data from "Backend"
    setTimeout(() => {
       const projects = sampleDataService.generateProjects(35);
       // Add risks to projects
       projects.forEach(p => { p.risks = sampleDataService.generateRisks(p.id); });
       
       const kpis = sampleDataService.calculateKPIs(projects);
       const costTrends = sampleDataService.generateCostTrends();
       
       setData({ projects, kpis, costTrends });
       setLoading(false);
    }, 1200);
  }, []);

  const tabs = [
    { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio PMO', icon: Briefcase },
    { id: 'analysis', label: 'Data Analysis', icon: BarChart2 },
    { id: 'risks', label: 'Risks & Governance', icon: Shield },
    { id: 'whatif', label: 'What-If Scenarios', icon: Sliders },
    { id: 'tech', label: 'Architecture', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#BFA76A] selection:text-black">
      <Navbar />
      
      <main className="pt-28 pb-20 container mx-auto px-4 md:px-6">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8"
        >
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-[#BFA76A] p-2 rounded text-black">
                    <LayoutDashboard size={24} />
                 </div>
                 <h1 className="text-3xl md:text-4xl font-display font-bold">POWALYZE PMO 360°</h1>
              </div>
              <p className="text-gray-400 max-w-2xl text-lg font-light">
                 Advanced Project Portfolio Management powered by Power BI Embedded. 
              </p>
           </div>
           
           <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Demo Environment
           </div>
        </motion.div>

        {/* NAVIGATION TABS */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 scrollbar-hide">
           {tabs.map(tab => (
              <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id 
                    ? 'bg-[#BFA76A] text-black shadow-[0_0_20px_rgba(191,167,106,0.3)]' 
                    : 'bg-[#111] text-gray-400 hover:text-white hover:bg-[#1A1A1A] border border-white/5'
                 }`}
              >
                 <tab.icon size={16} /> {tab.label}
              </button>
           ))}
        </div>

        {/* CONTENT AREA */}
        <div className="min-h-[600px]">
           {loading ? (
              <div className="h-[400px] flex flex-col items-center justify-center">
                 <Loader2 className="w-12 h-12 text-[#BFA76A] animate-spin mb-4" />
                 <p className="text-gray-500 animate-pulse">Initializing Data Model...</p>
              </div>
           ) : (
              <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                 >
                    {activeTab === 'executive' && <ExecutiveDashboard data={data} />}
                    {activeTab === 'portfolio' && <PortfolioPMO data={data} />}
                    {activeTab === 'analysis' && (
                       <div className="bg-[#111] p-12 text-center rounded-xl border border-white/10">
                          <BarChart2 className="w-16 h-16 text-[#3A7BFF] mx-auto mb-4 opacity-50" />
                          <h3 className="text-2xl font-bold text-white mb-2">Data Analysis Module</h3>
                          <p className="text-gray-400">Deep-dive cost and resource analysis views would appear here.</p>
                       </div>
                    )}
                    {activeTab === 'risks' && <RisksGovernance data={data} />}
                    {activeTab === 'whatif' && <WhatIfScenarios />}
                    {activeTab === 'tech' && <SaaSTeaserSection />}
                 </motion.div>
              </AnimatePresence>
           )}
        </div>

      </main>
      <FooterSection />
    </div>
  );
};

export default PowalyzePMO360Page;