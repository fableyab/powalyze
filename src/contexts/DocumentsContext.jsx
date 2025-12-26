import React, { createContext, useContext, useState, useEffect } from 'react';

const DocumentsContext = createContext();

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentsProvider');
  }
  return context;
};

const DEMO_DOCUMENTS = [
  {
    id: '1',
    name: 'Cahier des charges - Refonte Site Web.pdf',
    type: 'pdf',
    size: 2457600,
    project: 'Refonte site e-commerce',
    uploadedBy: 'Marie Dubois',
    uploadedAt: new Date('2024-12-15T10:30:00'),
    url: '#',
  },
  {
    id: '2',
    name: 'Budget prévisionnel Q1 2025.xlsx',
    type: 'excel',
    size: 524288,
    project: 'Migration cloud Azure',
    uploadedBy: 'Pierre Martin',
    uploadedAt: new Date('2024-12-18T14:20:00'),
    url: '#',
  },
  {
    id: '3',
    name: 'Spécifications techniques API.docx',
    type: 'word',
    size: 1048576,
    project: 'Application mobile iOS/Android',
    uploadedBy: 'Sophie Laurent',
    uploadedAt: new Date('2024-12-20T09:15:00'),
    url: '#',
  },
  {
    id: '4',
    name: 'Rapport audit sécurité.pdf',
    type: 'pdf',
    size: 3145728,
    project: 'Audit sécurité infrastructure',
    uploadedBy: 'Jean Dupont',
    uploadedAt: new Date('2024-12-22T16:45:00'),
    url: '#',
  },
  {
    id: '5',
    name: 'Planning déploiement.xlsx',
    type: 'excel',
    size: 786432,
    project: 'Refonte site e-commerce',
    uploadedBy: 'Marie Dubois',
    uploadedAt: new Date('2024-12-23T11:00:00'),
    url: '#',
  },
  {
    id: '6',
    name: 'Documentation utilisateur.pdf',
    type: 'pdf',
    size: 4194304,
    project: 'Système de gestion documentaire',
    uploadedBy: 'Thomas Bernard',
    uploadedAt: new Date('2024-12-24T13:30:00'),
    url: '#',
  },
  {
    id: '7',
    name: 'Analyse des risques.docx',
    type: 'word',
    size: 655360,
    project: 'Migration cloud Azure',
    uploadedBy: 'Pierre Martin',
    uploadedAt: new Date('2024-12-25T10:00:00'),
    url: '#',
  },
  {
    id: '8',
    name: 'Tableau de bord KPIs.xlsx',
    type: 'excel',
    size: 983040,
    project: 'Automatisation reporting financier',
    uploadedBy: 'Claire Petit',
    uploadedAt: new Date('2024-12-26T08:45:00'),
    url: '#',
  },
];

export const DocumentsProvider = ({ children }) => {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('powalyze_documents');
    return saved ? JSON.parse(saved, (key, value) => {
      if (key === 'uploadedAt') return new Date(value);
      return value;
    }) : DEMO_DOCUMENTS;
  });

  const [filters, setFilters] = useState({
    type: 'all',
    project: 'all',
    search: '',
  });

  useEffect(() => {
    localStorage.setItem('powalyze_documents', JSON.stringify(documents));
  }, [documents]);

  const addDocument = (document) => {
    const newDocument = {
      ...document,
      id: Date.now().toString(),
      uploadedAt: new Date(),
    };
    setDocuments(prev => [newDocument, ...prev]);
  };

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredDocuments = documents.filter(doc => {
    if (filters.type !== 'all' && doc.type !== filters.type) return false;
    if (filters.project !== 'all' && doc.project !== filters.project) return false;
    if (filters.search && !doc.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const projects = [...new Set(documents.map(doc => doc.project))];

  return (
    <DocumentsContext.Provider value={{
      documents: filteredDocuments,
      allDocuments: documents,
      projects,
      filters,
      addDocument,
      deleteDocument,
      updateFilters,
    }}>
      {children}
    </DocumentsContext.Provider>
  );
};
