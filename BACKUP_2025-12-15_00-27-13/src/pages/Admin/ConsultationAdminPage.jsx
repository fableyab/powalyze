import React, { useEffect, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useConsultation } from '@/context/ConsultationContext';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, CheckCircle, BarChart2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const ConsultationAdminPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { consultations, loadConsultations, loading: dataLoading, deleteConsultation, updateConsultationStatus } = useConsultation();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      loadConsultations();
    }
  }, [user, loadConsultations]);

  if (authLoading) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"><Loader2 className="animate-spin text-[#BFA76A]"/></div>;
  
  if (!user || user.role !== 'admin') {
     return <Navigate to="/dashboard" />;
  }

  const filteredData = filter === 'all' 
    ? consultations 
    : consultations.filter(c => c.status?.toLowerCase() === filter);

  const columns = [
     { header: "Date", accessorKey: "createdAt", render: (row) => new Date(row.createdAt).toLocaleDateString() },
     { header: "Nom", accessorKey: "lastName", render: (row) => <span className="font-bold">{row.firstName} {row.lastName}</span> },
     { header: "Entreprise", accessorKey: "company" },
     { header: "Email", accessorKey: "email" },
     { 
        header: "Status", 
        accessorKey: "status",
        render: (row) => {
           const status = row.status || 'New';
           const color = status === 'New' ? 'bg-blue-500/20 text-blue-500' : status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500';
           return <Badge className={`${color} border-none`}>{status}</Badge>;
        }
     },
     {
        header: "Actions",
        accessorKey: "id",
        render: (row) => (
           <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => updateConsultationStatus(row.id, 'Completed')} title="Marquer comme traité">
                 <CheckCircle size={16} className="text-green-500" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => deleteConsultation(row.id)} title="Supprimer">
                 <Trash2 size={16} className="text-red-500" />
              </Button>
           </div>
        )
     }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
       <Navbar />
       <main className="flex-grow pt-32 pb-20 container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold">Admin Consultations</h1>
             <div className="flex gap-4">
                <Link to="/admin/statistics">
                   <Button variant="outline" className="border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black"><BarChart2 size={16} className="mr-2"/> Statistiques</Button>
                </Link>
                <div className="flex gap-2 bg-[#111] p-1 rounded-lg border border-white/10">
                   <Button size="sm" variant={filter === 'all' ? 'default' : 'ghost'} onClick={() => setFilter('all')}>Tous</Button>
                   <Button size="sm" variant={filter === 'new' ? 'default' : 'ghost'} onClick={() => setFilter('new')}>Nouveaux</Button>
                   <Button size="sm" variant={filter === 'completed' ? 'default' : 'ghost'} onClick={() => setFilter('completed')}>Traités</Button>
                </div>
             </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl">
             {dataLoading ? (
                <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-[#BFA76A]" /></div>
             ) : (
                <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-black/50 border-b border-white/10 text-gray-400 uppercase">
                         <tr>
                            {columns.map((col, i) => <th key={i} className="p-4 font-medium">{col.header}</th>)}
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {filteredData.length === 0 ? (
                            <tr><td colSpan={columns.length} className="p-8 text-center text-gray-500">Aucune consultation trouvée.</td></tr>
                         ) : filteredData.map((row) => (
                            <tr key={row.id} className="hover:bg-white/5 transition-colors">
                               {columns.map((col, i) => (
                                  <td key={i} className="p-4">{col.render ? col.render(row) : row[col.accessorKey]}</td>
                               ))}
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             )}
          </div>
       </main>
       <FooterSection />
    </div>
  );
};

export default ConsultationAdminPage;