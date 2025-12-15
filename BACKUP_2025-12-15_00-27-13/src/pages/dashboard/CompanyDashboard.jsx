import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Download, FileText, Filter, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Building } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Mock Data
const performanceData = [
  { month: 'Jan', performance: 65, budget: 40 },
  { month: 'Feb', performance: 59, budget: 45 },
  { month: 'Mar', performance: 80, budget: 50 },
  { month: 'Apr', performance: 81, budget: 55 },
  { month: 'May', performance: 56, budget: 48 },
  { month: 'Jun', performance: 55, budget: 40 },
];

const riskData = [
  { name: 'Low', value: 40, color: '#4ade80' },
  { name: 'Medium', value: 30, color: '#facc15' },
  { name: 'High', value: 20, color: '#f87171' },
  { name: 'Critical', value: 10, color: '#ef4444' },
];

const CompanyDashboard = () => {
  const { companyId } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const exportPDF = async () => {
    const input = document.getElementById('dashboard-content');
    const canvas = await html2canvas(input, { backgroundColor: '#0A0A0A' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`dashboard-report-${companyId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Building className="text-[#BFA76A]" size={24} />
               <h1 className="text-3xl font-display font-bold">{t('dashboard.title')}</h1>
            </div>
            <p className="text-gray-400">ID: {companyId || 'DEMO-CORP-001'}</p>
          </div>
          <div className="flex gap-4">
             <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => window.print()}>
                <FileText size={16} className="mr-2" /> {t('dashboard.tabs.overview')}
             </Button>
             <Button onClick={exportPDF} className="bg-[#BFA76A] text-black hover:bg-[#D4AF37]">
                <Download size={16} className="mr-2" /> {t('dashboard.export')}
             </Button>
          </div>
        </div>

        <div id="dashboard-content" className="p-4 bg-[#0A0A0A]">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#111] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">{t('dashboard.metrics.projects')}</span>
                <div className="p-2 bg-[#BFA76A]/10 rounded text-[#BFA76A]"><FileText size={16}/></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <div className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={12}/> +2 this month</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#111] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">{t('dashboard.metrics.budget')}</span>
                <div className="p-2 bg-[#BFA76A]/10 rounded text-[#BFA76A]"><DollarSign size={16}/></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">84%</div>
              <div className="text-xs text-yellow-500">On track</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#111] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">{t('dashboard.metrics.health')}</span>
                <div className="p-2 bg-[#BFA76A]/10 rounded text-[#BFA76A]"><CheckCircle size={16}/></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">A-</div>
              <div className="text-xs text-gray-500">Stable</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#111] p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">{t('dashboard.metrics.risks')}</span>
                <div className="p-2 bg-red-500/10 rounded text-red-500"><AlertTriangle size={16}/></div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-xs text-red-500">Requires Action</div>
            </motion.div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#111] p-6 rounded-xl border border-white/5 h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6">Performance vs Budget</h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#BFA76A" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#BFA76A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#555" />
                  <YAxis stroke="#555" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                  <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                  <Area type="monotone" dataKey="performance" stroke="#BFA76A" fillOpacity={1} fill="url(#colorPerf)" />
                  <Area type="monotone" dataKey="budget" stroke="#888" fillOpacity={0.3} fill="#888" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#111] p-6 rounded-xl border border-white/5 h-[400px]">
              <h3 className="text-lg font-bold text-white mb-6">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-xs mt-[-20px]">
                {riskData.map(r => (
                  <div key={r.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{background: r.color}}></span> {r.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default CompanyDashboard;