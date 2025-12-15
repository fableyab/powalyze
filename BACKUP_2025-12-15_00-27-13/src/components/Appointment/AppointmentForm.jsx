
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2 } from 'lucide-react';

const AppointmentForm = ({ onSubmit, loading }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    terms: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-6 rounded-xl border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.name')}</Label>
          <Input 
            name="name" 
            required 
            className="bg-[#0A0A0A] border-white/10"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.email')}</Label>
          <Input 
            name="email" 
            type="email" 
            required 
            className="bg-[#0A0A0A] border-white/10"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-300">{t('forms.phone')}</Label>
          <Input 
            name="phone" 
            className="bg-[#0A0A0A] border-white/10"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Entreprise</Label>
          <Input 
            name="company" 
            className="bg-[#0A0A0A] border-white/10"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-300">{t('forms.message')}</Label>
        <Textarea 
          name="message" 
          className="bg-[#0A0A0A] border-white/10 min-h-[100px]"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="terms" 
          name="terms" 
          required
          checked={formData.terms}
          onChange={handleChange}
          className="rounded border-white/20 bg-[#0A0A0A] text-[#BFA76A] focus:ring-[#BFA76A]"
        />
        <label htmlFor="terms" className="text-sm text-gray-400">
          J'accepte la politique de confidentialité.
        </label>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#BFA76A] text-black font-bold hover:bg-white transition-colors h-12"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin mr-2" /> : t('forms.book')}
      </Button>
    </form>
  );
};

export default AppointmentForm;
