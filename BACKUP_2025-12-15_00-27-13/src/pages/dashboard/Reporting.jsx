import React from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { FileText, Download, CheckCircle, AlertTriangle, XCircle, TrendingUp } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    'On Track': 'bg-green-500/10 text-green-500 border-green-500/20',
    'At Risk': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Off Track': 'bg-red-500/10 text-red-500 border-red-500/20'
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[status] || styles['On Track']}`}>
      {status}
    </span>
  );
};

const RiskBadge = ({ level }) => {
  const styles = {
    'Low': 'text-green-500',
    'Medium': 'text-yellow-500',
    'High': 'text-orange-500',
    'Critical': 'text-red-500 font-bold'
  };
  return <span className={styles[level]}>{level}</span>;
};

const Reporting = () => {
  const projects = [
    { id: 1, name: "Project Alpha (Eurenco Defense)", budget: "€8.5M", status: "On Track", percent: 92, risk: "Low" },
    { id: 2, name: "Project Beta (Airbus Helicopters)", budget: "€6.2M", status: "On Track", percent: 88, risk: "Medium" },
    { id: 3, name: "Project Gamma (Novartis)", budget: "€5.8M", status: "At Risk", percent: 72, risk: "High" },
    { id: 4, name: "Project Delta (Caterpillar)", budget: "€4.3M", status: "On Track", percent: 95, risk: "Low" },
    { id: 5, name: "Project Epsilon (Gunvor)", budget: "€7.1M", status: "Off Track", percent: 58, risk: "Critical" },
    { id: 6, name: "Project Zeta (Altran)", budget: "€3.9M", status: "At Risk", percent: 68, risk: "High" },
    { id: 7, name: "Project Eta (Renova9)", budget: "€5.2M", status: "On Track", percent: 91, risk: "Low" },
    { id: 8, name: "Project Theta (Novartis)", budget: "€2.1M", status: "On Track", percent: 89, risk: "Low" },
    { id: 9, name: "Project Iota (Caterpillar)", budget: "€1.8M", status: "At Risk", percent: 75, risk: "Medium" },
    { id: 10, name: "Project Kappa (Eurenco)", budget: "€0.3M", status: "On Track", percent: 100, risk: "Low" },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#BFA76A] flex items-center justify-center rounded-sm">
             <FileText className="text-black" size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wider">RAPPORT TRIMESTRIEL Q4 2025</h1>
            <p className="text-gray-500 text-sm">Généré automatiquement le 15 Janvier 2026</p>
          </div>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-[#1C1C1C] hover:bg-[#BFA76A] hover:text-black text-white px-4 py-2 rounded-sm transition-colors text-sm font-bold uppercase tracking-wider">
          <Download size={16} /> Export PDF
        </button>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div className="bg-[#111] p-6 rounded-sm border-l-4 border-[#BFA76A] mb-10">
        <h2 className="text-[#BFA76A] font-bold uppercase tracking-widest text-sm mb-2">Executive Summary</h2>
        <p className="text-gray-300 leading-relaxed">
          Le portefeuille Q4 2025 affiche une performance solide avec <span className="text-white font-bold">67% des projets "On Track"</span>. 
          Le budget global reste maîtrisé avec une variance de -2.1%. Cependant, le projet Epsilon nécessite une intervention immédiate (Ressources).
          L'alignement stratégique atteint 87%, validant la direction prise lors du dernier COPIL.
        </p>
      </div>

      {/* SECTION 1: PORTFOLIO OVERVIEW */}
      <h2 className="text-xl font-light text-white mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-[#BFA76A]"/> PORTFOLIO OVERVIEW</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card className="text-center py-6">
          <div className="text-3xl font-bold text-white mb-1">12</div>
          <div className="text-xs text-gray-500 uppercase">Total Projects</div>
        </Card>
        <Card className="text-center py-6">
          <div className="text-3xl font-bold text-green-500 mb-1">67%</div>
          <div className="text-xs text-gray-500 uppercase">On Track (8)</div>
        </Card>
        <Card className="text-center py-6">
          <div className="text-3xl font-bold text-white mb-1">€45.2M</div>
          <div className="text-xs text-gray-500 uppercase">Total Budget</div>
        </Card>
        <Card className="text-center py-6">
          <div className="text-3xl font-bold text-[#BFA76A] mb-1">73%</div>
          <div className="text-xs text-gray-500 uppercase">Budget Spent</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="flex flex-col items-center justify-center p-6 bg-red-900/10 border border-red-500/20">
           <AlertTriangle size={32} className="text-red-500 mb-2"/>
           <div className="text-2xl font-bold text-white">1</div>
           <div className="text-xs text-red-400 font-bold uppercase">Off Track</div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 bg-yellow-900/10 border border-yellow-500/20">
           <AlertTriangle size={32} className="text-yellow-500 mb-2"/>
           <div className="text-2xl font-bold text-white">3</div>
           <div className="text-xs text-yellow-400 font-bold uppercase">At Risk</div>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 bg-green-900/10 border border-green-500/20">
           <CheckCircle size={32} className="text-green-500 mb-2"/>
           <div className="text-2xl font-bold text-white">156</div>
           <div className="text-xs text-green-400 font-bold uppercase">Days Remaining</div>
        </Card>
      </div>

      {/* SECTION 2: PROJECT DETAILS TABLE */}
      <h2 className="text-xl font-light text-white mb-6">PROJECT DETAILS</h2>
      <Card className="mb-12 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#1C1C1C] text-gray-400 text-xs uppercase font-bold">
              <tr>
                <th className="p-4">Project Name</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Completion</th>
                <th className="p-4">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium text-white">{p.name}</td>
                  <td className="p-4 text-gray-300">{p.budget}</td>
                  <td className="p-4"><StatusBadge status={p.status} /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-[#333] rounded-full">
                        <div className="h-full bg-[#BFA76A] rounded-full" style={{ width: `${p.percent}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-400">{p.percent}%</span>
                    </div>
                  </td>
                  <td className="p-4"><RiskBadge level={p.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* SECTION 3 & 4: METRICS & RISKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
           <h2 className="text-xl font-light text-white mb-6">KEY METRICS</h2>
           <Card className="space-y-6">
              {[
                { label: "Portfolio Health Score", value: "78/100", color: "text-[#BFA76A]" },
                { label: "Budget Variance", value: "-2.1%", sub: "(Excellent)", color: "text-green-500" },
                { label: "Schedule Variance", value: "+3.2%", sub: "(Good)", color: "text-green-500" },
                { label: "Risk Mitigation Rate", value: "85%", color: "text-blue-500" },
                { label: "Stakeholder Satisfaction", value: "4.2/5", color: "text-[#BFA76A]" },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 last:border-0 pb-4 last:pb-0">
                   <span className="text-gray-400">{m.label}</span>
                   <div className="text-right">
                      <span className={`text-xl font-bold ${m.color}`}>{m.value}</span>
                      {m.sub && <span className="block text-xs text-gray-500">{m.sub}</span>}
                   </div>
                </div>
              ))}
           </Card>
        </div>
        <div>
           <h2 className="text-xl font-light text-white mb-6">CRITICAL RISKS</h2>
           <div className="space-y-4">
              {[
                { id: "Epsilon", title: "Resource shortage", desc: "3 engineers missing for backend phase", impact: "High" },
                { id: "Gamma", title: "Supplier delay", desc: "2 weeks impact on critical path", impact: "Medium" },
                { id: "Zeta", title: "Technical complexity", desc: "Architecture underestimated", impact: "High" }
              ].map((r, i) => (
                <div key={i} className="bg-[#1C1C1C] p-4 rounded-sm border-l-4 border-red-500">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-bold">{r.title}</h4>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Project {r.id}</span>
                   </div>
                   <p className="text-gray-400 text-sm">{r.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* SECTION 5: RECOMMENDATIONS */}
      <div className="bg-gradient-to-r from-[#1C1C1C] to-[#111] p-8 rounded-sm mb-12 border border-[#BFA76A]/20">
         <h2 className="text-xl font-light text-white mb-6">RECOMMENDATIONS</h2>
         <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-300">
               <CheckCircle size={20} className="text-[#BFA76A] mt-1 shrink-0" />
               <span>Reallocate 2 engineers from <span className="text-white font-bold">Project Delta</span> to <span className="text-white font-bold">Project Epsilon</span> to mitigate delays.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
               <CheckCircle size={20} className="text-[#BFA76A] mt-1 shrink-0" />
               <span>Negotiate supplier timeline with <span className="text-white font-bold">Gamma</span> stakeholders to absorb the 2-week slip.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-300">
               <CheckCircle size={20} className="text-[#BFA76A] mt-1 shrink-0" />
               <span>Conduct immediate technical review for <span className="text-white font-bold">Project Zeta</span>.</span>
            </li>
         </ul>
      </div>

      {/* SECTION 6: FINANCIAL SUMMARY */}
      <h2 className="text-xl font-light text-white mb-6">FINANCIAL SUMMARY</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: "Q4 Spend", val: "€12.8M" },
           { label: "Forecast Final Cost", val: "€44.1M", sub: "Within budget" },
           { label: "CPI (Cost Perf.)", val: "1.02", sub: "Excellent" },
           { label: "Earned Value", val: "€33.2M" }
         ].map((f, i) => (
           <Card key={i} className="bg-[#111] border border-white/5">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">{f.label}</div>
              <div className="text-2xl font-bold text-white">{f.val}</div>
              {f.sub && <div className="text-xs text-[#BFA76A] mt-1">{f.sub}</div>}
           </Card>
         ))}
      </div>

    </div>
  );
};

export default Reporting;