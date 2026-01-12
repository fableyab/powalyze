import React, { useState, useEffect } from 'react';
import CockpitLayout from "../../components/layout/CockpitLayout";
import { BarChart3, TrendingUp, DollarSign, Target, RefreshCw, Download, Filter, Calendar } from 'lucide-react';

const PortfolioReport = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const portfolioMetrics = [
    { label: 'Total Projects', value: '24', change: '+3', icon: Target, color: 'text-blue-400' },
    { label: 'Active Budget', value: '€12.4M', change: '+8%', icon: DollarSign, color: 'text-green-400' },
    { label: 'ROI Average', value: '124%', change: '+12%', icon: TrendingUp, color: 'text-[#D4AF37]' },
    { label: 'Completion Rate', value: '87%', change: '+5%', icon: BarChart3, color: 'text-purple-400' }
  ];

  const mockProjects = [
    { name: 'Digital Transformation', budget: '€3.2M', progress: 85, status: 'On Track', roi: 145 },
    { name: 'Cloud Migration', budget: '€2.8M', progress: 72, status: 'On Track', roi: 132 },
    { name: 'AI Integration', budget: '€1.9M', progress: 45, status: 'At Risk', roi: 98 },
    { name: 'Customer Portal', budget: '€1.5M', progress: 92, status: 'On Track', roi: 156 },
    { name: 'Security Upgrade', budget: '€1.2M', progress: 68, status: 'On Track', roi: 118 }
  ];

  return (
    <CockpitLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extralight text-white tracking-tight mb-2">Portfolio Report</h1>
          <p className="text-xs text-white/40 tracking-[0.1em] uppercase">Strategic Portfolio Analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] text-xs text-white/60 hover:text-white hover:border-white/10 transition-all duration-500 flex items-center gap-2">
            <Filter className="w-3 h-3" />
            Filter
          </button>
          <button className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] text-xs text-white/60 hover:text-white hover:border-white/10 transition-all duration-500 flex items-center gap-2">
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
          <button className="px-6 py-2 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase flex items-center gap-2">
            <Download className="w-3 h-3" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {portfolioMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 hover:border-white/10 transition-all duration-500">
              <div className="flex items-start justify-between mb-4">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <span className="text-xs text-green-400 font-light">{metric.change}</span>
              </div>
              <div className="text-3xl font-extralight text-white mb-1">{metric.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-[0.15em]">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Portfolio Overview */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-6 mb-8">
        <h2 className="text-lg font-light text-white mb-6 tracking-tight">Portfolio Overview</h2>
        <div className="space-y-4">
          {mockProjects.map((project, idx) => (
            <div key={idx} className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2px] p-4 hover:border-white/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-light text-white mb-1">{project.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span>Budget: {project.budget}</span>
                    <span>•</span>
                    <span>ROI: {project.roi}%</span>
                    <span>•</span>
                    <span className={project.status === 'On Track' ? 'text-green-400' : 'text-yellow-400'}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-light text-white/60">{project.progress}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-blue-400 rounded-full transition-all duration-700"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Power BI Embed Placeholder */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-[2px] p-12 text-center">
        <BarChart3 className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
        <h3 className="text-xl font-extralight text-white mb-3">Power BI Integration</h3>
        <p className="text-sm text-white/50 max-w-md mx-auto mb-6">
          Connect your Power BI workspace to display interactive reports and dashboards here.
        </p>
        <button className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-[2px] text-xs font-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-500 tracking-[0.2em] uppercase">
          Configure Power BI
        </button>
      </div>
    </CockpitLayout>
  );
};

export default PortfolioReport;
