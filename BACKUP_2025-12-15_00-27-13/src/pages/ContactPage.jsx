
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/context/LanguageContext';
import { seoData } from '@/utils/seoData';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import ConsultationForm from '@/components/Forms/ConsultationForm';
import { MapPin, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const { language, t } = useLanguage();
  const meta = seoData.contact;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <Helmet>
        <title>{meta.title[language]}</title>
        <meta name="description" content={meta.description[language]} />
      </Helmet>
      
      <Navbar />

         <Hero 
            title={meta.title[language].split('|')[0]}
            subtitle={meta.description[language]}
            overlayOpacity={0.55}
            size="compact"
            bgImage="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80"
         />

         <main className="container mx-auto px-6 py-16">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-10">
               <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80" alt="Équipe" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-white">Nos Coordonnées</h3>
                  <div className="space-y-6">
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#111] rounded border border-white/10 text-[#BFA76A]"><MapPin /></div>
                        <div>
                           <h4 className="font-bold text-white">Siège Social</h4>
                           <p className="text-gray-400">Genève, Lausanne, Valais, Canton de Vaud<br/>Suisse Alémanique</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#111] rounded border border-white/10 text-[#BFA76A]"><Phone /></div>
                        <div>
                           <h4 className="font-bold text-white">Téléphone</h4>
                           <p className="text-gray-400">+33(0) 6 15 76 70 67</p>
                           <p className="text-xs text-gray-500">Lun-Ven, 9h-18h</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#111] rounded border border-white/10 text-[#BFA76A]"><Mail /></div>
                        <div>
                           <h4 className="font-bold text-white">Email</h4>
                           <p className="text-gray-400">contact@powalyze.ch</p>
                        </div>
                     </div>
                  </div>
                  </div>
               </div>

               <div className="p-8 bg-[#111] rounded-xl border border-white/10">
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2"><Clock size={20} className="text-[#BFA76A]"/> Quick Contacts</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400">Sales</span>
                        <a href="mailto:sales@powalyze.ch" className="text-white hover:text-[#BFA76A]">sales@powalyze.ch</a>
                     </div>
                     <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400">Support</span>
                        <a href="mailto:support@powalyze.ch" className="text-white hover:text-[#BFA76A]">support@powalyze.ch</a>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Press</span>
                        <a href="mailto:media@powalyze.ch" className="text-white hover:text-[#BFA76A]">media@powalyze.ch</a>
                     </div>
                  </div>
               </div>

               <div className="bg-[#111] rounded-xl border border-white/10 p-6">
                  <h3 className="text-base font-bold mb-3 flex items-center gap-2"><HelpCircle size={18} className="text-[#BFA76A]"/> Questions fréquentes</h3>
                  <p className="text-gray-400 mb-3 text-sm">Vous avez des questions sur nos services ou nos tarifs ? Consultez notre FAQ.</p>
                  <Link to="/faq" className="text-[#BFA76A] font-bold hover:underline text-sm">Accéder à la FAQ →</Link>
               </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
               <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
                  <h2 className="text-xl font-bold mb-4 text-white">Envoyez-nous un message</h2>
                  <ConsultationForm />
               </div>
            </div>

         </div>
      </main>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-[#111] relative">
         <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.8822572626!2d6.147397776840752!3d46.20412897109576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c652e73a0e3d9%3A0x6c30263832962155!2sRue%20de%20la%20Conf%C3%A9d%C3%A9ration%201%2C%201204%20Gen%C3%A8ve%2C%20Suisse!5e0!3m2!1sfr!2sfr!4v1709568923456!5m2!1sfr!2sfr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
         ></iframe>
         <div className="absolute inset-0 pointer-events-none border-t border-white/10"></div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ContactPage;
