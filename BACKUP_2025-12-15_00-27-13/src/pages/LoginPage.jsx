import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { useAzureAd } from '@/context/AzureAdContext';
import { supabase } from '@/lib/supabaseClient';
import { LogIn, Key, Shield, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginDemo } = useAuth();
  const { login: loginAzure } = useAzureAd();
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({ title: t('login.successTitle', 'Login Successful'), description: t('login.successMessage', 'Welcome back!') });
      navigate('/dashboard');
    } catch (error) {
      toast({ variant: "destructive", title: t('login.errorTitle', 'Login Failed'), description: error.message || "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  const handleAzureLogin = async () => {
    try {
      await loginAzure();
      // AzureAdContext handles user state setting
      navigate('/dashboard');
    } catch (error) {
      // Error handled in context
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await loginDemo();
      toast({ title: "Accès démo", description: "Compte démo connecté." });
      navigate('/espace-client');
    } catch (error) {
      toast({ variant: "destructive", title: "Échec démo", description: error.message || "Impossible de créer le compte démo" });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      if (!supabase) {
        toast({ 
          variant: "destructive", 
          title: "Configuration Error", 
          description: "Authentication service not configured" 
        });
        return;
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          scopes: provider === 'azure' ? 'email openid profile User.Read' : 'email'
        }
      });

      if (error) throw error;
      
      // OAuth redirect will happen automatically
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Login Failed", 
        description: error.message || `Failed to sign in with ${provider}` 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO title="Login - Powalyze" description="Accédez à votre espace sécurisé." />
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              {t('login.title', 'Welcome Back')}
            </h1>
            <p className="text-gray-400">
              {t('login.subtitle', 'Enter your credentials to access your workspace.')}
            </p>
          </div>

          {/* OAuth Providers */}
          <div className="mb-6 space-y-3">
            <Button 
              onClick={handleDemoLogin}
              variant="default"
              className="w-full flex items-center justify-center gap-3 h-12 bg-[#BFA76A] text-black hover:bg-white font-bold"
            >
              <Sparkles className="w-5 h-5" />
              Accès démo instantané
            </Button>

            {/* Microsoft Azure AD */}
            <Button 
              onClick={handleAzureLogin}
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 h-12 border-white/20 hover:bg-white/5 bg-[#2F2F2F] text-white"
            >
               <svg className="w-5 h-5" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
               </svg>
               Sign in with Microsoft Azure AD
            </Button>

            {/* Google */}
            <Button 
              onClick={() => handleOAuthLogin('google')}
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 h-12 border-white/20 hover:bg-white/5 bg-[#2F2F2F] text-white"
            >
               <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
               </svg>
               Sign in with Google
            </Button>

            {/* GitHub */}
            <Button 
              onClick={() => handleOAuthLogin('github')}
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 h-12 border-white/20 hover:bg-white/5 bg-[#2F2F2F] text-white"
            >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
               </svg>
               Sign in with GitHub
            </Button>

            {/* LinkedIn */}
            <Button 
              onClick={() => handleOAuthLogin('linkedin')}
              variant="outline" 
              className="w-full flex items-center justify-center gap-3 h-12 border-white/20 hover:bg-white/5 bg-[#2F2F2F] text-white"
            >
               <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
               Sign in with LinkedIn
            </Button>

            <div className="relative my-6">
               <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
               </div>
               <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#111] px-2 text-gray-500">Or continue with email</span>
               </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">{t('login.emailLabel', 'Email')}</label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-black border-white/20 focus:border-[#BFA76A]"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-300">{t('login.passwordLabel', 'Password')}</label>
                <Link to="/forgot-password" className="text-xs text-[#BFA76A] hover:underline">
                  {t('login.forgotPassword', 'Forgot password?')}
                </Link>
              </div>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-black border-white/20 focus:border-[#BFA76A]"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold h-11"
            >
              {loading ? t('common.loading', 'Signing in...') : t('login.submitButton', 'Sign In')}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              {t('login.noAccount', "Don't have an account?")}{' '}
              <Link to="/signup" className="text-[#BFA76A] font-bold hover:underline">
                {t('login.signUp', 'Sign up')}
              </Link>
            </p>
          </div>
          
          <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
             <div className="flex items-center gap-1"><Shield size={12}/> Secure SSL</div>
             <div className="flex items-center gap-1"><Key size={12}/> Encrypted</div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default LoginPage;