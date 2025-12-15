import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const CalendlyButton = ({ 
  className = "", 
  variant = "premium", 
  text = "Planifier un Appel",
  showIcon = true 
}) => {
  
  return (
    <Link to="/contact">
      <Button 
        className={className}
        variant={variant}
      >
        {showIcon && <Calendar className="mr-2 h-4 w-4" />}
        {text}
      </Button>
    </Link>
  );
};

export default CalendlyButton;