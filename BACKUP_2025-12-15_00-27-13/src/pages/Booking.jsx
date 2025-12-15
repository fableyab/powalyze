import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Booking = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: '',
    date: '',
    timeSlot: 'morning'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Confirmation",
        description: t('booking.success'),
        className: "bg-[#1C1C1C] border-l-4 border-[#BFA76A] text-white"
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project: '',
        date: '',
        timeSlot: 'morning'
      });
    }, 1000);
  };

  // Generate next 30 days for calendar simulation
  const getNextDays = (count = 30) => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= count; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const availableDates = getNextDays(14); // Show next 14 days available

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <span className="inline-block mb-4 text-[#BFA76A] text-xs font-bold uppercase tracking-[0.2em] border border-[#BFA76A]/30 px-3 py-1 rounded-full backdrop-blur-sm">
              {t('nav.freeAudit')}
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight whitespace-pre-line">
              {t('booking.title')}
            </h1>
            <p className="text-[#C8C8C8] text-lg font-light leading-relaxed">
              {t('booking.desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Benefits & Offer */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Benefits Card */}
              <div className="bg-[#111] border border-[#1C1C1C] p-8 rounded-sm relative overflow-hidden group hover:border-[#BFA76A]/50 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckCircle2 size={120} className="text-[#BFA76A]" />
                </div>
                
                <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-[#BFA76A] rounded-full"></span>
                  {t('booking.benefits.title')}
                </h3>
                
                <ul className="space-y-4 relative z-10">
                  {(t('booking.benefits.list') || []).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <div className="mt-1 bg-[#1C1C1C] p-1 rounded-full group-hover/item:bg-[#BFA76A] transition-colors duration-300">
                        <Check size={12} className="text-[#BFA76A] group-hover/item:text-black transition-colors duration-300" strokeWidth={3} />
                      </div>
                      <span className="text-[#C8C8C8] font-light group-hover/item:text-white transition-colors">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111] border border-[#1C1C1C] p-6 rounded-sm text-center hover:border-[#3A7BFF]/50 transition-colors">
                   <Clock size={32} className="text-[#3A7BFF] mx-auto mb-3" strokeWidth={1.5} />
                   <p className="text-white font-medium">60 Minutes</p>
                   <p className="text-xs text-[#777] uppercase tracking-wider">Durée</p>
                </div>
                <div className="bg-[#111] border border-[#1C1C1C] p-6 rounded-sm text-center hover:border-[#BFA76A]/50 transition-colors">
                   <Calendar size={32} className="text-[#BFA76A] mx-auto mb-3" strokeWidth={1.5} />
                   <p className="text-white font-medium">Flexible</p>
                   <p className="text-xs text-[#777] uppercase tracking-wider">Disponibilité</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Booking Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="bg-[#111] border border-[#1C1C1C] p-8 md:p-10 rounded-sm shadow-2xl shadow-black/50 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#BFA76A] to-[#3A7BFF]"></div>
                
                <h3 className="text-2xl font-light text-white mb-8">{t('booking.form.title')}</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#888] uppercase text-xs tracking-wider">{t('booking.form.name')}</Label>
                      <Input 
                        id="name" name="name" required 
                        value={formData.name} onChange={handleChange}
                        className="bg-[#0A0A0A] border-[#333] text-white focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] h-12 rounded-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#888] uppercase text-xs tracking-wider">{t('booking.form.email')}</Label>
                      <Input 
                        type="email" id="email" name="email" required 
                        value={formData.email} onChange={handleChange}
                        className="bg-[#0A0A0A] border-[#333] text-white focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] h-12 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#888] uppercase text-xs tracking-wider">{t('booking.form.phone')}</Label>
                      <Input 
                        type="tel" id="phone" name="phone" 
                        value={formData.phone} onChange={handleChange}
                        className="bg-[#0A0A0A] border-[#333] text-white focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] h-12 rounded-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-[#888] uppercase text-xs tracking-wider">{t('booking.form.company')}</Label>
                      <Input 
                        id="company" name="company" required 
                        value={formData.company} onChange={handleChange}
                        className="bg-[#0A0A0A] border-[#333] text-white focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] h-12 rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#888] uppercase text-xs tracking-wider mb-2 block">{t('booking.form.date')}</Label>
                    <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                      {availableDates.map((date, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setFormData({...formData, date: date.toISOString()})}
                          className={`flex-shrink-0 w-20 h-24 rounded-sm cursor-pointer border flex flex-col items-center justify-center transition-all duration-300 ${
                            formData.date === date.toISOString()
                            ? 'bg-[#BFA76A] border-[#BFA76A] text-black' 
                            : 'bg-[#1A1A1A] border-[#333] text-[#888] hover:border-[#BFA76A] hover:text-white'
                          }`}
                        >
                          <span className="text-xs uppercase font-bold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                          <span className="text-2xl font-light my-1">{date.getDate()}</span>
                          <span className="text-[10px]">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#888] uppercase text-xs tracking-wider">{t('booking.form.time')}</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, timeSlot: 'morning'})}
                        className={`p-3 rounded-sm border text-sm font-medium transition-all ${
                          formData.timeSlot === 'morning'
                          ? 'bg-[#3A7BFF] border-[#3A7BFF] text-white'
                          : 'bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#3A7BFF] hover:text-white'
                        }`}
                      >
                        {t('booking.slots.morning')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, timeSlot: 'afternoon'})}
                        className={`p-3 rounded-sm border text-sm font-medium transition-all ${
                          formData.timeSlot === 'afternoon'
                          ? 'bg-[#3A7BFF] border-[#3A7BFF] text-white'
                          : 'bg-[#0A0A0A] border-[#333] text-[#888] hover:border-[#3A7BFF] hover:text-white'
                        }`}
                      >
                        {t('booking.slots.afternoon')}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project" className="text-[#888] uppercase text-xs tracking-wider">{t('booking.form.project')}</Label>
                    <Textarea 
                      id="project" name="project" 
                      value={formData.project} onChange={handleChange}
                      className="bg-[#0A0A0A] border-[#333] text-white focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] min-h-[100px] rounded-sm"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold uppercase tracking-widest py-6 text-sm rounded-sm transition-colors shadow-[0_0_20px_rgba(191,167,106,0.2)] hover:shadow-[0_0_30px_rgba(191,167,106,0.4)]"
                  >
                    {t('booking.form.submit')} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Booking;