
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const EditProjectModal = ({ isOpen, onClose, project, onProjectUpdated }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: 'To Do',
        deadline: '',
        budget: ''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name || '',
                description: project.description || '',
                status: project.status || 'To Do',
                deadline: project.deadline || '',
                budget: project.budget || ''
            });
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, status: value }));
    };

    const handleSubmit = async () => {
        if (!formData.name) {
            toast({ variant: "destructive", title: "Error", description: "Project name is required." });
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('projects')
                .update(formData)
                .eq('id', project.id)
                .select()
                .single();

            if (error) throw error;

            toast({ title: "Success", description: "Project updated successfully." });
            if (onProjectUpdated) onProjectUpdated(data);
            onClose();
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Project Name</label>
                        <Input name="name" value={formData.name} onChange={handleChange} className="bg-black border-slate-800" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Description</label>
                        <Textarea name="description" value={formData.description} onChange={handleChange} className="bg-black border-slate-800" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Status</label>
                             <Select value={formData.status} onValueChange={handleSelectChange}>
                                <SelectTrigger className="bg-black border-slate-800"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="On Hold">On Hold</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Deadline</label>
                            <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="bg-black border-slate-800 text-white" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Budget</label>
                        <Input type="number" name="budget" value={formData.budget} onChange={handleChange} className="bg-black border-slate-800" placeholder="0.00" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading} className="bg-[#4A9EFF] hover:bg-[#0052cc] text-white">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditProjectModal;
