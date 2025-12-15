import React from 'react';
import { Card, KPICard } from '@/components/ui/DashboardComponents';
import { SimpleBarChart, DonutChart } from '@/components/ui/ChartComponents';
import { Database, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

const DataAnalytics = ({ data }) => {
  if (!data || !data.stats) return null;

  const { stats } = data;
  const numColumns = stats.numericColumns || {};
  const metricKeys = Object.keys(numColumns);

  // If we found numeric columns, create some charts
  // Otherwise show generic stats
  
  return (
    <div className="space-y-8">
       {/* KPI Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
             title="Total Records" 
             value={stats.totalRecords || 0} 
             icon={Database}
             color="gold"
          />
          {metricKeys.slice(0, 3).map((key, i) => {
             const stat = numColumns[key];
             return (
               <KPICard 
                  key={key}
                  title={`Avg ${key}`}
                  value={stat.avg.toFixed(1)}
                  trend={0}
                  icon={TrendingUp}
                  color="blue"
               />
             );
          })}
       </div>

       {/* Charts Section */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {metricKeys.length > 0 ? (
             <Card className="h-80">
                <h3 className="text-white font-medium mb-6">Distribution Analysis</h3>
                <SimpleBarChart 
                   data={metricKeys.slice(0, 5).map(k => numColumns[k].avg)}
                   labels={metricKeys.slice(0, 5)}
                   height={200}
                />
             </Card>
          ) : (
             <Card className="h-80 flex flex-col items-center justify-center text-center">
                <AlertCircle className="text-gray-500 mb-2" size={32} />
                <p className="text-gray-400">No numeric data detected for charts.</p>
             </Card>
          )}

          <Card className="h-80 flex flex-col items-center justify-center">
             <h3 className="text-white font-medium mb-4 w-full text-left">Data Health</h3>
             <DonutChart 
                percent={metricKeys.length > 0 ? 100 : 0} 
                label={metricKeys.length > 0 ? "Good" : "No Metrics"} 
                size={160}
                color="#BFA76A" 
             />
          </Card>
       </div>
    </div>
  );
};

export default DataAnalytics;