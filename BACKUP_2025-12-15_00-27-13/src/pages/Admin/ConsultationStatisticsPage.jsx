import React from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ConsultationStatisticsPage = () => {
  // Mock Stats
  const stats = {
    total: 124,
    completed: 89,
    pending: 35,
    conversionRate: '72%'
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <div className="mb-8">
             <Link to="/admin/consultations">
                <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-[#BFA76A]"><ArrowLeft className="mr-2" size={16}/> Retour Dashboard</Button>
             </Link>
             <h1 className="text-3xl font-bold">Statistiques Consultations</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <Card className="bg-[#111] border-white/10 text-white">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Total Demandes</CardTitle></CardHeader>
                <CardContent><div className="text-3xl font-bold">{stats.total}</div></CardContent>
             </Card>
             <Card className="bg-[#111] border-white/10 text-white">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Traitées</CardTitle></CardHeader>
                <CardContent><div className="text-3xl font-bold text-green-500">{stats.completed}</div></CardContent>
             </Card>
             <Card className="bg-[#111] border-white/10 text-white">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">En Attente</CardTitle></CardHeader>
                <CardContent><div className="text-3xl font-bold text-yellow-500">{stats.pending}</div></CardContent>
             </Card>
             <Card className="bg-[#111] border-white/10 text-white">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-400">Taux de Conversion</CardTitle></CardHeader>
                <CardContent><div className="text-3xl font-bold text-[#BFA76A]">{stats.conversionRate}</div></CardContent>
             </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="bg-[#111] border-white/10 text-white h-[300px]">
                <CardHeader><CardTitle>Répartition par Industrie</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-center text-gray-500">
                   [Chart Placeholder: Pie Chart]
                </CardContent>
             </Card>
             <Card className="bg-[#111] border-white/10 text-white h-[300px]">
                <CardHeader><CardTitle>Demandes par Mois</CardTitle></CardHeader>
                <CardContent className="flex items-center justify-center text-gray-500">
                   [Chart Placeholder: Bar Chart]
                </CardContent>
             </Card>
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default ConsultationStatisticsPage;