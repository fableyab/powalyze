import React from 'react';
import { PageHeader, KPICard, Card } from '@/components/ui/DashboardComponents';
import { SimpleLineChart, SimpleBarChart, DonutChart } from '@/components/ui/ChartComponents';
import { useLanguage } from '@/context/LanguageContext';

const KPIs = () => {
  const { t } = useLanguage();

  return (
    <div>
      <PageHeader 
        title={t('dashboard.kpis.title')} 
        subtitle={t('dashboard.kpis.subtitle')}
        lastUpdate={t('dashboard.lastUpdate')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <KPICard title={t('dashboard.kpis.cards.budget')} value="2.4M€" trend={-2} trendLabel="vs prev." color="blue" />
        <KPICard title={t('dashboard.kpis.cards.risks')} value="12" trend={-5} trendLabel="active" color="gold" />
        <KPICard title={t('dashboard.kpis.cards.resources')} value="85%" trend={8} trendLabel="allocation" color="blue" />
        <KPICard title={t('dashboard.kpis.cards.quality')} value="98%" trend={1} trendLabel="score" color="gold" />
        <KPICard title={t('dashboard.kpis.cards.delay')} value="45d" trend={-12} trendLabel="days" color="blue" />
        <KPICard title={t('dashboard.kpis.cards.satisfaction')} value="4.8/5" trend={5} trendLabel="NPS" color="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2 h-80">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-light text-white">{t('dashboard.kpis.charts.temporal')}</h3>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3A7BFF]"></span>
              <span className="text-xs text-gray-500">Actual</span>
            </div>
          </div>
          <SimpleLineChart 
            data={[30, 45, 42, 55, 48, 60, 65, 58, 75, 82, 85, 90]} 
            height={200} 
            color="#3A7BFF"
          />
        </Card>
        
        <Card className="h-80 flex flex-col items-center justify-center">
          <h3 className="text-lg font-light text-white mb-6 self-start w-full">{t('dashboard.kpis.charts.status')}</h3>
          <DonutChart percent={76} label="ON TRACK" color="#BFA76A" size={180} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="h-64">
           <h3 className="text-lg font-light text-white mb-6">{t('dashboard.kpis.charts.domain')}</h3>
           <SimpleBarChart 
             data={[80, 45, 60, 90, 30]} 
             labels={['Fin', 'HR', 'Mkt', 'Tech', 'Ops']} 
           />
        </Card>
        <Card className="h-64 col-span-2">
           <h3 className="text-lg font-light text-white mb-4">{t('dashboard.kpis.charts.alerts')}</h3>
           <div className="space-y-3">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center justify-between p-3 bg-[#0A0A0A] border-l-2 border-red-500">
                 <div className="flex flex-col">
                   <span className="text-sm text-white font-medium">Budget drift Alpha Project</span>
                   <span className="text-xs text-gray-500">Estimated Impact: 150k€</span>
                 </div>
                 <button className="text-xs bg-red-500/10 text-red-500 px-3 py-1 rounded uppercase tracking-wider hover:bg-red-500 hover:text-white transition-colors">
                   {t('common.viewDetails') || 'Details'}
                 </button>
               </div>
             ))}
           </div>
        </Card>
      </div>
    </div>
  );
};

export default KPIs;