import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PowerBIDashboard = ({ reportId, title = "Power BI Report", height = "600px" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate embed load
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col" style={{ height }}>
      {/* Header */}
      <div className="bg-[#1A1A1A] border-b border-white/10 px-4 py-3 flex justify-between items-center shrink-0">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-[#BFA76A] rounded-sm block"></span>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <RefreshCw size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Maximize2 size={16} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-grow bg-black flex items-center justify-center">
        {loading ? (
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-[#BFA76A] animate-spin mx-auto mb-4" />
            <p className="text-gray-400 animate-pulse">Chargement du rapport sécurisé...</p>
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed border-white/10 rounded-xl bg-[#111] w-3/4">
            <div className="w-20 h-20 mx-auto bg-[#BFA76A]/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-[#BFA76A]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22ZM13 10V18H11V10H13ZM17 14V18H15V14H17ZM9 6V18H7V6H9Z"/>
              </svg>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Composant Power BI</h4>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-4">
              L'intégration Power BI Embedded permet d'afficher ici des rapports interactifs connectés à vos données en temps réel.
            </p>
            <div className="text-xs font-mono text-gray-600 bg-black p-3 rounded text-left overflow-hidden max-w-xs mx-auto">
              <div>Status: Mock Render</div>
              <div>Report ID: {reportId || 'DEMO-REPORT'}</div>
              <div>Security: RLS Active</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerBIDashboard;