import React, { useState } from 'react';
import { usePowerBI } from '../../contexts/PowerBIContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { useResponsive } from '../../hooks/useResponsive';
import { BarChart3, Download, Eye, FileSpreadsheet, Plus, Trash2, Edit, TrendingUp } from 'lucide-react';

const PowerBIProduction = () => {
  const { isMobile } = useResponsive();
  const {
    reports,
    excelFiles,
    createReport,
    updateReport,
    deleteReport,
    incrementReportViews,
    deleteExcelFile,
    incrementDownloads,
    getStats,
  } = usePowerBI();

  const [selectedReport, setSelectedReport] = useState(reports[0]?.id || null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [reportForm, setReportForm] = useState({
    name: '',
    description: '',
    embedUrl: '',
    category: 'general',
  });

  const stats = getStats();
  const currentReport = reports.find(r => r.id === selectedReport);

  const handleCreateReport = () => {
    if (editingReport) {
      updateReport(editingReport.id, reportForm);
    } else {
      createReport(reportForm);
    }
    setShowReportModal(false);
    setEditingReport(null);
    setReportForm({ name: '', description: '', embedUrl: '', category: 'general' });
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setReportForm({
      name: report.name,
      description: report.description,
      embedUrl: report.embedUrl,
      category: report.category,
    });
    setShowReportModal(true);
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Supprimer ce rapport ?')) {
      deleteReport(reportId);
      if (selectedReport === reportId) {
        setSelectedReport(reports[0]?.id || null);
      }
    }
  };

  const handleViewReport = (reportId) => {
    setSelectedReport(reportId);
    incrementReportViews(reportId);
  };

  const handleDownloadExcel = (file) => {
    incrementDownloads(file.id);
    // Simuler le téléchargement
    alert(`Téléchargement de ${file.name}...`);
  };

  const handleDeleteExcel = (fileId) => {
    if (window.confirm('Supprimer ce fichier ?')) {
      deleteExcelFile(fileId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Power BI Production
          </h1>
          <p className="text-dark-300">
            Gérez vos rapports et téléchargez vos exports Excel
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowReportModal(true)}>
          <Plus className="w-4 h-4" />
          Ajouter un rapport
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card padding="normal">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-gold-primary" />
            <div>
              <p className="text-dark-400 text-sm">Rapports</p>
              <p className="text-2xl font-bold text-white">{stats.totalReports}</p>
            </div>
          </div>
        </Card>
        <Card padding="normal">
          <div className="flex items-center space-x-3">
            <Eye className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-dark-400 text-sm">Vues</p>
              <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
            </div>
          </div>
        </Card>
        <Card padding="normal">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-dark-400 text-sm">Fichiers Excel</p>
              <p className="text-2xl font-bold text-white">{stats.totalExcelFiles}</p>
            </div>
          </div>
        </Card>
        <Card padding="normal">
          <div className="flex items-center space-x-3">
            <Download className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-dark-400 text-sm">Téléchargements</p>
              <p className="text-2xl font-bold text-white">{stats.totalDownloads}</p>
            </div>
          </div>
        </Card>
        <Card padding="normal">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-dark-400 text-sm">Actifs</p>
              <p className="text-2xl font-bold text-white">{stats.activeReports}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des rapports */}
      <Card title="📊 Mes Rapports Power BI" padding="normal">
        <div className="space-y-3">
          {reports.length === 0 ? (
            <div className="text-center py-8 text-dark-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun rapport configuré</p>
              <p className="text-sm mt-2">Cliquez sur "Ajouter un rapport" pour commencer</p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedReport === report.id
                    ? 'bg-dark-700 border-gold-primary'
                    : 'bg-dark-800 border-dark-600 hover:border-dark-500'
                }`}
                onClick={() => handleViewReport(report.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-white font-semibold">{report.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        report.isActive ? 'bg-green-900 text-green-300' : 'bg-dark-600 text-dark-400'
                      }`}>
                        {report.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                    <p className="text-dark-300 text-sm mb-3">{report.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-dark-400">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{report.views || 0} vues</span>
                      </span>
                      <span>Créé le {new Date(report.createdAt).toLocaleDateString('fr-FR')}</span>
                      {report.lastViewed && (
                        <span>Dernière vue: {new Date(report.lastViewed).toLocaleDateString('fr-FR')}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditReport(report);
                      }}
                      className="p-2 hover:bg-dark-600 rounded transition-colors"
                    >
                      <Edit className="w-4 h-4 text-dark-300" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteReport(report.id);
                      }}
                      className="p-2 hover:bg-dark-600 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Visualisation du rapport sélectionné */}
      {currentReport && (
        <Card padding="none" className="overflow-hidden">
          <div className="p-4 bg-dark-800 border-b border-dark-700">
            <h2 className="text-xl font-bold text-white">{currentReport.name}</h2>
            <p className="text-dark-300 text-sm">{currentReport.description}</p>
          </div>
          {currentReport.embedUrl.includes('YOUR_REPORT_ID') ? (
            <div className="p-12 text-center bg-dark-900">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-dark-600" />
              <h3 className="text-xl font-bold text-white mb-2">Rapport non configuré</h3>
              <p className="text-dark-400 mb-4">Modifiez ce rapport pour ajouter l'URL d'intégration Power BI</p>
              <Button variant="primary" onClick={() => handleEditReport(currentReport)}>
                Configurer maintenant
              </Button>
            </div>
          ) : (
            <div style={{ height: isMobile ? '500px' : '800px' }}>
              <iframe
                title={currentReport.name}
                src={currentReport.embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          )}
        </Card>
      )}

      {/* Fichiers Excel disponibles */}
      <Card title="📥 Exports Excel disponibles" padding="normal">
        <div className="space-y-3">
          {excelFiles.length === 0 ? (
            <div className="text-center py-8 text-dark-400">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucun fichier Excel disponible</p>
            </div>
          ) : (
            excelFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-dark-800 rounded-lg border border-dark-600 hover:border-dark-500 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <FileSpreadsheet className="w-10 h-10 text-green-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{file.name}</h3>
                    <p className="text-dark-300 text-sm truncate">{file.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-dark-400 mt-2">
                      <span>{file.size}</span>
                      <span>{file.downloads || 0} téléchargements</span>
                      <span>Créé le {new Date(file.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => handleDownloadExcel(file)}
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </Button>
                  <button
                    onClick={() => handleDeleteExcel(file.id)}
                    className="p-2 hover:bg-dark-600 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Modal Ajouter/Modifier Rapport */}
      <Modal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setEditingReport(null);
          setReportForm({ name: '', description: '', embedUrl: '', category: 'general' });
        }}
        title={editingReport ? 'Modifier le rapport' : 'Ajouter un rapport'}
      >
        <div className="space-y-4">
          <Input
            label="Nom du rapport"
            value={reportForm.name}
            onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
            placeholder="Ex: Dashboard Commercial"
          />
          <Input
            label="Description"
            value={reportForm.description}
            onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
            placeholder="Description du rapport"
          />
          <Input
            label="URL d'intégration Power BI"
            value={reportForm.embedUrl}
            onChange={(e) => setReportForm({ ...reportForm, embedUrl: e.target.value })}
            placeholder="https://app.powerbi.com/view?r=..."
          />
          <div>
            <label className="block text-dark-200 mb-2">Catégorie</label>
            <select
              value={reportForm.category}
              onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-primary"
            >
              <option value="general">Général</option>
              <option value="sales">Commercial</option>
              <option value="projects">Projets</option>
              <option value="finance">Finance</option>
              <option value="resources">Ressources</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => {
                setShowReportModal(false);
                setEditingReport(null);
                setReportForm({ name: '', description: '', embedUrl: '', category: 'general' });
              }}
            >
              Annuler
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateReport}
              disabled={!reportForm.name || !reportForm.embedUrl}
            >
              {editingReport ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PowerBIProduction;
