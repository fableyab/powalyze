import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Calendar, FileText, MessageSquare } from 'lucide-react';

const ConsultationTrackingPage = () => {
  // Mock data
  const consultation = {
    id: 'CONS-4829',
    status: 'In Review',
    date: '2023-12-12',
    notes: 'Initial request for PMO Strategy consultation.',
    history: [
      { date: '2023-12-12 10:00', event: 'Request submitted' },
      { date: '2023-12-12 10:05', event: 'Email confirmation sent' },
      { date: '2023-12-12 14:00', event: 'Assigned to Senior Consultant' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold">Suivi de Consultation</h1>
             <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-sm px-3 py-1">{consultation.status}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="bg-[#111] border-white/10 text-white">
                <CardHeader>
                   <CardTitle className="flex items-center gap-2"><Activity size={18}/> Détails</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div>
                      <span className="text-gray-400 text-sm block">Référence</span>
                      <span className="font-mono">{consultation.id}</span>
                   </div>
                   <div>
                      <span className="text-gray-400 text-sm block">Date de demande</span>
                      <span>{consultation.date}</span>
                   </div>
                   <div>
                      <span className="text-gray-400 text-sm block">Notes</span>
                      <p className="text-sm">{consultation.notes}</p>
                   </div>
                </CardContent>
             </Card>

             <Card className="bg-[#111] border-white/10 text-white md:col-span-2">
                <CardHeader>
                   <CardTitle className="flex items-center gap-2"><Calendar size={18}/> Historique</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-6 relative">
                      <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-white/10"></div>
                      {consultation.history.map((item, i) => (
                         <div key={i} className="relative pl-6">
                            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-[#BFA76A] border-2 border-[#111]"></div>
                            <span className="text-xs text-gray-500 block">{item.date}</span>
                            <span className="text-sm">{item.event}</span>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default ConsultationTrackingPage;