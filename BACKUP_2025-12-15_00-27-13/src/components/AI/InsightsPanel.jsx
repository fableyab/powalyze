import React, { useEffect, useState } from 'react';
import { useAI } from '@/hooks/useAI';
import { Sparkles, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingStates/LoadingSpinner';

const InsightsPanel = ({ data, autoLoad = true }) => {
  const { generateInsights, loading } = useAI();
  const [insights, setInsights] = useState(null);

  const loadInsights = async () => {
    const result = await generateInsights(data);
    if (result) setInsights(result);
  };

  useEffect(() => {
    if (autoLoad && data) {
      loadInsights();
    }
  }, [data]);

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="text-[#BFA76A]" size={20} /> AI Insights
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={loadInsights} 
          disabled={loading}
          className="text-gray-400 hover:text-white"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </Button>
      </div>

      {loading && !insights ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <LoadingSpinner className="mb-3" />
          <span className="text-sm">Analyzing data patterns...</span>
        </div>
      ) : insights ? (
        <div className="space-y-4">
          {insights.insights.map((insight, idx) => (
            <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/5 flex gap-3 items-start">
              <div className="mt-1">
                {insight.includes('risk') || insight.includes('delayed') ? (
                  <AlertTriangle size={16} className="text-red-400" />
                ) : (
                  <TrendingUp size={16} className="text-green-400" />
                )}
              </div>
              <p className="text-sm text-gray-300">{insight}</p>
            </div>
          ))}
          <div className="pt-2 text-xs text-gray-600 flex justify-between">
            <span>Confidence Score: {(insights.confidence * 100).toFixed(0)}%</span>
            <span>Generated: {new Date(insights.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 text-sm">
          No insights generated yet. Click refresh to analyze.
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;