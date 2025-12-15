import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/landing/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const OnboardingPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => s + 1);
  const finish = () => navigate('/client/dashboard');

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-md bg-[#111] p-8 rounded-xl border border-white/10 shadow-2xl">
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[#BFA76A]' : 'bg-gray-800'}`} />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white">{t(`client.onboarding.step${step}`)}</h2>
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-400">Full Name</Label>
                  <Input className="bg-[#0A0A0A] border-white/10 text-white" placeholder="John Doe" />
                </div>
                <Button onClick={nextStep} className="w-full bg-[#BFA76A] text-black hover:bg-[#d4bb7e]">{t('common.next')}</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-400">Company Name</Label>
                  <Input className="bg-[#0A0A0A] border-white/10 text-white" placeholder="Acme Corp" />
                </div>
                <Button onClick={nextStep} className="w-full bg-[#BFA76A] text-black hover:bg-[#d4bb7e]">{t('common.next')}</Button>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">You are all set! Ready to steer your PMO with data?</p>
                </div>
                <Button onClick={finish} className="w-full bg-[#BFA76A] text-black hover:bg-[#d4bb7e]">{t('client.onboarding.complete')}</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;