import React, { createContext, useContext, useState, useEffect } from 'react';

const DocumentsContext = createContext(null);

const STORAGE_KEY = 'powalyze_documents_v2';

export const FILE_TYPES = [
  { id: 'pdf', label: 'PDF', icon: '📄', accept: '.pdf', color: 'red' },
  { id: 'word', label: 'Word', icon: '📝', accept: '.doc,.docx', color: 'blue' },
  { id: 'excel', label: 'Excel', icon: '📊', accept: '.xls,.xlsx', color: 'green' },
  { id: 'powerpoint', label: 'PowerPoint', icon: '📽️', accept: '.ppt,.pptx', color: 'orange' },
  { id: 'image', label: 'Image', icon: '🖼️', accept: '.jpg,.jpeg,.png,.gif,.svg', color: 'purple' },
  { id: 'video', label: 'Vidéo', icon: '🎥', accept: '.mp4,.avi,.mov', color: 'pink' },
  { id: 'archive', label: 'Archive', icon: '📦', accept: '.zip,.rar,.7z', color: 'yellow' },
  { id: 'contract', label: 'Contrat', icon: '📑', accept: '.pdf,.doc,.docx', color: 'indigo' },
  { id: 'report', label: 'Rapport', icon: '📈', accept: '.pdf,.doc,.docx,.xlsx', color: 'cyan' },
  { id: 'other', label: 'Autre', icon: '📁', accept: '*', color: 'gray' },
];

export const CATEGORIES = [
  { id: 'project', label: 'Projet', icon: '🎯', color: 'blue' },
  { id: 'finance', label: 'Finance', icon: '💰', color: 'green' },
  { id: 'hr', label: 'Ressources Humaines', icon: '👥', color: 'purple' },
  { id: 'technical', label: 'Technique', icon: '⚙️', color: 'orange' },
  { id: 'legal', label: 'Juridique', icon: '⚖️', color: 'red' },
  { id: 'marketing', label: 'Marketing', icon: '📣', color: 'pink' },
  { id: 'sales', label: 'Commercial', icon: '💼', color: 'indigo' },
  { id: 'data', label: 'Données & Analytics', icon: '📊', color: 'cyan' },
  { id: 'powerbi', label: 'Power BI', icon: '📈', color: 'yellow' },
  { id: 'other', label: 'Autre', icon: '📁', color: 'gray' },
];

export const COMMON_TAGS = [
  'Urgent', 'Important', 'Confidentiel', 'Brouillon', 'Final',
  'Approuvé', 'En révision', 'Archivé', 'Template', 'Guide',
  'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024',
  'Budget', 'Planning', 'Stratégie', 'ROI', 'KPI',
];

export function DocumentsProvider({ children }) {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  const uploadDocument = (file, metadata, onProgress) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const uploadId = Date.now();

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        setUploadProgress(prev => ({ ...prev, [uploadId]: progress }));
        if (onProgress) onProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[uploadId];
              return newProgress;
            });
          }, 500);
        }
      }, 200);

      reader.onload = (e) => {
        const newDoc = {
          id: uploadId,
          name: file.name,
          originalName: file.name,
          fileType: metadata.fileType,
          category: metadata.category,
          tags: metadata.tags || [],
          size: file.size,
          mimeType: file.type,
          data: e.target.result,
          uploadedAt: new Date().toISOString(),
          uploadedBy: 'Utilisateur',
          lastModified: new Date().toISOString(),
        };

        setTimeout(() => {
          setDocuments(prev => [newDoc, ...prev]);
          resolve(newDoc);
        }, 1000);
      };

      reader.onerror = () => {
        clearInterval(interval);
        reject(new Error('Erreur de lecture du fichier'));
      };

      reader.readAsDataURL(file);
    });
  };

  const deleteDocument = (docId) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const renameDocument = (docId, newName) => {
    setDocuments(prev => prev.map(d => 
      d.id === docId 
        ? { ...d, name: newName, lastModified: new Date().toISOString() }
        : d
    ));
  };

  const updateDocumentTags = (docId, tags) => {
    setDocuments(prev => prev.map(d => 
      d.id === docId 
        ? { ...d, tags, lastModified: new Date().toISOString() }
        : d
    ));
  };

  const downloadDocument = (doc) => {
    try {
      const link = document.createElement('a');
      link.href = doc.data;
      link.download = doc.name;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        if (doc.data.startsWith('blob:')) {
          URL.revokeObjectURL(doc.data);
        }
      }, 100);
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      throw error;
    }
  };

  const value = {
    documents,
    uploadProgress,
    uploadDocument,
    deleteDocument,
    renameDocument,
    updateDocumentTags,
    downloadDocument,
  };

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocumentsContext() {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useDocumentsContext must be used within DocumentsProvider');
  }
  return context;
}