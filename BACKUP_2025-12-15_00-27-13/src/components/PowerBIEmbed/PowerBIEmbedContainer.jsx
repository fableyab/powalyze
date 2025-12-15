import React, { useState, useEffect, useRef } from 'react';
import { powerbiService } from '@/services/powerbiService';
import { buildEmbedConfig, handleEmbedError } from '@/utils/powerbiUtils';
import { reportMapping } from '@/config/reportMapping';
import { Loader2, RefreshCw, AlertCircle, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
// Note: In a real project, you would npm install powerbi-client-react

const PowerBIEmbedContainer = ({ 
  reportKey, 
  title, 
  height = "600px", 
  className,
  showFilters = false,
  showNav = true
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [embedData, setEmbedData] = useState(null);
  const reportRef = useRef(null);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call our service (mock backend)
      const data = await powerbiService.getEmbedToken(reportKey);
      setEmbedData(data);
      
      // In a real implementation with powerbi-client-react:
      // powerbi.embed(reportRef.current, buildEmbedConfig(data, { showFilterPane: showFilters, showNavPane: showNav }));
      
    } catch (err) {
      const handled = handleEmbedError(err);
      setError(handled);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (reportKey) {
      loadReport();
    }
  }, [reportKey]);

  return (
    <div className={cn("w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col", className)} style={{ height }}>
      
      {/* Header Bar */}
      <div className="bg-[#1A1A1A] border-b border-white/10 px-4 py-3 flex justify-between items-center shrink-0">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-[#BFA76A] rounded-sm block"></span>
          {title || "Power BI Report"}
        </h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={loadReport} 
            disabled={loading}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw size={16} className={cn(loading && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Maximize2 size={16} />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative flex-grow bg-black" ref={reportRef}>
        
        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-[#BFA76A] animate-spin mb-4" />
            <p className="text-gray-400 text-sm animate-pulse">
              {t('common.loading', 'Loading Report...')}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 p-6 text-center">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{t('common.error', 'Error Loading Report')}</h4>
            <p className="text-gray-400 max-w-md mb-6">{error.message}</p>
            <Button onClick={loadReport} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              {t('common.retry', 'Try Again')}
            </Button>
            {error.technical && (
              <p className="mt-8 text-xs text-gray-600 font-mono border-t border-white/5 pt-4 max-w-lg truncate">
                Tech Details: {error.technical}
              </p>
            )}
          </div>
        )}

        {/* Mock Report Visualization (Since we don't have a real token) */}
        {!loading && !error && embedData && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505]">
            <div className="text-center p-8 border border-dashed border-white/10 rounded-xl bg-[#111]">
              <div className="w-20 h-20 mx-auto bg-[#BFA76A]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-[#BFA76A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 22H20C21.1 22 22 21.1 22 20V4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V20C2 21.1 2.9 22 4 22ZM13 10V18H11V10H13ZM17 14V18H15V14H17ZM9 6V18H7V6H9Z"/>
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Power BI Embed Mode</h4>
              <p className="text-gray-400 max-w-sm mb-4">
                In a production environment, the interactive Power BI report 
                <strong> {reportMapping[reportKey]?.name} </strong> 
                would appear here.
              </p>
              <div className="text-xs font-mono text-gray-600 bg-black p-3 rounded text-left overflow-hidden max-w-md mx-auto">
                <div>Report ID: {embedData.reportId}</div>
                <div>Token ID: {embedData.tokenId}</div>
                <div>Embed URL: {embedData.embedUrl}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerBIEmbedContainer;