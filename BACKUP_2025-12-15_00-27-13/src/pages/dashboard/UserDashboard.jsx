import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getFiles, formatBytes } from '@/lib/fileService';
import { Button } from '@/components/ui/button';
import { Download, Trash2, Database, UploadCloud, TrendingUp, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({ totalSize: 0, count: 0, processedRows: 0 });

  useEffect(() => {
    // Fetch files from Supabase/Local
    getFiles().then(data => {
      setFiles(data);
      const totalBytes = data.reduce((acc, curr) => acc + (curr.size || 0), 0);
      setStats({
        totalSize: totalBytes,
        count: data.length,
        processedRows: data.length * 1250 // Simulated rows per file for demo
      });
    });
  }, []);

  const chartData = [
    { name: 'Mon', uploads: 2, rows: 2400 },
    { name: 'Tue', uploads: 4, rows: 1398 },
    { name: 'Wed', uploads: 1, rows: 9800 },
    { name: 'Thu', uploads: 3, rows: 3908 },
    { name: 'Fri', uploads: 5, rows: 4800 },
    { name: 'Sat', uploads: 0, rows: 0 },
    { name: 'Sun', uploads: 1, rows: 4300 },
  ];

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
             <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
             <p className="text-gray-400">Welcome back to your command center.</p>
          </div>
          <Link to="/upload-excel">
             <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold">
                <UploadCloud className="mr-2" size={18} /> New Upload
             </Button>
          </Link>
       </div>

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#111] border-white/10">
             <CardContent className="p-6 flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Total Storage Used</p>
                   <h3 className="text-2xl font-bold text-white mt-1">{formatBytes(stats.totalSize)}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                   <HardDrive size={24} />
                </div>
             </CardContent>
          </Card>
          <Card className="bg-[#111] border-white/10">
             <CardContent className="p-6 flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Total Files</p>
                   <h3 className="text-2xl font-bold text-white mt-1">{stats.count}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#BFA76A]/10 flex items-center justify-center text-[#BFA76A]">
                   <Database size={24} />
                </div>
             </CardContent>
          </Card>
          <Card className="bg-[#111] border-white/10">
             <CardContent className="p-6 flex items-center justify-between">
                <div>
                   <p className="text-gray-500 text-sm font-medium">Data Rows Processed</p>
                   <h3 className="text-2xl font-bold text-white mt-1">{stats.processedRows.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                   <TrendingUp size={24} />
                </div>
             </CardContent>
          </Card>
       </div>

       {/* Charts Section */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#111] border-white/10">
             <CardHeader>
                <CardTitle className="text-white text-lg">Activity This Week</CardTitle>
             </CardHeader>
             <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={chartData}>
                      <defs>
                         <linearGradient id="colorRows" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#BFA76A" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#BFA76A" stopOpacity={0}/>
                         </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" stroke="#555" tickLine={false} axisLine={false} />
                      <YAxis stroke="#555" tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                      <Area type="monotone" dataKey="rows" stroke="#BFA76A" fillOpacity={1} fill="url(#colorRows)" />
                   </AreaChart>
                </ResponsiveContainer>
             </CardContent>
          </Card>

          <Card className="bg-[#111] border-white/10">
             <CardHeader>
                <CardTitle className="text-white text-lg">Upload Frequency</CardTitle>
             </CardHeader>
             <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="name" stroke="#555" tickLine={false} axisLine={false} />
                      <YAxis stroke="#555" tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                      <Bar dataKey="uploads" fill="#333" radius={[4, 4, 0, 0]} activeBar={{ fill: '#BFA76A' }} />
                   </BarChart>
                </ResponsiveContainer>
             </CardContent>
          </Card>
       </div>

       {/* Recent Files */}
       <Card className="bg-[#111] border-white/10">
          <CardHeader>
             <CardTitle className="text-white text-lg">Recent Files</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-[#222] text-xs uppercase text-gray-500">
                         <th className="py-3 font-medium">Filename</th>
                         <th className="py-3 font-medium">Date Uploaded</th>
                         <th className="py-3 font-medium">Size</th>
                         <th className="py-3 font-medium text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#222]">
                      {files.slice(0, 5).map(file => (
                         <tr key={file.id} className="group hover:bg-[#161616]">
                            <td className="py-3 text-white font-medium">{file.name}</td>
                            <td className="py-3 text-gray-400 text-sm">{new Date(file.uploadDate).toLocaleDateString()}</td>
                            <td className="py-3 text-gray-400 text-sm">{formatBytes(file.size)}</td>
                            <td className="py-3 text-right flex justify-end gap-2">
                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                                  <Download size={16} />
                               </Button>
                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-500/10">
                                  <Trash2 size={16} />
                               </Button>
                            </td>
                         </tr>
                      ))}
                      {files.length === 0 && (
                         <tr>
                            <td colSpan="4" className="py-8 text-center text-gray-500">No files uploaded yet.</td>
                         </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </CardContent>
       </Card>
    </div>
  );
};

export default UserDashboard;