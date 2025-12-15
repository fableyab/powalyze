import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Upload } from 'lucide-react';
import { DashboardHeader, KPICard, StatusBadge } from '@/components/ui/DashboardComponents';
import { Link } from 'react-router-dom';

const Executive = () => {
  const { t } = useLanguage();
  
  // Example Data
  const portfolioHealth = [
    { name: 'On Track', value: 65, color: 'bg-green-500' },
    { name: 'At Risk', value: 25, color: 'bg-yellow-500' },
    { name: 'Critical', value: 10, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title={t('dashboardNav.executive')} 
        subtitle="Global portfolio overview and strategic alignment." 
      />

      {/* Upload Widget (New Integration) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#111] border border-[#222] rounded-lg p-4 flex items-center justify-between"
      >
         <div className="flex items-center gap-4">
            <div className="p-3 bg-[#BFA76A]/10 rounded-full text-[#BFA76A]">
               <Upload size={20} />
            </div>
            <div>
               <h4 className="text-white font-medium">Data Integration</h4>
               <p className="text-xs text-gray-400">Upload recent project data to refresh Power BI dashboards.</p>
            </div>
         </div>
         <Link to="/upload-excel" className="bg-[#BFA76A] hover:bg-[#a89055] text-black px-4 py-2 rounded text-sm font-medium transition-colors">
            {t('upload.title')}
         </Link>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Budget" 
          value="€12.5M" 
          change="+2.4%" 
          trend="up" 
          icon={BarChart3}
        />
        <KPICard 
          title="Active Projects" 
          value="42" 
          change="+4" 
          trend="up" 
          icon={CheckCircle2}
        />
        <KPICard 
          title="Critical Risks" 
          value="3" 
          change="-2" 
          trend="down" 
          icon={AlertTriangle}
          trendColor="text-green-500" // Less risks is good
        />
        <KPICard 
          title="ROI (YTD)" 
          value="14.2%" 
          change="+1.1%" 
          trend="up" 
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Portfolio Health */}
        <div className="lg:col-span-2 bg-[#1C1C1C] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium text-white mb-6">Portfolio Health Status</h3>
          <div className="space-y-6">
            {portfolioHealth.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-white font-mono">{item.value}%</span>
                </div>
                <div className="h-2 bg-[#111] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#333]">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Strategic Alerts</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <StatusBadge status="critical" />
                <span>Migration Cloud EMEA - Delay risk > 2 weeks</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <StatusBadge status="warning" />
                <span>ERP Integration - Budget threshold reached (85%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#333]">
          <h3 className="text-lg font-medium text-white mb-6">Recent Activity</h3>
          <div className="space-y-6 relative before:absolute before:left-[15px] before:top-10 before:bottom-0 before:w-[1px] before:bg-[#333]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="w-8 h-8 rounded-full bg-[#252525] border border-[#333] flex items-center justify-center shrink-0 z-10">
                  <div className="w-2 h-2 bg-[#BFA76A] rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-white">Project Alpha validation gate passed</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago • By Fabrice Fays</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Executive;