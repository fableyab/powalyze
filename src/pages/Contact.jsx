import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form data:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-40 pb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000" 
            alt="Contact Us"
            className="w-full h-full object-cover opacity-[0.05]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/95 via-[#000000]/98 to-[#0D0D0D]/95 z-[1]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-extralight tracking-tight mb-8">
              Contact
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto">
              Discutons de vos enjeux et de vos objectifs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light mb-8">Envoyez-moi un message</h2>
              
              {isSubmitted ? (
                <div className="p-8 border border-[#D4AF37]/20 bg-[#D4AF37]/5 rounded-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                    <h3 className="text-xl font-light">Message envoyé !</h3>
                  </div>
                  <p className="text-sm font-light text-white/70">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white font-light focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2">
                      Email professionnel *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white font-light focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="nom@entreprise.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white font-light focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Nom de l'entreprise"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white font-light focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Accompagnement projet, conseil stratégique..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-white/70 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white font-light focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                      placeholder="Décrivez votre contexte et vos besoins..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-[#D4AF37] text-[#000000] font-light hover:bg-[#D4AF37] transition-all rounded-sm inline-flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-light mb-8">Informations</h2>
                <p className="text-base font-light text-white/70 leading-relaxed mb-12">
                  Je suis disponible pour discuter de vos projets, vos enjeux et de la manière dont je peux vous accompagner dans votre excellence opérationnelle.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Email</h3>
                    <div className="space-y-1">
                      <a 
                        href="mailto:contact@powalyze.ch" 
                        className="text-sm font-light text-white/70 hover:text-[#D4AF37] transition-colors block"
                      >
                        contact@powalyze.ch
                      </a>
                      <a 
                        href="mailto:contact@powalyze.com" 
                        className="text-sm font-light text-white/70 hover:text-[#D4AF37] transition-colors block"
                      >
                        contact@powalyze.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Téléphone</h3>
                    <a 
                      href="tel:+33615767067" 
                      className="text-sm font-light text-white/70 hover:text-[#D4AF37] transition-colors"
                    >
                      +33 (0) 6 15 76 70 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Localisation</h3>
                    <p className="text-sm font-light text-white/70 mb-3">
                      International
                    </p>
                    <p className="text-xs font-light text-white/50 uppercase tracking-wider mb-2">Zones d'intervention</p>
                    <p className="text-sm font-light text-white/70">
                      France, Norvège, International
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5">
                <h3 className="text-xl font-light mb-6">Délai de réponse</h3>
                <p className="text-sm font-light text-white/70 leading-relaxed">
                  Je vous réponds sous 24 heures ouvrées. Pour toute demande prioritaire, merci de le préciser dans votre message.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 leading-tight">
              Vous préférez planifier un échange ?
            </h2>
            
            <p className="text-lg font-light text-white/60 mb-12 max-w-2xl mx-auto">
              Réservez directement un créneau dans mon agenda pour un premier échange.
            </p>

            <a
              href="https://calendly.com/powalyze"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] font-light hover:bg-[#D4AF37] hover:text-[#000000] transition-all rounded-sm inline-flex items-center gap-2"
            >
              Prendre rendez-vous
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
