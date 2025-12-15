import React from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { RiskHeatmap } from '@/components/ui/AdvancedCharts';
import { Shield, AlertCircle, CheckSquare, Search } from 'lucide-react';

const Governance = () => {
  const risks = [
    { id: "R1", name: "Resource Shortage (Epsilon)", prob: "High", impact: "High", score: 49, owner: "PM Epsilon", status: "In Progress" },
    { id: "R2", name: "Supplier Delay (Gamma)", prob: "Medium", impact: "High", score: 36, owner: "PM Gamma", status: "In Progress" },
    { id: "R3", name: "Tech Complexity (Zeta)", prob: "Medium", impact: "Medium", score: 30, owner: "PM Zeta", status: "Planned" },
    { id: "R4", name: "Budget Overrun", prob: "Low", impact: "High", score: 18, owner: "PMO Dir", status: "Active" },
    { id: "R5", name: "Schedule Slip (Epsilon)", prob: "High", impact: "Medium", score: 45, owner: "PM Epsilon", status: "In Progress" },
    { id: "R6", name: "Quality Issues (Beta)", prob: "Low", impact: "Medium", score: 15, owner: "QA Lead", status: "Active" },
    { id: "R7", name: "Stakeholder Align", prob: "Medium", impact: "Low", score: 12, owner: "PM Gamma", status: "Active" },
    { id: "R8", name: "Compliance", prob: "Low", impact: "High", score: 16, owner: "Compliance", status: "Planned" },
    { id: "R9", name: "Key Person", prob: "Low", impact: "High", score: 12, owner: "HR", status: "Active" },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div className="mb-10 flex items-center gap-4">
        <div className="w-16 h-16 bg-[#1C1C1C] border border-[#BFA76A] rounded-sm flex items-center justify-center">
           <Shield className="text-[#BFA76A]" size={32} />
        </div>
        <div>
           <h1 className="text-3xl font-display font-bold text-white mb-1">GOVERNANCE & RISK</h1>
           <p className="text-gray-500">Identification • Mitigation • Monitoring</p>
        </div>
      </div>

      {/* SECTION 1: RISK OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
         <Card className="text-center py-4 bg-[#1C1C1C]">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-[10px] text-gray-500 uppercase">Total Risks</div>
         </Card>
         <Card className="text-center py-4 bg-red-900/20 border border-red-500/30">
            <div className="text-2xl font-bold text-red-500">1</div>
            <div className="text-[10px] text-red-400 uppercase font-bold">Critical</div>
         </Card>
         <Card className="text-center py-4 bg-orange-900/20 border border-orange-500/30">
            <div className="text-2xl font-bold text-orange-500">2</div>
            <div className="text-[10px] text-orange-400 uppercase font-bold">High</div>
         </Card>
         <Card className="text-center py-4 bg-yellow-900/20 border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-500">3</div>
            <div className="text-[10px] text-yellow-400 uppercase font-bold">Medium</div>
         </Card>
         <Card className="text-center py-4 bg-green-900/20 border border-green-500/30">
            <div className="text-2xl font-bold text-green-500">6</div>
            <div className="text-[10px] text-green-400 uppercase font-bold">Low</div>
         </Card>
         <Card className="text-center py-4 bg-[#1C1C1C]">
            <div className="text-2xl font-bold text-[#BFA76A]">32</div>
            <div className="text-[10px] text-gray-500 uppercase">Risk Score</div>
         </Card>
      </div>

      {/* SECTION 3: HEATMAP & SECTION 5: ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         <Card>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <AlertCircle size={18} className="text-[#BFA76A]" /> Risk Heatmap
            </h3>
            <RiskHeatmap data={risks} />
         </Card>

         <Card>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <CheckSquare size={18} className="text-[#BFA76A]" /> Mitigation Actions
            </h3>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
               {[
                 { action: "Resource reallocation (Epsilon)", progress: 60 },
                 { action: "Supplier negotiation (Gamma)", progress: 40 },
                 { action: "Technical review (Zeta)", progress: 20 },
                 { action: "Cost control measures", progress: 100 },
                 { action: "Testing enhancement (Beta)", progress: 75 },
               ].map((act, i) => (
                  <div key={i}>
                     <div className="flex justify-between text-xs text-gray-300 mb-1">
                        <span>{act.action}</span>
                        <span className="font-bold">{act.progress}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-[#0A0A0A] rounded-full">
                        <div 
                          className={`h-full rounded-full ${act.progress === 100 ? 'bg-green-500' : 'bg-[#BFA76A]'}`} 
                          style={{ width: `${act.progress}%` }}
                        ></div>
                     </div>
                  </div>
               ))}
            </div>
         </Card>
      </div>

      {/* SECTION 2: RISK REGISTER TABLE */}
      <h2 className="text-lg font-light text-white mb-4">Risk Register</h2>
      <Card className="mb-8 p-0 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-[#0A0A0A] text-gray-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="p-4">ID</th>
                     <th className="p-4">Risk Name</th>
                     <th className="p-4">Prob / Impact</th>
                     <th className="p-4">Score</th>
                     <th className="p-4">Owner</th>
                     <th className="p-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {risks.map((r, i) => (
                     <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-gray-400 text-xs">{r.id}</td>
                        <td className="p-4 font-bold text-white">{r.name}</td>
                        <td className="p-4 text-gray-300">{r.prob} / {r.impact}</td>
                        <td className="p-4">
                           <span className={`font-bold ${r.score > 40 ? 'text-red-500' : r.score > 20 ? 'text-yellow-500' : 'text-green-500'}`}>
                              {r.score}
                           </span>
                        </td>
                        <td className="p-4 text-gray-400">{r.owner}</td>
                        <td className="p-4">
                           <span className="px-2 py-1 bg-[#1C1C1C] border border-white/10 rounded text-xs text-gray-300">
                              {r.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>

      {/* SECTION 7: COMPLIANCE STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="md:col-span-3 bg-[#111] p-6 rounded-sm border border-white/5 flex items-center justify-between">
            <div>
               <h3 className="text-white font-bold mb-1">Compliance Status</h3>
               <p className="text-gray-500 text-sm">ISO 27001 & GDPR</p>
            </div>
            <div className="text-right">
               <div className="text-3xl font-bold text-green-500">98%</div>
               <div className="text-xs text-gray-500 uppercase">Compliance Score</div>
            </div>
            <div className="h-12 w-px bg-white/10 mx-4"></div>
            <div>
               <div className="text-sm text-gray-300">Next Audit</div>
               <div className="text-white font-bold">15 Feb 2026</div>
            </div>
         </div>
         <Card className="bg-[#BFA76A] text-black border-none">
             <div className="text-xs font-bold uppercase mb-1 opacity-70">Risk Effectiveness</div>
             <div className="text-3xl font-bold">87/100</div>
         </Card>
      </div>

    </div>
  );
};

export default Governance;