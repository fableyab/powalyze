import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { 
  FileText, Database, TrendingUp, AlertTriangle, CheckCircle, Download, 
  Share2, ArrowRight, PieChart, BarChart2, Activity, Zap 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { motion } from 'framer-motion';

const AnalysisResultsPage = () => {
  const { t } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate processing time
    setTimeout(() => {
        const stored = localStorage.getItem('powalyze_analysis_data');
        if (stored) {
            setData(JSON.parse(stored));
        }
        setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
     return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
           <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#BFA76A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-bold">{t('analysis.processing')}</h2>
              <p className="text-gray-400">Analysing data structure and quality...</p>
           </div>
        </div>
     );
  }

  if (!data) {
     return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
           <Navbar />
           <div className="flex-grow flex items-center justify-center">
              <div className="text-center p-8 border border-white/10 rounded-xl bg-[#111]">
                 <AlertTriangle className="mx-auto text-yellow-500 mb-4" size={48} />
                 <h2 className="text-2xl font-bold mb-2">No Analysis Data Found</h2>
                 <p className="text-gray-400 mb-6">Please upload a file first to see the analysis results.</p>
                 <Button className="bg-[#BFA76A] text-black" onClick={() => window.history.back()}>Go Back</Button>
              </div>
           </div>
           <FooterSection />
        </div>
     );
  }

  const { stats, fileName } = data;
  const qualityScore = Math.floor(Math.random() * (98 - 75) + 75); // Mock score
  
  // Mock distribution data for visuals
  const typeDistribution = [
     { name: 'Numeric', value: stats.numericCols },
     { name: 'Text', value: stats.cols - stats.numericCols },
  ];
  const COLORS = ['#3A7BFF', '#BFA76A'];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="mb-12 flex justify-between items-end">
           <div>
              <span className="text-[#3A7BFF] font-bold uppercase tracking-widest text-xs mb-2 block">
                 AI-Powered Analysis
              </span>
              <h1 className="text-4xl font-display font-bold text-white mb-2">{t('analysis.title')}</h1>
              <p className="text-gray-400 text-lg">{t('analysis.subtitle')} • {fileName}</p>
           </div>
           <div className="flex gap-3">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                 <Share2 size={16} className="mr-2"/> Share
              </Button>
              <Button className="bg-[#BFA76A] text-black hover:bg-white">
                 <Download size={16} className="mr-2"/> {t('analysis.export')} Report
              </Button>
           </div>
        </div>

        {/* SECTION 1: OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <div className="flex justify-between mb-4">
                 <span className="text-gray-400 text-sm">Data Quality</span>
                 <Activity size={18} className="text-green-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{qualityScore}%</div>
              <div className="text-xs text-green-500">Good quality for analysis</div>
           </div>
           
           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <div className="flex justify-between mb-4">
                 <span className="text-gray-400 text-sm">{t('analysis.rows')}</span>
                 <Database size={18} className="text-[#BFA76A]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stats.rows}</div>
              <div className="text-xs text-gray-500">Total records processed</div>
           </div>

           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <div className="flex justify-between mb-4">
                 <span className="text-gray-400 text-sm">{t('analysis.columns')}</span>
                 <FileText size={18} className="text-[#3A7BFF]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stats.cols}</div>
              <div className="text-xs text-gray-500">{stats.numericCols} numeric, {stats.cols - stats.numericCols} text</div>
           </div>

           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <div className="flex justify-between mb-4">
                 <span className="text-gray-400 text-sm">Processing Time</span>
                 <Zap size={18} className="text-yellow-500" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">0.4s</div>
              <div className="text-xs text-gray-500">Cloud acceleration enabled</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           {/* SECTION 2: DATA DISTRIBUTION */}
           <div className="bg-[#111] p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <PieChart size={20} className="text-[#BFA76A]" /> {t('analysis.statisticalAnalysis')}
              </h3>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                       <Pie
                          data={typeDistribution}
                          cx="50%" cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                       >
                          {typeDistribution.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                       </Pie>
                       <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333'}} />
                    </RePieChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                 {typeDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                       <span className="text-sm text-gray-400">{entry.name}: {entry.value}</span>
                    </div>
                 ))}
              </div>
           </div>

           {/* SECTION 3: PMO INSIGHTS */}
           <div className="bg-[#111] p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <TrendingUp size={20} className="text-[#3A7BFF]" /> {t('analysis.pmoAnalysis')}
              </h3>
              <div className="space-y-4">
                 <div className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-white text-sm mb-1">Budget Health</h4>
                    <p className="text-gray-400 text-xs">Based on numeric columns, budget variance appears stable with standard deviation within 5%.</p>
                 </div>
                 <div className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-bold text-white text-sm mb-1">Resource Allocation</h4>
                    <p className="text-gray-400 text-xs">Potential overallocation detected in 2 categories. Recommend leveling resources.</p>
                 </div>
                 <div className="bg-[#1A1A1A] p-4 rounded-lg border-l-4 border-[#3A7BFF]">
                    <h4 className="font-bold text-white text-sm mb-1">Timeline Risk</h4>
                    <p className="text-gray-400 text-xs">Date continuity check passed. No major gaps identified in timeline data.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* SECTION 4: RECOMMENDATIONS */}
        <div className="bg-gradient-to-r from-[#111] to-[#1A1A1A] p-8 rounded-xl border border-white/10 mb-12">
           <h3 className="text-xl font-bold mb-6">{t('analysis.powerBiRecommendations')}</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div whileHover={{y:-5}} className="bg-black/40 p-6 rounded-lg border border-white/5">
                 <BarChart2 className="text-[#BFA76A] mb-4" size={32} />
                 <h4 className="font-bold text-white mb-2">Executive Dashboard</h4>
                 <p className="text-sm text-gray-400 mb-4">Best for high-level overview. Use KPIs and aggregate trends.</p>
                 <span className="text-xs bg-[#BFA76A]/20 text-[#BFA76A] px-2 py-1 rounded">Recommended</span>
              </motion.div>

              <motion.div whileHover={{y:-5}} className="bg-black/40 p-6 rounded-lg border border-white/5">
                 <TrendingUp className="text-[#3A7BFF] mb-4" size={32} />
                 <h4 className="font-bold text-white mb-2">Trend Analysis</h4>
                 <p className="text-sm text-gray-400 mb-4">Focus on time-series data to identify seasonal patterns.</p>
                 <span className="text-xs bg-[#3A7BFF]/20 text-[#3A7BFF] px-2 py-1 rounded">High Value</span>
              </motion.div>

              <motion.div whileHover={{y:-5}} className="bg-black/40 p-6 rounded-lg border border-white/5">
                 <AlertTriangle className="text-red-500 mb-4" size={32} />
                 <h4 className="font-bold text-white mb-2">Risk Matrix</h4>
                 <p className="text-sm text-gray-400 mb-4">Visualize categorical distribution of risks and issues.</p>
              </motion.div>
           </div>
        </div>

        {/* SECTION 5: NEXT STEPS */}
        <div className="text-center">
           <h3 className="text-2xl font-bold mb-8">{t('analysis.nextSteps')}</h3>
           <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button size="lg" className="bg-[#3A7BFF] text-white hover:bg-[#2563EB]">
                 Generate Power BI Dashboard <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                 Schedule Consultation
              </Button>
           </div>
        </div>

      </main>
      <FooterSection />
    </div>
  );
};

export default AnalysisResultsPage;