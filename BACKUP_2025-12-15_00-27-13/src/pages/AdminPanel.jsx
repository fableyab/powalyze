import React from 'react';
import Navbar from '@/components/landing/Navbar';
import { useAuth } from '@/context/AuthContext';
import { Shield, Users, Database, Activity, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();

  // Simple admin check
  if (user?.role !== 'admin' && user?.role !== 'demo') {
    // For demo purposes, we allow 'demo' role to see this page but normally would redirect
    // return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-12">
        <div className="flex items-center gap-3 mb-8">
           <Shield className="text-red-500" size={32} />
           <h1 className="text-3xl font-display font-bold text-white">System Administration</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Sidebar */}
           <div className="lg:col-span-1 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-[#BFA76A] bg-white/5">
                 <Activity size={16} className="mr-2" /> System Health
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                 <Users size={16} className="mr-2" /> User Management
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                 <Database size={16} className="mr-2" /> Database & Backup
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:text-white">
                 <Lock size={16} className="mr-2" /> Security Logs
              </Button>
           </div>

           {/* Content */}
           <div className="lg:col-span-3 space-y-8">
              {/* System Status */}
              <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                 <h2 className="text-lg font-bold text-white mb-6">System Status</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                       <div className="text-xs text-green-500 uppercase font-bold mb-1">API Status</div>
                       <div className="text-xl font-bold text-white">Operational</div>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                       <div className="text-xs text-yellow-500 uppercase font-bold mb-1">Database Mode</div>
                       <div className="text-xl font-bold text-white">Hybrid / Mock</div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                       <div className="text-xs text-blue-500 uppercase font-bold mb-1">Active Users</div>
                       <div className="text-xl font-bold text-white">12</div>
                    </div>
                 </div>
              </div>

              {/* Recent Users */}
              <div className="bg-[#111] overflow-hidden rounded-xl border border-white/10">
                 <div className="p-6 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white">Recent Registrations</h2>
                 </div>
                 <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 bg-[#161616]">
                       <tr>
                          <th className="px-6 py-3">User</th>
                          <th className="px-6 py-3">Role</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Date</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       <tr>
                          <td className="px-6 py-4">demo@powalyze.ch</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded text-xs uppercase font-bold">Admin</span></td>
                          <td className="px-6 py-4 text-green-500">Active</td>
                          <td className="px-6 py-4 text-gray-400">2024-01-15</td>
                       </tr>
                       <tr>
                          <td className="px-6 py-4">user@client.com</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-500/10 text-gray-400 rounded text-xs uppercase font-bold">Client</span></td>
                          <td className="px-6 py-4 text-green-500">Active</td>
                          <td className="px-6 py-4 text-gray-400">2024-02-01</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;