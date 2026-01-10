
import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, Database, AlertTriangle, Eye, Download, Search, Filter, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/customSupabaseClient';

// Mock Data Generators for Visualization (since we don't have real audit logs populated yet)
const mockLogs = [
  { id: 1, action: 'UPDATE', entity: 'Project', user: 'admin@swissbank.ch', time: '2 mins ago', severity: 'info', details: 'Budget increased by 50k' },
  { id: 2, action: 'DELETE', entity: 'Document', user: 'pmo@swissbank.ch', time: '1 hour ago', severity: 'warning', details: 'Deleted confidential report' },
  { id: 3, action: 'LOGIN', entity: 'Auth', user: 'audit@swissbank.ch', time: '3 hours ago', severity: 'info', details: 'Successful login from CH-ZH' },
  { id: 4, action: 'EXPORT', entity: 'GDPR', user: 'dpo@swissbank.ch', time: '5 hours ago', severity: 'critical', details: 'Full data export for User #123' },
];

const AuditDashboard = () => {
  const [activeTab, setActiveTab] = useState('logs');

  return (
    <div className="space-y-6 p-6 bg-slate-950 min-h-screen text-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#D4A574]">Audit & Compliance Dashboard</h1>
          <p className="text-slate-400">FINMA Regulatory Monitoring & Security Operations Center</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-white">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-[#D4A574] hover:bg-[#b88d5f] text-black font-bold">
            <ShieldCheck className="mr-2 h-4 w-4" /> Compliance Check
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">Total Audit Logs (30d)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-white">142,893</div></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">Critical Security Events</CardTitle></CardHeader>
          <CardContent className="flex justify-between items-end">
            <div className="text-2xl font-bold text-red-500">3</div>
            <Badge variant="outline" className="border-red-500 text-red-500 text-xs">Action Required</Badge>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">GDPR Requests</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-blue-400">12</div></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-400">Compliance Score</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-500">98.5%</div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-900 border border-slate-800 p-1">
          <TabsTrigger value="logs">Audit Trail</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="classification">Data Classification</TabsTrigger>
          <TabsTrigger value="gdpr">GDPR Requests</TabsTrigger>
        </TabsList>

        {/* Audit Logs Section */}
        <TabsContent value="logs" className="mt-6 space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input placeholder="Search by user, action, or entity ID..." className="pl-10 bg-slate-900 border-slate-800 text-white" />
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
          
          <div className="rounded-md border border-slate-800 bg-slate-900 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-950 text-slate-400 font-medium border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Severity</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {mockLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-3 text-slate-300">{log.time}</td>
                    <td className="px-4 py-3 text-white font-medium">{log.user}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`
                        ${log.action === 'DELETE' ? 'border-red-500 text-red-500' : 
                          log.action === 'UPDATE' ? 'border-blue-500 text-blue-500' : 
                          'border-slate-500 text-slate-400'}
                      `}>
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{log.entity}</td>
                    <td className="px-4 py-3">
                      {log.severity === 'critical' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {log.severity === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {log.severity === 'info' && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
                    </td>
                    <td className="px-4 py-3 text-slate-400 truncate max-w-xs">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Compliance Status Section */}
        <TabsContent value="compliance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader><CardTitle className="text-white flex items-center gap-2"><Lock className="h-5 w-5 text-amber-500" /> FINMA Status</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Audit Trail Integrity</span>
                  <Badge className="bg-emerald-500 text-white">Verified</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Data Residency (CH)</span>
                  <Badge className="bg-emerald-500 text-white">Compliant</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Access Control Logs</span>
                  <Badge className="bg-emerald-500 text-white">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader><CardTitle className="text-white flex items-center gap-2"><Database className="h-5 w-5 text-blue-500" /> Data Retention</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Audit Logs</span>
                  <span className="text-[#D4A574]">10 Years (Banking)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Project Documents</span>
                  <span className="text-[#D4A574]">7 Years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Snapshots & Reports</span>
                  <span className="text-[#D4A574]">5 Years</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 border-slate-700 text-slate-300">Configure Retention Policies</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
            <Card className="bg-slate-900 border-slate-800 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Security Events Monitor</h3>
                <p className="text-slate-400 mb-4">Real-time threat detection and anomaly monitoring.</p>
                <div className="p-4 bg-slate-950 rounded border border-slate-800 inline-block text-left w-full max-w-2xl">
                     <code className="text-green-400 text-sm block">System Check: OK</code>
                     <code className="text-green-400 text-sm block">Firewall Status: Active</code>
                     <code className="text-green-400 text-sm block">RLS Policy Enforcement: Strict</code>
                     <code className="text-amber-400 text-sm block mt-2">Warning: 3 failed login attempts from IP 192.168.1.55</code>
                </div>
            </Card>
        </TabsContent>

        <TabsContent value="classification" className="mt-6">
             <Card className="bg-slate-900 border-slate-800">
                 <CardHeader><CardTitle className="text-white">Data Asset Inventory</CardTitle></CardHeader>
                 <CardContent>
                     <table className="w-full text-sm text-left">
                        <thead className="text-slate-400 border-b border-slate-800">
                            <tr>
                                <th className="p-2">Table</th>
                                <th className="p-2">Column</th>
                                <th className="p-2">Classification</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300 divide-y divide-slate-800">
                            <tr>
                                <td className="p-2">profiles</td>
                                <td className="p-2">email</td>
                                <td className="p-2"><Badge className="bg-red-900 text-red-200 border-red-800">Confidential (PII)</Badge></td>
                                <td className="p-2"><Button size="sm" variant="ghost">Edit</Button></td>
                            </tr>
                            <tr>
                                <td className="p-2">projects</td>
                                <td className="p-2">budget_actual</td>
                                <td className="p-2"><Badge className="bg-amber-900 text-amber-200 border-amber-800">Restricted</Badge></td>
                                <td className="p-2"><Button size="sm" variant="ghost">Edit</Button></td>
                            </tr>
                            <tr>
                                <td className="p-2">tenants</td>
                                <td className="p-2">name</td>
                                <td className="p-2"><Badge className="bg-blue-900 text-blue-200 border-blue-800">Internal</Badge></td>
                                <td className="p-2"><Button size="sm" variant="ghost">Edit</Button></td>
                            </tr>
                        </tbody>
                     </table>
                 </CardContent>
             </Card>
        </TabsContent>
        
        <TabsContent value="gdpr" className="mt-6">
            <div className="grid gap-4">
                 <div className="bg-slate-900 p-4 rounded border border-slate-800 flex justify-between items-center">
                      <div>
                          <h4 className="font-bold text-white">Request #GDPR-2026-001</h4>
                          <p className="text-sm text-slate-400">Right to Access (Data Portability)</p>
                      </div>
                      <div className="flex items-center gap-3">
                          <Badge className="bg-blue-500">Pending Approval</Badge>
                          <Button size="sm" className="bg-[#D4A574] text-black hover:bg-[#b88d5f]">Process Request</Button>
                      </div>
                 </div>
                 <div className="bg-slate-900 p-4 rounded border border-slate-800 flex justify-between items-center">
                      <div>
                          <h4 className="font-bold text-white">Request #GDPR-2026-002</h4>
                          <p className="text-sm text-slate-400">Right to be Forgotten</p>
                      </div>
                      <div className="flex items-center gap-3">
                          <Badge className="bg-emerald-500">Completed</Badge>
                          <Button size="sm" variant="outline" disabled>Archived</Button>
                      </div>
                 </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditDashboard;
