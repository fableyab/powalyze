
import React from 'react';
import { Activity, Server, Database, ShieldCheck, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SystemHealth = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">System Health</h1>
          <p className="text-slate-500">Real-time infrastructure monitoring status.</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/50 px-4 py-1">
          All Systems Operational
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthCard 
          title="API Gateway" 
          status="Operational" 
          uptime="99.99%" 
          latency="45ms" 
          icon={Server}
          color="emerald"
        />
        <HealthCard 
          title="Database Cluster" 
          status="Operational" 
          uptime="99.95%" 
          latency="12ms" 
          icon={Database}
          color="emerald"
        />
        <HealthCard 
          title="Auth Service" 
          status="Operational" 
          uptime="100%" 
          latency="85ms" 
          icon={ShieldCheck}
          color="emerald"
        />
      </div>

      <div className="bg-[#141414] rounded-xl border border-slate-800 p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4A574]" /> Performance Metrics
        </h3>
        
        <div className="space-y-6">
          <MetricRow label="CPU Usage (Cluster A)" value={42} />
          <MetricRow label="Memory Usage" value={68} />
          <MetricRow label="Storage (S3 Buckets)" value={24} />
          <MetricRow label="API Error Rate" value={0.02} color="bg-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#141414] rounded-xl border border-slate-800 p-6">
           <h3 className="text-lg font-bold text-white mb-4">Recent Incidents</h3>
           <div className="space-y-4">
             <div className="flex gap-3 items-start p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Scheduled Maintenance Completed</div>
                  <div className="text-xs text-slate-500">2 days ago • Database optimization</div>
                </div>
             </div>
             <div className="flex gap-3 items-start p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">High Latency Detected</div>
                  <div className="text-xs text-slate-500">5 days ago • EU-West Region</div>
                </div>
             </div>
           </div>
        </div>

        <div className="bg-[#141414] rounded-xl border border-slate-800 p-6">
           <h3 className="text-lg font-bold text-white mb-4">Environment Info</h3>
           <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Environment</span>
                <span className="text-white font-mono">Production (v2.4.1)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Region</span>
                <span className="text-white font-mono">Switzerland North (Zurich)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Compliance Mode</span>
                <span className="text-[#D4A574] font-mono">FINMA Enabled</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Last Deployment</span>
                <span className="text-white font-mono">2025-01-04 08:30 UTC</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const HealthCard = ({ title, status, uptime, latency, icon: Icon, color }) => (
  <div className="bg-[#141414] p-6 rounded-xl border border-slate-800 relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}-500/10 rounded-bl-full`} />
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 bg-${color}-500/20 text-${color}-500 rounded-lg`}>
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-white">{title}</h3>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-slate-500 uppercase">Status</div>
        <div className={`text-sm font-bold text-${color}-500`}>{status}</div>
      </div>
      <div>
        <div className="text-xs text-slate-500 uppercase">Uptime</div>
        <div className="text-sm font-bold text-white">{uptime}</div>
      </div>
    </div>
  </div>
);

const MetricRow = ({ label, value, color = "bg-[#D4A574]" }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-mono">{value}%</span>
    </div>
    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default SystemHealth;
