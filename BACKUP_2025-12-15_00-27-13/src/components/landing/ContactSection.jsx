import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ContactCard = ({ icon: Icon, label, sub, btnText, linkTo, primary }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`flex flex-col items-center p-8 rounded-sm border transition-all duration-300 w-full flex-1 ${
        primary 
          ? 'bg-[#BFA76A]/10 border-[#BFA76A] shadow-[0_0_30px_rgba(191,167,106,0.1)]' 
          : 'bg-[#111] border-[#333] hover:border-[#BFA76A]/50'
      }`}
    >
      <div className={`p-4 rounded-full mb-6 ${primary ? 'bg-[#BFA76A] text-black' : 'bg-[#1C1C1C] text-[#BFA76A]'}`}>
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 text-center">{label}</h3>
      <p className="text-gray-400 text-sm mb-8 text-center">{sub}</p>
      
      <Link to={linkTo} className="w-full">
        <Button 
          className={`w-full ${primary ? 'bg-[#BFA76A] text-black hover:bg-[#d4bb7e]' : 'bg-transparent border border-[#333] hover:border-[#BFA76A] hover:text-[#BFA76A]'}`}
        >
          {btnText}
        </Button>
      </Link>
    </motion.div>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 px-6 bg-[#0A0A0A] relative border-t border-[#1C1C1C]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#BFA76A] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            {t('navbar.contact')}
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-[#C8C8C8] text-xl font-light max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard 
            icon={Calendar} 
            label={t('contact.schedule.label')}
            sub={t('contact.schedule.sub')}
            btnText={t('contact.schedule.btn')}
            linkTo="/contact"
            primary={true}
          />
          <ContactCard 
            icon={Mail} 
            label={t('contact.email.label')}
            sub={t('contact.email.sub')}
            btnText={t('contact.email.btn')}
            linkTo="/contact"
          />
          <ContactCard 
            icon={FileText} 
            label={t('contact.offer.label')}
            sub={t('contact.offer.sub')}
            btnText={t('contact.offer.btn')}
            linkTo="/contact"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;