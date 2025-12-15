import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

const GovernancePanel = () => {
  const items = [
    { name: "Project Charter Signed", status: "Compliant", count: 18, total: 20 },
    { name: "Risk Register Updated", status: "Warning", count: 12, total: 20 },
    { name: "Budget Approval", status: "Compliant", count: 20, total: 20 },
    { name: "Steering Committee Held", status: "Critical", count: 5, total: 20 },
  ];

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
         <ShieldCheck className="text-[#BFA76A]" size={24} />
         <div>
            <h3 className="text-lg font-bold text-white">Governance Compliance</h3>
            <p className="text-xs text-gray-500">Portfolio Adherence to PMO Standards</p>
         </div>
      </div>
      
      <div className="space-y-4 flex-1">
         {items.map((item, i) => {
            const pct = (item.count / item.total) * 100;
            return (
               <div key={i} className="p-4 bg-[#1A1A1A] rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-3">
                        {item.status === 'Compliant' && <CheckCircle2 size={18} className="text-green-500" />}
                        {item.status === 'Warning' && <AlertCircle size={18} className="text-yellow-500" />}
                        {item.status === 'Critical' && <AlertCircle size={18} className="text-red-500" />}
                        <span className="text-sm font-bold text-gray-200">{item.name}</span>
                     </div>
                     <span className="text-xs font-mono text-gray-500">{item.count}/{item.total}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden">
                     <div 
                        className={`h-full rounded-full ${item.status === 'Compliant' ? 'bg-green-500' : item.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${pct}%` }}
                     />
                  </div>
               </div>
            );
         })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-sm text-gray-400">
         <span>Overall Governance Score</span>
         <span className="text-[#BFA76A] font-bold text-lg">78/100</span>
      </div>
    </div>
  );
};

export default GovernancePanel;