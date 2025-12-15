import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Download, MoreVertical, CheckCircle, AlertTriangle, AlertOctagon, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { GanttChart, RiskHeatmap } from '@/components/ui/AdvancedCharts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Button } from '@/components/ui/button';

// Mock Data
const ganttData = [
   { name: "Project Alpha", start: 0, duration: 85, status: "In Progress" },
   { name: "Project Beta", start: 10, duration: 60, status: "In Progress" },
   { name: "Project Gamma", start: 40, duration: 45, status: "Planned" },
   { name: "Project Delta", start: 5, duration: 92, status: "Completed" }
];

const riskData = [
   { id: "CR1", prob: "High", impact: "High", name: "Critical Risk 1" },
   { id: "CR2", prob: "Medium", impact: "High", name: "Critical Risk 2" },
   { id: "CR3", prob: "High", impact: "Medium", name: "Critical Risk 3" },
   { id: "MR1", prob: "Medium", impact: "Medium", name: "Medium Risk 1" },
   { id: "LR1", prob: "Low", impact: "Low", name: "Low Risk 1" }
];

const burnDownData = [
   { name: 'Jan', plan: 2.0, actual: 1.8, forecast: 2.0 },
   { name: 'Feb', plan: 4.0, actual: 3.9, forecast: 4.0 },
   { name: 'Mar', plan: 6.0, actual: 6.2, forecast: 6.1 },
   { name: 'Apr', plan: 8.0, actual: 8.3, forecast: 8.4 },
   { name: 'May', plan: 10.0, actual: null, forecast: 10.8 },
   { name: 'Jun', plan: 12.5, actual: null, forecast: 12.8 },
];

const resourceData = [
  { name: 'Dev', value: 92 },
  { name: 'PM', value: 88 },
  { name: 'Design', value: 85 },
  { name: 'QA', value: 78 },
];

const DashboardCard = ({ title, status, statusColor, subtitle, kpis, children, onConfig }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#3A7BFF]/30 transition-all duration-300 shadow-xl flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-6">
       <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded ${statusColor} bg-opacity-10 border border-opacity-20`}>
             {status}
          </span>
       </div>
       <div className="flex gap-2">
          <button onClick={onConfig} className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
             <Settings size={16} />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
             <Download size={16} />
          </button>
       </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
       {kpis.map((kpi, i) => (
          <div key={i} className="bg-[#1A1A1A] p-3 rounded border border-white/5">
             <div className="text-xs text-gray-500 mb-1 truncate" title={kpi.label}>{kpi.label}</div>
             <div className="text-sm font-bold text-white truncate" title={kpi.value}>{kpi.value}</div>
          </div>
       ))}
    </div>

    <div className="flex-grow min-h-[200px] bg-[#0A0A0A] rounded border border-white/5 p-4 relative">
       <div className="text-xs text-gray-500 absolute top-2 right-2">{subtitle}</div>
       {children}
    </div>
  </motion.div>
);

const PmoTrackingSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-[#0F0F0F] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              {t('home.tracking.title')}
           </h2>
           <p className="text-gray-400 max-w-2xl mx-auto">
              {t('home.tracking.subtitle')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* CARD 1: ON-TRACK */}
           <DashboardCard
              title={t('home.tracking.card1.title')}
              status={t('home.tracking.card1.status')}
              statusColor="text-green-500 bg-green-500 border-green-500"
              subtitle={t('home.tracking.card1.subtitle')}
              kpis={[
                 { label: "Total Projects", value: "47" },
                 { label: "On-Time Delivery", value: "92%" },
                 { label: "Resource Util.", value: "87%" },
                 { label: "Budget Spent", value: "CHF 8.3M" }
              ]}
           >
              <div className="mt-6">
                 <GanttChart tasks={ganttData} />
              </div>
           </DashboardCard>

           {/* CARD 2: OPTIMIZATION NEEDED */}
           <DashboardCard
              title={t('home.tracking.card2.title')}
              status={t('home.tracking.card2.status')}
              statusColor="text-yellow-500 bg-yellow-500 border-yellow-500"
              subtitle={t('home.tracking.card2.subtitle')}
              kpis={[
                 { label: "Total Resources", value: "234" },
                 { label: "Avg Utilization", value: "87%" },
                 { label: "Availability", value: "13%" },
                 { label: "Skill Gaps", value: "12" }
              ]}
           >
              <ResponsiveContainer width="100%" height={200}>
                 <BarChart data={resourceData} layout="vertical" margin={{ left: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#666" fontSize={10} width={40} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                       {resourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.value > 90 ? '#ef4444' : entry.value < 80 ? '#facc15' : '#22c55e'} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </DashboardCard>

           {/* CARD 3: BUDGET CONTROL */}
           <DashboardCard
              title={t('home.tracking.card3.title')}
              status={t('home.tracking.card3.status')}
              statusColor="text-blue-500 bg-blue-500 border-blue-500"
              subtitle={t('home.tracking.card3.subtitle')}
              kpis={[
                 { label: "Total Budget", value: "CHF 12.5M" },
                 { label: "Spent (66%)", value: "CHF 8.3M" },
                 { label: "Remaining", value: "CHF 4.2M" },
                 { label: "Forecast", value: "CHF 12.8M" }
              ]}
           >
              <ResponsiveContainer width="100%" height={220}>
                 <BarChart data={burnDownData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Bar dataKey="actual" fill="#3A7BFF" name="Actual Spending" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="plan" fill="#333" name="Planned Budget" radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </DashboardCard>

           {/* CARD 4: RISK MATRIX */}
           <DashboardCard
              title={t('home.tracking.card4.title')}
              status={t('home.tracking.card4.status')}
              statusColor="text-red-500 bg-red-500 border-red-500"
              subtitle={t('home.tracking.card4.subtitle')}
              kpis={[
                 { label: "Active Risks", value: "23" },
                 { label: "Critical Risks", value: "3" },
                 { label: "Issues", value: "15" },
                 { label: "Resolution Rate", value: "89%" }
              ]}
           >
              <div className="h-[200px] flex items-center justify-center">
                 <RiskHeatmap data={riskData} />
              </div>
           </DashboardCard>
        </div>
      </div>
    </section>
  );
};

export default PmoTrackingSection;