import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, RefreshCw, BarChart3, PieChart as PieIcon, Sliders } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { Link } from 'react-router-dom';
import PDFExportButton from '@/components/ui/PDFExportButton';

const InteractivePreviewPage = () => {
  const [budgetFilter, setBudgetFilter] = useState([50]);
  const [activeSegment, setActiveSegment] = useState('All');

  // Interactive Data Generation
  const generateData = (factor) => {
    const multiplier = factor / 50;
    return [
      { name: 'Q1', sales: 4000 * multiplier, target: 4500 },
      { name: 'Q2', sales: 3000 * multiplier, target: 3500 },
      { name: 'Q3', sales: 6000 * multiplier, target: 5500 },
      { name: 'Q4', sales: 8000 * multiplier, target: 7500 },
    ];
  };

  const chartData = generateData(budgetFilter[0]);

  const segmentData = [
    { name: 'Enterprise', value: 45 * (budgetFilter[0]/50), color: '#3A7BFF' },
    { name: 'SMB', value: 30, color: '#BFA76A' },
    { name: 'Consumer', value: 25, color: '#10B981' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
         <div className="mb-10">
            <Link to="/pmo-demo" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm mb-4 transition-colors">
              <ArrowLeft size={14}/> Retour PMO Demo
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
               <div>
                  <h1 className="text-4xl font-display font-bold text-white mb-2">
                     Interactive <span className="text-[#BFA76A]">Preview</span>
                  </h1>
                  <p className="text-gray-400 max-w-2xl">
                     Expérimentez la réactivité de nos tableaux de bord. Modifiez les paramètres pour voir les projections en temps réel.
                  </p>
               </div>
               
               <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setBudgetFilter([50])} className="border-white/10 hover:bg-white/5 text-white">
                      <RefreshCw size={16} className="mr-2"/> Réinitialiser
                  </Button>
                  <PDFExportButton targetId="interactive-preview-content" label="Exporter PDF" className="bg-[#BFA76A] text-black hover:bg-white border-none" />
               </div>
            </div>
         </div>

         {/* Content ID for Export */}
         <div id="interactive-preview-content" className="bg-[#0A0A0A] p-4 -m-4 rounded-xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Control Panel */}
              <div className="lg:col-span-3 space-y-6">
                 <div className="bg-[#111] border border-white/10 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                       <Sliders size={18} className="text-[#BFA76A]" /> Contrôles
                    </h3>
                    
                    <div className="mb-8">
                       <label className="text-sm text-gray-400 mb-2 block">Ajustement Budget (%)</label>
                       <Slider 
                          defaultValue={[50]} 
                          max={100} 
                          step={1} 
                          value={budgetFilter} 
                          onValueChange={setBudgetFilter}
                          className="py-4"
                       />
                       <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span className="text-[#BFA76A] font-bold">{budgetFilter[0]}%</span>
                          <span>100%</span>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm text-gray-400 mb-2 block">Segment</label>
                       {['All', 'Enterprise', 'SMB', 'Consumer'].map(seg => (
                          <button
                             key={seg}
                             onClick={() => setActiveSegment(seg)}
                             className={`w-full text-left px-4 py-2 rounded text-sm transition-all ${
                                activeSegment === seg 
                                ? 'bg-[#BFA76A] text-black font-bold' 
                                : 'bg-black/20 text-gray-400 hover:bg-white/5'
                             }`}
                          >
                             {seg}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-center">
                    <p className="text-gray-400 text-sm mb-2">Total Prévisionnel</p>
                    <div className="text-3xl font-bold text-white">
                       CHF {Math.floor(chartData.reduce((acc, curr) => acc + curr.sales, 0)).toLocaleString()}
                    </div>
                 </div>
              </div>

              {/* Main Visuals */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-[400px]">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-[#3A7BFF]"/> Projections des Ventes</h3>
                    <ResponsiveContainer width="100%" height="90%">
                       <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                          <XAxis dataKey="name" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                          <Bar dataKey="sales" fill="#BFA76A" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="target" fill="#333" radius={[4, 4, 0, 0]} />
                       </BarChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-[400px]">
                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><PieIcon size={18} className="text-[#10B981]"/> Distribution par Segment</h3>
                    <ResponsiveContainer width="100%" height="90%">
                       <PieChart>
                          <Pie
                             data={segmentData}
                             cx="50%"
                             cy="50%"
                             innerRadius={60}
                             outerRadius={80}
                             paddingAngle={5}
                             dataKey="value"
                          >
                             {segmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                          <Legend verticalAlign="bottom" />
                       </PieChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-xl p-6 h-[300px]">
                    <h3 className="font-bold text-white mb-4">Analyse de Tendance (Live)</h3>
                    <ResponsiveContainer width="100%" height="85%">
                       <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                          <XAxis dataKey="name" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', color: '#fff' }} />
                          <Line type="monotone" dataKey="sales" stroke="#BFA76A" strokeWidth={3} dot={{r:6}} />
                          <Line type="monotone" dataKey="target" stroke="#3A7BFF" strokeWidth={2} strokeDasharray="5 5" />
                       </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
         </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default InteractivePreviewPage;