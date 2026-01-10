
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'In Progress'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!formData.name) {
      toast({ variant: "destructive", title: "Validation Error", description: "Project name is required." });
      return;
    }

    setLoading(true);
    try {
      const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('user_id', user.id).single();
      
      const { data, error } = await supabase.from('projects').insert({
        name: formData.name,
        description: formData.description,
        status: formData.status,
        budget: formData.budget ? parseFloat(formData.budget) : 0,
        deadline: formData.endDate || null,
        created_by: user.id,
        tenant_id: profile?.tenant_id,
        created_at: new Date(),
        updated_at: new Date()
      }).select().single();

      if (error) throw error;

      toast({ title: "Success", description: "Project created successfully." });
      if (onProjectCreated) onProjectCreated(data);
      onClose();
      setFormData({ name: '', description: '', startDate: '', endDate: '', budget: '', status: 'In Progress' });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to create project." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t('projects.newProject') || 'New Project'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Name *</label>
            <Input name="name" value={formData.name} onChange={handleChange} className="bg-black border-slate-800" placeholder="Project Name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                className="flex min-h-[80px] w-full rounded-md border border-slate-800 bg-black px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Start Date</label>
                <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="bg-black border-slate-800 text-white block" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">End Date</label>
                <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="bg-black border-slate-800 text-white block" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Budget</label>
            <Input type="number" name="budget" value={formData.budget} onChange={handleChange} className="bg-black border-slate-800" placeholder="0.00" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
            {t('common.cancel') || 'Cancel'}
          </Button>
          <Button onClick={handleCreate} className="bg-[#4A9EFF] text-white hover:bg-[#0052cc]" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {t('common.create') || 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
