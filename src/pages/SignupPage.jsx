import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Footer from '@/components/landing/Footer';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inscription:', formData);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#111] border-white/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#BFA76A] mb-2">POWALYZE</h1>
            <p className="text-gray-400">Créez votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Prénom *</label>
                <input
                  type="text"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Nom *</label>
                <input
                  type="text"
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Professionnel *</label>
              <input
                type="email"
                placeholder="jean.dupont@entreprise.fr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Entreprise</label>
              <input
                type="text"
                placeholder="Mon Entreprise SA"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Téléphone</label>
              <input
                type="tel"
                placeholder="+41 XX XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Mot de passe *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirmer le mot de passe *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-gray-500 focus:border-[#BFA76A]/50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#BFA76A] hover:bg-[#BFA76A]/90 text-black font-medium px-6 py-3 rounded-lg transition-all mt-6"
            >
              Créer mon compte
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Déjà un compte ? <Link to="/login" className="text-[#BFA76A] hover:underline">Se connecter</Link>
            </p>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
