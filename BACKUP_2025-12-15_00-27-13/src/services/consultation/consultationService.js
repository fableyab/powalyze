const CONSULTATION_KEY = 'powalyze_consultations';

export const consultationService = {
  submitConsultation: async (data) => {
    await new Promise(r => setTimeout(r, 1000));
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email) {
      throw new Error("Champs obligatoires manquants");
    }

    const consultations = JSON.parse(localStorage.getItem(CONSULTATION_KEY) || '[]');
    const newConsultation = {
      id: `cons_${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      ...data
    };
    
    consultations.push(newConsultation);
    localStorage.setItem(CONSULTATION_KEY, JSON.stringify(consultations));
    
    return newConsultation;
  },

  getConsultations: async (userId) => {
    // In a real app, verify user role or ID
    return JSON.parse(localStorage.getItem(CONSULTATION_KEY) || '[]');
  },

  getConsultation: async (id) => {
    const consultations = JSON.parse(localStorage.getItem(CONSULTATION_KEY) || '[]');
    return consultations.find(c => c.id === id) || null;
  },

  updateConsultation: async (id, updates) => {
    const consultations = JSON.parse(localStorage.getItem(CONSULTATION_KEY) || '[]');
    const index = consultations.findIndex(c => c.id === id);
    if (index !== -1) {
      consultations[index] = { ...consultations[index], ...updates };
      localStorage.setItem(CONSULTATION_KEY, JSON.stringify(consultations));
      return consultations[index];
    }
    throw new Error('Consultation non trouvée');
  },

  deleteConsultation: async (id) => {
    const consultations = JSON.parse(localStorage.getItem(CONSULTATION_KEY) || '[]');
    const filtered = consultations.filter(c => c.id !== id);
    localStorage.setItem(CONSULTATION_KEY, JSON.stringify(filtered));
    return true;
  },

  validateConsultation: (data) => {
    if (!data.email || !data.firstName || !data.lastName) return false;
    return true;
  }
};