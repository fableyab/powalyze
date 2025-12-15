
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { emailService } from '@/services/emailService';

const AppointmentForm = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send confirmation email via our new service
      await emailService.sendAppointmentConfirmation(formData, language);
      
      toast({
        title: t('forms.success', "Réservation confirmée"),
        description: "Un email de confirmation vous a été envoyé.",
        className: "bg-green-900 border-none text-white"
      });
      
      setFormData({ firstName: '', email: '', phone: '', service: '', date: '', time: '' });
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Erreur", 
        description: "Échec de la réservation." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.name')}</Label>
          <Input required className="bg-[#111] border-white/10" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.email')}</Label>
          <Input required type="email" className="bg-[#111] border-white/10" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-gray-300">{t('forms.phone')}</Label>
        <Input type="tel" className="bg-[#111] border-white/10" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
      </div>

      <div className="space-y-2">
        <Label className="text-gray-300">{t('forms.service')}</Label>
        <Select onValueChange={v => setFormData({...formData, service: v})}>
          <SelectTrigger className="bg-[#111] border-white/10">
            <SelectValue placeholder="Selectionner" />
          </SelectTrigger>
          <SelectContent className="bg-[#111] border-white/10 text-white">
            <SelectItem value="Strategic PMO">Strategic PMO</SelectItem>
            <SelectItem value="Power BI Consulting">Power BI Consulting</SelectItem>
            <SelectItem value="Automation Audit">Automation Audit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.date')}</Label>
          <Input type="date" required className="bg-[#111] border-white/10 [color-scheme:dark]" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.time')}</Label>
          <Select onValueChange={v => setFormData({...formData, time: v})}>
            <SelectTrigger className="bg-[#111] border-white/10">
              <SelectValue placeholder="--:--" />
            </SelectTrigger>
            <SelectContent className="bg-[#111] border-white/10 text-white">
              <SelectItem value="09:00">09:00</SelectItem>
              <SelectItem value="10:00">10:00</SelectItem>
              <SelectItem value="14:00">14:00</SelectItem>
              <SelectItem value="16:00">16:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#BFA76A] text-black hover:bg-white font-bold mt-4">
        {loading ? <Loader2 className="animate-spin" /> : t('forms.book')}
      </Button>
    </form>
  );
};

export default AppointmentForm;
