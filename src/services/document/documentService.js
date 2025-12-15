
// Mock document service
const DOCS_KEY = 'powalyze_documents';

export const documentService = {
  getDocuments: async (userId) => {
    await new Promise(r => setTimeout(r, 400));
    const docs = JSON.parse(localStorage.getItem(DOCS_KEY) || '[]');
    // Filter by user access ideally, but for mock return all or filter by owner
    return docs; 
  },

  uploadDocument: async (file, metadata) => {
    await new Promise(r => setTimeout(r, 1500)); // Simulate upload
    
    const newDoc = {
      id: `doc_${Date.now()}`,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      uploadedAt: new Date().toISOString(),
      ...metadata
    };

    const docs = JSON.parse(localStorage.getItem(DOCS_KEY) || '[]');
    docs.unshift(newDoc);
    localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
    
    return newDoc;
  },

  deleteDocument: async (docId) => {
    await new Promise(r => setTimeout(r, 300));
    const docs = JSON.parse(localStorage.getItem(DOCS_KEY) || '[]');
    const newDocs = docs.filter(d => d.id !== docId);
    localStorage.setItem(DOCS_KEY, JSON.stringify(newDocs));
    return true;
  }
};
