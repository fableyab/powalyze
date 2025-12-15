
import React from 'react';
import { CheckCircle, Calendar, Link as LinkIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AppointmentConfirmation = ({ details }) => {
  return (
    <div className="text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      
      <h2 className="text-3xl font-display font-bold text-white mb-2">Réservation Confirmée !</h2>
      <p className="text-gray-400 mb-8">Un email de confirmation a été envoyé à {details.email}</p>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 max-w-md mx-auto text-left mb-8">
        <h3 className="text-[#BFA76A] text-sm font-bold uppercase tracking-wider mb-4">Récapitulatif</h3>
        
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-gray-500">Service</span>
            <span className="text-white font-medium">{details.serviceName}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-gray-500">Expert</span>
            <span className="text-white font-medium">{details.consultantName}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-gray-500">Date & Heure</span>
            <span className="text-white font-medium">{new Date(details.date).toLocaleDateString()} à {details.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Lieu</span>
            <span className="text-white font-medium flex items-center gap-1"><LinkIcon size={12}/> Google Meet</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline" className="border-white/10" onClick={() => window.print()}>
          <Download size={16} className="mr-2"/> Ajouter au calendrier
        </Button>
        <Link to="/">
          <Button className="bg-[#BFA76A] text-black font-bold hover:bg-white">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
