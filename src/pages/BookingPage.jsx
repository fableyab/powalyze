import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Mail, Phone, Send, User, 
  MessageSquare, Calendar as CalendarIcon, Clock, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isToday, isWeekend, isBefore, startOfDay, addMinutes 
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Helmet } from 'react-helmet';

const BookingPage = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subjects = [
    "Audit PMO & Gouvernance",
    "Mise en place d'outils PPM",
    "Business Intelligence & Reporting",
    "Automation & AI",
    "Gouvernance & Risques",
    "Autre demande"
  ];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    const prev = subMonths(currentMonth, 1);
    if (!isBefore(endOfMonth(prev), startOfDay(new Date()))) {
      setCurrentMonth(prev);
    }
  };

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const isDateDisabled = (date) => {
    const today = startOfDay(new Date());
    return isWeekend(date) || isBefore(date, today);
  };

  const handleDateSelect = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    }
  };

  const generateTimeSlots = () => {
    if (!selectedDate) return [];
    
    const slots = [];
    let startTime = new Date(selectedDate);
    startTime.setHours(9, 0, 0, 0);
    
    const endTime = new Date(selectedDate);
    endTime.setHours(18, 0, 0, 0);
    const now = new Date();
    
    while (startTime < endTime) {
      const hours = startTime.getHours();
      const minutes = startTime.getMinutes();
      const isLunch = (hours === 12 && minutes === 30) || (hours === 13 && minutes === 0);
      
      if (!isLunch) {
        if (isToday(selectedDate)) {
           if (startTime > now) {
             slots.push(new Date(startTime));
           }
        } else {
           slots.push(new Date(startTime));
        }
      }
      
      startTime = addMinutes(startTime, 30);
    }
    return slots;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate) {
      toast({
        variant: "destructive",
        title: "Date manquante",
        description: "Veuillez sélectionner une date sur le calendrier.",
      });
      return;
    }

    if (!selectedTime) {
      toast({
        variant: "destructive",
        title: "Horaire manquant",
        description: "Veuillez sélectionner une heure de rendez-vous.",
      });
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      Nom: formData.lastName,
      Prénom: formData.firstName,
      Email: formData.email,
      Téléphone: formData.phone,
      Entreprise: formData.company,
      Sujet: formData.subject,
      "Date souhaitée": format(selectedDate, 'dd/MM/yyyy'),
      Heure: selectedTime,
      Message: formData.message || "Aucun message supplémentaire"
    };

    try {
      const response = await fetch("https://formspree.io/f/xeoyznlq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(submissionPayload)
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          lastName: '',
          firstName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        setSelectedDate(null);
        setSelectedTime(null);
        toast({
          title: "Demande envoyée !",
          description: `Rendez-vous demandé pour le ${submissionPayload["Date souhaitée"]} à ${submissionPayload["Heure"]}.`,
          className: "bg-[#BFA76A] text-black border-none",
        });
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: "Veuillez vérifier vos informations ou nous contacter directement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Réserver un rendez-vous | Powalyze</title>
        <meta name="description" content="Réservez votre créneau pour échanger avec nos experts PMO." />
      </Helmet>
      
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Navbar />
        
        <div className="pt-32 pb-12 px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">
                Réservez votre <span className="text-[#BFA76A]">Créneau</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                Sélectionnez une date et une heure ci-dessous pour échanger avec nos experts. 
                Audit, Conseil ou Démonstration - c'est gratuit et sans engagement.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8 lg:col-span-1 h-fit"
              >
                <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                  <h3 className="text-xl font-display text-white mb-6 border-b border-white/10 pb-4">Pourquoi ce RDV ?</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-300">
                      <CheckCircle className="text-[#BFA76A] shrink-0" size={20} />
                      <span className="text-sm">Analyse rapide de vos besoins PMO/Data</span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <CheckCircle className="text-[#BFA76A] shrink-0" size={20} />
                      <span className="text-sm">Démonstration de nos solutions</span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <CheckCircle className="text-[#BFA76A] shrink-0" size={20} />
                      <span className="text-sm">Conseils sur votre roadmap stratégique</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                  <h3 className="text-xl font-display text-white mb-6 border-b border-white/10 pb-4">Coordonnées</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#1C1C1C] rounded-full text-[#BFA76A] border border-white/5">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                        <a href="mailto:contact@powalyze.ch" className="text-white hover:text-[#BFA76A] transition-colors">contact@powalyze.ch</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#1C1C1C] rounded-full text-[#BFA76A] border border-white/5">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Téléphone</p>
                        <a href="tel:+330615767067" className="text-white hover:text-[#BFA76A] transition-colors">+33 06 15 76 70 67</a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-[#111] rounded-xl border border-white/10 overflow-hidden relative"
              >
                 {isSuccess ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] z-50 p-8 text-center">
                    <motion.div 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-[#BFA76A]/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle className="text-[#BFA76A]" size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-display text-white mb-4">Demande Confirmée !</h3>
                    <p className="text-gray-400 mb-8 max-w-md">
                      Votre demande de rendez-vous a bien été transmise.
                      Nous vous enverrons une confirmation et une invitation Google Meet/Teams très prochainement.
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 border border-[#BFA76A] text-[#BFA76A] hover:bg-[#BFA76A] hover:text-black transition-all uppercase text-sm font-bold tracking-widest rounded-sm"
                    >
                      Nouvelle réservation
                    </button>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="p-6 md:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-display text-white flex items-center gap-2 pb-2 border-b border-white/10">
                        <User size={18} className="text-[#BFA76A]" /> Vos Informations
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-gray-500 font-bold">Nom <span className="text-[#BFA76A]">*</span></label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors text-sm"
                            placeholder="Dupont"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-gray-500 font-bold">Prénom <span className="text-[#BFA76A]">*</span></label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors text-sm"
                            placeholder="Jean"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase text-gray-500 font-bold">Email Pro <span className="text-[#BFA76A]">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors text-sm"
                          placeholder="jean.dupont@entreprise.com"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-gray-500 font-bold">Téléphone <span className="text-[#BFA76A]">*</span></label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors text-sm"
                            placeholder="+33 6..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs uppercase text-gray-500 font-bold">Entreprise <span className="text-[#BFA76A]">*</span></label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors text-sm"
                            placeholder="Société SAS"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs uppercase text-gray-500 font-bold">Sujet <span className="text-[#BFA76A]">*</span></label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors appearance-none text-sm"
                        >
                          <option value="" disabled>Sélectionnez un sujet</option>
                          {subjects.map((subj, index) => (
                            <option key={index} value={subj} className="bg-[#111]">{subj}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-lg font-display text-white flex items-center gap-2 pb-2 border-b border-white/10">
                        <CalendarIcon size={18} className="text-[#BFA76A]" /> Date & Heure
                      </h3>

                      <div className="bg-[#0A0A0A] p-4 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-white font-medium capitalize">
                            {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                          </h4>
                          <div className="flex gap-2">
                            <button 
                              type="button"
                              onClick={prevMonth}
                              disabled={isSameMonth(currentMonth, new Date())}
                              className="p-1 hover:text-[#BFA76A] disabled:opacity-30 disabled:hover:text-current transition-colors"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              type="button"
                              onClick={nextMonth}
                              className="p-1 hover:text-[#BFA76A] transition-colors"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
                          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                            <div key={day} className="py-1">{day}</div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-sm">
                          {generateCalendarDays().map((day, idx) => {
                            const disabled = isDateDisabled(day);
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            const isCurrentMonth = isSameMonth(day, currentMonth);

                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={disabled}
                                onClick={() => handleDateSelect(day)}
                                className={cn(
                                  "aspect-square flex items-center justify-center rounded-sm relative transition-all",
                                  !isCurrentMonth && "invisible",
                                  disabled && "text-gray-700 cursor-not-allowed",
                                  !disabled && !isSelected && "text-gray-300 hover:bg-white/10 hover:text-white",
                                  isSelected && "bg-[#BFA76A] text-black font-bold shadow-lg scale-105 z-10",
                                  isToday(day) && !isSelected && "border border-[#BFA76A] text-[#BFA76A]"
                                )}
                              >
                                {format(day, 'd')}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedDate && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs uppercase text-gray-500 font-bold mb-3 flex items-center gap-2">
                              <Clock size={12} /> Créneaux disponibles le <span className="text-[#BFA76A]">{format(selectedDate, 'dd/MM/yyyy')}</span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {generateTimeSlots().length > 0 ? (
                                generateTimeSlots().map((time, idx) => {
                                  const timeStr = format(time, 'HH:mm');
                                  const isSelected = selectedTime === timeStr;
                                  
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setSelectedTime(timeStr)}
                                      className={cn(
                                        "py-2 px-1 text-xs rounded border transition-all",
                                        isSelected 
                                          ? "bg-[#BFA76A] border-[#BFA76A] text-black font-bold" 
                                          : "bg-[#0A0A0A] border-white/10 text-gray-300 hover:border-[#BFA76A]/50 hover:text-white"
                                      )}
                                    >
                                      {timeStr}
                                    </button>
                                  );
                                })
                              ) : (
                                <div className="col-span-3 text-center py-4 text-sm text-gray-500 bg-[#0A0A0A] rounded border border-white/5 border-dashed">
                                  Aucun créneau disponible ce jour.
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase text-gray-500 font-bold flex items-center gap-2">
                        <MessageSquare size={14} /> Message Complémentaire (Optionnel)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-md px-4 py-3 text-white focus:border-[#BFA76A] focus:outline-none transition-colors text-sm resize-none"
                        placeholder="Détails spécifiques sur vos besoins..."
                      ></textarea>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <p className="text-xs text-gray-500 max-w-md">
                        En cliquant sur "Réserver", vous acceptez que nous utilisions vos données pour vous recontacter. 
                        Vos données restent strictement confidentielles.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting || !selectedDate || !selectedTime}
                        className="w-full md:w-auto px-8 py-4 bg-[#BFA76A] text-black font-bold uppercase tracking-widest hover:bg-[#d4bb7e] transition-all duration-300 rounded-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_-5px_rgba(191,167,106,0.3)] hover:shadow-[0_0_30px_-5px_rgba(191,167,106,0.5)]"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                            Envoi...
                          </>
                        ) : (
                          <>
                            Réserver mon RDV gratuit
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
        
        <FooterSection />
      </div>
    </>
  );
};

export default BookingPage;