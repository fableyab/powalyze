import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { login, isAuthenticated } from '@/lib/auth';
import { useLanguage } from '@/context/LanguageContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast({
        title: "Authentication Successful",
        description: "Welcome back, Admin.",
      });
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Invalid email or password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple translations for the login page
  const t = {
    fr: { title: "Accès Administrateur", email: "Email", password: "Mot de passe", login: "Se Connecter", secure: "Accès Sécurisé", loading: "Authentification..." },
    en: { title: "Admin Access", email: "Email", password: "Password", login: "Login", secure: "Secure Access", loading: "Authenticating..." },
    de: { title: "Admin-Zugang", email: "Email", password: "Passwort", login: "Anmelden", secure: "Sicherer Zugang", loading: "Authentifizierung..." },
    it: { title: "Accesso Admin", email: "Email", password: "Password", login: "Accedi", secure: "Accesso Sicuro", loading: "Autenticazione..." },
    no: { title: "Admin Tilgang", email: "E-post", password: "Passord", login: "Logg inn", secure: "Sikker Tilgang", loading: "Autentiserer..." }
  }[language] || { title: "Admin Access", email: "Email", password: "Password", login: "Login", secure: "Secure Access", loading: "Authenticating..." };

  return (
    <>
      <Helmet>
        <title>Admin Login | Powalyze</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
            
            {/* Decorative Top Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BFA76A] to-transparent opacity-50"></div>

            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-[#BFA76A]/10 rounded-full flex items-center justify-center mb-4 border border-[#BFA76A]/20">
                <Lock className="w-6 h-6 text-[#BFA76A]" />
              </div>
              <h1 className="text-2xl font-display text-white font-medium tracking-wide">{t.title}</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                <ShieldCheck size={12} /> {t.secure}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs uppercase text-gray-500">{t.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-11"
                  placeholder="admin@powalyze.ch"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase text-gray-500">{t.password}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] h-11"
                  placeholder="••••••••"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#BFA76A] text-black hover:bg-[#D4AF37] h-11 font-medium transition-all duration-300 mt-4"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.loading}</>
                ) : (
                  t.login
                )}
              </Button>
            </form>
          </div>
          
          <div className="mt-6 text-center">
             <p className="text-xs text-gray-600">&copy; 2025 Powalyze Consulting. Authorized Personnel Only.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLoginPage;