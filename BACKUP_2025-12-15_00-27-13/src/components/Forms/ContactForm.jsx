
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';
// import { emailService } from '@/services/emailService'; // Use real service

const ContactForm = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate Service Call
      // await emailService.sendContactRequest(formData, language);
      await new Promise(r => setTimeout(r, 1500)); // Mock delay

      toast({ 
        title: t('forms.success', "Message envoyé"), 
        description: "Nous vous répondrons sous 24h.",
        className: "bg-green-900 border-none text-white" 
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Erreur", 
        description: "Impossible d'envoyer le message." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
       <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.name')}</Label>
          <Input name="name" value={formData.name} onChange={handleChange} required className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A]" placeholder="John Doe" />
       </div>
       <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.email')}</Label>
          <Input name="email" value={formData.email} onChange={handleChange} required type="email" className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A]" placeholder="john@company.com" />
       </div>
       <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.subject')}</Label>
          <Input name="subject" value={formData.subject} onChange={handleChange} required className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A]" placeholder="Demande de devis" />
       </div>
       <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.message')}</Label>
          <Textarea name="message" value={formData.message} onChange={handleChange} required className="bg-black/50 border-white/10 text-white focus:border-[#BFA76A] min-h-[120px]" placeholder="Bonjour..." />
       </div>
       <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold h-12">
          {loading ? <Loader2 className="animate-spin" /> : <span className="flex items-center gap-2">{t('forms.send')} <Send size={16} /></span>}
       </Button>
    </form>
  );
};

export default ContactForm;
