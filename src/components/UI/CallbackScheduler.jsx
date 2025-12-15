import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Loader2, CheckCircle2, User, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { format, addDays, isWeekend, setHours, setMinutes } from 'date-fns';

const CallbackScheduler = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Generate available dates (next 14 days, skipping weekends)
  const getAvailableDates = () => {
    const dates = [];
    let current = new Date();
    let count = 0;
    while (count < 14) {
      current = addDays(current, 1);
      if (!isWeekend(current)) {
        dates.push(new Date(current));
      }
      count++;
    }
    return dates;
  };

  // Generate time slots (9AM - 6PM, 30 min intervals)
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    try {
      // 1. Save to Supabase (if connected)
      if (supabase) {
        await supabase.from('callbacks').insert([{
          date: formattedDate,
          time: selectedTime,
          user_email: formData.email,
          user_name: formData.name,
          phone: formData.phone,
          notes: formData.notes,
          status: 'scheduled'
        }]);
      }

      // 2. Send via Formspree
      await fetch("https://formspree.io/f/xeoyznlq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "New Callback Scheduled",
          ...formData,
          scheduled_date: formattedDate,
          scheduled_time: selectedTime
        })
      });

      setStep(3); // Success step
      toast({
        title: "Rendez-vous confirmé",
        description: "Nous vous rappellerons à l'heure convenue.",
        variant: "success"
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de planifier le rendez-vous. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dates = getAvailableDates();

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="text-[#BFA76A]" size={20} />
            Choisir un créneau
          </h3>
          
          <div className="mb-6">
            <Label className="text-gray-400 text-xs uppercase mb-3 block">Date</Label>
            <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
              {dates.map((date, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(date)}
                  className={`flex-shrink-0 w-16 h-20 rounded-lg flex flex-col items-center justify-center text-sm border transition-all ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? 'bg-[#BFA76A] text-black border-[#BFA76A]'
                      : 'bg-[#1C1C1C] text-gray-400 border-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="font-bold text-lg">{format(date, 'd')}</span>
                  <span className="text-xs uppercase">{format(date, 'EEE')}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="mb-8">
               <Label className="text-gray-400 text-xs uppercase mb-3 block">Heure (Paris/Genève)</Label>
               <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                 {timeSlots.map((time) => (
                   <button
                     key={time}
                     onClick={() => handleTimeSelect(time)}
                     className={`py-2 px-3 rounded text-sm font-medium border transition-all ${
                       selectedTime === time
                         ? 'bg-[#BFA76A] text-black border-[#BFA76A]'
                         : 'bg-[#1C1C1C] text-gray-300 border-white/5 hover:border-white/20'
                     }`}
                   >
                     {time}
                   </button>
                 ))}
               </div>
            </div>
          )}

          <div className="flex justify-end">
             <Button 
               disabled={!selectedDate || !selectedTime}
               onClick={() => setStep(2)}
               className="bg-[#BFA76A] text-black hover:bg-[#D4AF37]"
             >
               Suivant
             </Button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="text-[#BFA76A]" size={20} />
            Vos Coordonnées
          </h3>
          
          <div className="mb-6 p-4 bg-[#BFA76A]/5 border border-[#BFA76A]/20 rounded-lg text-sm text-gray-300 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <Clock className="text-[#BFA76A]" size={16} />
                <span>
                   {selectedDate && format(selectedDate, 'EEEE d MMMM yyyy')} à {selectedTime}
                </span>
             </div>
             <button onClick={() => setStep(1)} className="text-[#BFA76A] text-xs hover:underline">Modifier</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" size={16} />
                  <Input name="name" required value={formData.name} onChange={handleInputChange} className="pl-10 bg-[#1C1C1C] border-white/10" placeholder="John Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-500" size={16} />
                  <Input name="phone" required value={formData.phone} onChange={handleInputChange} className="pl-10 bg-[#1C1C1C] border-white/10" placeholder="+33 6..." />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={16} />
                <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="pl-10 bg-[#1C1C1C] border-white/10" placeholder="john@company.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sujet / Notes</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-500" size={16} />
                <Input name="notes" value={formData.notes} onChange={handleInputChange} className="pl-10 bg-[#1C1C1C] border-white/10" placeholder="Bref résumé de votre besoin..." />
              </div>
            </div>

            <div className="flex justify-between pt-4">
               <Button variant="ghost" type="button" onClick={() => setStep(1)} className="text-gray-400 hover:text-white">Retour</Button>
               <Button type="submit" disabled={isSubmitting} className="bg-[#BFA76A] text-black hover:bg-[#D4AF37]">
                 {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirmer le RDV"}
               </Button>
            </div>
          </form>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
           <div className="w-16 h-16 bg-[#BFA76A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-[#BFA76A]" size={32} />
           </div>
           <h3 className="text-2xl font-bold text-white mb-2">Rendez-vous Confirmé !</h3>
           <p className="text-gray-400 mb-8 max-w-sm mx-auto">
             Merci {formData.name}. Un consultant Powalyze vous contactera le <strong>{format(selectedDate, 'dd/MM/yyyy')}</strong> à <strong>{selectedTime}</strong> au numéro <strong>{formData.phone}</strong>.
           </p>
           <Button onClick={() => window.location.reload()} variant="outline" className="border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black">
              Nouveau rendez-vous
           </Button>
        </motion.div>
      )}
    </div>
  );
};

export default CallbackScheduler;