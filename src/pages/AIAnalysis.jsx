
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, TrendingUp, AlertTriangle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateExecutiveSummary } from '@/lib/aiMockService';
import { motion } from 'framer-motion';

const AIAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const runAnalysis = async () => {
      setLoading(true);
      const result = await generateExecutiveSummary({ projectCount: 15 });
      setAnalysis(result);
      setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
            <BrainCircuit className="text-amber-500" />
            AI Governance Suite
          </h1>
          <p className="text-slate-500">Predictive insights and scenario modelling powered by OpenAI</p>
        </div>
        <Button 
            onClick={runAnalysis} 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
            {loading ? <span className="animate-spin mr-2">⟳</span> : <Sparkles className="mr-2 w-4 h-4" />}
            {loading ? 'Analyzing Portfolio...' : 'Run Full Analysis'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Insight Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 border border-indigo-500/30 text-white p-8 rounded-xl shadow-lg col-span-1 md:col-span-3 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-indigo-300">
                <Sparkles className="w-6 h-6 text-amber-300" />
                Executive AI Summary
            </h2>
            {analysis ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                    <p className="text-lg leading-relaxed text-indigo-100">{analysis.summary}</p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        {analysis.risks.map((risk, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/10">
                                <h4 className="text-red-300 font-semibold mb-1 text-sm flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3" /> Risk Detected
                                </h4>
                                <p className="text-sm text-slate-300">{risk}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-indigo-400 mt-4 text-right">Confidence Score: {(analysis.confidence * 100).toFixed(0)}% • Source: {analysis.source}</p>
                </div>
            ) : (
                <div className="h-32 flex items-center justify-center text-indigo-300/50 italic border border-dashed border-indigo-500/30 rounded-lg">
                    Click "Run Full Analysis" to generate insights from live data.
                </div>
            )}
          </div>
        </motion.div>

        {/* Predictive Models */}
        <div className="bg-[#0F0F0F] p-6 rounded-xl border border-slate-800 shadow-sm col-span-2">
           <h3 className="font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
             <TrendingUp className="w-4 h-4 text-green-500" /> Scenario Builder
           </h3>
           <div className="h-64 flex items-center justify-center bg-slate-900/50 rounded-lg border border-dashed border-slate-700 relative overflow-hidden">
               <div className="absolute inset-0 flex items-end justify-around px-8 pb-8">
                    <motion.div 
                        initial={{ height: '20%' }} 
                        animate={{ height: '45%' }} 
                        className="w-16 bg-blue-900/50 border-t-2 border-blue-500 rounded-t relative group"
                    >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Worst</span>
                    </motion.div>
                    <motion.div 
                        initial={{ height: '20%' }} 
                        animate={{ height: '65%' }} 
                        className="w-16 bg-[#D4AF37]/20 border-t-2 border-[#D4AF37] rounded-t relative group"
                    >
                         <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">Expected</span>
                    </motion.div>
                    <motion.div 
                        initial={{ height: '20%' }} 
                        animate={{ height: '85%' }} 
                        className="w-16 bg-emerald-900/50 border-t-2 border-emerald-500 rounded-t relative group"
                    >
                         <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">Best</span>
                    </motion.div>
               </div>
           </div>
           <div className="flex gap-4 mt-4">
             <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">Run Simulation</Button>
           </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-[#0F0F0F] p-6 rounded-xl border border-slate-800 shadow-sm">
             <h3 className="font-semibold text-[#D4AF37] mb-4 flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4 text-red-500" /> Anomalies
             </h3>
             <div className="space-y-4">
                 <div className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                     <div className="flex justify-between items-start">
                         <span className="text-red-400 font-semibold text-sm">Budget Spike</span>
                         <span className="text-[10px] text-red-500 bg-red-900/20 px-1 rounded">Today</span>
                     </div>
                     <p className="text-xs text-slate-400 mt-1">Project "Apollo" consumed 40% of Q3 budget in 48h.</p>
                 </div>
                 <div className="p-3 bg-amber-900/10 border border-amber-900/30 rounded-lg">
                     <div className="flex justify-between items-start">
                         <span className="text-amber-400 font-semibold text-sm">Velocity Drop</span>
                         <span className="text-[10px] text-amber-500 bg-amber-900/20 px-1 rounded">2d ago</span>
                     </div>
                     <p className="text-xs text-slate-400 mt-1">Team "Falcon" velocity dropped by 35% this sprint.</p>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
