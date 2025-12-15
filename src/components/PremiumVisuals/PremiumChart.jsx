import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Loader2, AlertCircle, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const PremiumChart = ({ 
  type = 'area', 
  data, 
  xKey, 
  series, 
  height = 300, 
  loading = false, 
  error = null,
  className
}) => {
  // 1. Safe Defaults & Data Validation
  const safeData = useMemo(() => {
    if (!data) return [];
    if (!Array.isArray(data)) return [];
    return data;
  }, [data]);

  const safeSeries = useMemo(() => {
    if (!series) return [];
    if (!Array.isArray(series)) return [];
    return series.filter(s => s && s.key); // Ensure valid series objects
  }, [series]);

  const ChartComponent = type === 'bar' ? BarChart : AreaChart;

  // 2. Loading State
  if (loading) {
    return (
      <div style={{ height }} className={cn("w-full flex flex-col items-center justify-center bg-[#111] border border-[#222] rounded-xl animate-pulse", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-[#BFA76A] mb-2" />
        <span className="text-gray-400 text-sm font-medium">Chargement des données...</span>
      </div>
    );
  }

  // 3. Error State
  if (error) {
    console.error("PremiumChart Error:", error);
    return (
      <div style={{ height }} className={cn("w-full flex flex-col items-center justify-center bg-[#111] border border-red-900/30 rounded-xl", className)}>
        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
        <span className="text-red-400 text-sm font-medium px-4 text-center">Erreur: {error}</span>
      </div>
    );
  }

  // 4. Empty Data State
  if (safeData.length === 0 || safeSeries.length === 0) {
    return (
      <div style={{ height }} className={cn("w-full flex flex-col items-center justify-center bg-[#111] border border-[#222] rounded-xl border-dashed", className)}>
        <BarChart3 className="h-10 w-10 text-gray-700 mb-3" />
        <span className="text-gray-500 text-sm font-medium">Aucune donnée disponible pour le graphique</span>
      </div>
    );
  }

  // 5. Render Chart
  return (
    <div style={{ width: '100%', height }} className={cn("relative", className)}>
      <ResponsiveContainer>
        <ChartComponent data={safeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.5} />
          <XAxis 
            dataKey={xKey} 
            stroke="#666" 
            tick={{ fill: '#888', fontSize: 11 }} 
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#666" 
            tick={{ fill: '#888', fontSize: 11 }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            dx={-10}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0A0A0A', 
              borderColor: '#333', 
              color: '#fff', 
              borderRadius: '8px', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
            }}
            itemStyle={{ color: '#ccc', fontSize: '12px', padding: '2px 0' }}
            cursor={{ fill: 'rgba(191, 167, 106, 0.05)' }}
            formatter={(value) => [value, '']}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }} 
            iconType="circle"
            formatter={(value) => <span style={{ color: '#999', fontSize: '12px', marginLeft: '5px' }}>{value}</span>}
          />
          {safeSeries.map((s, index) => (
            type === 'bar' ? (
              <Bar 
                key={s.key || index} 
                dataKey={s.key} 
                name={s.name} 
                fill={s.color || `hsl(${index * 45}, 70%, 50%)`} 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            ) : (
              <Area 
                key={s.key || index} 
                type="monotone" 
                dataKey={s.key} 
                name={s.name} 
                stroke={s.color || `hsl(${index * 45}, 70%, 50%)`} 
                fill={s.color || `hsl(${index * 45}, 70%, 50%)`} 
                fillOpacity={0.15} 
                strokeWidth={2}
                animationDuration={1500}
              />
            )
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default PremiumChart;