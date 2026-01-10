
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const CreateReportModal = ({ isOpen, onClose, onCreate }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Strategic',
    dataSource: 'Projects'
  });

  const handleChange = (e) => {
     setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCreate = () => {
     if(!formData.name) {
         toast({variant: "destructive", title: "Error", description: "Report name is required"});
         return;
     }
     
     if (onCreate) onCreate(formData);
     toast({title: "Success", description: "Report created successfully"});
     onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1A1A] border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Report Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} className="bg-black border-slate-800" placeholder="E.g. Q1 Strategic Review" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <Input name="description" value={formData.description} onChange={handleChange} className="bg-black border-slate-800" placeholder="Optional description" />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-300">Report Type</label>
             <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})}>
                <SelectTrigger className="bg-black border-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                  <SelectItem value="Strategic">Strategic</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Operational">Operational</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
             </Select>
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-300">Data Source</label>
             <Select value={formData.dataSource} onValueChange={(val) => setFormData({...formData, dataSource: val})}>
                <SelectTrigger className="bg-black border-slate-800 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-slate-800 text-white">
                  <SelectItem value="Projects">Projects</SelectItem>
                  <SelectItem value="Tasks">Tasks</SelectItem>
                  <SelectItem value="Documents">Documents</SelectItem>
                  <SelectItem value="Connectors">Connectors</SelectItem>
                </SelectContent>
             </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-slate-800 text-slate-300">Cancel</Button>
          <Button onClick={handleCreate} className="bg-[#4A9EFF] text-white">Create Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReportModal;
