import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import { useToast } from '@/components/ui/use-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const PLANS = {
  starter: { name: 'Starter Plan', price: 499, features: ['1 Portfolio', 'Basic Reporting'] },
  pro: { name: 'Professional Plan', price: 1299, features: ['10 Portfolios', 'AI Insights', 'Priority Support'] },
  enterprise: { name: 'Enterprise Plan', price: 'Custom', features: ['Unlimited', 'Dedicated Consultant'] }
};

const CheckoutPage = () => {
  const { planId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const plan = PLANS[planId] || PLANS.starter;

  useEffect(() => {
    if (!user) {
      toast({ title: "Login Required", description: "Please login to subscribe." });
      navigate('/login?redirect=/checkout/' + planId);
    }
  }, [user, navigate, planId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    // SIMULATED STRIPE PAYMENT FLOW
    // Real implementation would create a Checkout Session via Supabase Edge Function
    // const { data } = await supabase.functions.invoke('create-checkout-session', { body: { plan: planId } })
    // window.location.href = data.url;

    setTimeout(async () => {
       setLoading(false);
       setSuccess(true);
       
       if (isSupabaseConfigured()) {
          // Update DB (Simulating webhook result)
          await supabase.from('notifications').insert([{
             user_id: user.id,
             message: `Subscription to ${plan.name} successful!`,
             type: 'success'
          }]);
       }

       toast({ title: "Payment Successful", description: "Welcome to Premium!", variant: "success" });
    }, 2000);
  };

  if (success) {
     return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-center p-6">
           <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <CheckCircle2 size={80} className="text-[#BFA76A] mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">You're All Set!</h1>
              <p className="text-gray-400 mb-8 text-lg">
                 Thank you for subscribing to the <strong>{plan.name}</strong>. Your dashboard has been upgraded.
              </p>
              <Button onClick={() => navigate('/dashboard')} className="bg-[#BFA76A] text-black font-bold px-8 py-6 text-lg">
                 Go to Dashboard
              </Button>
           </motion.div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
       <Navbar />
       
       <main className="flex-grow pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
             
             {/* Order Summary */}
             <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                   <form onSubmit={handlePayment} className="space-y-6">
                      <div className="space-y-2">
                         <Label className="text-gray-400">Cardholder Name</Label>
                         <Input className="bg-[#0A0A0A] border-[#333] text-white" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-gray-400">Card Number</Label>
                         <div className="relative">
                            <CreditCard className="absolute left-3 top-3 text-gray-500" size={18} />
                            <Input className="bg-[#0A0A0A] border-[#333] text-white pl-10" placeholder="0000 0000 0000 0000" required />
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label className="text-gray-400">Expiry</Label>
                            <Input className="bg-[#0A0A0A] border-[#333] text-white" placeholder="MM/YY" required />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-gray-400">CVC</Label>
                            <Input className="bg-[#0A0A0A] border-[#333] text-white" placeholder="123" required />
                         </div>
                      </div>

                      <div className="pt-4 flex items-center gap-3 text-xs text-gray-500">
                         <ShieldCheck className="text-[#BFA76A]" size={16} />
                         <span>Payments secured by Stripe. Your data is encrypted.</span>
                      </div>

                      <Button type="submit" className="w-full bg-[#BFA76A] text-black font-bold h-12 hover:bg-white" disabled={loading}>
                         {loading ? <Loader2 className="animate-spin" /> : `Pay €${plan.price}`}
                      </Button>
                   </form>
                </div>
             </div>

             {/* Plan Summary */}
             <div className="order-1 lg:order-2">
                <div className="bg-gradient-to-br from-[#1C1C1C] to-[#111] p-8 rounded-xl border border-[#BFA76A]/30 sticky top-32">
                   <h3 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-2">Subscribe to</h3>
                   <h1 className="text-3xl font-display font-bold text-white mb-6">{plan.name}</h1>
                   
                   <div className="text-4xl font-bold text-[#BFA76A] mb-8">
                      €{plan.price} <span className="text-lg text-gray-500 font-normal">/ month</span>
                   </div>

                   <ul className="space-y-4 mb-8">
                      {plan.features.map((feat, i) => (
                         <li key={i} className="flex items-center gap-3 text-gray-300">
                            <CheckCircle2 className="text-[#BFA76A]" size={18} /> {feat}
                         </li>
                      ))}
                   </ul>

                   <div className="border-t border-white/10 pt-6 flex justify-between text-white font-bold">
                      <span>Total due today</span>
                      <span>€{plan.price}</span>
                   </div>
                </div>
             </div>
          </div>
       </main>
       
       <FooterSection />
    </div>
  );
};

export default CheckoutPage;