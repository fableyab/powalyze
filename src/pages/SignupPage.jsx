import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
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
    <div className="min-h-screen bg-neutral-975 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-neutral-950 border-white/10 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-brand-gold-500 mb-2">Powalyze</h1>
            <p className="text-gray-400">Créez votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Prénom *</label>
                <Input
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Nom *</label>
                <Input
                  placeholder="Dupont"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Professionnel *</label>
              <Input
                type="email"
                placeholder="jean.dupont@entreprise.fr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Entreprise</label>
              <Input
                placeholder="Mon Entreprise SA"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Téléphone</label>
              <Input
                type="tel"
                placeholder="+41 XX XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Mot de passe *</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Confirmer le mot de passe *</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-neutral-900 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full mt-6">
              Créer mon compte
            </Button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Déjà un compte ? <Link to="/login" className="text-brand-gold-500 hover:underline">Se connecter</Link>
            </p>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
