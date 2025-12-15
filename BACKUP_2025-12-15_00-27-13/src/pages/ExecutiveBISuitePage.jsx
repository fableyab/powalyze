// This page was previously removed and redirected.
// No content needed here as the route is redirected in App.jsx.
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExecutiveBISuitePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/powerbi-advanced', { replace: true });
  }, [navigate]);

  return null;
};

export default ExecutiveBISuitePage;