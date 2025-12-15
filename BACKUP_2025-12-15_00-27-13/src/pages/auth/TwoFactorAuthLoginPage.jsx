
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import SEO from '@/components/SEO';

const TwoFactorAuthLoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <SEO title="2FA Login | Powalyze" />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Two-Factor Authentication</h1>
          <p className="text-gray-400 mb-6 text-sm text-center">Enter the code from your authenticator app.</p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">Authentication Code</Label>
              <Input 
                id="code" 
                className="bg-[#1A1A1A] border-white/10 text-center text-2xl tracking-widest" 
                placeholder="000 000"
                maxLength={6}
              />
            </div>
            <Button className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold">
              Verify
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TwoFactorAuthLoginPage;
