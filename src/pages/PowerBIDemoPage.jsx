import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import DemoPowerBIEmbed from '@/components/PowerBIEmbed/DemoPowerBIEmbed';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, TrendingUp, LayoutGrid } from 'lucide-react';
import { useDemoMode } from '@/context/DemoModeContext';

const PowerBIDemoPage = () => {
  const [activeReport, setActiveReport] = useState('sales');
  const { isDemoMode, toggleDemoMode } = useDemoMode();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <SEO title="Interactive Power BI Demo" description="Experience our embedded analytics capabilities." />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
             <h1 className="text-4xl font-display font-bold text-white mb-4">
               Embedded Analytics <span className="text-[#BFA76A]">Demo</span>
             </h1>
             <p className="text-gray-400 max-w-2xl">
               Explore how Powalyze integrates powerful Microsoft Power BI reports directly into your workflow. 
               This demo simulates a live connection using our secure embedding architecture.
             </p>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="text-xs text-gray-500 uppercase font-bold">Context</div>
             <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleDemoMode}
                className={isDemoMode ? "bg-[#BFA76A] text-black border-none" : "border-white/20"}
             >
                {isDemoMode ? "Demo Mode: ON" : "Enable Demo Data"}
             </Button>
          </div>
        </div>

        {/* Report Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           <button 
             onClick={() => setActiveReport('sales')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
               activeReport === 'sales' 
                 ? 'bg-[#BFA76A]/10 border-[#BFA76A] text-white' 
                 : 'bg-[#111] border-white/10 text-gray-400 hover:border-white/30'
             }`}
           >
              <BarChart3 size={24} className={activeReport === 'sales' ? 'text-[#BFA76A]' : 'text-gray-500'} />
              <span className="font-bold text-sm">Sales Overview</span>
           </button>

           <button 
             onClick={() => setActiveReport('finance')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
               activeReport === 'finance' 
                 ? 'bg-[#BFA76A]/10 border-[#BFA76A] text-white' 
                 : 'bg-[#111] border-white/10 text-gray-400 hover:border-white/30'
             }`}
           >
              <TrendingUp size={24} className={activeReport === 'finance' ? 'text-[#BFA76A]' : 'text-gray-500'} />
              <span className="font-bold text-sm">Financial Perf.</span>
           </button>

           <button 
             onClick={() => setActiveReport('pmo')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
               activeReport === 'pmo' 
                 ? 'bg-[#BFA76A]/10 border-[#BFA76A] text-white' 
                 : 'bg-[#111] border-white/10 text-gray-400 hover:border-white/30'
             }`}
           >
              <LayoutGrid size={24} className={activeReport === 'pmo' ? 'text-[#BFA76A]' : 'text-gray-500'} />
              <span className="font-bold text-sm">Project Portfolio</span>
           </button>

           <button 
             onClick={() => setActiveReport('risk')}
             className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
               activeReport === 'risk' 
                 ? 'bg-[#BFA76A]/10 border-[#BFA76A] text-white' 
                 : 'bg-[#111] border-white/10 text-gray-400 hover:border-white/30'
             }`}
           >
              <PieChart size={24} className={activeReport === 'risk' ? 'text-[#BFA76A]' : 'text-gray-500'} />
              <span className="font-bold text-sm">Risk Analysis</span>
           </button>
        </div>

        {/* Embed Container */}
        <div className="mb-12">
           <DemoPowerBIEmbed reportType={activeReport} height="700px" />
        </div>

        {/* Technical Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-white mb-2">Secure Embedding</h3>
              <p className="text-gray-400 text-sm">
                 Row-Level Security (RLS) ensures users only see data they are authorized to access, handled via backend token generation.
              </p>
           </div>
           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-white mb-2">Interactive Filtering</h3>
              <p className="text-gray-400 text-sm">
                 Bi-directional communication allows the web app to control report filters and listen to selection events within the report.
              </p>
           </div>
           <div className="bg-[#111] p-6 rounded-xl border border-white/10">
              <h3 className="font-bold text-white mb-2">Custom Layouts</h3>
              <p className="text-gray-400 text-sm">
                 Programmatically switch between desktop and mobile layouts, or hide specific visual headers for a cleaner look.
              </p>
           </div>
        </div>

      </main>
      <FooterSection />
    </div>
  );
};

export default PowerBIDemoPage;