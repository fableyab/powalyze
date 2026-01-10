
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Generate massive amount of mock data to demonstrate virtualization
const generateLogs = (count) => {
    const actions = ['LOGIN', 'PROJECT_CREATE', 'BUDGET_UPDATE', 'RISK_ESCALATE', 'DOC_UPLOAD', 'EXPORT_REPORT'];
    const users = ['Alice Dubois', 'Marc Spencer', 'System Admin', 'API Bot'];
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        action: actions[Math.floor(Math.random() * actions.length)],
        user: users[Math.floor(Math.random() * users.length)],
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleString(),
        details: `Operation ID #${10000 + i} completed successfully via secure channel.`,
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`
    }));
};

const logs = generateLogs(5000); // 5000 rows

const Row = ({ index, style }) => {
    const log = logs[index];
    return (
        <div style={style} className={`flex items-center px-6 border-b border-slate-800 hover:bg-slate-800/30 transition-colors ${index % 2 === 0 ? 'bg-[#0F0F0F]' : 'bg-[#121212]'}`}>
            <div className="w-1/6 text-sm text-[#D4AF37] font-mono">{log.action}</div>
            <div className="w-1/6 text-sm text-slate-300">{log.user}</div>
            <div className="w-1/4 text-sm text-slate-500">{log.timestamp}</div>
            <div className="w-1/4 text-sm text-slate-400 truncate">{log.details}</div>
            <div className="w-1/6 text-xs text-slate-600 font-mono text-right">{log.ip}</div>
        </div>
    );
};

const AuditLogs = ({ language }) => {
    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6" /> Enterprise Audit Trail
                    </h1>
                    <p className="text-slate-500">Immutable record of all system activities (FINMA Compliant).</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                         <Input placeholder="Search logs..." className="pl-10 bg-[#0F0F0F] border-slate-700" />
                    </div>
                    <Button variant="outline" className="border-slate-700 text-slate-300">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button variant="outline" className="border-slate-700 text-slate-300">Export CSV</Button>
                </div>
            </div>

            <div className="flex-1 border border-slate-800 rounded-xl overflow-hidden bg-[#0F0F0F] flex flex-col">
                <div className="flex items-center px-6 py-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
                    <div className="w-1/6">Action</div>
                    <div className="w-1/6">User</div>
                    <div className="w-1/4">Timestamp</div>
                    <div className="w-1/4">Details</div>
                    <div className="w-1/6 text-right">IP Address</div>
                </div>
                <div className="flex-1">
                    <List
                        height={600} // This would be dynamic in a real app (using AutoSizer)
                        itemCount={logs.length}
                        itemSize={50}
                        width="100%"
                    >
                        {Row}
                    </List>
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
