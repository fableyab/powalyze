import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/shared/components/ui/Card';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Button } from '@/shared/components/ui/Button';
import Footer from '@/components/landing/Footer';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-neutral-975 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-400">Notre équipe est là pour répondre à vos questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="bg-neutral-950 border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Nom complet</label>
                <Input placeholder="Jean Dupont" className="bg-neutral-900 border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <Input type="email" placeholder="jean.dupont@entreprise.fr" className="bg-neutral-900 border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Sujet</label>
                <Input placeholder="Demande de démo" className="bg-neutral-900 border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Message</label>
                <Textarea rows={6} placeholder="Votre message..." className="bg-neutral-900 border-white/10 text-white" />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Envoyer le message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="bg-neutral-950 border-white/10 p-6">
              <div className="flex items-start gap-4">
                <FiMail className="text-brand-gold-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-400">contact@powalyze.com</p>
                </div>
              </div>
            </Card>

            <Card className="bg-neutral-950 border-white/10 p-6">
              <div className="flex items-start gap-4">
                <FiPhone className="text-brand-gold-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Téléphone</h3>
                  <p className="text-gray-400">+41 XX XXX XX XX</p>
                </div>
              </div>
            </Card>

            <Card className="bg-neutral-950 border-white/10 p-6">
              <div className="flex items-start gap-4">
                <FiMapPin className="text-brand-gold-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-white mb-1">Adresse</h3>
                  <p className="text-gray-400">Genève, Suisse</p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-brand-gold-500/20 to-brand-gold-600/10 border-brand-gold-500/30 p-6">
              <h3 className="font-semibold text-white mb-3">Horaires d'ouverture</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Lundi - Vendredi</span>
                  <span>9h - 18h</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Samedi - Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
