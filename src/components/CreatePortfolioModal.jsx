
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const CreatePortfolioModal = ({ isOpen, onClose, onItemCreated }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    date: '',
    status: 'Draft',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!formData.name) return toast({ variant: "destructive", title: "Validation Error", description: "Name is required" });

    try {
      const { data, error } = await supabase.from('portfolio_items').insert([{
        ...formData,
        user_id: user.id
      }]).select().single();

      if (error) throw error;

      toast({ title: t('common.success'), description: "Portfolio item created" });
      if (onItemCreated) onItemCreated(data);
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: t('common.error'), description: error.message });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>{t('portfolio.new')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} className="bg-black border-slate-800" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full bg-black border-slate-800 rounded-md p-2 h-24 text-sm text-white" />
          <Input name="client" placeholder={t('portfolio.client')} value={formData.client} onChange={handleChange} className="bg-black border-slate-800" />
          <Input type="date" name="date" value={formData.date} onChange={handleChange} className="bg-black border-slate-800" />
          <Input name="imageUrl" placeholder="Image URL (Unsplash)" value={formData.imageUrl} onChange={handleChange} className="bg-black border-slate-800" />
          <Select value={formData.status} onValueChange={(val) => setFormData({...formData, status: val})}>
            <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">{t('common.cancel')}</Button>
          <Button onClick={handleCreate} className="bg-[#4A9EFF] text-white">{t('common.create')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePortfolioModal;
