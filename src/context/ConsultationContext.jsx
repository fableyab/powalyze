import React, { createContext, useContext, useState, useCallback } from 'react';
import { consultationService } from '@/services/consultation/consultationService';
import { useToast } from '@/components/ui/use-toast';

const ConsultationContext = createContext();

export const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const submitConsultation = async (data) => {
    setLoading(true);
    try {
      const result = await consultationService.submitConsultation(data);
      return result;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const loadConsultations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await consultationService.getConsultations();
      setConsultations(data);
    } catch (e) {
      setError(e.message);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les consultations." });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateConsultationStatus = async (id, status) => {
     try {
        await consultationService.updateConsultation(id, { status });
        setConsultations(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        toast({ title: "Mise à jour", description: "Statut modifié avec succès." });
     } catch (e) {
        toast({ variant: "destructive", title: "Erreur", description: e.message });
     }
  };

  const deleteConsultation = async (id) => {
     try {
        await consultationService.deleteConsultation(id);
        setConsultations(prev => prev.filter(c => c.id !== id));
        toast({ title: "Suppression", description: "Consultation supprimée." });
     } catch (e) {
        toast({ variant: "destructive", title: "Erreur", description: e.message });
     }
  };

  return (
    <ConsultationContext.Provider value={{ 
      consultations, 
      loading, 
      error, 
      submitConsultation, 
      loadConsultations,
      updateConsultationStatus,
      deleteConsultation
    }}>
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => useContext(ConsultationContext);