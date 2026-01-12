import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Download, Trash2, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getReports, deleteReport } from '@/lib/reportService';

const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    const result = await getReports();
    if (result.success) {
      setReports(result.data || []);
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de charger les rapports",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  const handleDelete = async (reportId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) return;

    const result = await deleteReport(reportId);
    if (result.success) {
      toast({
        title: "Rapport supprimé",
        description: "Le rapport a été supprimé avec succès"
      });
      loadReports();
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Impossible de supprimer le rapport",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Mes Rapports</h1>
          <p className="text-slate-400 mt-1">
            Gérez vos rapports personnalisés et exportez-les en PDF ou PowerPoint
          </p>
        </div>
        <Link to="/app/report-builder">
          <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            Créer un rapport
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <FileText className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Aucun rapport</h3>
          <p className="text-slate-400 mb-6">
            Vous n'avez pas encore créé de rapports. Commencez dès maintenant !
          </p>
          <Link to="/app/report-builder">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-black">
              <Plus className="w-4 h-4 mr-2" />
              Créer mon premier rapport
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="group bg-slate-900/50 rounded-2xl border border-slate-800 p-6 hover:border-[#D4AF37] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F]">
                    <FileText className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      report.status === 'published' 
                        ? 'bg-emerald-500/20 text-emerald-300' 
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {report.status === 'published' ? 'Publié' : 'Brouillon'}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                {report.title}
              </h3>

              {report.description && (
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {report.description}
                </p>
              )}

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <Calendar className="w-3 h-3" />
                <span>{report.period || 'N/A'}</span>
                <span className="mx-1">•</span>
                <span>{formatDate(report.created_at)}</span>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/app/report-detail/${report.id}`}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Voir
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(report.id)}
                  className="border-red-900/50 text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#4A9EFF]/10 to-[#D4AF37]/10 border border-[#4A9EFF]/20">
        <h3 className="text-lg font-semibold text-white mb-2">
          💡 Astuce
        </h3>
        <p className="text-slate-400 text-sm">
          Utilisez le créateur de rapports pour générer des documents stratégiques personnalisés 
          avec vos données de projets, risques et décisions en temps réel.
        </p>
      </div>
    </div>
  );
};

export default ReportsList;
