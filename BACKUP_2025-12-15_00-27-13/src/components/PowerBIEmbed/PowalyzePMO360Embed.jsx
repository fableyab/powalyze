import React, { useEffect, useState } from 'react';
import { embedTokenService } from '@/services/powerbi/embedTokenService';
import PowerBIEmbeddedReport from './PowerBIEmbeddedReport';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const PowalyzePMO360Embed = ({ reportId, height = "600px" }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  const initReport = async () => {
    setLoading(true);
    try {
      const tokenData = await embedTokenService.generateEmbedToken(reportId);
      setConfig(tokenData);
    } catch (e) {
      console.error("Embed failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initReport();
  }, [reportId]);

  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
             <span className="w-2 h-2 bg-[#F2C811] rounded-full"></span> Live Report View
          </h3>
          <Button variant="ghost" size="sm" onClick={initReport} disabled={loading} className="text-gray-500 hover:text-white">
             <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </Button>
       </div>
       <PowerBIEmbeddedReport embedConfig={config} cssClassName={height} />
    </div>
  );
};

export default PowalyzePMO360Embed;