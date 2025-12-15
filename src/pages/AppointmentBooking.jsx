
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { useAppointment } from '@/context/AppointmentContext';
import { appointmentServices, consultants } from '@/data/appointmentData';
import { appointmentService } from '@/services/appointment/appointmentService';
import AppointmentCalendar from '@/components/Appointment/AppointmentCalendar';
import TimeSlotSelector from '@/components/Appointment/TimeSlotSelector';
import AppointmentForm from '@/components/Appointment/AppointmentForm';
import AppointmentConfirmation from '@/components/Appointment/AppointmentConfirmation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const steps = ['Service', 'Expert', 'Date', 'Infos'];

const AppointmentBooking = () => {
  const { bookAppointment } = useAppointment();
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    service: null,
    consultant: null,
    date: new Date(),
    time: null,
    userDetails: null
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch slots when date or consultant changes
  useEffect(() => {
    if (currentStep === 2 && bookingData.consultant && bookingData.date) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        try {
          const slots = await appointmentService.getAvailableSlots(bookingData.date, bookingData.consultant.id);
          setAvailableSlots(slots);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [bookingData.date, bookingData.consultant, currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const finalData = {
        ...formData,
        serviceId: bookingData.service.id,
        serviceName: bookingData.service.title[language],
        consultantId: bookingData.consultant.id,
        consultantName: bookingData.consultant.name,
        date: bookingData.date.toISOString(),
        time: bookingData.time,
        duration: bookingData.service.duration
      };
      
      await bookAppointment(finalData);
      setBookingData({ ...bookingData, userDetails: finalData }); // Store for confirmation view
      setIsSuccess(true);
    } catch (error) {
      console.error("Booking error", error);
    }
  };

  const ProgressSteps = () => (
    <div className="flex justify-between mb-12 relative max-w-2xl mx-auto">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-[#BFA76A] -translate-y-1/2 z-0 transition-all duration-500" 
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      ></div>
      
      {steps.map((step, index) => (
        <div key={index} className="relative z-10 flex flex-col items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2 
              ${index <= currentStep ? 'bg-[#BFA76A] border-[#BFA76A] text-black' : 'bg-[#111] border-white/20 text-gray-500'}
            `}
          >
            {index < currentStep ? <CheckCircle size={14} /> : index + 1}
          </div>
          <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-[#BFA76A]' : 'text-gray-600'}`}>{step}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <SEO title="Book a Consultation | Powalyze" />
      <Navbar />

      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-white mb-4">Réservez votre Consultation</h1>
            <p className="text-gray-400">Nos experts sont à votre disposition pour accélérer votre transformation.</p>
          </div>

          {!isSuccess && <ProgressSteps />}

          <div className="min-h-[400px]">
            {isSuccess ? (
              <AppointmentConfirmation 
                details={{
                  serviceName: bookingData.service.title[language],
                  consultantName: bookingData.consultant.name,
                  date: bookingData.date,
                  time: bookingData.time,
                  email: bookingData.userDetails.email
                }} 
              />
            ) : (
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div 
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {appointmentServices.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => { setBookingData({ ...bookingData, service }); handleNext(); }}
                        className={`p-6 rounded-xl border cursor-pointer transition-all hover:border-[#BFA76A] hover:bg-[#1A1A1A] group
                          ${bookingData.service?.id === service.id ? 'border-[#BFA76A] bg-[#1A1A1A]' : 'border-white/10 bg-[#111]'}
                        `}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-lg ${bookingData.service?.id === service.id ? 'bg-[#BFA76A] text-black' : 'bg-white/5 text-[#BFA76A] group-hover:bg-[#BFA76A] group-hover:text-black'}`}>
                            <service.icon size={24} />
                          </div>
                          <span className="text-sm font-mono text-gray-500">{service.duration} min</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{service.title[language]}</h3>
                        <p className="text-sm text-gray-400 mb-4 h-10">{service.description[language]}</p>
                        <div className="text-[#BFA76A] font-bold text-lg">{service.price} CHF</div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 mb-6">
                       <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white"><ArrowLeft size={16} className="mr-2"/> Retour</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {consultants.map(consultant => (
                        <div 
                          key={consultant.id}
                          onClick={() => { setBookingData({ ...bookingData, consultant }); handleNext(); }}
                          className={`p-6 rounded-xl border cursor-pointer transition-all hover:border-[#BFA76A] text-center group
                            ${bookingData.consultant?.id === consultant.id ? 'border-[#BFA76A] bg-[#1A1A1A]' : 'border-white/10 bg-[#111]'}
                          `}
                        >
                          <div className="w-24 h-24 rounded-full bg-[#222] mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-[#BFA76A] border-2 border-[#333] group-hover:border-[#BFA76A] transition-colors">
                            {consultant.avatar}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1">{consultant.name}</h3>
                          <p className="text-xs text-[#BFA76A] uppercase tracking-wider mb-4">{consultant.role}</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {consultant.expertise.map(exp => (
                              <span key={exp} className="text-[10px] bg-black/50 px-2 py-1 rounded text-gray-400 border border-white/5">{exp}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                       <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white"><ArrowLeft size={16} className="mr-2"/> Retour</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <AppointmentCalendar 
                        selectedDate={bookingData.date} 
                        onSelect={(date) => setBookingData({ ...bookingData, date, time: null })} 
                      />
                      <div className="space-y-6">
                        <div className="bg-[#111] p-4 rounded-xl border border-white/10">
                          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <User className="text-[#BFA76A]" size={18} /> {bookingData.consultant?.name}
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">Disponibilités pour le {bookingData.date.toLocaleDateString()}</p>
                          <TimeSlotSelector 
                            slots={availableSlots} 
                            selectedTime={bookingData.time}
                            onSelect={(time) => setBookingData({ ...bookingData, time })}
                            loading={loadingSlots}
                          />
                        </div>
                        {bookingData.time && (
                          <Button onClick={handleNext} className="w-full bg-[#BFA76A] text-black font-bold hover:bg-white h-12">
                            Continuer <ArrowRight size={16} className="ml-2" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                       <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-white"><ArrowLeft size={16} className="mr-2"/> Retour</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-2">
                        <AppointmentForm onSubmit={handleFormSubmit} />
                      </div>
                      <div>
                        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/10 sticky top-32">
                          <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Récapitulatif</h3>
                          <div className="space-y-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs uppercase mb-1">Service</p>
                              <p className="text-white font-medium">{bookingData.service?.title[language]}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs uppercase mb-1">Expert</p>
                              <p className="text-white font-medium">{bookingData.consultant?.name}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs uppercase mb-1">Date</p>
                              <p className="text-white font-medium">{bookingData.date?.toLocaleDateString()} à {bookingData.time}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs uppercase mb-1">Prix</p>
                              <p className="text-[#BFA76A] font-bold text-lg">{bookingData.service?.price} CHF</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default AppointmentBooking;
