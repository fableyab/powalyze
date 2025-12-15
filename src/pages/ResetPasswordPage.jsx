import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const ResetPasswordPage = () => {
  const { t } = useLanguage();
  const { token } = useParams(); // In real app, verify this token
  const { confirmPasswordReset } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('auth.errorPasswordNoMatch'));
      return;
    }

    setIsLoading(true);
    try {
      await confirmPasswordReset(token, password);
      toast({
        title: t('auth.successReset'),
        description: "You can now login with your new password.",
      });
      navigate('/login');
    } catch (err) {
      setError("Failed to reset password. Token may be invalid.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('auth.resetPassword')} | Powalyze</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-display font-bold text-white mb-2">{t('auth.resetPassword')}</h1>
                <p className="text-gray-400 text-sm">Create a strong new password</p>
              </div>

              {error && (
                <div className="bg-red-900/20 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-gray-300 text-xs uppercase tracking-wider">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <Input type="password" placeholder="••••••••" className="pl-10 bg-black/50 border-white/10 text-white" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300 text-xs uppercase tracking-wider">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                    <Input type="password" placeholder="••••••••" className="pl-10 bg-black/50 border-white/10 text-white" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-[#BFA76A] text-black hover:bg-[#d4be83] font-bold mt-4">
                  {isLoading ? <Loader2 className="animate-spin" /> : t('auth.resetButton')}
                </Button>
              </form>
            </div>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default ResetPasswordPage;