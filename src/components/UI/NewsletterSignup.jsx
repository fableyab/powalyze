import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { subscribeToNewsletter } from '@/lib/newsletter';

const NewsletterSignup = ({ variant = "default" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus("success");
      toast({
        title: "Inscription réussie !",
        description: "Merci de rejoindre notre communauté exclusive.",
      });
      setEmail("");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Une erreur est survenue.");
    }
  };

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
        <Input 
          type="email" 
          placeholder="votre@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/5 border-white/10 text-white focus:border-[#BFA76A]"
          required
        />
        <Button 
          type="submit" 
          disabled={status === "loading" || status === "success"}
          className="bg-[#BFA76A] text-black hover:bg-[#D4AF37]"
        >
           {status === "loading" ? <Loader2 className="animate-spin h-4 w-4" /> : "S'abonner"}
        </Button>
      </form>
    );
  }

  return (
    <section className="py-16 bg-[#080808] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#BFA76A]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Mail className="w-12 h-12 text-[#BFA76A] mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">
            Rejoignez l'Élite du Management
          </h2>
          <p className="text-gray-400 mb-8 font-light leading-relaxed">
            Recevez nos analyses exclusives, whitepapers et invitations VIP. Pas de spam, uniquement de la valeur ajoutée stratégique.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative flex items-center">
              <Input
                type="email"
                placeholder="Votre adresse email professionnelle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-6 pr-36 rounded-full bg-white/5 border border-white/10 text-white focus:border-[#BFA76A] focus:ring-1 focus:ring-[#BFA76A] transition-all"
                disabled={status === "success"}
              />
              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full px-6 bg-[#BFA76A] text-black hover:bg-[#D4AF37] font-medium transition-all"
              >
                {status === "loading" ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : status === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  "Rejoindre"
                )}
              </Button>
            </div>
            
            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-red-400 text-sm flex items-center justify-center gap-2"
              >
                <AlertCircle size={14} />
                {errorMessage}
              </motion.div>
            )}
            
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-[#BFA76A] text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={14} />
                Inscription confirmée. Vérifiez vos emails.
              </motion.div>
            )}
            
            <p className="mt-4 text-xs text-gray-600">
              En vous inscrivant, vous acceptez notre politique de confidentialité. Désabonnement possible à tout moment.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;