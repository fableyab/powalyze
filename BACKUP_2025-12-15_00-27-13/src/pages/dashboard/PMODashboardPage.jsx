import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  Settings, Download, RefreshCw, Calendar, Users, TrendingDown, 
  BarChart, Activity, Save, RotateCcw 
} from 'lucide-react';
import { GanttChart, RiskHeatmap } from '@/components/ui/AdvancedCharts';
import { SimpleLineChart } from '@/components/ui/ChartComponents';
import { 
  BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const PMODashboardPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('gantt');
  const [configOpen, setConfigOpen] = useState(true);

  // Mock Config State
  const [dateRange, setDateRange] = useState('Q1 2025');
  const [threshold, setThreshold] = useState(80);
  const [budgetType, setBudgetType] = useState('CAPEX');

  // Mock Data
  const ganttData = [
     { name: "Digital Core V1", start: 10, duration: 40, status: "In Progress" },
     { name: "Cloud Migration", start: 30, duration: 30, status: "Planned" },
     { name: "AI Pilot Alpha", start: 5, duration: 25, status: "Completed" },
     { name: "Security Audit", start: 60, duration: 15, status: "Planned" },
     { name: "ERP Upgrade", start: 20, duration: 50, status: "In Progress" }
  ];

  const riskData = [
     { id: "R1", prob: "High", impact: "High", name: "Resource Shortage" },
     { id: "R2", prob: "Medium", impact: "High", name: "Budget Overrun" },
     { id: "R3", prob: "Low", impact: "Medium", name: "Scope Creep" },
     { id: "R4", prob: "High", impact: "Low", name: "Minor Delay" },
     { id: "R5", prob: "Medium", impact: "Medium", name: "Tech Debt" }
  ];

  const burnDownData = [
     { name: 'Jan', plan: 100, actual: 95 },
     { name: 'Feb', plan: 90, actual: 88 },
     { name: 'Mar', plan: 80, actual: 82 },
     { name: 'Apr', plan: 70, actual: 65 },
     { name: 'May', plan: 60, actual: 58 },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      <main className="pt-28 pb-20 container mx-auto px-6">
         {/* Header */}
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
               <h1 className="text-3xl font-display font-bold text-white mb-2">{t('pmoDashboards.title')}</h1>
               <p className="text-gray-400">{t('pmoDashboards.subtitle')}</p>
            </div>
            <div className="flex gap-3">
               <Button variant="outline" className="border-white/10" onClick={() => window.print()}>
                  <Download size={16} className="mr-2"/> {t('pmoDashboards.export')}
               </Button>
               <Button onClick={() => setConfigOpen(!configOpen)} className="bg-[#3A7BFF] text-white hover:bg-[#2563EB]">
                  <Settings size={16} className="mr-2"/> {t('pmoDashboards.config')}
               </Button>
            </div>
         </div>

         <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Configuration */}
            {configOpen && (
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="w-full lg:w-80 bg-[#111] border border-white/10 rounded-xl p-6 h-fit shrink-0"
               >
                  <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                     <Settings size={18} className="text-[#3A7BFF]"/> {t('pmoDashboards.config')}
                  </h3>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase font-bold">{t('pmoDashboards.dateRange')}</label>
                        <select 
                           value={dateRange} 
                           onChange={(e) => setDateRange(e.target.value)}
                           className="w-full bg-[#1C1C1C] border border-white/10 rounded-md p-2 text-sm text-white focus:border-[#3A7BFF] outline-none"
                        >
                           <option>Q1 2025</option>
                           <option>Q2 2025</option>
                           <option>Year 2025</option>
                        </select>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase font-bold">{t('pmoDashboards.budgetType')}</label>
                        <div className="flex gap-2">
                           {['CAPEX', 'OPEX'].map(type => (
                              <button 
                                 key={type}
                                 onClick={() => setBudgetType(type)}
                                 className={`flex-1 py-2 text-xs font-bold rounded-md border ${
                                    budgetType === type 
                                    ? 'bg-[#3A7BFF]/20 border-[#3A7BFF] text-[#3A7BFF]' 
                                    : 'bg-[#1C1C1C] border-white/10 text-gray-400'
                                 }`}
                              >
                                 {type}
                              </button>
                           ))}
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs text-gray-500 uppercase font-bold">{t('pmoDashboards.threshold')}: {threshold}%</label>
                        <input 
                           type="range" 
                           min="0" max="100" 
                           value={threshold} 
                           onChange={(e) => setThreshold(e.target.value)}
                           className="w-full accent-[#3A7BFF]"
                        />
                     </div>

                     <div className="pt-4 border-t border-white/10 flex gap-2">
                        <Button className="w-full bg-[#3A7BFF] hover:bg-[#2563EB] text-white">
                           <Save size={16} className="mr-2"/> Save
                        </Button>
                        <Button variant="ghost" className="w-fit text-gray-400 hover:text-white">
                           <RotateCcw size={16}/>
                        </Button>
                     </div>
                  </div>
               </motion.div>
            )}

            {/* Main Content */}
            <div className="flex-1 space-y-6">
               {/* Tabs */}
               <div className="flex gap-2 border-b border-white/10 pb-1 overflow-x-auto">
                  {[
                     { id: 'gantt', icon: Calendar, label: t('pmoDashboards.gantt') },
                     { id: 'heatmap', icon: Users, label: t('pmoDashboards.heatmap') },
                     { id: 'burndown', icon: TrendingDown, label: t('pmoDashboards.burndown') },
                  ].map(tab => (
                     <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                           activeTab === tab.id 
                           ? 'border-[#3A7BFF] text-[#3A7BFF] bg-[#3A7BFF]/5' 
                           : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                     >
                        <tab.icon size={16} /> {tab.label}
                     </button>
                  ))}
               </div>

               {/* Visualization Area */}
               <motion.div 
                 key={activeTab}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-[#111] border border-white/10 rounded-xl p-6 min-h-[500px]"
               >
                  {activeTab === 'gantt' && (
                     <div>
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-xl font-bold text-white">Project Timeline ({dateRange})</h3>
                           <div className="flex gap-2">
                              <span className="flex items-center gap-1 text-xs text-gray-400"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Completed</span>
                              <span className="flex items-center gap-1 text-xs text-gray-400"><div className="w-3 h-3 bg-[#BFA76A] rounded-sm"></div> In Progress</span>
                           </div>
                        </div>
                        <GanttChart tasks={ganttData} />
                     </div>
                  )}

                  {activeTab === 'heatmap' && (
                     <div>
                        <div className="flex justify-between items-center mb-6">
                           <h3 className="text-xl font-bold text-white">Resource & Risk Heatmap</h3>
                        </div>
                        <div className="h-[400px]">
                           <RiskHeatmap data={riskData} />
                        </div>
                     </div>
                  )}

                  {activeTab === 'burndown' && (
                     <div className="h-[400px]">
                        <h3 className="text-xl font-bold text-white mb-6">Budget Burn-down ({budgetType})</h3>
                        <ResponsiveContainer width="100%" height="100%">
                           <ReBarChart data={burnDownData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                              <XAxis dataKey="name" stroke="#666" />
                              <YAxis stroke="#666" />
                              <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                              <Bar dataKey="plan" fill="#333" name="Planned" />
                              <Bar dataKey="actual" fill="#3A7BFF" name="Actual" />
                           </ReBarChart>
                        </ResponsiveContainer>
                     </div>
                  )}
               </motion.div>
            </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default PMODashboardPage;