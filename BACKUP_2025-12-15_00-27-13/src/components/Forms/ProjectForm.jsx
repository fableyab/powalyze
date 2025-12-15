import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProjectForm = ({ initialData, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Operational',
    status: 'Planning',
    priority: 'Medium',
    sponsor: '',
    manager: '',
    team: '', // comma separated for simplicity in this demo
    budget: '',
    startDate: '',
    endDate: '',
    risks: '',
    resources: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        team: Array.isArray(initialData.team) ? initialData.team.join(', ') : initialData.team || '',
        resources: Array.isArray(initialData.resources) ? initialData.resources.join(', ') : initialData.resources || ''
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!formData.budget || isNaN(formData.budget)) newErrors.budget = "Valid budget is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast({ variant: "destructive", title: "Validation Error", description: "Please fix the errors in the form." });
      return;
    }

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        team: formData.team.split(',').map(s => s.trim()).filter(Boolean),
        resources: formData.resources.split(',').map(s => s.trim()).filter(Boolean),
        budget: Number(formData.budget)
      };
      await onSubmit(submissionData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Project Name *</label>
           <Input 
             value={formData.name} 
             onChange={e => handleChange('name', e.target.value)}
             className={`bg-black border-white/10 ${errors.name ? 'border-red-500' : ''}`}
             placeholder="e.g. ERP Migration"
           />
           {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
        </div>
        
        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Type</label>
           <Select value={formData.type} onValueChange={(val) => handleChange('type', val)}>
              <SelectTrigger className="bg-black border-white/10 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                <SelectItem value="Strategic">Strategic</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
                <SelectItem value="Tactical">Tactical</SelectItem>
              </SelectContent>
           </Select>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Status</label>
           <Select value={formData.status} onValueChange={(val) => handleChange('status', val)}>
              <SelectTrigger className="bg-black border-white/10 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
           </Select>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Priority</label>
           <Select value={formData.priority} onValueChange={(val) => handleChange('priority', val)}>
              <SelectTrigger className="bg-black border-white/10 text-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
           </Select>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Budget (CHF) *</label>
           <Input 
             type="number"
             value={formData.budget} 
             onChange={e => handleChange('budget', e.target.value)}
             className={`bg-black border-white/10 ${errors.budget ? 'border-red-500' : ''}`}
             placeholder="50000"
           />
           {errors.budget && <span className="text-xs text-red-500">{errors.budget}</span>}
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Manager</label>
           <Input 
             value={formData.manager} 
             onChange={e => handleChange('manager', e.target.value)}
             className="bg-black border-white/10"
             placeholder="Project Manager Name"
           />
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-white">Start Date *</label>
           <Input 
             type="date"
             value={formData.startDate} 
             onChange={e => handleChange('startDate', e.target.value)}
             className={`bg-black border-white/10 ${errors.startDate ? 'border-red-500' : ''}`}
           />
           {errors.startDate && <span className="text-xs text-red-500">{errors.startDate}</span>}
        </div>

        <div className="space-y-2">
           <label className="text-sm font-medium text-white">End Date</label>
           <Input 
             type="date"
             value={formData.endDate} 
             onChange={e => handleChange('endDate', e.target.value)}
             className="bg-black border-white/10"
           />
        </div>
      </div>

      <div className="space-y-2">
         <label className="text-sm font-medium text-white">Description</label>
         <Textarea 
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
            className="bg-black border-white/10 min-h-[100px]"
            placeholder="Detailed project description..."
         />
         <div className="text-xs text-gray-500 text-right">{formData.description.length} chars</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
            <label className="text-sm font-medium text-white">Team Members</label>
            <Input 
               value={formData.team}
               onChange={e => handleChange('team', e.target.value)}
               className="bg-black border-white/10"
               placeholder="Comma separated names"
            />
         </div>
         <div className="space-y-2">
            <label className="text-sm font-medium text-white">Resources</label>
            <Input 
               value={formData.resources}
               onChange={e => handleChange('resources', e.target.value)}
               className="bg-black border-white/10"
               placeholder="Comma separated resources (e.g. Servers, Licenses)"
            />
         </div>
      </div>

      <div className="space-y-2">
         <label className="text-sm font-medium text-white">Risks</label>
         <Textarea 
            value={formData.risks}
            onChange={e => handleChange('risks', e.target.value)}
            className="bg-black border-white/10"
            placeholder="Identify potential risks..."
         />
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
         <Button type="button" variant="ghost" onClick={onCancel} disabled={loading} className="text-gray-400 hover:text-white">
            Cancel
         </Button>
         <Button type="submit" disabled={loading} className="bg-[#BFA76A] text-black hover:bg-white font-bold min-w-[140px]">
            {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
            {initialData ? 'Update Project' : 'Create Project'}
         </Button>
      </div>
    </form>
  );
};

export default ProjectForm;