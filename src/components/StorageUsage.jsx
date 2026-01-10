
import React, { useEffect, useState } from 'react';
import { storageService } from '@/lib/storageService';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const StorageUsage = () => {
  const { user } = useAuth();
  const [usage, setUsage] = useState({ used: 0, total: 10 * 1024 * 1024 * 1024, percentage: 0 });

  useEffect(() => {
    if (user) {
      storageService.getStorageUsage(user.id).then(setUsage);
    }
  }, [user]);

  const getColor = (pct) => {
    if (pct > 80) return 'bg-red-500';
    if (pct > 50) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const formatSize = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(2);

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4 border border-slate-800 mt-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-slate-400 font-medium">Storage Used</span>
        <span className="text-xs text-white">{formatSize(usage.used)} GB / {formatSize(usage.total)} GB</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${getColor(usage.percentage)} transition-all duration-500`} 
          style={{ width: `${Math.max(usage.percentage, 5)}%` }} // Min 5% for visibility
        />
      </div>
    </div>
  );
};

export default StorageUsage;
