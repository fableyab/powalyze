import React, { useState, useEffect } from 'react';
import { FileText, Download, Calendar, Filter, CheckSquare, Settings, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { exportToPDF, exportToPPTX } from '@/lib/exportUtils';
import { createReport, generateReportData, getReports } from '@/lib/reportService';

const ReportBuilder = ({ language }) => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [selectedSections, setSelectedSections] = useState({
        execSummary: true,
        financials: true,
        risks: true,
        projectList: false
    });
    const [reportTitle, setReportTitle] = useState('Rapport Stratégique Q1 2026');
    const [period, setPeriod] = useState('Q1 2026');
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [savedReports, setSavedReports] = useState([]);

    // Charger les données au montage
    useEffect(() => {
        loadReportData();
        loadSavedReports();
    }, []);

    const loadReportData = async () => {
        setLoading(true);
        const result = await generateReportData('strategic', period);
        if (result.success) {
            setReportData(result.data);
        } else {
            toast({ 
                title: "Erreur", 
                description: "Impossible de charger les données",
                variant: "destructive"
            });
        }
        setLoading(false);
    };

    const loadSavedReports = async () => {
        const result = await getReports({ report_type: 'custom' });
        if (result.success) {
            setSavedReports(result.data || []);
        }
    };

    const handleSaveReport = async () => {
        setLoading(true);
        const result = await createReport({
            title: reportTitle,
            description: `Rapport stratégique pour la période ${period}`,
            report_type: 'strategic',
            period: period,
            sections: selectedSections,
            data: reportData
        });

        if (result.success) {
            toast({ 
                title: "Rapport sauvegardé", 
                description: "Votre rapport a été enregistré avec succès"
            });
            loadSavedReports();
        } else {
            toast({ 
                title: "Erreur", 
                description: result.error || "Impossible de sauvegarder le rapport",
                variant: "destructive"
            });
        }
        setLoading(false);
    };

    const handleGenerate = (format) => {
        toast({ title: "Génération du rapport...", description: "Cela peut prendre quelques secondes." });
        setTimeout(() => {
            if (format === 'pdf') {
                exportToPDF('report-preview', `${reportTitle.replace(/\s+/g, '_')}.pdf`);
            } else {
                exportToPPTX({ name: reportTitle }, 'Généré via Report Builder');
            }
            toast({ title: "Succès", description: "Rapport téléchargé avec succès." });
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#D4AF37]">Créateur de Rapports</h1>
                    <p className="text-slate-500">Créez des rapports stratégiques personnalisés pour vos parties prenantes.</p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('/app/reports')}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir mes rapports
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Panel */}
                <div className="bg-[#0F0F0F] rounded-xl border border-slate-800 p-6 h-fit">
                    <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#D4AF37]" /> Configuration
                    </h3>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Titre du rapport</label>
                            <input
                                type="text"
                                value={reportTitle}
                                onChange={(e) => setReportTitle(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                                placeholder="Ex: Rapport Stratégique Q1 2026"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-400 mb-2 block">Période du rapport</label>
                            <div className="flex gap-2">
                                <Button 
                                    variant={period === 'Q1 2026' ? "outline" : "ghost"}
                                    size="sm" 
                                    onClick={() => setPeriod('Q1 2026')}
                                    className={period === 'Q1 2026' ? "flex-1 bg-slate-900 border-slate-700 text-white hover:bg-slate-800" : "flex-1 text-slate-500"}
                                >
                                    Q1 2026
                                </Button>
                                <Button 
                                    variant={period === 'Q2 2026' ? "outline" : "ghost"}
                                    size="sm" 
                                    onClick={() => setPeriod('Q2 2026')}
                                    className={period === 'Q2 2026' ? "flex-1 bg-slate-900 border-slate-700 text-white hover:bg-slate-800" : "flex-1 text-slate-500"}
                                >
                                    Q2
                                </Button>
                                <Button 
                                    variant={period === 'Q3 2026' ? "outline" : "ghost"}
                                    size="sm" 
                                    onClick={() => setPeriod('Q3 2026')}
                                    className={period === 'Q3 2026' ? "flex-1 bg-slate-900 border-slate-700 text-white hover:bg-slate-800" : "flex-1 text-slate-500"}
                                >
                                    Q3
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm text-slate-400 block">Sections to Include</label>
                            {Object.keys(selectedSections).map(key => (
                                <div key={key} className="flex items-center space-x-3 p-3 rounded bg-slate-900 border border-slate-800 cursor-pointer" onClick={() => setSelectedSections(prev => ({...prev, [key]: !prev[key]}))}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedSections[key] ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-slate-600'}`}>
                                        {selectedSections[key] && <CheckSquare className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className="text-sm text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-800 space-y-3">
                            <Button 
                                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold" 
                                onClick={handleSaveReport}
                                disabled={loading}
                            >
                                <Save className="w-4 h-4 mr-2" /> 
                                {loading ? 'Sauvegarde...' : 'Sauvegarder le rapport'}
                            </Button>
                            <Button 
                                className="w-full bg-[#1E3A8A] hover:bg-[#172554] text-white" 
                                onClick={() => handleGenerate('pdf')}
                                disabled={loading}
                            >
                                <Download className="w-4 h-4 mr-2" /> Exporter en PDF
                            </Button>
                            <Button 
                                variant="outline" 
                                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800" 
                                onClick={() => handleGenerate('pptx')}
                                disabled={loading}
                            >
                                <FileText className="w-4 h-4 mr-2" /> Exporter en PPTX
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Live Preview (Simulated) */}
                <div className="lg:col-span-2 bg-white text-black p-8 rounded-xl shadow-2xl min-h-[600px] relative overflow-hidden" id="report-preview">
                    {/* A4 Page Simulation */}
                    <div className="border-b-4 border-[#D4AF37] pb-4 mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold text-[#1E3A8A]">{reportTitle}</h1>
                            <p className="text-slate-500 mt-1">{period} • {reportData?.metrics?.totalProjects || 0} Projets</p>
                        </div>
                        <div className="text-right">
                             <div className="text-[#D4AF37] font-bold text-xl tracking-wider">POWALYZE</div>
                             <div className="text-xs text-slate-400">CONFIDENTIEL</div>
                        </div>
                    </div>

                    {selectedSections.execSummary && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 border-l-4 border-[#1E3A8A] pl-3">Résumé Exécutif</h2>
                            <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                Le portefeuille performe actuellement dans les tolérances de risque attendues. 
                                Les initiatives stratégiques clés progressent selon le calendrier prévu. 
                                La consommation budgétaire est sous contrôle, permettant une réallocation potentielle en Q2.
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 border border-slate-200">
                                    <div className="text-xs text-slate-500 uppercase">Santé du Portfolio</div>
                                    <div className="text-2xl font-bold text-emerald-600">
                                        {reportData?.metrics?.activeProjects || 0}/{reportData?.metrics?.totalProjects || 0}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 border border-slate-200">
                                    <div className="text-xs text-slate-500 uppercase">Budget Consommé</div>
                                    <div className="text-2xl font-bold text-[#1E3A8A]">
                                        {((reportData?.metrics?.budgetConsumed || 0) / 1000).toFixed(1)}K €
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-4 border border-slate-200">
                                    <div className="text-xs text-slate-500 uppercase">Risques Ouverts</div>
                                    <div className="text-2xl font-bold text-amber-600">
                                        {reportData?.metrics?.highRisks || 0} Élevés
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedSections.financials && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 border-l-4 border-[#1E3A8A] pl-3">Financial Performance</h2>
                            <div className="h-48 bg-slate-50 rounded border border-slate-200 flex items-center justify-center text-slate-400">
                                [Financial Chart Visualization Placeholder]
                            </div>
                        </div>
                    )}

                     {selectedSections.risks && (
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-[#1E3A8A] mb-4 border-l-4 border-[#1E3A8A] pl-3">Top Risks</h2>
                            <table className="w-full text-sm">
                                <thead className="bg-slate-100 text-slate-600">
                                    <tr>
                                        <th className="p-2 text-left">Risk Description</th>
                                        <th className="p-2 text-center">Impact</th>
                                        <th className="p-2 text-left">Mitigation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="p-2">Vendor Insolvency (Supplier A)</td>
                                        <td className="p-2 text-center text-red-600 font-bold">High</td>
                                        <td className="p-2">Alternative sourcing initiated.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="absolute bottom-4 left-8 right-8 border-t border-slate-200 pt-2 flex justify-between text-xs text-slate-400">
                        <span>Generated by Powalyze OS</span>
                        <span>Page 1 of 1</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportBuilder;