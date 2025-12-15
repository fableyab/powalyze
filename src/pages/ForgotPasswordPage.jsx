import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';

const ForgotPasswordPage = () => {
  const { t } = useLanguage();
  const { resetPasswordRequest } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await resetPasswordRequest(email);
      setIsSuccess(true);
    } catch (err) {
      // Typically we don't show errors here for security to avoid email enumeration
      setIsSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('auth.forgotPassword')} | Powalyze</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <Link to="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-6 text-sm transition-colors">
                <ArrowLeft size={16} className="mr-2" /> {t('auth.backToLogin')}
              </Link>
              
              <div className="text-center mb-8">
                <h1 className="text-2xl font-display font-bold text-white mb-2">{t('auth.forgotPassword')}</h1>
                <p className="text-gray-400 text-sm">Enter your email to receive instructions</p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">Check your email</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {t('auth.checkEmail')}
                  </p>
                  <Link to="/login">
                     <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">{t('auth.backToLogin')}</Button>
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-xs uppercase tracking-wider">{t('auth.email')}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                      <Input 
                        type="email" 
                        placeholder="name@company.com" 
                        className="pl-10 bg-black/50 border-white/10 text-white" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-[#BFA76A] text-black hover:bg-[#d4be83] font-bold">
                    {isLoading ? <Loader2 className="animate-spin" /> : t('auth.resetButton')}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </main>
        <FooterSection />
      </div>
    </>
  );
};

export default ForgotPasswordPage;