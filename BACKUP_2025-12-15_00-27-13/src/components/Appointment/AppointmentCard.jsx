
import React from 'react';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const AppointmentCard = ({ appointment, onCancel }) => {
  const isUpcoming = new Date(appointment.date) > new Date();
  
  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#BFA76A]/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-bold text-lg mb-1">{appointment.serviceName}</h3>
          <div className="flex items-center gap-2 text-sm text-[#BFA76A]">
            <User size={14} />
            <span>{appointment.consultantName}</span>
          </div>
        </div>
        <Badge variant={appointment.status === 'cancelled' ? 'destructive' : 'outline'} className="uppercase text-[10px]">
          {appointment.status}
        </Badge>
      </div>

      <div className="flex gap-4 mb-6 text-sm text-gray-400 bg-[#1A1A1A] p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{new Date(appointment.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{appointment.time} ({appointment.duration} min)</span>
        </div>
      </div>

      <div className="flex gap-2">
        {appointment.status !== 'cancelled' && isUpcoming && (
          <>
            <Link to={`/espace-client/reschedule/${appointment.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full border-white/10">Reporter</Button>
            </Link>
            <Link to={`/espace-client/cancel/${appointment.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full border-white/10 hover:text-red-500 hover:border-red-900 hover:bg-red-900/10">Annuler</Button>
            </Link>
            <Button size="sm" className="bg-[#BFA76A] text-black font-bold hover:bg-white">
              <Video size={14} className="mr-2"/> Rejoindre
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
