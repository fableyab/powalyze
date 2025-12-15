
import React, { useEffect } from 'react';
import { useAppointment } from '@/context/AppointmentContext';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AppointmentCard from '@/components/Appointment/AppointmentCard';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AppointmentManagement = () => {
  const { appointments, loadAppointments, loading, cancelAppointment } = useAppointment();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadAppointments(user.id);
    }
  }, [user]);

  const upcoming = appointments.filter(a => new Date(a.date) >= new Date() && a.status !== 'cancelled');
  const past = appointments.filter(a => new Date(a.date) < new Date() && a.status !== 'cancelled');
  const cancelled = appointments.filter(a => a.status === 'cancelled');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-display font-bold text-white">Mes Rendez-vous</h1>
        <Link to="/appointment-booking">
          <Button className="bg-[#BFA76A] text-black hover:bg-white font-bold">
            <Calendar size={16} className="mr-2" /> Nouveau Rendez-vous
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-[#111] border border-white/10 p-1 mb-6">
          <TabsTrigger value="upcoming">À venir ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Passés</TabsTrigger>
          <TabsTrigger value="cancelled">Annulés</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length > 0 ? (
            upcoming.map(app => (
              <AppointmentCard key={app.id} appointment={app} onCancel={() => cancelAppointment(app.id)} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500 bg-[#111] rounded-xl border border-white/10">
              Aucun rendez-vous à venir.
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {past.map(app => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelled.map(app => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentManagement;
