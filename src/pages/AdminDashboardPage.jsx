import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar'; 
import { BarChart, Users, Mail, TrendingUp, Download, Eye, MousePointer, UploadCloud, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock Data
const subscribers = [
  { email: "client.alpha@corp.com", date: "2025-10-12", status: "Active" },
  { email: "director@finance.ch", date: "2025-10-14", status: "Active" },
  { email: "pmo@bigbank.com", date: "2025-10-15", status: "Unsubscribed" },
];

const conversionData = [
  { name: 'Vue Page Pricing', value: 1200 },
  { name: 'Début Checkout', value: 300 },
  { name: 'Achat Final', value: 85 },
];

const abTests = [
  { id: 1, name: "Hero CTA Color", variantA: "Gold (3.2%)", variantB: "White (2.1%)", winner: "A" },
  { id: 2, name: "Pricing Layout", variantA: "Grid (1.5%)", variantB: "List (1.8%)", winner: "B" },
];

const AdminDashboardPage = () => {
  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white">
      <Navbar />
      
      <div className="pt-32 container mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-display text-white">Admin Dashboard</h1>
          <div className="flex gap-4">
             <Link to="/upload-excel">
                <Button className="bg-[#BFA76A] text-black hover:bg-white flex gap-2">
                   <UploadCloud size={16} /> Bulk Import Data
                </Button>
             </Link>
             <span className="bg-[#BFA76A]/10 text-[#BFA76A] px-4 py-1 rounded-full text-sm flex items-center">Admin: Super User</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <Card className="bg-[#111] border-white/10">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-gray-400">Total Abonnés</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold text-white">1,248</div>
                 <p className="text-xs text-[#BFA76A]">+12% depuis le mois dernier</p>
              </CardContent>
           </Card>
           <Card className="bg-[#111] border-white/10">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-gray-400">Taux de Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold text-white">2.8%</div>
                 <p className="text-xs text-green-500">Global</p>
              </CardContent>
           </Card>
           <Card className="bg-[#111] border-white/10">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-gray-400">Téléchargements</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold text-white">432</div>
                 <p className="text-xs text-gray-500">Ressources ce mois</p>
              </CardContent>
           </Card>
           <Card className="bg-[#111] border-white/10">
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium text-gray-400">Revenus Est.</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-2xl font-bold text-white">CHF 45k</div>
                 <p className="text-xs text-[#BFA76A]">Prévisionnel Q4</p>
              </CardContent>
           </Card>
        </div>

        <Tabs defaultValue="newsletter" className="space-y-8">
          <TabsList className="bg-[#111] border border-white/10">
            <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            <TabsTrigger value="analytics">Analytics & AB</TabsTrigger>
            <TabsTrigger value="launch">Lancement</TabsTrigger>
            <TabsTrigger value="data">Data Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="newsletter">
            <Card className="bg-[#111] border-white/10">
               <CardHeader>
                  <CardTitle className="text-white">Abonnés Newsletter</CardTitle>
                  <CardDescription>Gérez votre audience et exportez les données.</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="rounded-md border border-white/10 overflow-hidden">
                     <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                           <tr>
                              <th className="px-6 py-3">Email</th>
                              <th className="px-6 py-3">Date</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3">Actions</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                           {subscribers.map((sub, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors">
                                 <td className="px-6 py-4 font-medium text-white">{sub.email}</td>
                                 <td className="px-6 py-4">{sub.date}</td>
                                 <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs ${sub.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                       {sub.status}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4 text-[#BFA76A] cursor-pointer hover:underline">Editer</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-[#111] border-white/10">
                   <CardHeader>
                      <CardTitle className="text-white">A/B Testing Résultats</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-6">
                      {abTests.map(test => (
                         <div key={test.id} className="p-4 border border-white/5 rounded bg-black/20">
                            <div className="flex justify-between mb-2">
                               <h4 className="font-bold text-white">{test.name}</h4>
                               <span className="text-xs bg-[#BFA76A] text-black px-2 rounded">Winner: {test.winner}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                               <span>Variant A: {test.variantA}</span>
                               <span>Variant B: {test.variantB}</span>
                            </div>
                         </div>
                      ))}
                   </CardContent>
                </Card>

                <Card className="bg-[#111] border-white/10">
                   <CardHeader>
                      <CardTitle className="text-white">Entonnoir de Conversion</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <div className="space-y-4">
                         {conversionData.map((step, idx) => (
                            <div key={idx} className="space-y-1">
                               <div className="flex justify-between text-sm text-gray-300">
                                  <span>{step.name}</span>
                                  <span>{step.value}</span>
                               </div>
                               <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step.value / 1200) * 100}%` }}
                                    className="h-full bg-[#BFA76A]"
                                  />
                               </div>
                            </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="launch">
            <Card className="bg-[#111] border-white/10">
               <CardHeader>
                  <CardTitle className="text-white">État du Lancement</CardTitle>
                  <CardDescription>Vue d'ensemble de la préparation technique et marketing.</CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                     <div className="p-6 border border-white/10 rounded-xl">
                        <div className="text-4xl font-bold text-green-500 mb-2">94%</div>
                        <div className="text-sm text-gray-400">Checklist Technique</div>
                     </div>
                     <div className="p-6 border border-white/10 rounded-xl">
                        <div className="text-4xl font-bold text-yellow-500 mb-2">60%</div>
                        <div className="text-sm text-gray-400">Préparation Marketing</div>
                     </div>
                     <div className="p-6 border border-white/10 rounded-xl">
                        <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
                        <div className="text-sm text-gray-400">Conformité Légale</div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
             <Card className="bg-[#111] border-white/10">
                <CardHeader>
                   <CardTitle className="text-white flex items-center gap-2"><Database size={20}/> Data Sources</CardTitle>
                   <CardDescription>Manage your data imports for dashboards.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="text-center py-8">
                      <Database size={48} className="text-[#BFA76A] mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium text-white mb-2">Centralized Data Upload</h3>
                      <p className="text-gray-400 max-w-md mx-auto mb-6">Upload Excel/CSV files to populate the Business Intelligence dashboards or import subscriber lists.</p>
                      <Link to="/upload-excel">
                         <Button className="bg-[#BFA76A] text-black hover:bg-white">
                            Go to Upload Center
                         </Button>
                      </Link>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;