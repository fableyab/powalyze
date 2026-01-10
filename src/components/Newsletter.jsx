
import React, { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast({
      title: "Subscription Confirmed",
      description: "Welcome to the Powalyze inner circle. Please check your email to confirm.",
      className: "bg-emerald-900 border-emerald-800 text-white"
    });
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0F1A30] rounded-2xl p-8 md:p-12 border border-slate-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-[#D4A574] mb-2">
            <Mail className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Newsletter</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Strategic Insights Direct to Inbox</h3>
          <p className="text-blue-200">Join 2,500+ executives receiving our monthly Swiss PMO & Data trends report.</p>
        </div>

        <form onSubmit={handleSubscribe} className="flex-1 w-full max-w-md flex gap-2">
          <Input 
            type="email" 
            placeholder="pro@entreprise.ch" 
            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 h-12"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="bg-[#D4A574] hover:bg-[#B58554] text-black font-bold h-12 px-6">
            Subscribe <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
