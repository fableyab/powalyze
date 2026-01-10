
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xeoyznlq");

  if (state.succeeded) {
      return (
          <div className="bg-emerald-900/20 border border-emerald-900 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-emerald-500 mb-2">Message Envoyé !</h3>
              <p className="text-slate-300">Merci de nous avoir contacté. Notre équipe vous répondra sous 24h.</p>
          </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#141414] p-8 rounded-xl border border-slate-800">
      <h3 className="text-2xl font-bold text-white mb-6">Contactez-nous</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm text-slate-400">Prénom</label>
            <Input id="firstName" name="firstName" placeholder="Jean" className="bg-[#0F0F0F] border-slate-700" required />
        </div>
        <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm text-slate-400">Nom</label>
            <Input id="lastName" name="lastName" placeholder="Dupont" className="bg-[#0F0F0F] border-slate-700" required />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-slate-400">Email Professionnel</label>
        <Input id="email" type="email" name="email" placeholder="jean.dupont@entreprise.com" className="bg-[#0F0F0F] border-slate-700" required />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs" />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm text-slate-400">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-md border border-slate-700 bg-[#0F0F0F] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-transparent"
          placeholder="Comment pouvons-nous vous aider ?"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs" />
      </div>

      <Button 
        type="submit" 
        disabled={state.submitting}
        className="w-full bg-[#D4A574] hover:bg-[#B5952F] text-black font-bold py-6"
      >
        {state.submitting ? 'Envoi en cours...' : <span className="flex items-center gap-2">Envoyer le message <Send size={18} /></span>}
      </Button>
    </form>
  );
};

export default ContactForm;
