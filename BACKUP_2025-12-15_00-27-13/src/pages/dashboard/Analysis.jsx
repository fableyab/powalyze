import React, { useState, useEffect } from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { LiveLineChart, RiskHeatmap } from '@/components/ui/AdvancedCharts';
import { Brain, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  return <span>{prefix}{value}{suffix}</span>;
};

const Analysis = () => {
  const [data, setData] = useState({
    value: 45.2,
    budgetVar: -2.1,
    onTime: 67,
    riskScore: 32,
    burnRate: [10, 25, 40, 45, 55, 62, 73, 75, 80],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        value: +(prev.value + (Math.random() * 0.4 - 0.2)).toFixed(1),
        budgetVar: +(prev.budgetVar + (Math.random() * 0.1 - 0.05)).toFixed(1),
        onTime: Math.min(100, Math.max(0, prev.onTime + (Math.random() > 0.5 ? 1 : -1))),
        riskScore: Math.min(100, Math.max(0, prev.riskScore + (Math.random() > 0.5 ? 1 : -1))),
        burnRate: [...prev.burnRate.slice(1), +(prev.burnRate[prev.burnRate.length-1] + Math.random() * 5).toFixed(0)]
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-display font-bold text-white mb-1 flex items-center gap-3">
               <Brain className="text-[#BFA76A]" size={32} />
               BUSINESS INTELLIGENCE
            </h1>
            <p className="text-[#BFA76A] uppercase tracking-widest text-xs font-bold">INSIGHTS EN TEMPS RÉEL</p>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs text-gray-400 font-mono">LIVE FEED ACTIVE</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <Card className="border-t-4 border-[#BFA76A]">
            <div className="text-xs text-gray-500 uppercase mb-2">Portfolio Value</div>
            <div className="text-3xl font-bold text-white mb-1">€<AnimatedNumber value={data.value} />M</div>
            <div className="text-xs text-green-500 flex items-center gap-1"><TrendingUp size={12}/> +2.3% this week</div>
         </Card>
         <Card className="border-t-4 border-green-500">
            <div className="text-xs text-gray-500 uppercase mb-2">Budget Variance</div>
            <div className="text-3xl font-bold text-white mb-1">{data.budgetVar}%</div>
            <div className="text-xs text-green-500">Under Budget (Excellent)</div>
         </Card>
         <Card className="border-t-4 border-[#3A7BFF]">
            <div className="text-xs text-gray-500 uppercase mb-2">On Time Projects</div>
            <div className="text-3xl font-bold text-white mb-1">{data.onTime}%</div>
            <div className="text-xs text-gray-400">Target: 75%</div>
         </Card>
         <Card className="border-t-4 border-yellow-500">
            <div className="text-xs text-gray-500 uppercase mb-2">Risk Score</div>
            <div className="text-3xl font-bold text-white mb-1">{data.riskScore}/100</div>
            <div className="text-xs text-green-500 flex items-center gap-1">Decreasing (Good)</div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         <Card className="lg:col-span-2 h-80">
            <div className="flex justify-between mb-4">
               <h3 className="text-white font-bold">Budget Burn Rate</h3>
               <span className="text-xs text-gray-500">Live Update</span>
            </div>
            <LiveLineChart dataPoints={data.burnRate} />
         </Card>
         <Card className="h-80">
            <h3 className="text-white font-bold mb-4">Project Status Dist.</h3>
            <div className="flex items-center justify-center h-full pb-8">
               <div className="relative w-40 h-40 rounded-full" style={{ background: `conic-gradient(#4ade80 0% 67%, #facc15 67% 92%, #f87171 92% 100%)` }}>
                  <div className="absolute inset-4 bg-[#1C1C1C] rounded-full flex flex-col items-center justify-center">
                     <span className="text-2xl font-bold text-white">12</span>
                     <span className="text-[10px] text-gray-500 uppercase">Projects</span>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         <Card>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
               <Activity size={18} className="text-[#BFA76A]"/> Predictive Analytics
            </h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm">Forecast Final Cost</span>
                  <span className="text-white font-bold">€44.1M <span className="text-gray-600 text-xs">±€1.2M</span></span>
               </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm">Probability On-Time</span>
                  <span className="text-green-500 font-bold">78%</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400 text-sm">Risk Escalation Prob.</span>
                  <span className="text-yellow-500 font-bold">12%</span>
               </div>
               <div className="mt-4 pt-2">
                  <span className="text-xs text-[#BFA76A] uppercase tracking-wider font-bold">AI Confidence Level: 94%</span>
               </div>
            </div>
         </Card>

         <Card className="bg-red-900/5 border border-red-500/20">
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
               <AlertTriangle size={18} className="text-red-500"/> Anomaly Detection
            </h3>
            <div className="space-y-4">
               {[
                 { project: "Project Epsilon", msg: "Resource shortage pattern detected", time: "2h ago" },
                 { project: "Project Gamma", msg: "Supplier delay flagged via email keyword analysis", time: "4h ago" },
                 { project: "Finance", msg: "Unusual spending spike in Week 48", time: "1d ago" },
               ].map((alert, i) => (
                  <div key={i} className="flex gap-3 items-start bg-[#0A0A0A] p-3 rounded-sm border-l-2 border-red-500">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse"></div>
                     <div>
                        <div className="text-sm font-bold text-white">{alert.project}</div>
                        <div className="text-xs text-gray-400">{alert.msg}</div>
                     </div>
                     <span className="ml-auto text-[10px] text-gray-600">{alert.time}</span>
                  </div>
               ))}
            </div>
         </Card>
      </div>
    </div>
  );
};

export default Analysis;