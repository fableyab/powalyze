import React from 'react';
import { PageHeader, Card } from '@/components/ui/DashboardComponents';
import { GanttChart } from '@/components/ui/AdvancedCharts';
import { PieChart, Briefcase, Target, ShieldCheck } from 'lucide-react';

const MetricBox = ({ label, value, sub }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-2xl font-bold text-white mb-1">{value}</span>
    <span className="text-[10px] text-[#BFA76A]">{sub}</span>
  </div>
);

const Portfolios = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <div className="mb-10 bg-[#1C1C1C] p-8 rounded-sm border-l-4 border-[#BFA76A] flex flex-col md:flex-row justify-between items-end">
         <div>
            <div className="flex items-center gap-2 mb-2">
               <Briefcase className="text-[#BFA76A]" size={20} />
               <span className="text-[#BFA76A] font-bold uppercase tracking-widest text-xs">Strategic PMO</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">PMO STRATÉGIQUE</h1>
            <p className="text-gray-400">Pilotage de portefeuille • Alignement • Performance</p>
         </div>
         <div className="text-right mt-6 md:mt-0">
            <div className="text-4xl font-bold text-white">87<span className="text-lg text-gray-500">/100</span></div>
            <div className="text-xs text-[#BFA76A] uppercase tracking-wider">Strategic Alignment Score</div>
         </div>
      </div>

      {/* SECTION 1: STRATEGIC ALIGNMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         <Card className="lg:col-span-2">
            <h3 className="text-lg font-light text-white mb-6 flex items-center gap-2">
               <Target size={18} className="text-[#BFA76A]"/> Strategic Objectives
            </h3>
            <div className="space-y-4">
               {[
                 { name: "Digital Transformation", count: 3, budget: "€12.5M", width: "80%" },
                 { name: "Operational Excellence", count: 4, budget: "€15.8M", width: "95%" },
                 { name: "Innovation & R&D", count: 2, budget: "€8.2M", width: "50%" },
                 { name: "Risk Mitigation", count: 2, budget: "€5.1M", width: "35%" },
                 { name: "Sustainability", count: 1, budget: "€3.6M", width: "20%" },
               ].map((obj, i) => (
                  <div key={i} className="group">
                     <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span className="font-medium text-white">{obj.name}</span>
                        <span className="text-gray-500">{obj.count} projects • {obj.budget}</span>
                     </div>
                     <div className="w-full h-2 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full bg-[#BFA76A] group-hover:bg-white transition-colors duration-300" style={{ width: obj.width }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </Card>

         <Card className="flex flex-col justify-between">
            <h3 className="text-lg font-light text-white mb-4">Strategic Metrics</h3>
            <div className="space-y-6">
               <MetricBox label="Value Realization" value="76%" sub="Target: 80%" />
               <MetricBox label="Initiative Completion" value="82%" sub="On Track" />
               <MetricBox label="Business Case ROI" value="245%" sub="Exceeding expectations" />
               <MetricBox label="Time-to-Value" value="14 mo" sub="Average" />
            </div>
         </Card>
      </div>

      {/* SECTION 2 & 4: BALANCE & GOVERNANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         <Card>
            <h3 className="text-lg font-light text-white mb-6 flex items-center gap-2">
               <PieChart size={18} className="text-[#BFA76A]"/> Portfolio Balance
            </h3>
            <div className="flex items-center justify-around h-48">
               {/* Simple SVG Pie Chart simulation */}
               <div className="relative w-32 h-32 rounded-full border-[16px] border-[#1C1C1C] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[16px] border-[#BFA76A] border-l-transparent border-b-transparent rotate-45"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-[#3A7BFF] border-t-transparent border-r-transparent -rotate-12 opacity-60"></div>
                  <span className="text-xs font-bold text-white">Mixed</span>
               </div>
               <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#BFA76A]"></div> Digital Trans.</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#3A7BFF]"></div> Ops Excellence</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 bg-gray-600"></div> Innovation</div>
               </div>
            </div>
         </Card>

         <Card>
            <h3 className="text-lg font-light text-white mb-6 flex items-center gap-2">
               <ShieldCheck size={18} className="text-[#BFA76A]"/> Governance Structure
            </h3>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { title: "Steering Committee", freq: "Monthly", color: "border-[#BFA76A]" },
                 { title: "PMO Director", freq: "Weekly", color: "border-blue-500" },
                 { title: "Project Managers", freq: "Daily Updates", color: "border-gray-500" },
                 { title: "Stakeholders", freq: "Quarterly", color: "border-gray-500" }
               ].map((g, i) => (
                  <div key={i} className={`p-4 bg-[#111] border-l-2 ${g.color}`}>
                     <div className="text-sm font-bold text-white">{g.title}</div>
                     <div className="text-xs text-gray-500">{g.freq}</div>
                  </div>
               ))}
            </div>
         </Card>
      </div>

      {/* SECTION 5: RESOURCE ALLOCATION */}
      <Card className="mb-8">
         <div className="flex justify-between items-end mb-6">
            <h3 className="text-lg font-light text-white">Resource Allocation</h3>
            <div className="flex gap-4 text-xs">
               <span className="text-gray-400">Total FTE: <span className="text-white font-bold">145</span></span>
               <span className="text-[#BFA76A]">Allocated: <span className="font-bold">128 (88%)</span></span>
               <span className="text-gray-400">Available: <span className="text-white font-bold">17</span></span>
            </div>
         </div>
         <div className="space-y-4">
            <div>
               <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Engineering</span>
                  <span className="text-white font-bold">92%</span>
               </div>
               <div className="w-full h-2 bg-[#111] rounded-full"><div className="h-full bg-red-500 w-[92%] rounded-full"></div></div>
            </div>
            <div>
               <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">Project Management</span>
                  <span className="text-white font-bold">85%</span>
               </div>
               <div className="w-full h-2 bg-[#111] rounded-full"><div className="h-full bg-[#BFA76A] w-[85%] rounded-full"></div></div>
            </div>
            <div>
               <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">QA / Testing</span>
                  <span className="text-white font-bold">78%</span>
               </div>
               <div className="w-full h-2 bg-[#111] rounded-full"><div className="h-full bg-blue-500 w-[78%] rounded-full"></div></div>
            </div>
         </div>
      </Card>

      {/* SECTION 6: ROADMAP */}
      <Card>
         <h3 className="text-lg font-light text-white mb-6">Strategic Roadmap 2025</h3>
         <GanttChart tasks={[
           { name: "Digital Core V1", start: 0, duration: 40, status: "In Progress" },
           { name: "Cloud Migration", start: 20, duration: 30, status: "Planned" },
           { name: "AI Pilot Alpha", start: 10, duration: 25, status: "Completed" },
           { name: "Security Audit", start: 45, duration: 15, status: "Planned" },
           { name: "ERP Upgrade", start: 30, duration: 50, status: "In Progress" }
         ]} />
      </Card>

    </div>
  );
};

export default Portfolios;