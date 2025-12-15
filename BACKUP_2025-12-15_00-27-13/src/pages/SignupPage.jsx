import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, Loader2, AlertCircle, Check, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const SignupPage = () => {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Password Logic
  useEffect(() => {
    const pass = formData.password;
    let score = 0;
    if (pass.length > 7) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    setPasswordStrength(score);
  }, [formData.password]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.acceptTerms) {
      setError("Please accept terms and conditions");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.errorPasswordNoMatch'));
      return;
    }
    if (passwordStrength < 3) {
      setError(t('auth.errorPasswordTooShort'));
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      toast({
        title: t('auth.successSignUp'),
        description: "Redirecting to login...",
      });
      navigate('/login');
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 2) return "bg-red-500";
    if (passwordStrength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const getStrengthText = () => {
     if (passwordStrength < 2) return t('auth.passwordWeak');
     if (passwordStrength < 4) return t('auth.passwordMedium');
     return t('auth.passwordStrong');
  };

  return (
    <>
      <Helmet>
        <title>{t('auth.signup')} | Powalyze</title>
      </Helmet>
      
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center p-4 py-20 relative overflow-hidden">
           {/* Background Elements */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-[#BFA76A] rounded-full mix-blend-screen filter blur-[100px] opacity-5"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg relative z-10"
          >
            <div className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-end mb-4">
                 <LanguageSwitcher />
              </div>
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-white mb-2">{t('auth.signup')}</h1>
                <p className="text-gray-400 text-sm">Join the elite PMO community</p>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-3 text-sm">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <Label className="text-gray-300 text-xs uppercase tracking-wider">{t('auth.fullName')}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Input name="fullName" placeholder="John Doe" className="pl-10 bg-black/50 border-white/10 text-white" value={formData.fullName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300 text-xs uppercase tracking-wider">{t('auth.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Input name="email" type="email" placeholder="john@company.com" className="pl-10 bg-black/50 border-white/10 text-white" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300 text-xs uppercase tracking-wider">{t('auth.password')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Input name="password" type="password" placeholder="••••••••" className="pl-10 bg-black/50 border-white/10 text-white" value={formData.password} onChange={handleChange} required />
                  </div>
                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{t('auth.passwordStrength')}: <span className={passwordStrength > 3 ? "text-green-400" : "text-gray-300"}>{getStrengthText()}</span></span>
                      </div>
                      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${getStrengthColor()}`} 
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-gray-500 pt-1">{t('auth.passwordRequirements')}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300 text-xs uppercase tracking-wider">{t('auth.confirmPassword')}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Input name="confirmPassword" type="password" placeholder="••••••••" className="pl-10 bg-black/50 border-white/10 text-white" value={formData.confirmPassword} onChange={handleChange} required />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <input 
                      type="checkbox" 
                      id="acceptTerms" 
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-600 bg-black/50 text-[#BFA76A] focus:ring-[#BFA76A]"
                   />
                   <label htmlFor="acceptTerms" className="text-sm text-gray-400 select-none cursor-pointer">{t('auth.termsAccept')}</label>
                </div>

                <Button type="submit" disabled={isLoading} className="w-full bg-[#BFA76A] text-black hover:bg-[#d4be83] h-11 font-bold tracking-wide mt-4">
                  {isLoading ? <Loader2 className="animate-spin" /> : t('auth.signUpButton')}
                </Button>

                {/* Social Login Mockup */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#111] px-2 text-gray-500">{t('auth.socialLogin')}</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/5" onClick={() => toast({ title: "Feature coming soon", description: "Google login is currently disabled." })}>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="border-white/10 text-white hover:bg-white/5" onClick={() => toast({ title: "Feature coming soon", description: "GitHub login is currently disabled." })}>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>

              </form>

              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-sm text-gray-500">
                  {t('auth.haveAccount')}{' '}
                  <Link to="/login" className="text-[#BFA76A] hover:text-[#d4be83] font-medium transition-colors">
                    {t('auth.login')}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default SignupPage;