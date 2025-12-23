import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';

const DocumentsContext = createContext();

// Types de documents
export const DOCUMENT_TYPES = {
  PDF: 'pdf',
  WORD: 'word',
  EXCEL: 'excel',
  IMAGE: 'image',
  CONTRACT: 'contract',
  REPORT: 'report',
  PRESENTATION: 'presentation',
  OTHER: 'other',
};

// Catégories de documents
export const DOCUMENT_CATEGORIES = {
  PROJECT: 'projet',
  FINANCE: 'finance',
  HR: 'rh',
  TECHNICAL: 'technique',
  LEGAL: 'juridique',
  MARKETING: 'marketing',
  ADMINISTRATIVE: 'administratif',
  OTHER: 'other',
};

export function DocumentsProvider({ children }) {
  // Utiliser localStorage pour la persistence
  const [documents, setDocuments] = useLocalStorage('powalyze_documents', []);
  const [loading, setLoading] = useState(false);

  // Ajouter un document
  const addDocument = (documentData) => {
    const newDocument = {
      id: uuidv4(),
      ...documentData,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      size: documentData.size || 0,
      type: documentData.type || DOCUMENT_TYPES.OTHER,
      category: documentData.category || DOCUMENT_CATEGORIES.OTHER,
      tags: documentData.tags || [],
      projectId: documentData.projectId || null,
      uploadedBy: documentData.uploadedBy || 'current-user',
      version: 1,
      versions: [],
    };

    setDocuments(prev => [...prev, newDocument]);
    return newDocument;
  };

  // Mettre à jour un document
  const updateDocument = (documentId, updates) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : doc
      )
    );
  };

  // Supprimer un document
  const deleteDocument = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  // Obtenir un document par ID
  const getDocumentById = (documentId) => {
    return documents.find(doc => doc.id === documentId);
  };

  // Obtenir les documents d'un projet
  const getProjectDocuments = (projectId) => {
    return documents.filter(doc => doc.projectId === projectId);
  };

  // Ajouter une nouvelle version
  const addDocumentVersion = (documentId, versionData) => {
    setDocuments(prev =>
      prev.map(doc => {
        if (doc.id === documentId) {
          const newVersion = {
            id: uuidv4(),
            version: doc.version + 1,
            ...versionData,
            uploadedAt: new Date().toISOString(),
          };
          
          return {
            ...doc,
            version: doc.version + 1,
            versions: [...doc.versions, { ...doc, id: uuidv4() }],
            ...versionData,
            updatedAt: new Date().toISOString(),
          };
        }
        return doc;
      })
    );
  };

  // Filtrer les documents
  const filterDocuments = (filters) => {
    return documents.filter(doc => {
      if (filters.type && doc.type !== filters.type) return false;
      if (filters.category && doc.category !== filters.category) return false;
      if (filters.projectId && doc.projectId !== filters.projectId) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          doc.name.toLowerCase().includes(searchLower) ||
          (doc.description && doc.description.toLowerCase().includes(searchLower)) ||
          doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      if (filters.tags && filters.tags.length > 0) {
        return filters.tags.some(tag => doc.tags.includes(tag));
      }
      return true;
    });
  };

  // Obtenir les tags utilisés
  const getAllTags = () => {
    const tagsSet = new Set();
    documents.forEach(doc => {
      doc.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  };

  // Calculer les statistiques
  const getStats = () => {
    return {
      total: documents.length,
      byType: {
        pdf: documents.filter(d => d.type === DOCUMENT_TYPES.PDF).length,
        word: documents.filter(d => d.type === DOCUMENT_TYPES.WORD).length,
        excel: documents.filter(d => d.type === DOCUMENT_TYPES.EXCEL).length,
        image: documents.filter(d => d.type === DOCUMENT_TYPES.IMAGE).length,
        contract: documents.filter(d => d.type === DOCUMENT_TYPES.CONTRACT).length,
        report: documents.filter(d => d.type === DOCUMENT_TYPES.REPORT).length,
        other: documents.filter(d => d.type === DOCUMENT_TYPES.OTHER).length,
      },
      byCategory: {
        project: documents.filter(d => d.category === DOCUMENT_CATEGORIES.PROJECT).length,
        finance: documents.filter(d => d.category === DOCUMENT_CATEGORIES.FINANCE).length,
        hr: documents.filter(d => d.category === DOCUMENT_CATEGORIES.HR).length,
        technical: documents.filter(d => d.category === DOCUMENT_CATEGORIES.TECHNICAL).length,
        legal: documents.filter(d => d.category === DOCUMENT_CATEGORIES.LEGAL).length,
        other: documents.filter(d => d.category === DOCUMENT_CATEGORIES.OTHER).length,
      },
      totalSize: documents.reduce((sum, doc) => sum + (doc.size || 0), 0),
    };
  };

  const value = {
    documents,
    loading,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocumentById,
    getProjectDocuments,
    addDocumentVersion,
    filterDocuments,
    getAllTags,
    getStats,
    DOCUMENT_TYPES,
    DOCUMENT_CATEGORIES,
  };

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
}

export default DocumentsContext;
