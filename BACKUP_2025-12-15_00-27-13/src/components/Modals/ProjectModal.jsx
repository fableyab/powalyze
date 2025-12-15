import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProjectForm from '@/components/Forms/ProjectForm';

const ProjectModal = ({ isOpen, onClose, initialData, onSubmit }) => {
  // Prevent modal from closing if user clicks outside during loading/submitting logic inside form could be added here,
  // but simpler to keep modal dump and let form handle state.
  
  const handleOpenChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#111] border-white/10 text-white max-w-xl shadow-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">
            {initialData ? 'Edit Project' : 'Create New Project'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {initialData 
              ? `Update details for ${initialData.name}.` 
              : 'Fill in the information below to initialize a new portfolio item.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <ProjectForm 
             initialData={initialData} 
             onSubmit={async (data) => {
                await onSubmit(data);
                onClose(); // Close on successful submission
             }}
             onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;