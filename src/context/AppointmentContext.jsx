
import React, { createContext, useContext, useState } from 'react';
import { appointmentService } from '@/services/appointment/appointmentService';
import { useToast } from '@/components/ui/use-toast';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadAppointments = async (userId) => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments(userId);
      setAppointments(data);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to load appointments." });
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (data) => {
    setLoading(true);
    try {
      const result = await appointmentService.createAppointment(data);
      setAppointments(prev => [...prev, result]);
      toast({ title: "Booking Confirmed", description: "Your appointment has been scheduled." });
      return result;
    } catch (err) {
      toast({ variant: "destructive", title: "Booking Failed", description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id, reason) => {
    try {
      const updated = await appointmentService.cancelAppointment(id, reason);
      setAppointments(prev => prev.map(a => a.id === id ? updated : a));
      toast({ title: "Appointment Cancelled", description: "The appointment has been cancelled successfully." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to cancel appointment." });
    }
  };

  const rescheduleAppointment = async (id, newDate, newTime) => {
    try {
      const updated = await appointmentService.updateAppointment(id, { date: newDate, time: newTime });
      setAppointments(prev => prev.map(a => a.id === id ? updated : a));
      toast({ title: "Rescheduled", description: "Appointment updated successfully." });
      return updated;
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to reschedule." });
      throw err;
    }
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      loading,
      loadAppointments,
      bookAppointment,
      cancelAppointment,
      rescheduleAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => useContext(AppointmentContext);
