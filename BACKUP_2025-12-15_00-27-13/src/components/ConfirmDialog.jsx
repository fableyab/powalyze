
import React from 'react';
import Modal from '@/components/Modal/Modal';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${variant === 'destructive' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
          <AlertTriangle size={24} />
        </div>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-white/10 hover:bg-white/5"
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button 
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={onConfirm}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
