import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackButton = ({ label = "Back", to, className }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleBack}
      className={cn("text-gray-400 hover:text-white pl-0 hover:bg-transparent transition-colors", className)}
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> {label}
    </Button>
  );
};

export default BackButton;