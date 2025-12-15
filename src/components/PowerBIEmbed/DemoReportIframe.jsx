import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

const DemoReportIframe = ({ 
  embedUrl, 
  title = "Power BI Report", 
  height = "600px",
  className = "" 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fallback if no URL provided
  if (!embedUrl) {
    return (
      <div className={`w-full bg-[#111] border border-white/10 rounded-xl flex items-center justify-center p-8 ${className}`} style={{ height }}>
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h3 className="text-white font-bold mb-1">Report Not Configured</h3>
          <p className="text-gray-400 text-sm">No embed URL was provided for this demo report.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden relative ${className}`} style={{ height }}>
      
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#111] flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#BFA76A] animate-spin mb-4" />
          <p className="text-gray-400 text-sm animate-pulse">Loading secure report...</p>
        </div>
      )}

      <iframe 
        title={title}
        width="100%" 
        height="100%" 
        src={embedUrl} 
        frameBorder="0" 
        allowFullScreen={true}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        className="relative z-0"
      />

      {error && (
         <div className="absolute inset-0 z-20 bg-[#111] flex flex-col items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
            <p className="text-white font-bold">Failed to load report</p>
            <p className="text-gray-400 text-sm mt-2">Please check your connection or the embed URL configuration.</p>
         </div>
      )}
    </div>
  );
};

export default DemoReportIframe;