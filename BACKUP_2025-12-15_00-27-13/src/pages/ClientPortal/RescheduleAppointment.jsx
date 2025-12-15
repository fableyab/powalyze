
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppointment } from '@/context/AppointmentContext';
import { appointmentService } from '@/services/appointment/appointmentService';
import AppointmentCalendar from '@/components/Appointment/AppointmentCalendar';
import TimeSlotSelector from '@/components/Appointment/TimeSlotSelector';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const RescheduleAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rescheduleAppointment } = useAppointment();
  const [appointment, setAppointment] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await appointmentService.getAppointmentById(id);
      setAppointment(data);
      if(data) {
         const s = await appointmentService.getAvailableSlots(new Date(), data.consultantId);
         setSlots(s);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (appointment && newDate) {
      const fetchSlots = async () => {
        const s = await appointmentService.getAvailableSlots(newDate, appointment.consultantId);
        setSlots(s);
      };
      fetchSlots();
    }
  }, [newDate, appointment]);

  const handleConfirm = async () => {
    if (newDate && newTime) {
      await rescheduleAppointment(id, newDate.toISOString(), newTime);
      navigate('/espace-client/appointments');
    }
  };

  if (!appointment) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-gray-400 hover:text-white pl-0">
        <ArrowLeft size={16} className="mr-2" /> Retour
      </Button>

      <h1 className="text-2xl font-bold text-white mb-8">Reporter le rendez-vous</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Nouvelle Date</h3>
          <AppointmentCalendar selectedDate={newDate} onSelect={setNewDate} />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Nouvel Horaire</h3>
          <div className="bg-[#111] p-6 rounded-xl border border-white/10 mb-6">
             <TimeSlotSelector slots={slots} selectedTime={newTime} onSelect={setNewTime} />
          </div>
          
          <Button 
            className="w-full bg-[#BFA76A] text-black font-bold hover:bg-white h-12"
            disabled={!newTime}
            onClick={handleConfirm}
          >
            Confirmer le changement
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointment;
