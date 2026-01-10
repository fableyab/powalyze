
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const CreateAlertModal = ({ isOpen, onClose, onAlertCreated }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Budget',
    severity: 'Medium',
    threshold: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!formData.name) return toast({ variant: "destructive", title: "Validation Error", description: "Name is required" });

    try {
      const { data, error } = await supabase.from('alerts').insert([{
        ...formData,
        threshold: formData.threshold ? parseFloat(formData.threshold) : null,
        user_id: user.id
      }]).select().single();

      if (error) throw error;

      toast({ title: t('common.success'), description: "Alert created" });
      if (onAlertCreated) onAlertCreated(data);
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: t('common.error'), description: error.message });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>{t('alerts.new')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input name="name" placeholder="Alert Name" value={formData.name} onChange={handleChange} className="bg-black border-slate-800" />
          <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
             <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
             <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
               <SelectItem value="Budget">Budget</SelectItem>
               <SelectItem value="Deadline">Deadline</SelectItem>
               <SelectItem value="Risk">Risk</SelectItem>
             </SelectContent>
          </Select>
          <Select value={formData.severity} onValueChange={(val) => setFormData({...formData, severity: val})}>
             <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
             <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
               <SelectItem value="Low">Low</SelectItem>
               <SelectItem value="Medium">Medium</SelectItem>
               <SelectItem value="High">High</SelectItem>
               <SelectItem value="Critical">Critical</SelectItem>
             </SelectContent>
          </Select>
          <Input type="number" name="threshold" placeholder={t('alerts.threshold')} value={formData.threshold} onChange={handleChange} className="bg-black border-slate-800" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">{t('common.cancel')}</Button>
          <Button onClick={handleCreate} className="bg-[#4A9EFF] text-white">{t('common.create')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAlertModal;
