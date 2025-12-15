
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointment } from '@/context/AppointmentContext';
import { appointmentService } from '@/services/appointment/appointmentService';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const CancelAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cancelAppointment } = useAppointment();
  const [appointment, setAppointment] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await appointmentService.getAppointmentById(id);
      setAppointment(data);
    };
    load();
  }, [id]);

  const handleConfirm = async () => {
    await cancelAppointment(id, reason);
    navigate('/espace-client/appointments');
  };

  if (!appointment) return <div>Chargement...</div>;

  return (
    <div className="max-w-xl mx-auto pt-10">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-gray-400 hover:text-white pl-0">
        <ArrowLeft size={16} className="mr-2" /> Retour
      </Button>

      <div className="bg-[#111] border border-red-900/30 rounded-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center text-red-500">
            <AlertTriangle size={32} />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">Annuler le rendez-vous ?</h1>
        <p className="text-gray-400 text-center mb-8">
          Vous êtes sur le point d'annuler votre consultation avec {appointment.consultantName} le {new Date(appointment.date).toLocaleDateString()}.
        </p>

        <div className="space-y-4">
          <label className="text-sm text-gray-300 block">Raison (Optionnel)</label>
          <Textarea 
            className="bg-[#0A0A0A] border-white/10 min-h-[100px]"
            placeholder="Dites-nous pourquoi..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1 border-white/10" onClick={() => navigate(-1)}>
              Ne pas annuler
            </Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold" onClick={handleConfirm}>
              Confirmer l'annulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointment;
