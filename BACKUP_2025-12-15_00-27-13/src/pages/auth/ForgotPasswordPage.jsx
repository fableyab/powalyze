
import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { authService } from '@/services/auth/authService';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      setSubmitted(true);
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO title="Reset Password | Powalyze" />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md">
          <Link to="/login" className="inline-flex items-center text-gray-400 hover:text-white mb-8 text-sm">
            <ArrowLeft size={16} className="mr-2" /> Back to Login
          </Link>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400 mb-6 text-sm">Enter your email address and we'll send you a link to reset your password.</p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-green-500 text-2xl">✓</div>
                </div>
                <h3 className="text-white font-bold mb-2">Check your email</h3>
                <p className="text-gray-400 text-sm">We've sent password reset instructions to {email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="bg-[#1A1A1A] border-white/10"
                    placeholder="name@company.com"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">
                  {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
