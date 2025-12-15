
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { Mail } from 'lucide-react';

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO title="Verify Email | Powalyze" />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-[#BFA76A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="text-[#BFA76A]" size={32} />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Verify your email</h1>
          <p className="text-gray-400 mb-8 text-sm">
            We've sent a verification link to your email address. Please click the link to activate your account.
          </p>

          <div className="space-y-4">
            <Button variant="outline" className="w-full border-white/10">Resend Email</Button>
            <Link to="/login">
              <Button variant="link" className="text-[#BFA76A]">Back to Login</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailVerificationPage;
