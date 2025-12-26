import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PowerBIContext = createContext();

const DEMO_REPORTS = [
  {
    id: '1',
    name: 'Dashboard Commercial',
    description: 'Vue d\'ensemble des ventes et performances commerciales',
    embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_1',
    category: 'sales',
    createdAt: '2024-01-15T10:00:00Z',
    createdBy: 'Admin Powalyze',
    isActive: true,
    views: 245,
    lastViewed: '2024-02-25T14:30:00Z',
  },
  {
    id: '2',
    name: 'Suivi Projets',
    description: 'Avancement et KPI des projets en cours',
    embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_2',
    category: 'projects',
    createdAt: '2024-01-20T09:00:00Z',
    createdBy: 'Admin Powalyze',
    isActive: true,
    views: 189,
    lastViewed: '2024-02-26T09:15:00Z',
  },
  {
    id: '3',
    name: 'Analyse Financière',
    description: 'Budget, dépenses et prévisions financières',
    embedUrl: 'https://app.powerbi.com/view?r=YOUR_REPORT_ID_3',
    category: 'finance',
    createdAt: '2024-02-01T11:00:00Z',
    createdBy: 'Admin Powalyze',
    isActive: true,
    views: 156,
    lastViewed: '2024-02-24T16:45:00Z',
  },
];

const DEMO_EXCEL_FILES = [
  {
    id: '1',
    name: 'Export_Projets_Q1_2024.xlsx',
    description: 'Export des données projets T1 2024',
    size: '2.4 MB',
    downloadUrl: '/exports/projets_q1_2024.xlsx',
    createdAt: '2024-02-20T10:00:00Z',
    createdBy: 'Système',
    downloads: 12,
  },
  {
    id: '2',
    name: 'Rapport_Financier_Fevrier.xlsx',
    description: 'Rapport financier détaillé du mois de février',
    size: '1.8 MB',
    downloadUrl: '/exports/rapport_financier_fev.xlsx',
    createdAt: '2024-02-25T14:30:00Z',
    createdBy: 'Système',
    downloads: 8,
  },
  {
    id: '3',
    name: 'KPI_Dashboard_2024.xlsx',
    description: 'Export des KPI du dashboard général',
    size: '3.1 MB',
    downloadUrl: '/exports/kpi_dashboard_2024.xlsx',
    createdAt: '2024-02-26T09:00:00Z',
    createdBy: 'Système',
    downloads: 15,
  },
];

export function PowerBIProvider({ children }) {
  const [reports, setReports] = useLocalStorage('powalyze_powerbi_reports', DEMO_REPORTS);
  const [excelFiles, setExcelFiles] = useLocalStorage('powalyze_excel_files', DEMO_EXCEL_FILES);
  const [loading, setLoading] = useState(false);

  // Gestion des rapports Power BI
  const createReport = (reportData) => {
    const newReport = {
      id: uuidv4(),
      ...reportData,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User',
      isActive: true,
      views: 0,
      lastViewed: null,
    };
    setReports(prev => [...prev, newReport]);
    return newReport;
  };

  const updateReport = (reportId, updates) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId ? { ...report, ...updates } : report
      )
    );
  };

  const deleteReport = (reportId) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
  };

  const incrementReportViews = (reportId) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? { ...report, views: (report.views || 0) + 1, lastViewed: new Date().toISOString() }
          : report
      )
    );
  };

  // Gestion des fichiers Excel
  const addExcelFile = (fileData) => {
    const newFile = {
      id: uuidv4(),
      ...fileData,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User',
      downloads: 0,
    };
    setExcelFiles(prev => [...prev, newFile]);
    return newFile;
  };

  const deleteExcelFile = (fileId) => {
    setExcelFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const incrementDownloads = (fileId) => {
    setExcelFiles(prev =>
      prev.map(file =>
        file.id === fileId ? { ...file, downloads: (file.downloads || 0) + 1 } : file
      )
    );
  };

  const getStats = () => {
    return {
      totalReports: reports.length,
      activeReports: reports.filter(r => r.isActive).length,
      totalViews: reports.reduce((sum, r) => sum + (r.views || 0), 0),
      totalExcelFiles: excelFiles.length,
      totalDownloads: excelFiles.reduce((sum, f) => sum + (f.downloads || 0), 0),
    };
  };

  const value = {
    reports,
    excelFiles,
    loading,
    createReport,
    updateReport,
    deleteReport,
    incrementReportViews,
    addExcelFile,
    deleteExcelFile,
    incrementDownloads,
    getStats,
  };

  return (
    <PowerBIContext.Provider value={value}>
      {children}
    </PowerBIContext.Provider>
  );
}

export function usePowerBI() {
  const context = useContext(PowerBIContext);
  if (!context) {
    throw new Error('usePowerBI must be used within a PowerBIProvider');
  }
  return context;
}

export default PowerBIContext;
